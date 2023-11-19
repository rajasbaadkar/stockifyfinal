import React from 'react'
import "./watchlistCard.css"

const WatchlistCard = ({stock}) => {
  return (
    <>
    <div className='stockify__watchlist-card'>
      <p class="watchlist-card-heading">{stock.name}</p>
      <div>
        <p><b style={{"fontWeight":500}}>PRICE : </b> {stock.price}</p>
        <p><b style={{"fontWeight":500}}>CHANGE : </b> {stock.percent_change}</p>
        <p><b style={{"fontWeight":500}}>CAP : </b> {stock.market_cap}</p>
        {/* <p><b style={{"fontWeight":500}}>P/E : </b> {stock.pe}</p> */}
      </div>
    </div> 
  </>
  )
}

export default WatchlistCard