from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication, BaseAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, WatchlistSerializer
from rest_framework import permissions, status
import jwt
from .validations import custom_validation, validate_email, validate_password
from . import generate_token
from .models import AppUser
from stockify import settings
from .models import Watchlist
import requests
import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from bs4 import BeautifulSoup
from stock.scraper import get_data, scrap
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)         #Allow anyone to register
    
    def post(self,request):
        try:
            clean_data = custom_validation(request.data)
            serializer = UserRegisterSerializer(data=clean_data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.create(clean_data)
                if user:
                    user_id = AppUser.objects.get(email=user.email).user_id
                    token = generate_token.generate_token({"user_id": user_id})
                    response = Response(serializer.data, status=status.HTTP_201_CREATED)
                    response.set_cookie("access_token", token)
                    return response
        except:
            return Response({"success":False, "message":"User already exist"},status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        data = requests.get("http://localhost:8081/customers").json()
        customer_data = {
             "email":data[0]["email"],
             "username":data[0]["first_name"],
             "password":"admin123"
         }
        clean_data = custom_validation(customer_data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    #To load user details if logged in
    def get(self, request):
        try:
            token = request.COOKIES["access_token"]
            decoded_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
            user = AppUser.objects.get(user_id=decoded_data["user_id"])
            serialized_user = UserSerializer(user)
            return Response({"success":True, "user":serialized_user.data})
        except:
            return Response({"success":False, "message":"Not Logged In!"})
    
    def post(self,request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request,user)
            user = AppUser.objects.get(email=data["email"])
            token = generate_token.generate_token({"user_id": user.user_id})
            response = Response({"success":True, "data":serializer.data}, status=status.HTTP_200_OK) 
            response.set_cookie("access_token", token)
            return response 


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)                       
    def post(self,request):
        response = Response({"success":True},status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        logout(request)
        return response
    

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response({'user':serializer.data} , status=status.HTTP_200_OK)
    
#Users watchlist
class WatchlistView(APIView):
    permission_classes = (permissions.AllowAny,) 
    def post(self, request):
        try:
            data = request.data
            token = request.COOKIES["access_token"]
            decoded_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
            user = AppUser.objects.get(user_id=decoded_data["user_id"])
            serializer = WatchlistSerializer(data={"user":user, "ticker": data["ticker"]})
            serializer.create(data={"user":user, "ticker": data["ticker"]})
            return Response({"success": True, "message":"Stock added to watchlist"}, status=status.HTTP_201_CREATED)
        except:
            return Response({"success": False, "message": "Please login"}, status=status.HTTP_401_UNAUTHORIZED)
    
    def delete(self, request):
        ticker = request.GET.get("ticker")
        token = request.COOKIES["access_token"]
        decoded_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        watchlist = WatchlistSerializer.delete(data={"user":decoded_data["user_id"], "ticker":ticker})
        return Response({"success":True, "message": f"Deleted {ticker}"})
    
    def get(self, request):
       try:
            token = request.COOKIES["access_token"]
            decoded_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
            queryset = Watchlist.objects.filter(user=decoded_data["user_id"])
            data = WatchlistSerializer(queryset, many=True).data
            scraped_data = []
            for fav in data:
                ticker, exchange = fav["ticker"].split(":")
                search_details = get_data(ticker=ticker,exchange=exchange)
                soup = BeautifulSoup(search_details.text, 'html.parser')
                scraped_data.append(scrap(soup))
            return Response({"success":True, "data":scraped_data})
       except:
            return Response({"success": False, "message": "Please login"}, status=status.HTTP_401_UNAUTHORIZED)

#Getting news
class NewsView(APIView):
    permission_classes = (permissions.AllowAny,) 
    def get(self, request):
        sessions = requests.Session()
        headers = {
            "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
            "X-RapidAPI-Key": "4adc2061ddmshd49b7c703e14a69p15c9b1jsnfe9ddb7823de"
            }
        params = {
            "query": '["finance","stock market","economy"]',
            "lang": 'en',
            "type": 'video',
            "upload_date": 'month'
        }
        news_response = sessions.get("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&apikey=IJ9GT8ELNE4GDPON")
        videos_response = sessions.get("https://yt-api.p.rapidapi.com/search", headers=headers,params=params)
        return Response({"success":True, "videos":videos_response,"news":news_response})
    
#Users google sheet
class GoogleSheet(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)  
    def post(self, request):
        SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
        SPREADSHEET_ID = request.data["sheetId"]
        stocks = request.data["stocks"]
        stocks = [list(stock.values()) for stock in stocks]
        CURR_DIR = os.path.dirname(os.path.realpath(__file__))
        credential_file=str(CURR_DIR)+'/credentials.json'
        flow = InstalledAppFlow.from_client_secrets_file(credential_file, SCOPES)
        creds = flow.run_local_server(port=5000)
        try:
            service = build('sheets', 'v4', credentials=creds)
            # Call the Sheets API
            sheet = service.spreadsheets()
            result = sheet.values().get(spreadsheetId=SPREADSHEET_ID,
                                    range="Sheet1").execute()
            values = result.get('values', [])
            current_row = len(values)+1
            for stock in stocks:
                print(stock)
                sheet.values().update(spreadsheetId=SPREADSHEET_ID,
                                    range=f"Sheet1!A{current_row}:F{current_row}", valueInputOption="USER_ENTERED", 
                                    body={"values": [stock]}).execute()
                current_row += 1
            if not values:
                print('No data found.')
                return
            return Response({"success":True})
        except HttpError as err:
            print(err)
            return Response({"success":False})

