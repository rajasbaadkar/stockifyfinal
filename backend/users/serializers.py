from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model,authenticate
from .models import Watchlist

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(email = validated_data['email'],
                                                 password = validated_data['password'])
        user_obj.username = validated_data['username']
        user_obj.save()
        return user_obj
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, validated_data):
        user = authenticate(username = validated_data['email'],
                            password = validated_data['password'])
        if not user:
            raise ValidationError('User not found')
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email','username')

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = '__all__'
    
    def create(self, data):
        watchlist = Watchlist.objects.create(user=data["user"], ticker=data["ticker"])
        return watchlist
    
    def delete(data):
        watchlist = Watchlist.objects.get(user=data["user"], ticker=data["ticker"]).delete()
        return watchlist
    
    def get():
        return Watchlist.objects.all()