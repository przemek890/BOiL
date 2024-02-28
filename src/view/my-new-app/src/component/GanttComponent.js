import React, {useEffect, useState} from 'react';
import parse from 'html-react-parser';
import Plot from 'react-plotly.js';
import ganttData from "./gantt.json"

const GanttComponent = () => {
    console.log(ganttData)
    console.log("text")

    return (
        <div>
            <Plot
                data={ganttData.data}
                layout={ganttData.layout}
            />
        </div>
    );
};

export default GanttComponent;
