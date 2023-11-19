import {React,useState} from 'react'
import "./header.css"
import Chip from '@mui/material/Chip';
import {default as backgroundImg} from "../../Images/background.jpg"
import {AiOutlineSearch} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [ticker,setTicker] = useState("")
    const navigate = useNavigate()
    const companies = ["ITC:NSE","RELIANCE:NSE","HDFCBANK:NSE","IRCTC:NSE","YESBANK:NSE","IBM:NYSE"]
    const handleSearch = ()=>{
        navigate(`/stocks/${ticker}`)
    }
    const handleClick = (company) => {
        navigate(`/stocks/${company}`)
    }
  return (
    <div className='stockify-home__header'>
        <div className='stockify-home__header-img'>
            <img src={backgroundImg} alt="" />
        </div>
        <div className='stockify-home__header-title'>
            <h1>The future of investing</h1>
            <p>The Modern Stock Screener that helps you pick better stocks</p>
        </div>
        <div class="stockify-home__header-search">
            <input type="text" name="text" class="input" id="input" placeholder="Enter Ticker (Ticker : Stock Exchange)" 
                value={ticker} onChange={(e)=>setTicker(e.target.value)}    
            />
            <div class="border"></div>
            <button class="micButton">
                <AiOutlineSearch onClick={handleSearch} size={26} />
            </button>
        </div>
        <div className='stockify-home__header-tags'>
            <p>What's Trending</p>
            <div>
            {
                companies.map((company,i)=>{
                    return <Chip key={company} label={company.split(':')[0]} variant="outlined" onClick={()=>handleClick(company)} sx={{border:"solid 2px white", color:"white"}}/>
                })
            }
            </div>
        </div>
    </div>
  )
}

export default Header