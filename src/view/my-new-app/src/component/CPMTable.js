import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.critical': {
    backgroundColor: 'lightgray',
  },
}));

const StyledDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '90vh', // zmniejszono do 90vh, aby dodać 5% marginesu na górze i na dole
  width: '90vw',
  margin: '5vh 0', // dodano margines 5vh na górze i na dole
});

const StyledTableCellBody = styled(TableCell)(({ theme, isCritical }) => ({
  color: 'black',
  backgroundColor: isCritical ? '#e5e5e5' : 'white',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '10px', // Dodano zaokrąglenie rogów
}));

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
      <Typography variant="h4" component="div" gutterBottom align="center" style={{ color: 'white', fontWeight: 'bold' }}>
        CRITICAL PATH METHOD TABLE
      </Typography>
      <StyledTableContainer component={Paper}>
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
                  <StyledTableCellBody isCritical={row['Czynność krytyczna'] === 'tak'}>{row.Czynność}</StyledTableCellBody>
                  <StyledTableCellBody isCritical={row['Czynność krytyczna'] === 'tak'}>{row['Czynność krytyczna']}</StyledTableCellBody>
                  <StyledTableCellBody isCritical={row['Czynność krytyczna'] === 'tak'}>{row.EF}</StyledTableCellBody>
                  <StyledTableCellBody isCritical={row['Czynność krytyczna'] === 'tak'}>{row.ES}</StyledTableCellBody>
                  <StyledTableCellBody isCritical={row['Czynność krytyczna'] === 'tak'}>{row.LF}</StyledTableCellBody>
                  <StyledTableCellBody isCritical={row['Czynność krytyczna'] === 'tak'}>{row.LS}</StyledTableCellBody>
                  <StyledTableCellBody isCritical={row['Czynność krytyczna'] === 'tak'}>{row.Rezerwa}</StyledTableCellBody>
                  <StyledTableCellBody isCritical={row['Czynność krytyczna'] === 'tak'}>{row.t}</StyledTableCellBody>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </StyledTableContainer>
    </StyledDiv>
  );
};

export default CPMTableComponent;
