import React from 'react'
import "./loader.css"
import Backgroundimg from '../../components/BackgroundImg/Backgroundimg';

const svgStyle = {
    left: '50%',
    top: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)',
    preserveAspectRatio: 'xMidYMid meet',
    viewBox: '0 0 187.3 93.7',
    height: '75%',
    width: '75%',
  };
  
  const outlineStyle = {
    strokeMiterlimit: '10',
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    strokeWidth: '4',
    fill: 'none',
    stroke: '#4E4FEB'
  };
  
  const outlineBgStyle = {
    strokeMiterlimit: '10',
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    strokeWidth: '4',
    stroke: '#4E4FEB',
    fill: 'none',
    opacity: '0.05',
  };

const Loader = () => {
  return (
      <>
          <Backgroundimg />
          <div class="loader-container">
              <div class="loader"></div>
              <div class="loader-text">Loading...</div>
          </div>
      </>
  );
}

export default Loader