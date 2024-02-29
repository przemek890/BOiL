import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '100vh',
});

const StyledTableCellBody = styled(TableCell)({
  color: 'black',
});

const CPMTableComponent = () => {
  const [tableData, setTableData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetch('http://localhost:5000/get_tableCPM')
      .then(response => response.json())
      .then(data => setTableData(data));
  }, []);


  return (
    <StyledDiv>
      <TableContainer>
        {tableData.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Czynność</StyledTableCell>
                <StyledTableCell>Czynność krytyczna</StyledTableCell>
                <StyledTableCell>EF</StyledTableCell>
                <StyledTableCell>ES</StyledTableCell>
                <StyledTableCell>LF</StyledTableCell>
                <StyledTableCell>LS</StyledTableCell>
                <StyledTableCell>Rezerwa</StyledTableCell>
                <StyledTableCell>t</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCellBody>{row.Czynność}</StyledTableCellBody>
                  <StyledTableCellBody>{row['Czynność krytyczna']}</StyledTableCellBody>
                  <StyledTableCellBody>{row.EF}</StyledTableCellBody>
                  <StyledTableCellBody>{row.ES}</StyledTableCellBody>
                  <StyledTableCellBody>{row.LF}</StyledTableCellBody>
                  <StyledTableCellBody>{row.LS}</StyledTableCellBody>
                  <StyledTableCellBody>{row.Rezerwa}</StyledTableCellBody>
                  <StyledTableCellBody>{row.t}</StyledTableCellBody>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </StyledDiv>
  );
};

export default CPMTableComponent;
