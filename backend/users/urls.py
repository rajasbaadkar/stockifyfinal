from django.urls import path
from . import views

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('shopify', views.UserRegister.as_view(), name="shopify"),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('watchlist', views.WatchlistView.as_view(), name='watchlist'),
    path('news', views.NewsView.as_view(), name='news'),
    path('watchlist', views.WatchlistView.as_view(), name='watchlist'),
    path('sheet', views.GoogleSheet.as_view(), name="sheet")
]
