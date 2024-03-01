import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const GanttComponent = () => {
    const [ganttData, setGanttData] = useState({data: [], layout: {}});

    useEffect(() => {
        fetch('http://localhost:5000/get_Gantt')
            .then(response => response.json())
            .then(data => setGanttData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    console.log(ganttData);
    console.log("text");

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Plot
                data={ganttData.data}
                layout={ganttData.layout}
            />
        </div>
    );
};

export default GanttComponent;
