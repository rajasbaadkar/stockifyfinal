import React from 'react'
import "./prediction.css"
import { default as AI } from "../../Images/AI.png"
import Slider from '@mui/material/Slider';
import LineChart from "../../components/LineChart/LineChart"

function valuetext(value) {
    return `${value}°C`;
  }

const Prediction = () => {
    
    return (
        <div className='stockify__prediction'>
            <div className='stockify__prediction-about padding'>
                <div className='stockify__prediction-about-left'>
                    <h1>About Our Stock Price Prediction Model</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Omnis facilis tempore nostrum ratione, ab porro doloremque atque
                        culpa at dolore amet placeat doloribus commodi rem. Nisi, quidem. Quam, ex adipisci!
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Omnis facilis tempore nostrum ratione, ab porro doloremque atque
                        culpa at dolore amet placeat doloribus commodi rem. Nisi, quidem. Quam, ex adipisci!
                    </p>
                </div>
                <div className='stockify__prediction-about-right'>
                    <img src={AI} alt="" />
                </div>
            </div>
            <div className='stockify__prediction-model padding'>
                <div className='stockify__prediction-model-input'>
                    <div class="stockify__prediction-model-search">
                        <input type="text" name="text" class="input" id="input" placeholder="Enter The Ticker" />
                        <label for="input" class="labelforsearch">
                            <svg viewBox="0 0 512 512" class="searchIcon"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                        </label>
                        <div class="border"></div>
                        <button class="micButton"><svg viewBox="0 0 384 512" class="micIcon"><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path></svg>
                        </button>
                    </div>
                    <div className='stockify__prediction-model-slider'>
                        <label htmlFor="">Time Span(In Years)</label>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={1}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={5}
                            color={"secondary"}
                        />
                    </div>
                </div>
                <div className='stockify__prediction-model-graphcontainer'>
                    <LineChart />
                </div>
            </div>
        </div>
    )
}

export default Prediction