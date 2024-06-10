import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OutputComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const serverIp = process.env.REACT_APP_SERVER_IP;
                const response = await fetch(`http://${serverIp}:5001/get_doc`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Fetch error: ', error);
            }
        };

        fetchData();
    }, []);


    if (data && data.message === "Database is empty.") {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <Typography variant="h4" align="center"><b>Output Component</b></Typography>
                <br/>
                <Typography variant="h6" align="center">Database is empty</Typography>;
            </div>
        );
    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <Typography variant="h4" align="center"><b>Output Component</b></Typography>
            <br/>
            {data && (
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={5}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6"><b>Unit Income:</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            {data.output.unit_income.map((row, index) => (
                                                <TableRow key={index}>
                                                    {row.map((cell, i) => (
                                                        <TableCell key={i}>{cell}</TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6"><b>Optimal Plan:</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            {data.output.optimal_plan.map((row, index) => (
                                                <TableRow key={index}>
                                                    {row.map((cell, i) => (
                                                        <TableCell key={i}>{cell}</TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6"><b>Profit:</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{data.output.profit}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6"><b>Revenue:</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{data.output.revenue}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6"><b>Total Cost:</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{data.output.total_cost}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6"><b>Total Purchase Cost:</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{data.output.total_purchase_cost}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6"><b>Total Transport Cost:</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">{data.output.total_transport_cost}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Box height={8} />
                        <p style={{ textAlign: "left", fontSize: "9px" }}>"Information available for the latest data from the database"</p>
                        <Box height={8} />
                    </Grid>
                </Grid>
            )}

        </div>
    )
}

export default OutputComponent;