import React from 'react'
import Header from '../Header/Header'
import MarketPreview from '../MarketPreview/MarketPreview'
import WhyStockify from '../WhyStockify/WhyStockify'
import './home.css'

const Home = () => {
  return (
    <>
        <div className='stockify-home margin__top'>
            <Header />
            <WhyStockify />
        </div>
    </>
  )
}

export default Home