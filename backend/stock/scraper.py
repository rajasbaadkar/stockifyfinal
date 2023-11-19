import requests
from bs4 import BeautifulSoup
import re

BASE_URL = 'https://www.google.com/finance/quote/'

def remove_extra_spaces(text):
  text = re.sub(r"\s+", " ", text)
  text = text.strip()
  return text

def structure_sentences(text):
  sentences = text.split(".")
  sentences = [sentence for sentence in sentences if sentence]
  text = ". ".join(sentences)
  return text

def remove_wikipedia(text):
  text = re.sub(r"\bWikipedia\b", "", text)
  return text


def get_data(ticker, exchange):
	headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'}
	data = requests.get(BASE_URL+ticker+":"+exchange, headers)
	return data

def clean_text(text):
	text = re.sub(r"\s+", " ", text)
	text = text.strip()
	text = re.sub(r"\bWikipedia\b", "", text)
	return text
    
def scrap(soup):
	scraped_data = {}
	scraped_data["name"] = soup.find('div', {'class': 'zzDege'}).text
	scraped_data["price"] = soup.find('div', {'class': 'YMlKec fxKbKc'}).text
	scraped_data["percent_change"] = soup.find('div', {'class': 'JwB6zf'}).text
	scraped_data["info"] = clean_text(soup.find("div", {'class': "bLLb2d"}).text)
	scraped_data["stats"] = {}

	stats_key = soup.findAll("div", {"class" : "mfs7Fc"})
	stats_value = soup.findAll("div", {"class" : "P6K39c"})
	for i in range(0, len(stats_key)):
		scraped_data["stats"].__setitem__(stats_key[i].text, stats_value[i].text)

	stats_key1 = soup.findAll("div", {"class" : "rsPbEe"})
	stats_value1 = soup.findAll("td", {"class" : "QXDnM"})
	for i in range(0, len(stats_key1)):
		if(i == 4):
			scraped_data["stats"]["EPS"] =  stats_value1[4].text 
	

	stats_key = soup.findAll("div", {"class":"mfs7Fc"})
	stats_value = soup.findAll("div", {"class":"P6K39c"})
	for i in range(0, len(stats_key)):
		scraped_data["stats"].__setitem__(stats_key[i].text, stats_value[i].text)

	return scraped_data
    



# data = get_data(ticker, exchange)
# soup = BeautifulSoup(data.text, 'html.parser')
# scraped_data = scrap(soup))

