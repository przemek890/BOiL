import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

const redAsteriskStyle = {
  '& .MuiFormLabel-asterisk': {
    color: 'red',
  },
};


const StyledTableCell = styled(TableCell)(redAsteriskStyle);

const InputComponent = () => {
    const [rows, setRows] = useState([
        { name: 'demand', columns: [null, 'Customer 1', 'Customer 2'] },
        { name: 'supplier 1', columns: ['Supply', 'Customer 1', 'Customer 2', 'Purchase price'] },
        { name: 'supplier 2', columns: ['Supply', 'Customer 1', 'Customer 2', 'Purchase price'] },
        { name: 'selling price', columns: [null, 'Customer 1', 'Customer 2'] },
    ]);

    const [data, setData] = useState(rows.map(row => Array(row.columns.length).fill('')));

    useEffect(() => {
        setData(rows.map(row => Array(row.columns.length).fill('')));
    }, [rows]);

    const handleInputChange = (rowIndex, colIndex, event) => {
        const newData = [...data];
        newData[rowIndex][colIndex] = event.target.value;
        setData(newData);
    };


    const addCustomerColumn = () => {
        const newRows = rows.map(row => {
            if (row.name.startsWith('supplier')) {
                row.columns.splice(row.columns.length - 1, 0, `Customer ${row.columns.filter(col => col && col.startsWith('Customer')).length + 1}`);
            } else {
                row.columns.push(`Customer ${row.columns.filter(col => col && col.startsWith('Customer')).length + 1}`);
            }
            return row;
        });
        setRows(newRows);
    };

    const removeCustomerColumn = () => {
        const newRows = rows.map(row => {
            if (row.name.startsWith('supplier') && row.columns.filter(col => col && col.startsWith('Customer')).length > 1) {
                row.columns.splice(row.columns.length - 2, 1);
            } else if (!row.name.startsWith('supplier') && row.columns.filter(col => col && col.startsWith('Customer')).length > 1) {
                row.columns.pop();
            }
            return row;
        });
        setRows(newRows);
    };

    const addSupplierRow = () => {
        const newRow = { name: `supplier ${rows.filter(row => row.name.startsWith('supplier')).length + 1}`, columns: ['Supply', ...rows[1].columns.slice(1, -1), 'Purchase price'] };
        setRows([...rows.slice(0, -1), newRow, rows[rows.length - 1]]);
        setData(prevData => [...prevData.slice(0, -1), Array(newRow.columns.length).fill(''), prevData[prevData.length - 1]]);
    };


    const removeSupplierRow = () => {
        if (rows.filter(row => row.name.startsWith('supplier')).length > 1) {
            setRows(rows.filter((row, index) => !row.name.startsWith('supplier') || index !== rows.length - 2));
        }
    };

const handleCalculate = async () => {
    const supply = rows.filter(row => row.name.startsWith('supplier')).map((row, rowIndex) => Number(data[rowIndex + 1][0]?.trim()));
    const demand = rows.find(row => row.name === 'demand').columns.slice(1).map((value, colIndex) => Number(data[0][colIndex + 1]?.trim()));
    const purchase_costs = rows.filter(row => row.name.startsWith('supplier')).map((row, rowIndex) => Number(data[rowIndex + 1][row.columns.length - 1]?.trim()));
    const sale_prices = rows.find(row => row.name === 'selling price').columns.slice(1).map((value, colIndex) => Number(data[data.length - 1][colIndex + 1]?.trim()));
    const transport_costs = rows.filter(row => row.name.startsWith('supplier')).map((row, rowIndex) => row.columns.slice(1, row.columns.length - 1).map((value, colIndex) => Number(data[rowIndex + 1][colIndex + 1]?.trim())));

    const requestData = {
        supply,
        demand,
        purchase_costs,
        sale_prices,
        transport_costs
    };

    const isDataIncorrectOrIncomplete = Object.values(requestData).flat(2).some(value => {
        const regex = /^(?:[1-9]\d*(\.\d+)?)|(?:0?\.\d*[1-9]\d*)$/;
    return !regex.test(value);
    });

    if (isDataIncorrectOrIncomplete) {
        alert('Incorrect or incomplete data');
        return;
    }

    try {
        const serverIp = process.env.REACT_APP_SERVER_IP;
        console.log(requestData)
        const response = await axios.post(`http://${serverIp}:5000/calculate`, requestData);
        console.log(response.data);
        alert('Data was processed correctly');
    } catch (error) {
        console.error(error);
    }
};


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <br/>
            <br/>
            <br/>
            <h1>Input Component</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>{row.name}</TableCell>
                                {row.columns.map((column, columnIndex) => (
                                <StyledTableCell key={columnIndex}>
                                    {column && <TextField label={column} required value={data[rowIndex][columnIndex] || ''} onChange={(event) => handleInputChange(rowIndex, columnIndex, event)} />}
                                </StyledTableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                </Table>
            </TableContainer>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', marginTop: '1rem' }}>
                <Button variant="contained" onClick={addCustomerColumn} style={{ marginRight: '1rem', fontSize: '0.7rem' }} size="small">Add column "Customer"</Button>
                <Button variant="contained" onClick={removeCustomerColumn} style={{ marginRight: '1rem', fontSize: '0.7rem' }} size="small">Remove column "Customer"</Button>
                <Button variant="contained" onClick={addSupplierRow} style={{ marginRight: '1rem', fontSize: '0.7rem' }} size="small">Add row "Supplier"</Button>
                <Button variant="contained" onClick={removeSupplierRow} style={{ marginRight: '1rem', fontSize: '0.7rem' }} size="small">Remove row "Supplier"</Button>
                <Button variant="contained" onClick={handleCalculate} style={{ fontSize: '0.7rem', width: '200px' }} size="small">Calculate</Button>

            </div>
        </div>
    );
};

export default InputComponent;
