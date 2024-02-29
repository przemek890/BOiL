import React, { useEffect, useState } from 'react';

const CPMTableComponent = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/get_tableCPM')
            .then(response => response.json())
            .then(data => setTableData(data));
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            {tableData.length > 0 && (
                <table style={{ border: '1px solid black', textAlign: 'center', borderCollapse: 'collapse', width: '80%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '10px' }}>Czynność</th>
                            <th style={{ border: '1px solid black', padding: '10px' }}>Czynność krytyczna</th>
                            <th style={{ border: '1px solid black', padding: '10px' }}>EF</th>
                            <th style={{ border: '1px solid black', padding: '10px' }}>ES</th>
                            <th style={{ border: '1px solid black', padding: '10px' }}>LF</th>
                            <th style={{ border: '1px solid black', padding: '10px' }}>LS</th>
                            <th style={{ border: '1px solid black', padding: '10px' }}>Rezerwa</th>
                            <th style={{ border: '1px solid black', padding: '10px' }}>t</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{row.Czynność}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{row['Czynność krytyczna']}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{row.EF}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{row.ES}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{row.LF}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{row.LS}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{row.Rezerwa}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{row.t}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CPMTableComponent;
