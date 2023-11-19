import React, { Children } from 'react'
import './backgroundimg.css'
import {default as background} from "../../Images/img3.jpg"

const Backgroundimg = ({children}) => {
  return (
    <div className='stockify__backgroundimg'>
        <img src={background} alt="" />
    </div>
  )
}

export default Backgroundimg
