import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Typography, CircularProgress  } from '@mui/material';
import "./GT.css"

const GanttComponent = () => {
    const [ganttData, setGanttData] = useState({data: [], layout: {}});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/get_Gantt')
            .then(response => response.json())
            .then(data => {setGanttData(data);setLoading(false);})
            .catch(error => {console.error('Error:', error);setLoading(false);});
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '75vh', width: '75vw' }}>
            <Typography className="top" variant="h4" component="div" gutterBottom align="center" style={{ color: 'white', fontWeight: 'bold' }}>
                GANTT CHART
            </Typography>
            {loading ? (
                <CircularProgress style={{ marginTop: '20px' }} ></CircularProgress>) : (
                    <Plot className="plot" data={ganttData.data} layout={ganttData.layout} style={{ width: '100%', height: '100%'}} config={{responsive: true}}/>
            )
            }

        </div>
    );
};

export default GanttComponent;
