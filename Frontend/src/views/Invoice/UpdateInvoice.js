import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { TextField, Select, Divider, FormControl, MenuItem, FormLabel, InputAdornment } from '@mui/material';
import { getDataAPI } from 'hooks/getAPI';
import { putDataAPI } from 'hooks/putAPI';
import { authenticate } from 'hooks/authAPI';

function UpdateInvoice() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [clientData, setClientData] = useState([]);
    const [taxData, setTaxData] = useState([]);
    const [formData, setFormData] = useState({
        createdBy: '',
        client: '',
        invoiceNumber: '',
        year: '',
        status: '',
        note: '',
        startDate: '',
        expiryDate: '',
        itemList: [{ item: '', description: '', quantity: '', price: '', total: '' }],
        tax: '',
        taxValue: 0,
        subTotal: 0,
        total: 0
    });


    const checkAuthentic = async () => {
        const response = await authenticate();
        if (!response) {
            navigate('/pages/login/login3');
        }
        setFormData({ ...formData, createdBy: response?.data?.data?._id });
    }

    const getInvoiceById = async (id) => {
        try {
            const response = await getDataAPI("invoice", `getInvoiceById/${id}`);
            const invoice = response.data.invoiceData;
            console.log('Invoice:', invoice);
            setFormData(invoice);
        } catch (error) {
            console.error(`Error fetching invoice with ID ${id}`, error);
        }
    };

    const getClient = async () => {
        try {
            const response = await getDataAPI("client", "getClient");
            if (response.status === 200)
                setClientData(response.data.clientData);
        } catch (error) {
            console.log("error : ", error);
        }
    }

    const getTax = async () => {
        try {
            const response = await getDataAPI("tax", "getTax");
            if (response.status === 200) {
                setTaxData(response.data.taxData);
            }
        } catch (error) {
            console.log("error : ", error);
        }
    }

    useEffect(() => {
        getInvoiceById(id);
        checkAuthentic();
        getClient();
        getTax();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('handleSubmit === ', formData);
            const response = await putDataAPI('invoice', `updateInvoice/${id}`, formData);
            if (response.status === 200) {
                navigate('/dashboard/invoice');
            } else {
                console.error('Error creating invoice:', response.data.error);
            }
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log('formData', formData);
    };


    const handleChangeItemValue = (event, index) => {
        const { name, value } = event.target;
        const updatedItemList = [...formData.itemList];
        let total = 0;
        if (name === 'quantity' || name === 'price') {
            updatedItemList[index][name] = value;
            const quantity = parseFloat(updatedItemList[index].quantity || 0);
            const price = parseFloat(updatedItemList[index].price || 0);
            total = quantity * price;
            updatedItemList[index].total = total.toFixed(2);
        } else {
            updatedItemList[index][name] = value;
        }
        const subTotal = calculateSubTotal(updatedItemList);
        setFormData({ ...formData, itemList: updatedItemList, subTotal: subTotal.toFixed(2) });
    };


    const handleTaxChange = (event) => {
        const selectedTaxId = event.target.value;
        const selectedTax = taxData.find((tax) => tax._id === selectedTaxId);
        if (selectedTax) {
            const taxValue = (formData.subTotal * selectedTax.Value) / 100;
            const total = (parseFloat(formData.subTotal) + parseFloat(taxValue)).toFixed(2);
            setFormData({
                ...formData,
                tax: selectedTaxId,
                taxValue: taxValue.toFixed(2),
                total: total
            });
        }
    };

    const calculateSubTotal = (itemList) => {
        return itemList.reduce((acc, item) => {
            console.log(item);
            return acc + parseFloat(item.total || 0);
        }, 0);
    };



    const handleAddItem = () => {
        setFormData({
            ...formData,
            itemList: [...formData.itemList, { item: '', description: '', quantity: '', price: '', total: '' }],
        });
    };

    const handleRemoveItem = (index) => {
        const updatedItemList = [...formData.itemList];
        updatedItemList.splice(index, 1);
        const subTotal = calculateSubTotal(updatedItemList);
        const selectedTax = taxData.find((tax) => tax._id === formData.tax);
        const taxValue = selectedTax ? (subTotal * selectedTax.Value) / 100 : 0;
        const total = (parseFloat(formData.subTotal) + parseFloat(taxValue)).toFixed(2);

        setFormData({ ...formData, itemList: updatedItemList, subTotal: subTotal.toFixed(2), taxValue: taxValue, total: total });
    };


    return (
        <>
            <Card >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} paddingTop={2} style={{ marginBottom: "20px" }}>
                        <Grid item style={{ display: 'flex', justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Button onClick={() => { navigate("/dashboard/invoice") }} size='small' style={{ margin: "9px", color: "black" }}><AiOutlineArrowLeft /></Button>
                            <Typography style={{ margin: "9px", marginLeft: "-15px" }} variant='h5'>New</Typography>
                            <Button size='small' variant='outlined' style={{ color: "black", borderColor: "black", margin: "5px" }}> Draft</Button>
                        </Grid>
                        <Grid item xs={9} style={{ display: 'flex', justifyContent: "end", alignItems: "end", textAlign: "end", }}>
                            <Button onClick={() => { navigate("/dashboard/invoice") }} style={{ margin: "5px", color: "black", borderColor: "black", }} variant='outlined'><AiOutlineCloseCircle style={{ margin: '3px', marginLeft: "-3px" }} /> Cancel</Button>
                            <Button type='submit' style={{ margin: "5px" }} variant='contained'><AiOutlinePlus style={{ margin: '3px', marginLeft: "-3px" }} /> Save</Button>
                        </Grid>
                    </Grid>
                    <Divider orientation='horizontal' />
                    <Grid container spacing={3} style={{ display: "flex", justifyContent: "space-between", padding: "10px", }}>
                        <Grid item xs={12} md={3} lg={3}>
                            <FormLabel required>Client</FormLabel>
                            <FormControl fullWidth>
                                <Select id="client" name="client" size="small" fullWidth value={formData.client} onChange={handleChange} >
                                    {
                                        (clientData.length > 0) ?
                                            clientData.map((client, index) => {
                                                return (<MenuItem value={client._id} key={index + 1}>{client.Name}</MenuItem>)
                                            })
                                            :
                                            <MenuItem value="">No People Found</MenuItem>
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3} lg={3}>
                            <FormLabel required >Number</FormLabel>
                            <FormControl fullWidth>
                                <TextField name="invoiceNumber" type='number' value={formData.invoiceNumber} onChange={handleChange} size="small" fullWidth />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3} lg={3}>
                            <FormLabel required>Year</FormLabel>
                            <FormControl fullWidth>
                                <TextField name="year" type='text' size="small" fullWidth value={formData.year} onChange={handleChange} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3} lg={3}>
                            <FormLabel>Status</FormLabel>
                            <FormControl fullWidth>
                                <Select id="status" name="status" size="small" fullWidth value={formData.status} onChange={handleChange}>
                                    <MenuItem value="Draft">Draft</MenuItem>
                                    <MenuItem value="Sent">Sent</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between", padding: "10px", }}>
                        <Grid item xs={12} md={4} lg={4}>
                            <FormLabel>Note</FormLabel>
                            <FormControl fullWidth>
                                <TextField name="note" type='text' size="small" fullWidth value={formData.note} onChange={handleChange} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <FormLabel required>Date</FormLabel>
                            <FormControl fullWidth>
                                <TextField name="startDate" type='date' size="small" fullWidth value={formData.startDate} onChange={handleChange} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={4} lg={4}>
                            <FormLabel required>Expire Date</FormLabel>
                            <TextField name="expiryDate" type='date' size="small" fullWidth value={formData.expiryDate} onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Divider orientation='horizontal' />
                    {
                        formData.itemList.map((item, index) => {
                            return (
                                <>
                                    <Grid container spacing={3} key={index} style={{ display: "flex", justifyContent: "space-evenly", padding: "10px" }}>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <FormLabel  >Item</FormLabel>
                                            <FormControl fullWidth>
                                                <TextField name="item" type="text" size="small" value={item.item} onChange={(e) => handleChangeItemValue(e, index)} fullWidth />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={3} lg={3}>
                                            <FormLabel  >Description</FormLabel>
                                            <FormControl fullWidth>
                                                <TextField name="description" type="text" size="small" value={item.description} onChange={(e) => { handleChangeItemValue(e, index) }}
                                                    fullWidth />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <FormLabel>Quantity</FormLabel>
                                            <FormControl fullWidth>
                                                <TextField name="quantity" type="number" size="small" value={item.quantity} onChange={(e) => { handleChangeItemValue(e, index) }}
                                                    fullWidth />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl fullWidth>
                                                <TextField name="price" type="number" size="small" value={item.price} onChange={(e) => { handleChangeItemValue(e, index) }}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={2} lg={2}>
                                            <FormLabel>Total</FormLabel>
                                            <FormControl fullWidth>
                                                <TextField name="total" type="number" size="small" aria-readonly={true} value={(item.total)} onChange={(e) => { handleChangeItemValue(e, index) }}
                                                    fullWidth
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={1} lg={1} >
                                            <Button onClick={() => { handleRemoveItem(index) }} size='small' style={{ marginTop: "25px", }} variant="text" startIcon={<DeleteIcon />}>
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </>
                            )
                        })
                    }

                    <Grid spacing={3} style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px", }}>
                        <Grid item xs={12}>
                            <Button onClick={handleAddItem} style={{ color: "black", border: "1px ddotted black" }} variant='text'><AiOutlinePlus style={{ margin: "5px" }} /> Add Field</Button>
                        </Grid>
                    </Grid>
                    <Grid>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: "10px" }}>
                        <Grid item xs={12} md={6} lg={6} >
                            <Button type='submit' style={{ border: "1px ddotted black" }} variant='contained'><AiOutlinePlus style={{ margin: "3px" }} /> Save</Button>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}  >
                            <Grid container spacing={2} paddingBottom={2} >
                                <Grid item xs={12} md={6} lg={6} style={{ display: "flex", justifyContent: "end", alignItems: "center", }}>
                                    <FormLabel  >Sub Total: </FormLabel>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} >
                                    <TextField name="subTotal" type='number' size="small"
                                        fullWidth InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }} value={formData.subTotal} onChange={handleChange} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} paddingBottom={2} >
                                <Grid item xs={12} md={6} lg={6} >
                                    <FormControl fullWidth>
                                        <Select id="tax" name="tax" size="small" fullWidth value={formData.tax} onChange={handleTaxChange}>
                                            {taxData.length > 0 ? (
                                                taxData.map((tax) => (
                                                    <MenuItem key={tax._id} value={tax._id}>
                                                        {tax.Name}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">No Tax Found</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} >
                                    <TextField name="taxValue" type='number' size="small" aria-readonly={true}
                                        fullWidth InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }} value={formData.taxValue} onChange={handleChange} />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} paddingBottom={2}>
                                <Grid item xs={12} md={6} lg={6} style={{ display: "flex", justifyContent: "end", alignItems: "center", }} >
                                    <FormLabel  >Total: </FormLabel>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} >
                                    <TextField name="total" type='number' size="small"
                                        fullWidth InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }} value={formData.total} onChange={handleChange} />
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </form>
            </Card>
        </>
    )
}

export default UpdateInvoice