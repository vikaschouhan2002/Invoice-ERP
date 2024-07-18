import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { Button } from '@mui/material'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Divider } from '@mui/material';
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { getDataAPI } from 'hooks/getAPI';

function ShowInvoice() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);

    const getInvoiceById = async (id) => {
        try {
            const response = await getDataAPI("invoice", `getInvoiceById/${id}`);
            const invoice = response.data.invoiceData;
            console.log('Invoice:', invoice);
            setInvoiceData(invoice);
        } catch (error) {
            console.error(`Error fetching invoice with ID ${id}`, error);
        }
    };
    useEffect(() => {
        getInvoiceById(id);
    }, [id]);

    return (
        <>
            <Card>
                <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                    <Grid item style={{ display: 'flex', justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Button onClick={() => { navigate("/dashboard/invoice") }} size='small' style={{ margin: "9px", color: "black" }}><AiOutlineArrowLeft /></Button>
                        <Typography style={{ margin: "9px", marginLeft: "-15px" }} variant='h5'>Invoice # {invoiceData?.invoiceNumber}/{invoiceData?.year}
                        </Typography>
                        <Button size='small' variant='outlined' style={{ color: "black", borderColor: "black", margin: "5px" }}> {invoiceData?.status}</Button>
                        <Button size='small' variant='outlined' style={{ color: "black", borderColor: "black", margin: "5px" }}> {invoiceData?.payment ? invoiceData?.payment : '---'}</Button>

                    </Grid>
                    <Grid item xs={12} md={8} lg={8} style={{ display: 'flex', justifyContent: "end", alignItems: "end", textAlign: "end", }}>
                        <Button onClick={() => { navigate("/dashboard/invoice") }} style={{ margin: "5px", color: "black", borderColor: "black", }} variant='outlined'><AiOutlineCloseCircle style={{ margin: '3px', marginLeft: "-3px" }} /> Close</Button>
                        <Button style={{ margin: "5px", color: "black", borderColor: "black", }} variant='outlined'><AiOutlineFilePdf style={{ margin: '3px', marginLeft: "-3px" }} /> Download Pdf</Button>
                        <Button style={{ margin: "5px", color: "black", borderColor: "black", }} variant='outlined'><AiOutlineMail style={{ margin: '3px', marginLeft: "-3px" }} /> Send By Email</Button>
                        <Button onClick={() => { navigate("/dashboard/invoice/update/1") }} style={{ margin: "5px" }} variant='contained'><AiOutlineEdit style={{ margin: '3px', marginLeft: "-3px" }} /> Edit</Button>
                    </Grid>
                </Grid>

                <Grid spacing={2} style={{ margin: "10px", padding: "10px" }}>
                    <Grid container xs={12} md={8} lg={8}>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "gray" }} variant='h4'>Status</Typography>
                            <Typography variant='h2'>{invoiceData?.status}</Typography>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "gray" }} variant='h4'>Subtotal</Typography>
                            <Typography variant='h2'>${invoiceData?.subTotal}</Typography>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "gray" }} variant='h4'>Total</Typography>
                            <Typography variant='h2'>${invoiceData?.total}</Typography>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "gray" }} variant='h4'>Paid</Typography>
                            <Typography variant='h2'>${invoiceData?.paid ? invoiceData.paid : 0.0}</Typography>
                        </Grid>

                    </Grid>
                </Grid>
                <Divider orientation='horizontal' style={{ marginTop: "10px" }} />

                <Grid spacing={3} style={{ margin: "10px", padding: "10px" }}>
                    <Typography style={{ marginBottom: "20px" }} variant='h4'>Client:  {invoiceData?.client?.Type == 'People' ? invoiceData?.client?.People?.First_Name + " " + invoiceData?.client?.People?.Last_Name : invoiceData?.client?.Company?.Country}</Typography>
                    <Grid container xs={12} md={12} lg={12}>
                        <Grid xs={12} md={4} lg={4}>
                            <Typography style={{ color: "gray" }} variant='h4'><span style={{ color: "black" }}>Address: </span>{invoiceData?.client?.Type == 'People' ? invoiceData?.client?.People?.Country : invoiceData?.client?.Company?.Name}</Typography>
                        </Grid>
                        <Grid xs={12} md={4} lg={4}>
                            <Typography style={{ color: "gray" }} variant='h4'><span style={{ color: "black" }}>Email: </span>{invoiceData?.client?.Type == 'People' ? invoiceData?.client?.People?.Email : invoiceData?.client?.Company?.Email}</Typography>
                        </Grid>
                        <Grid xs={12} md={4} lg={4}>
                            <Typography style={{ color: "gray" }} variant='h4'><span style={{ color: "black" }}>Phone: </span>{invoiceData?.client?.Type == 'People' ? invoiceData?.client?.People?.Phone : invoiceData?.client?.Company?.Phone}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider orientation='horizontal' style={{ marginTop: "10px" }} />

                <Grid spacing={3} style={{ margin: "10px", padding: "10px" }}>
                    <Grid container xs={12} md={12} lg={12}>
                        <Grid xs={12} md={6} lg={6}>
                            <Typography style={{ color: "black" }} variant='h4'>Product</Typography>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "black" }} variant='h4'>Price</Typography>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "black" }} variant='h4'>Quantity</Typography>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "black" }} variant='h4'>Total</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider orientation='horizontal' style={{ marginTop: "10px" }} />
                {invoiceData?.itemList.map((item, index) => (
                    <>
                        <Grid spacing={3} style={{ margin: "10px", padding: "10px" }}>
                            <Grid container xs={12} md={12} lg={12} key={index}>
                                <Grid xs={12} md={6} lg={6}>
                                    <Typography style={{ color: "gray", fontWeight: "400" }} variant='h4'><span style={{ color: "black", fontWeight: "600" }}>{item.item}</span><br />{item.description}</Typography>
                                </Grid>
                                <Grid xs={12} md={2} lg={2}>
                                    <Typography style={{ color: "black" }} variant='h4'>${item.price}</Typography>
                                </Grid>
                                <Grid xs={12} md={2} lg={2}>
                                    <Typography style={{ color: "black" }} variant='h4'>{item.quantity}</Typography>
                                </Grid>
                                <Grid xs={12} md={2} lg={2}>
                                    <Typography style={{ color: "black" }} variant='h4'>${item.total}</Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Divider orientation='horizontal' style={{ marginTop: "10px" }} />
                    </>
                ))}
                <Grid spacing={3} style={{ margin: "10px", padding: "10px" }}>
                    <Grid container xs={12} md={12} lg={12}>
                        <Grid xs={12} md={6} lg={6}>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "black", }} variant='h4'>Sub Total : </Typography>
                            <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>Tax Total ({invoiceData?.tax?.Value}%) :</Typography>
                            <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>Total : </Typography>

                        </Grid>
                        <Grid xs={12} md={2} lg={2}>
                            <Typography style={{ color: "black" }} variant='h4'>$ {invoiceData?.subTotal}</Typography>
                            <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'> $ {invoiceData?.taxValue}</Typography>
                            <Typography style={{ color: "black", marginTop: "10px" }} variant='h4'>$ {invoiceData?.total}</Typography>


                        </Grid>

                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default ShowInvoice