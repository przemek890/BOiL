import * as React from 'react';

import Button from "@mui/material/Button";
import {useState} from "react";

import InputComponent from "./component/InputComponent";
import GraphComponent from "./component/GraphComponent";
import GanttComponent from "./component/GanttComponent";
import {AppBar, Stack, Toolbar, Typography} from "@mui/material";
import CPMTableComponent from "./component/CPMTable";
const Main_window = () => {
    const [activeTab, setActiveTab] = useState(0);
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>Test</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" onClick={() => setActiveTab(0)}>Input</Button>
                        <Button color="inherit" onClick={() => setActiveTab(1)}>Graph</Button>
                        <Button color="inherit" onClick={() => setActiveTab(2)}>Gantt</Button>
                        <Button color="inherit" onClick={() => setActiveTab(3)}>CPM Table</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <div>
                    {activeTab === 0 && <InputComponent/>}
                    {activeTab === 1 && <GraphComponent/>}
                    {activeTab === 2 && <GanttComponent/>}
                    {activeTab === 3 && <CPMTableComponent/>}
            </div>
        </div>
    )
}

export default Main_window