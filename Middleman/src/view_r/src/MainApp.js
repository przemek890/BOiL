import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from "@mui/material/Button";
import { FaSun, FaMoon } from 'react-icons/fa';
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";

import InputComponent from "./Components/InputComponent";
import OutputComponent from "./Components/OutputComponent";

const MainApp = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            primary: {
                main: darkMode ? '#ffffff' : '#1c1c1c',
            },
            mode: darkMode ? 'dark' : 'light',
            background: {
                default: darkMode ? '#1f1f23' : '#ffffff',
            },
        },
    });


    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div>
                    <AppBar>
                        <Toolbar style={{ backgroundColor: '#000000' }}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Middleman issue</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button color="inherit" onClick={() => setActiveTab(0)}>Input</Button>
                                <Button color="inherit" onClick={() => setActiveTab(1)}>Output</Button>
                                <Button color="inherit" onClick={() => setDarkMode(!darkMode)}>
                                    {darkMode ? <FaSun /> : <FaMoon />}
                                </Button>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                    <div>
                        {activeTab === 0 && <InputComponent/>}
                        {activeTab === 1 && <OutputComponent/>}
                    </div>
                </div>
            </ThemeProvider>
        </div>
    )
}


export default MainApp;
