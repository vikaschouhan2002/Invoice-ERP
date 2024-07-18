import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { Button } from '@mui/material'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    TextField,
    Select,
    Divider,
    FormControl,
    MenuItem,
    FormLabel,
    InputAdornment
} from '@mui/material';
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector , useDispatch } from 'react-redux'
import { useEffect } from 'react'

function CreateQuote() {
    const data = useSelector((state)=>{state?.store?.Admin_Data});
    // console.log("data : ",data);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [itemList, setItemsList] = useState([{ item: "", description: "", quantity: "", price: "", total: "" }]);

    const handleAddItem = () => {
        setItemsList([...itemList, { item: "", description: "", quantity: "", price: "", total: "" }])
    }
    const handleRemoveItem = (index) => {
        console.log("index", index)
        if (itemList.length > 1) {
            const list = [...itemList];
            list.splice(index, 1)
            setItemsList(list);
        }
    }

    const handleChangeValue = (event, index) => {
        const { name, value } = event.target
        const list = [...itemList];
        list[index][name] = value
        setItemsList(list)
        console.log(itemList)
    }
    
    useEffect(()=>{
        const checkAuthentic = async()=>{
        const response = authenticate();
            if(!response){
                navigate('/pages/login/login3');
            }
            else if(response.status === 201){
                Cookies.set("Admin_Token",response.data.token,{expires:7});
                dispatch({type:"@customization/SET_ADMIN_DATA",data});
            }
            else if(response.status === 203){
                Swal.fire({
                    icon:'error',
                    text:'Token is expired',
                    timer:3000
                });
                navigate('/pages/login/login3');
            }
            else if(response.status === 206){
                Swal.fire({
                    icon:'error',
                    text:'your account not enabled',
                    timer:3000
                });
                navigate('/pages/login/login3');
            }
        }
        checkAuthentic();
    },[]);
    return (
        <>
            <Card>
                <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                    <Grid item style={{ display: 'flex', justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Button onClick={() => { navigate("/dashboard/quote") }} size='small' style={{ margin: "9px", color: "black" }}><AiOutlineArrowLeft /></Button>
                        <Typography style={{ margin: "9px", marginLeft: "-15px" }} variant='h5'>New</Typography>
                        <Button size='small' variant='outlined' style={{ color: "black", borderColor: "black", margin: "5px" }}> Draft</Button>
                    </Grid>
                    <Grid item xs={9} style={{ display: 'flex', justifyContent: "end", alignItems: "end", textAlign: "end", }}>
                        <Button onClick={() => { navigate("/dashboard/quote") }} style={{ margin: "5px", color: "black", borderColor: "black", }} variant='outlined'><AiOutlineCloseCircle style={{ margin: '3px', marginLeft: "-3px" }} /> Cancel</Button>
                        <Button style={{ margin: "5px" }} variant='contained'><AiOutlinePlus style={{ margin: '3px', marginLeft: "-3px" }} /> Save</Button>
                    </Grid>
                </Grid>
                <Divider orientation='horizontal' />
                <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between", padding: "10px", }}>
                    <Grid item xs={12} md={3} lg={3}>
                        <FormLabel required>Client</FormLabel>
                        <FormControl fullWidth>
                            <Select
                                id="client"
                                name="client"
                                size="small"
                                fullWidth
                                placeholder='Search Here'
                            >
                                <MenuItem value="5555555">55test</MenuItem>
                                <MenuItem value="1235686">123test</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3} lg={3}>
                        <FormLabel required >Number</FormLabel>
                        <FormControl fullWidth>

                            <TextField name="number" type='number' size="small"
                                fullWidth />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3} lg={3}>
                        <FormLabel required>Year</FormLabel>
                        <FormControl fullWidth>
                            <TextField name="number" type='number' size="small"
                                fullWidth />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3} lg={3}>
                        <FormLabel>Status</FormLabel>
                        <FormControl fullWidth>
                            <Select
                                id="status"
                                name="status"
                                size="small"
                                fullWidth
                            >
                                <MenuItem value="Draft">Draft</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Sent">Sent</MenuItem>
                                <MenuItem value="Accepted">Accepted</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between", padding: "10px", }}>
                    <Grid item xs={12} md={4} lg={4}>
                        <FormLabel  >Note</FormLabel>
                        <FormControl fullWidth>

                            <TextField name="note" type='text' size="small"
                                fullWidth />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <FormLabel required>Date</FormLabel>
                        <FormControl fullWidth>
                            <TextField name="date" type='date' size="small"
                                fullWidth />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <FormLabel required>Expire Date</FormLabel>
                        <TextField name="expireDate" type='date' size="small"
                            fullWidth />
                    </Grid>
                </Grid>

                {
                    itemList.map((item, index) => {
                        return (
                            <>
                                <Grid container spacing={3} style={{ display: "flex", justifyContent: "space-evenly", padding: "10px" }}>
                                    <Grid key={index} item xs={12} md={2} lg={2}>
                                        <FormLabel  >Item</FormLabel>
                                        <FormControl fullWidth>
                                            <TextField name="item" type="text" size="small" value={item.item} onChange={(e) => { handleChangeValue(e, index) }}
                                                fullWidth />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3} lg={3}>
                                        <FormLabel  >Description</FormLabel>
                                        <FormControl fullWidth>
                                            <TextField name="description" type="text" size="small" value={item.description} onChange={(e) => { handleChangeValue(e, index) }}
                                                fullWidth />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={2} lg={2}>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl fullWidth>
                                            <TextField name="quantity" type="number" size="small" value={item.quantity} onChange={(e) => { handleChangeValue(e, index) }}
                                                fullWidth />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={2} lg={2}>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl fullWidth>
                                            <TextField name="price" type="number" size="small" value={item.price} onChange={(e) => { handleChangeValue(e, index) }}
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
                                            <TextField name="total" type="number" size="small" value={item.total} onChange={(e) => { handleChangeValue(e, index) }}
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
                        <Button style={{ border: "1px ddotted black" }} variant='contained'><AiOutlinePlus style={{ margin: "3px" }} /> Save</Button>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}  >
                        <FormLabel  >Sub Total: </FormLabel>
                        <TextField name="subTotal" type='number' size="small"
                            fullWidth InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }} />

                        <FormControl style={{ marginTop: "10px" }} fullWidth>
                            <Select
                                id="tax"
                                name="tax"
                                size="small"
                                fullWidth
                            >
                                <MenuItem value="" disabled selected>Select a Tax</MenuItem>
                                <MenuItem value="Test Tax">Test Tax</MenuItem>


                            </Select>
                        </FormControl>
                        <TextField style={{ marginTop: "10px" }} name="taxValue" type='number' size="small"
                            fullWidth InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }} />

                        <FormLabel  >Total: </FormLabel>
                        <TextField name="subTotal" type='number' size="small"
                            fullWidth InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }} />
                    </Grid>

                </Grid>

            </Card>
        </>
    )
}

export default CreateQuote