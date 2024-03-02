import React, {useState} from "react";
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const columns = [
    {field: 'id', headerName: "ID", width: 90},
    {field: 'czynnosc',headerName: "Czynność", width: 150, editable: true},
    {field: 'czynnosc_pop', headerName: "Czynności Bezpośrednio Poprzedzające", width: 350, editable: true},
    {field: 'czas', headerName: "Czas Trwania", width: 150, editable: true}
]

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Table1 = () =>{
    const [rows, setRows] = useState([
        {id: 1, czynnosc: 'A', czunnosc_pop: '-', czas: 1}
    ]);

    return(
            <Box>
                <DataGrid sx={{color: "black", bgcolor: 'rgba(255,255,255,1)', margin: "0 15px"}} columns={columns} rows={rows} className="Table1"></DataGrid>
            </Box>
    )
}
export default Table1;