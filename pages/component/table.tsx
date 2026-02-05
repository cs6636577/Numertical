import * as React from 'react';
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
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(interation, x, y, error) {
//   return {interation, x, y, error };
// }

// const rows = [
//     createData(0,1,2,3)
// ];




export default function TableGraph(data) {
  console.log(data)

    // try{
    // x.forEach(element => {
    //     const newrows = createData(INTER[i],X[i],Y[i],ERROR[i])
    //     i++
    //     rows.push(newrows)
    // });
    // } catch (error){
    //     //po mueg tai
    // }
  // Check if the props are properly passed and are arrays

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Interation</StyledTableCell>
            <StyledTableCell align="right">x</StyledTableCell>
            <StyledTableCell align="right">f(x)</StyledTableCell>
            <StyledTableCell align="right">error</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          data.iterations ?
          data.iterations.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
              <StyledTableCell align="right">{row.x}</StyledTableCell>
              <StyledTableCell align="right">{row.y}</StyledTableCell>
              <StyledTableCell align="right">{row.error}%</StyledTableCell>
            </StyledTableRow>
          )):<></>

          

        
        }
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}