import React from 'react'
import "./table.css"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize:"1.3vmax",
    borderRight:"solid 2px white",
    borderBottom:"solid 2px white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    backgroundColor:"black",
    color:"white",
    border:"solid 2px transparent"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const createRow = (details)=>{
    const row = details.map(detail=><StyledTableCell component="th" scope="row" align="center">{detail}</StyledTableCell>)
    return row
}

const DataTable = ({headings,data=[]}) => {
  return (
    <>
    <TableContainer component={Paper} className='stockify__table'>
      <Table sx={{ minWidth: 700 ,borderRadius : '1%'}} aria-label="customized table">
        <TableHead >
          <TableRow>
              {
                  headings.map(heading=><StyledTableCell align="center">{heading}</StyledTableCell>)
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {
              data.map((d,i)=>{
                  const details = Object.values(d)
                  return(
                      <StyledTableRow key={i}>
                          {createRow(details)}
                      </StyledTableRow>
                  )
              })
          }
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default DataTable