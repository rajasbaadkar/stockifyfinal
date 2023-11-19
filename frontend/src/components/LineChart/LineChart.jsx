import {useState,useEffect} from 'react'
import "./linechart.css"
import {Line} from "react-chartjs-2"
import { Chart, registerables } from 'chart.js';

const LineChart = ({x,y,color,label}) => {
    Chart.register(...registerables)
  return (
      <div className="stockify__linechart">
          <Line
              redraw={true}
              data={{
                  labels: x,
                  datasets: [
                      {
                          data: y,
                          borderColor: color,
                          label: label,
                          backgroundColor: color,
                          fill: true,
                      },
                  ],
              }}
              options={{
                  scales: {
                      y: {
                          beginAtZero: true,
                          ticks: { color: "white", font: { size: 13 } },
                      },
                      x: { ticks: { color: "white", font: { size: 13 } } },
                  },
                  elements: {
                      point: { radius: 1 },
                  },
                  plugins: {
                      legend: {
                          labels: {
                              font: {
                                  size: 13,
                              },
                              color:"white"
                          },
                      },
                  },
              }}
          />
      </div>
  );
}

export default LineChart
