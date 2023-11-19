import React from 'react'
import "./card.css"

const Card = ({title,details}) => {
  return (
    <>
      <div className='stockify__home-card'>
        <p class="heading">{title}</p>
        <p>{details}</p>
      </div> 
    </>

  )
}

export default Card