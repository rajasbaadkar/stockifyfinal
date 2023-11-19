from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .scraper import scrap,get_data
from bs4 import BeautifulSoup
import requests
from model import predict

class StockSearch(APIView):
    permission_classes = (permissions.AllowAny,)
    BASE_URL = "https://api.stockdata.org/v1/data/eod?api_token=mEDZcfmpYvknLEtJqMAurQgR5wgD7pylzu6YfJRk"  
    def get(self, request):
        data = request.GET.get('ticker')
        ticker, exchange = data.split(":")
        search_details = get_data(ticker=ticker,exchange=exchange)
        soup = BeautifulSoup(search_details.text, 'html.parser')
        scraped_data = scrap(soup)
        price = requests.get(self.BASE_URL,params={
                "symbols":ticker,
                "date_from":"2023-10"
            }).json()
        return Response({"success":True,"data":scraped_data,"price":price["data"]})
    
class StockCompare(APIView):
    permission_classes = (permissions.AllowAny,)
    BASE_URL = "https://api.stockdata.org/v1/data/eod?api_token=mEDZcfmpYvknLEtJqMAurQgR5wgD7pylzu6YfJRk"
    def get(self, request):
        try:
            ticker1, ticker2 = request.GET.get("ticker1").split(":")[0], request.GET.get("ticker2").split(":")[0]
            ticker1_data = requests.get(self.BASE_URL,params={
                "symbols":ticker1,
                "date_from":"2023-10"
            }).json()
            ticker2_data = requests.get(self.BASE_URL,params={
                "symbols":ticker2,
                "date_from":"2023-10"
            }).json()
            return Response({"success":True,"data":[ticker1_data["data"],ticker2_data["data"]]})
        except:
            return Response({"success":False,"message":"Internal server error"})
        
class StockPrediction(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        try:
            ticker = request.GET.get("ticker")
            data = predict(ticker=ticker)
            return Response({"success":True, "data":data})
        except:
            return Response({"success":False, "message":"Interal server error"})