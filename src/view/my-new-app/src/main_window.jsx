import * as React from 'react';

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useState} from "react";

import InputComponent from "./component/InputComponent";
import GraphComponent from "./component/GraphComponent";
import GanttComponent from "./component/GanttComponent";

const Main_window = () => {
    const [activeTab, setActiveTab] = useState(0);
    return(
        <div>
            <ButtonGroup>
                <Button onClick={() => setActiveTab(0)}>Input</Button>
                <Button onClick={() => setActiveTab(1)}>Graph</Button>
                <Button onClick={() => setActiveTab(2)}>Gantt</Button>
            </ButtonGroup>
            <Card variant="outlined">
                <CardContent>
                    {activeTab === 0 && <InputComponent/>}
                    {activeTab === 1 && <GraphComponent/>}
                    {activeTab === 2 && <GanttComponent/>}
                </CardContent>
            </Card>
        </div>
    )
}

export default Main_window