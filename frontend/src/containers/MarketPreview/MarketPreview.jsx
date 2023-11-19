import React from 'react'
import DataTable from '../../components/Table/Table';
import "./marketpreview.css"
import Button from '@mui/material/Button';

function createData(name, price,dayHigh) {
  return { name, price,dayHigh};
}

const rows = [
  createData('RELIANCE', 159, 160),
  createData('ITC', 237, 200),
  createData('HDFC', 262, 250),
  createData('IRCTC', 305, 300),
  createData('RUSSELL', 356, 320),
  createData("GMDC",200,320)
];

function MarketPreview() {
  return (
        <div className='stockify__home-marketpreview margin'>
            <h1>Take A Quick Look At Market</h1>
            <DataTable headings={["Company","Price","Day High"]} data={rows} />
            <div className='stockify__home-marketpreview-btn'>
                <Button variant="contained" sx={[{width:"25%",color:"white",
                    backgroundColor:"black",fontSize:"1.2vmax",border:"solid 2px white"},
                    {'&:hover':{backgroundColor:"white",color:"black"}}]}>
                        View All
                </Button>
            </div>
        </div>
  );
}

export default MarketPreview