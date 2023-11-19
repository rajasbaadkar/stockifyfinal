import {React,useEffect, useState} from 'react'
import "./news.css"
import NewsCard from '../../components/NewsCard/NewsCard'
import axios from "axios"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Loader from '../Loader/Loader';

const News = () => {
  const [news,setNews] = useState(null)
  const [videos,setVideos] = useState(null)
  const [value,setValue] = useState("news")
  const options = {
    headers: {
      'X-RapidAPI-Key': '4adc2061ddmshd49b7c703e14a69p15c9b1jsnfe9ddb7823de',
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    },
    params:{
        query: '["finance","stock market","economy"]',
        lang: 'en',
        type: 'video',
        upload_date: 'month'
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  useEffect(()=>{
    if(!news)
        axios.get("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&apikey=IJ9GT8ELNE4GDPON")
        .then(({data})=>{
        setNews(data.feed)
        })
    if(!videos)
        axios.get(`https://yt-api.p.rapidapi.com/search`,options)
        .then(({data})=>{
        setVideos(data.data)
        })
  },[value])
  return (
	news === null ? <Loader />
	:
	<div className='stockify__news margin__top'>
      <Box sx={{ width: '100%',display:"flex",justifyContent:"center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example"
        >
          <Tab value="news" label="Articles" sx={{color:"white"}}/>
          <Tab value="videos" label="Videos" sx={{color:"white"}} />
        </Tabs>
      </Box>
        <h1>Latest Market {value === "news" ? "News" : "Videos"}</h1>
        <div className='stockify__news-container'>
            {
              value === "news" ? news && news.map((article,i)=> i<9 && <NewsCard title={article.title} url={article.url} image={article.banner_image} more={"Read More"} />) :
                                videos && videos.map((video,i)=>i<9 && <NewsCard title={video.title} image={video.thumbnail[0].url} url={`https://www.youtube.com/watch?v=${video.videoId}`} more={"Watch Video"} />)
            }      
        </div>
    </div>
  )
}

export default News