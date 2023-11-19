from django.urls import path
from . import views

urlpatterns = [
    path('search', views.StockSearch.as_view(), name='search'),
    path('compare', views.StockCompare.as_view(), name="compare"),
    path("predict", views.StockPrediction.as_view(), name="predict")
]