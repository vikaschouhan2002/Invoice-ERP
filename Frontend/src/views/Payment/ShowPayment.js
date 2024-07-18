import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { Button } from '@mui/material'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Divider } from '@mui/material';

import { useNavigate } from 'react-router'
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineRetweet } from "react-icons/ai";
import { AiOutlineExport } from "react-icons/ai";

function ShowPayment() {
    const navigate = useNavigate()
    return (
        <>
            <Card>
                <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                    <Grid item style={{ display: 'flex', justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Button onClick={() => { navigate("/dashboard/payment") }} size='small' style={{ margin: "9px", color: "black" }}><AiOutlineArrowLeft /></Button>
                        <Typography style={{ margin: "9px", marginLeft: "-15px" }} variant='h5'>Payment # 1/2024
                        </Typography>
                        <Button size='small' variant='outlined' style={{ color: "green", borderColor: "green", margin: "5px" }}> paid</Button>

                    </Grid>
                    <Grid item xs={12} md={8} lg={8} style={{ display: 'flex', justifyContent: "end", alignItems: "end", textAlign: "end", }}>
                        <Button onClick={() => { navigate("/dashboard/payment") }} style={{ margin: "5px", color: "black", borderColor: "black", }} variant='outlined'><AiOutlineCloseCircle style={{ margin: '3px', marginLeft: "-3px" }} /> Close</Button>
                        <Button style={{ margin: "5px", color: "black", borderColor: "black", }} variant='outlined'><AiOutlineFilePdf style={{ margin: '3px', marginLeft: "-3px" }} /> Download Pdf</Button>
                        <Button style={{ margin: "5px", color: "black", borderColor: "black", }} variant='outlined'><AiOutlineMail style={{ margin: '3px', marginLeft: "-3px" }} /> Send By Email</Button>
                        <Button onClick={() => { navigate("/dashboard/payment/update/1") }} style={{ margin: "5px" }} variant='contained'><AiOutlineEdit style={{ margin: '3px', marginLeft: "-3px" }} /> Edit</Button>
                    </Grid>
                </Grid>

                <Grid spacing={2} style={{ margin: "10px", padding: "10px" }}>
                    <Grid container xs={12} md={8} lg={8}>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "gray" }} variant='h4'>Status</Typography>
                            <Typography variant='h2'>draft</Typography>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "gray" }} variant='h4'>Subtotal</Typography>
                            <Typography variant='h2'>$ 5.00</Typography>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "gray" }} variant='h4'>Total</Typography>
                            <Typography variant='h2'>$ 5.75</Typography>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "gray" }} variant='h4'>Balance</Typography>
                            <Typography variant='h2'>$ 0.00</Typography>
                        </Grid>

                    </Grid>
                </Grid>
                <Divider orientation='horizontal' style={{ marginTop: "10px" }} />

                <Grid spacing={3} style={{ margin: "10px", padding: "10px" }}>
                    <Typography style={{ marginBottom: "20px" }} variant='h4'>Client: Aman</Typography>
                    <Grid container xs={12} md={12} lg={12}>
                        <Grid xs={12} md={4} lg={4}>
                            <Typography style={{ color: "gray" }} variant='h4'><span style={{ color: "black" }}>Address:</span> AU Hostel</Typography>
                        </Grid>
                        <Grid xs={12} md={4} lg={4}>
                            <Typography style={{ color: "gray" }} variant='h4'><span style={{ color: "black" }}>Email:</span> aman@gmail.com</Typography>
                        </Grid>
                        <Grid xs={12} md={4} lg={4}>
                            <Typography style={{ color: "gray" }} variant='h4'><span style={{ color: "black" }}>Phone:</span> +917974392752</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider orientation='horizontal' style={{ marginTop: "10px" }} />
                <Grid spacing={3} style={{ margin: "10px", padding: "10px" }}>
                    <Grid container xs={12} md={12} lg={12}>
                        <Grid container xs={12} md={12} lg={12}>
                            <Grid direction="row" xs={12} md={6} lg={6}>
                                <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>Payment Information :</Typography>
                            </Grid>
                            <Grid direction="row" style={{ display: "flex", justifyContent: "end" }} xs={12} md={6} lg={6}>
                                <Button style={{ margin: "5px", color: "black", borderColor: "black", alignItems: 'end' }} variant='outlined'><AiOutlineExport style={{ marginBottom: '6px', marginRight: "5px" }} />Show Invoice</Button>
                            </Grid>


                        </Grid>
                        <Grid container direction='row' xs={12} md={6} lg={6}>
                            <Grid xs={12} md={3} lg={3}>
                                <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>Amount: </Typography>
                                <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>Total : </Typography>
                                <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>Total Paid :</Typography>
                                <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>Total Remaining :</Typography>

                            </Grid>
                            <Grid xs={12} md={2} lg={2}>
                                <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>$ 6.90</Typography>
                                <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>$ 6.90</Typography>
                                <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>$ 6.90</Typography>
                                <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>$ 0.00</Typography>

                            </Grid>
                        </Grid>


                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default ShowPayment