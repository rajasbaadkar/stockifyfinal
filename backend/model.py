import prophet.forecaster as fb
from pandas_datareader import data
import yfinance as yf
yf.pdr_override()
import pandas as pd
import datetime as dt

def predict(ticker):
    start = dt.datetime(2021,1,1)
    end = dt.datetime(dt.datetime.now().year,dt.datetime.now().month,dt.datetime.now().day)
    df = data.get_data_yahoo(ticker,start,end)
    df.reset_index(inplace=True)
    df = df[["Date", "Close"]]
    df.columns = ["ds", "y"]
    print(df.shape)
    model = fb.Prophet(daily_seasonality=True)
    model.fit(df)
    future_dates = model.make_future_dataframe(periods=15)
    predictions = model.predict(future_dates)
    return predictions.iloc[720:735]["yhat"].to_numpy()
