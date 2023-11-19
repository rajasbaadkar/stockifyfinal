import { useState,useRef } from "react";
import "./compare.css";
import Backgroundimg from "../../components/BackgroundImg/Backgroundimg";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import LineChart from "../../components/LineChart/LineChart";
import CustomAccordion from "../../components/Accordion/Accordion";
import {AiOutlineSearch} from "react-icons/ai"
import {colors,extractDates, extractOpen} from "./util"
import axios from "axios";
import Loader from "../Loader/Loader"

const Compare = () => {
    const inputRef = useRef(null)
    const [series, setSeries] = useState(null)
    const [dates, setDates] = useState(null)
    const [info,setInfo] = useState([])
    const [loading,setIsLoading] = useState(false)
    const handleCompare = async()=>{
        const [ticker1,ticker2] = inputRef.current.value.split(",")
        try{
            setIsLoading(true)
            const {data:timeSeries} = await axios.get(`http://localhost:8000/stocks/compare?ticker1=${ticker1}&ticker2=${ticker2}`)
            setDates(extractDates(timeSeries.data[0]))
            setSeries([extractOpen(timeSeries.data[0]),extractOpen(timeSeries.data[1])])
            const {data:stat1} = await axios.get(`http://localhost:8000/stocks/search?ticker=${ticker1}`)
            const {data:stat2} = await axios.get(`http://localhost:8000/stocks/search?ticker=${ticker2}`)
            setInfo([stat1.data,stat2.data])
            setIsLoading(false)
            console.log("data fetched")
        }catch(err){
            console.log(err)
            setIsLoading(false)
        }
    }
    return (
        <>
            {
             loading ? <Loader /> :
            <>
            <Backgroundimg />
            <div className="stockify__compare margin__top">
                <div class="stockify__compare-search">
                    <input
                        type="text"
                        name="text"
                        class="input"
                        id="input"
                        placeholder="Enter (Ticker,Ticker)"
                        ref={inputRef}
                    />
                    <div class="border"></div>
                    <button class="micButton">
                        <AiOutlineSearch onClick={handleCompare} size={26} />
                    </button>
                </div>
                {
                    dates === null ? null :
                    <div className="stockify__compare-container">
                    <div className="stockify__compare-left">
                        <div className="stockify__compare-name">
                            <div>
                                <p>{info[0].name}</p>
                                <div>
                                    <p>{info[0].price}</p>
                                    <span>
                                        <BsFillArrowUpSquareFill
                                            color="green"
                                            style={{ marginRight: "10px" }}
                                        />
                                        {info[0].percent_change}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p>{info[1].name}</p>
                                <div>
                                    <p>{info[1].price}</p>
                                    <span>
                                        <BsFillArrowUpSquareFill
                                            color="green"
                                            style={{ marginRight: "10px" }}
                                        />
                                        {info[1].percent_change}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="stockify__compare-graph">
                            <LineChart
                                x={dates}
                                y={series[0]}
                                color={
                                    colors[
                                        Math.floor(
                                            Math.random() * colors.length
                                        )
                                    ]
                                }
                                label={info[0].name}
                            />
                            <LineChart
                                x={dates}
                                y={series[1]}
                                color={
                                    colors[
                                        Math.floor(
                                            Math.random() * colors.length
                                        )
                                    ]
                                }
                                label={info[1].name}
                            />
                        </div>
                    </div>
                    <div className="stockify__compare-right">
                        <CustomAccordion
                            expanded={true}
                            label={"Statistics"}
                            data={{
                                "Previous Close": info[0].stats["Previous Close"],
                                "Day Range": info[0].stats["Day range"],
                                "Market Cap": info[0].stats["Market cap"],
                                "P/E Ratio": info[0].stats["P/E ratio"],
                                "Dividend Yeild": info[0].stats["Dividend yield"],
                            }}
                        />
                        <CustomAccordion
                            expanded={true}
                            label={"Statistics"}
                            data={{
                                "Previous Close": info[1].stats["Previous Close"],
                                "Day Range": info[1].stats["Day range"],
                                "Market Cap": info[1].stats["Market cap"],
                                "P/E Ratio": info[1].stats["P/E ratio"],
                                "Dividend Yeild": info[1].stats["Dividend yield"],
                            }}
                        />
                    </div>
                </div>
                }
            </div>
            </>
            }
        </>
    );
};

export default Compare;
