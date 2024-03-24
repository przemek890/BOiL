import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from "@mui/material/Button";
import { FaSun, FaMoon } from 'react-icons/fa';
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";

import InputComponent from "./Components/InputComponent";
import OutputComponent from "./Components/OutputComponent";
import CustSuppComponent from "./Components/CustSuppComponent";

const MainApp = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div>
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Middleman issue</Typography>
                            <Stack direction="row" spacing={2}>
                                <Button color="inherit" onClick={() => setActiveTab(0)}>Input</Button>
                                <Button color="inherit" onClick={() => setActiveTab(1)}>Output</Button>
                                <Button color="inherit" onClick={() => setActiveTab(2)}>Table</Button>
                                <Button color="inherit" onClick={() => setDarkMode(!darkMode)}>
                                    {darkMode ? <FaSun /> : <FaMoon />}
                                </Button>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                    <div>
                        {activeTab === 0 && <InputComponent/>}
                        {activeTab === 1 && <OutputComponent/>}
                        {activeTab === 2 && <CustSuppComponent/>}
                    </div>
                </div>
            </ThemeProvider>
        </div>
    )
}


export default MainApp;
