import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import { Button, Divider, Select, MenuItem, Typography, FormControl, FormLabel, TextField, TextareaAutosize } from '@mui/material';
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import InputAdornment from '@mui/material/InputAdornment';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import Swal from 'sweetalert2';
import { getDataAPI } from 'hooks/getAPI';

export default function ExpenseDrawer(props) {
    const { setRowData , fetchData, open, handleClose, mode, data } = props;
    console.log("mode : ",mode);
    const [data1 , setData1] = useState({});
    const [categoryData , setCategoryData] = useState([]);
    const [currencyData , setCurrencyData] = useState([]);

    const getData2 = (e)=>{
        if(mode === 'edit'){
            setRowData({...data,[e.target.name]:e.target.value});
            console.log("data : ",data);
        }
        else{
            setData1({...data1,[e.target.name]:e.target.value});
            console.log("data1 : ",data);
        }
    }

    const fetchData1 = async()=>{
        try{
            const response1 = await getDataAPI("expensecategory","getExpenseCategory");
            const response2 = await getDataAPI("currency","getCurrencies");

            if(response1.status === 200 && response2.status === 200){
                console.log("respnse 1 : ",response1);
                console.log("respnse 2 : ",response2);
                setCurrencyData(response2.data.currencyData);
                setCategoryData(response1.data.expensecategory);
            }
        }catch(error){
            console.log("error : ",error);
        }
    }

    const handleSubmit2 = async(e) =>{
        try{
            e.preventDefault();
            const response = await axios.put(`${backendURL}/expenses/updateExpense/${data._id}`,data);
            if(response.status===200){
                Swal.fire({icon:'success',text:'Expense Updated',timer:3000});
                fetchData();
                handleClose();
            }
            else if(response.status === 204){
                Swal.fire({icon:'error',text:'data not found',timer:3000});
            }
        }catch(error){
            console.log("error : ",error);
            Swal.fire({icon:'error',text:'Error while updating data',timer:3000});
        }
    }
    
    const handleSubmit = async(e) =>{
        try{
            e.preventDefault();
            const response = await axios.post(`${backendURL}/expenses/addExpense`,data1);
            if(response.status===201){
                Swal.fire({icon:'success',text:'Expense Added',timer:3000});
                fetchData();
                handleClose();
            }
        }catch(error){
            console.log("error : ",error);
            Swal.fire({icon:'error',text:'Error while updating data',timer:3000});
        }
    }

    useEffect(()=>{
         fetchData1();
    },[]);
    return (
        <div>
            
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer anchor={anchor} open={open} onClose={handleClose}>
                        <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '10px' }}>
                            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                            <Typography variant='h3' style={{ marginLeft: '10px' }}> Expense </Typography>
                        </Grid>
                        <Divider orientation='horizontal' style={{ marginTop: '10px' }} />
                        <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px" }}>
                            {/* <TextField variant='outlined' placeholder='Enter a search ' /> */}
                            <FormControl fullWidth style={{ margin: "10px", width: "200px" }}>
                                <Select id="search" name="search" size="small" fullWidth >
                                    <MenuItem value="Website Referrals">Website Referrals</MenuItem>
                                    <MenuItem value="Advertising">Advertising </MenuItem>
                                    <MenuItem value="Social Media">Social Media </MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant='outlined' style={{ margin: "10px" }}>+</Button>
                        </Grid>
                        {mode === "show" ? <Grid style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: '15px', padding: "5px" }}>
                            <Typography variant='h5' style={{ margin: "10px", paddingTop: "6px" }}> {data.name}</Typography>
                            <Button variant='text' style={{ margin: "10px" }}><AiTwotoneEdit style={{ margin: "5px" }} /> Edit</Button>
                            <Button variant='text' style={{ margin: "10px" }}><AiOutlineDelete style={{ margin: "5px" }} /> Remove</Button>
                        </Grid> : null}
                        <Divider orientation='horizontal' style={{ marginTop: '10px' }} />
                        {mode === "show" ? <>
                            <Grid style={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                <Typography variant='h5' style={{ margin: "10px" }}>Name : {data.Name}</Typography>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                <Typography variant='h5' style={{ margin: "10px" }}>Expense Category : {data.Category_Name}</Typography>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                <Typography variant='h5' style={{ margin: "10px" }}>Currency : {data.Currency_Name}</Typography>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                <Typography variant='h5' style={{ margin: "10px" }}>Total :  {data.Total}</Typography>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                <Typography variant='h5' style={{ margin: "10px" }}>Description :  {data.Description}</Typography>
                            </Grid>
                            <Grid style={{ display: "flex", justifyContent: "center", width: "100%", }}>
                                <Typography variant='h5' style={{ margin: "10px" }}>Reference :  {data.Ref}</Typography>
                            </Grid>
                        </> : null}
                        <Button variant='outlined' style={{ margin: "10px" }} >ADD NEW EXPENSE</Button>
                        {mode === "add" ?
                            <form method='post' onSubmit={handleSubmit}>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Name</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField id="name" name="Name" label="" onChange={(e)=>{getData2(e)}} size="small" maxRows={10} fullWidth required/>
                                </Grid>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Expense Category</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <FormControl fullWidth>
                                        <Select id="expenseCategory" name="Expense_Category" onChange={(e)=>{getData2(e)}} size="small" fullWidth placeholder='Search Here'>                                            
                                            {
                                                categoryData.map((category,index)=>{
                                                    return(
                                                         <MenuItem value={category._id} key={index}>{category.Name}</MenuItem>   
                                                        )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Expense Category</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <FormControl fullWidth>
                                        <Select id="expenseCategory" name="Currency" size="small" onChange={(e)=>{getData2(e)}} fullWidth placeholder='Search Here'>                                            
                                            {   
                                                currencyData.map((currency,index)=>{
                                                    return(
                                                        <MenuItem value={currency._id} key={index}>{currency.Currency_Name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Total</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField id="total" name="Total" label="" onChange={(e)=>{getData2(e)}} size="small" maxRows={10} fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        required
                                    />
                                </Grid>
                                <FormLabel style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Description</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField id="description" name="Description" onChange={(e)=>{getData2(e)}} label="" size="small" maxRows={10} fullWidth/>
                                </Grid>
                                <FormLabel style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Reference</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField id="reference" name="Ref" label="" onChange={(e)=>{getData2(e)}} size="small" maxRows={10} fullWidth />
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Submit</Button>
                                </Grid>
                            </form> : null}
                        {mode === "edit" ?
                            <form method='post' onSubmit={handleSubmit2}>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Name</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField id="name" name="Name" label="" size="small" maxRows={10} fullWidth required onChange={(e)=>{getData2(e)}} defaultValue={data.Name} />
                                </Grid>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Expense Category</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <FormControl fullWidth>
                                        <Select id="expenseCategory" name="Expense_Category" size="small" onChange={(e)=>{getData2(e)}} fullWidth placeholder='Search Here' defaultValue={data.Expense_Category}>
                                            {
                                                categoryData.map((category,index)=>{
                                                    return(
                                                        <MenuItem key={index} value={category._id}>{category.Name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Expense Category</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <FormControl fullWidth>
                                        <Select id="expenseCategory" name="Currency" size="small" onChange={(e)=>{getData2(e)}} fullWidth placeholder='Search Here' defaultValue={data.Currency}>
                                            {
                                                currencyData.map((currency,index)=>{
                                                    return(
                                                        <MenuItem key={index} value={currency._id}>{currency.Currency_Name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <FormLabel required style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Total</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField id="total" name="Total" label="" size="small" onChange={(e)=>{getData2(e)}} maxRows={10} fullWidth defaultValue={data.Total} required
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <FormLabel style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Description</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField id="description" name="Description" label="" size="small" onChange={(e)=>{getData2(e)}} maxRows={10} fullWidth defaultValue={data.Description} />
                                </Grid>
                                <FormLabel style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '5px', padding: "5px" }}>Reference</FormLabel>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <TextField id="reference" name="Ref" label="" size="small" onChange={(e)=>{getData2(e)}} maxRows={10} fullWidth defaultValue={data.Ref}/>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Save</Button>
                                    <Button variant='outlined' type='reset' onClick={()=>{handleClose();}} style={{ margin: "10px" }}>Cancel</Button>
                                </Grid>
                            </form> : null}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}