import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Typography } from '@mui/material';

const GanttComponent = () => {
    const [ganttData, setGanttData] = useState({data: [], layout: {}});

    useEffect(() => {
        fetch('http://localhost:5000/get_Gantt')
            .then(response => response.json())
            .then(data => setGanttData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '75vh', width: '75vw' }}>
            <Typography variant="h4" component="div" gutterBottom align="center" style={{ color: 'white', fontWeight: 'bold' }}>
                GANTT CHART
            </Typography>
            <Plot
                data={ganttData.data}
                layout={ganttData.layout}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default GanttComponent;
