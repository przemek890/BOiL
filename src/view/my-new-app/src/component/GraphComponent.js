import React, {useEffect, useState} from 'react';
import { Typography } from '@mui/material';
import Graph from "react-graph-vis";
import Plot from "react-plotly.js";
// import "./GT.css"

const GraphComponent = () => {
    const [graphData, setGraphData] = useState({data: [], layout: {}});
     useEffect(() => {
        fetch('http://localhost:5000/get_Graph')
            .then(response => response.json())
            .then(data => setGraphData(data))
            .catch(error => console.error('Error:', error));
    }, []);

      const options = {
        layout: {
            hierarchical: false, // lub inny układ według preferencji
        },
        edges: {
            color: "#000000",
        },
        nodes: {
            color: "#FF0000",
        },
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '75vh', width: '75vw' }}>
            <br/>
            <Typography variant="h4" component="div" gutterBottom align="center"  style={{ color: 'white', fontWeight: 'bold' }}>
                GRAPH
                <Plot
                className="plot"
                data={graphData.data}
                layout={graphData.layout}
                style={{ width: '1000px', height: '500px'}}
                // config={{responsive: true}}
            />
            </Typography>
        </div>
    );
};

export default GraphComponent;
