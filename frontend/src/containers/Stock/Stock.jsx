import {useState,useEffect} from 'react'
import "./stock.css"
import Backgroundimg from '../../components/BackgroundImg/Backgroundimg'
import {BsFillArrowUpSquareFill,BsFillArrowDownSquareFill} from "react-icons/bs"
import LineChart from '../../components/LineChart/LineChart'
import CustomAccordion from '../../components/Accordion/Accordion'
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { extractDates,extractOpen } from './util'

const Stock = () => {
    const {ticker} = useParams()
    const [isLoading,setIsLoading] = useState(false)
    const [stock,setStock] = useState(null)
    const [series,setSeries] = useState([10,20,30,40,50])
    const [dates,setDates] = useState([1,2,3,4,5])
    const days = ["Mon","Tues","Wed","Thus","Fri","Sat"]
    const colors = ["#ff6384", "#5959e6", "#2babab", "#8c4d15", "#8bc34a", "#607d8b", "#009688"]
    const handleAddWatchlist = ()=>{
        axios.post("http://localhost:8000/users/watchlist",{ticker},{withCredentials:true})
        .then(({data})=>{
            console.log(data)
        })
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        setIsLoading(true)
        axios.get(`http://127.0.0.1:8000/stocks/search?ticker=${ticker}`)
        .then(({data})=>{
            console.log(data)
            setStock(data.data)
            console.log(data.price)
            setDates(extractDates(data.price))
            setSeries(extractOpen(data.price))
            setIsLoading(false)
        })
        .catch(err=>{
            console.log(err)
            setIsLoading(false)
        })
    },[ticker])
  return (
      <>
          <Backgroundimg />
          {
            isLoading === true ? <Loader /> :
            stock &&
            <div className="stockify__stock margin__top">
              <div className="stockify__stock-container">
                  <div className="stockify__stock-left">
                      <div className="stockify__stock-name">
                          <div>
                              <p>{stock.name}</p>
                              <div>
                                  <p>{stock.price}</p>
                                  <span>
                                      {
                                        stock.percent_change.includes("+") ? 
                                        <BsFillArrowUpSquareFill
                                        color="green"
                                        style={{ marginRight: "10px" }}
                                    />
                                    :
                                    <BsFillArrowDownSquareFill
                                          color="red"
                                          style={{ marginRight: "10px" }}
                                      />
                                      }
                                      {stock.percent_change}
                                  </span>
                              </div>
                          </div>
                          <Button
                              variant="contained"
                              sx={[
                                  {
                                      height: "50%",
                                      width: "25%",
                                      color: "white",
                                      backgroundColor: "black",
                                      fontSize: "1.1vmax",
                                      border: "solid 2px white",
                                      margin:"auto"
                                  },
                                  {
                                      "&:hover": {
                                          backgroundColor: "white",
                                          color: "black",
                                      },
                                  },
                              ]}
                              onClick={handleAddWatchlist}
                          >
                              Add To Watchlist
                          </Button>
                      </div>
                      <div className="stockify__stock-graph">
                          <LineChart x={dates} y={series} color={colors[Math.floor(Math.random()*colors.length)]} label={"OPEN PRICE"}/>
                      </div>
                  </div>
                  <div className="stockify__stock-right">
                      <CustomAccordion
                          expanded={true}
                          label={"Statistics"}
                          data={{
                              "Previous Close": stock.stats["Previous close"],
                              "Day Range": stock.stats["Day range"],
                              "Market Cap": stock.stats["Market cap"],
                              "P/E Ratio": stock.stats["P/E ratio"],
                              "Dividend Yeild": stock.stats["Dividend yield"],
                          }}
                      />
                      <CustomAccordion
                          label={"Company Details"}
                          data={{
                              About: stock.info,
                          }}

                      />
                      <Button
                              variant="contained"
                              sx={[
                                  {
                                      height: "8%",
                                      width: "60%",
                                      color: "white",
                                      backgroundColor: "black",
                                      fontSize: "1.1vmax",
                                      border: "solid 2px white",
                                      margin:"0 auto",
                                      
                                  },
                                  {
                                      "&:hover": {
                                          backgroundColor: "white",
                                          color: "black",
                                      },
                                  },
                              ]}
                          >
                              Predict 
                          </Button>
                  </div>
              </div>
          </div>
          }
      </>
  );
}

export default Stock
