import React from "react";
import {Box} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const columns = [
    {field: 'id', headerName: "ID", width: 90},
    {field: 'czynnosc',headerName: "Czynność", width: 150, editable: true},
    {field: 'poprzednik', headerName: "Poprzednik", width: 350, editable: true},
    {field: 'nastepnik', headerName: "Następnik", width: 150, editable: true}
]

const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

const Table1 = () =>{
    const data = [
        {id: 1, czynnosc: 'A', czunnosc_pop: '-', czas: 1}
    ]
    return(

            <Box>
                <DataGrid sx={{color: "black", bgcolor: 'rgba(255,255,255,1)', margin: "0 15px"}} columns={columns} rows={data} className="Table1"></DataGrid>
            </Box>
    )
}
export default Table1;