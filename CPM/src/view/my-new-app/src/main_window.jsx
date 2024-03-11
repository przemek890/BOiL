import * as React from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from "@mui/material/Button";
import { useState } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';

import InputComponent from "./component/InputComponent";
import GraphComponent from "./component/GraphComponent";
import GanttComponent from "./component/GanttComponent";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import CPMTableComponent from "./component/CPMTable";

const Main_window = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            {/*<CssBaseline />*/}
            <div>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>CPM</Typography>
                        <Stack direction="row" spacing={2}>
                            <Button color="inherit" onClick={() => setActiveTab(0)}>Input</Button>
                            <Button color="inherit" onClick={() => setActiveTab(1)}>Graph</Button>
                            <Button color="inherit" onClick={() => setActiveTab(2)}>Gantt</Button>
                            <Button color="inherit" onClick={() => setActiveTab(3)}>CPM</Button>
                            <Button color="inherit" onClick={() => setDarkMode(!darkMode)}>
                                {darkMode ? <FaSun /> : <FaMoon />}
                            </Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <div>
                    {activeTab === 0 && <InputComponent />}
                    {activeTab === 1 && <GraphComponent />}
                    {activeTab === 2 && <GanttComponent />}
                    {activeTab === 3 && <CPMTableComponent />}
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Main_window;
