import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { Button, FormLabel, TextField, InputAdornment, Select, MenuItem } from '@mui/material'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Divider, FormControl } from '@mui/material';

import { useNavigate } from 'react-router'
import { AiOutlineFileText } from "react-icons/ai";

function RecordInvoice() {
    const navigate = useNavigate()
    return (
        <>
            <Card>
                <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                    <Grid item style={{ display: 'flex', justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Button onClick={() => { navigate("/dashboard/invoice") }} size='small' style={{ margin: "9px", color: "black" }}><AiOutlineArrowLeft /></Button>
                        <Typography style={{ margin: "9px", marginLeft: "-15px" }} variant='h5'>Record Payment for Invoice # 1/2024
                        </Typography>
                        <Button size='small' variant='outlined' style={{ color: "black", borderColor: "black", margin: "5px" }}> Unpaid</Button>

                    </Grid>
                    <Grid item xs={12} md={8} lg={8} style={{ display: 'flex', justifyContent: "end", alignItems: "end", textAlign: "end", }}>
                        <Button onClick={() => { navigate("/dashboard/invoice") }} style={{ margin: "5px", color: "black", borderColor: "black", }} variant='outlined'><AiOutlineCloseCircle style={{ margin: '3px', marginLeft: "-3px" }} /> Cancel</Button>
                        <Button onClick={() => { navigate("/dashboard/invoice/read/1") }} style={{ margin: "5px", color: "black", borderColor: "black", }} variant='outlined'><AiOutlineFileText style={{ margin: '3px', marginLeft: "-3px" }} /> Show Invoice</Button>
                    </Grid>
                </Grid>

                <Grid container spacing={2} style={{ margin: "10px" }} >
                    <Grid xs={12} md={6} lg={6}>
                        <Grid container>
                            <Grid item xs={12} md={5} lg={5} style={{ padding: "10px" }}>
                                <FormLabel required>Number</FormLabel>
                                <FormControl fullWidth>
                                    <TextField name="number" type='number' size="small" required
                                        fullWidth />
                                </FormControl>
                            </Grid>
                            {" "}
                            <Grid item xs={12} md={5} lg={5} style={{ padding: "10px" }} >
                                <FormLabel required>Date</FormLabel>
                                <FormControl fullWidth>
                                    <TextField name="date" type='date' size="small" required
                                        fullWidth />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }}  >
                            <FormLabel required>Amount</FormLabel>
                            <FormControl fullWidth>
                                <TextField name="amount" type='number' size="small"
                                    fullWidth InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }}  >
                            <FormLabel required>Payment Mode</FormLabel>
                            <FormControl fullWidth>
                                <Select
                                    id="paymentMode"
                                    name="paymentMode"
                                    size="small"
                                    fullWidth
                                    placeholder='Search Here'
                                >
                                    <MenuItem value="Gpay">Gpay</MenuItem>
                                    <MenuItem value="Phone Pe">Phone Pe</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }} >
                            <FormLabel >Reference</FormLabel>
                            <FormControl fullWidth>
                                <TextField name="reference" type='text' size="small" required
                                    fullWidth />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }} >
                            <FormLabel >Description</FormLabel>
                            <FormControl fullWidth>
                                <TextField name="description" type='text' size="small" required
                                    fullWidth />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }}>
                            <Button variant='contained'>Record Payment</Button>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={6} lg={6}>
                        <Grid container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Grid item xs={12} md={10} lg={10} style={{ padding: "10px", marginTop: "10px" }}>
                                <Typography variant='h4'>Client: Aman Kushwah</Typography>
                            </Grid>
                            <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }}>
                                <Typography variant='h5'>Email: test@gmail.com</Typography>
                            </Grid>
                            <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }}>
                                <Typography variant='h5'>Phone: 978563214</Typography>
                            </Grid>
                            <Grid item xs={12} md={10} lg={10} style={{ padding: "10px", marginTop: "20px" }}>
                                <Typography variant='h5'>Payment Status:
                                    <Button size='small' variant='outlined' style={{ color: "red", borderColor: "red", margin: "5px" }}> Unpaid</Button>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }}>
                                <Typography variant='h5'>Sub Total: 5.00</Typography>
                            </Grid>
                            <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }}>
                                <Typography variant='h5'>Total: 5.75</Typography>
                            </Grid>
                            <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }}>
                                <Typography variant='h5'>Discount: 0.00</Typography>
                            </Grid>
                            <Grid item xs={12} md={10} lg={10} style={{ padding: "10px" }}>
                                <Typography variant='h5'>Balance: 0.00</Typography>
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>
                <Divider orientation='horizontal' style={{ marginTop: "10px" }} />
            </Card>
        </>
    )
}

export default RecordInvoice