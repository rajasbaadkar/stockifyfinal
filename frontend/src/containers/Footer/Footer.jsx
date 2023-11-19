import React from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <div className='stockify__footer'>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <footer>
              <div class="footer">
                  <div class="row">
                      <Link href="#"><i class="fa fa-facebook"></i></Link>
                      <Link href="#"><i class="fa fa-instagram"></i></Link>
                      <Link href="#"><i class="fa fa-youtube"></i></Link>
                      <Link href="#"><i class="fa fa-twitter"></i></Link>
                  </div>

                  <div class="row">
                      <ul>
                          <li><Link href="#">Contact us</Link></li>
                          <li><Link href="#">Our Services</Link></li>
                          <li><Link href="#">Privacy Policy</Link></li>
                          
                          <li><Link href="#">Terms & Conditions</Link></li>
                          <li><Link href="#">Career</Link></li>
                      </ul>
                  </div>

                  <div class="row">
                      Stockify Copyright © 2021 Stockify - All rights reserved
                  </div>
              </div>
          </footer>
      </div>
  )
}

export default Footer