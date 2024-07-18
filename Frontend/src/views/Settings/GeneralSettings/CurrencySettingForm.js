import React from 'react'
import { FormControl, FormLabel, Grid, Select, TextField, MenuItem, Switch, Button } from '@mui/material'
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import { useNavigate } from 'react-router';

function CurrencySettingForm() {
    const [currencyData,setCurrencyData] = useState({});
    const navigate = useNavigate();
    const getData = (e)=>{
        const {name,value} = e.target;
        if(name==="Enabled"){
            setCurrencyData({...currencyData,[name]:!e.target.defaultChecked});
            document.getElementById("enabled").defaultChecked = !e.target.defaultChecked;
        }
        else if(name==="Zero_Format"){
            setCurrencyData({...currencyData,[name]:!e.target.defaultChecked});
            document.getElementById("zero_format").defaultChecked = !e.target.defaultChecked;
        }
        else{
            setCurrencyData({...currencyData,[name]:value});
        }
        console.log("currencyData : ",currencyData);
    }

    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            console.log("currencyData : ",currencyData);
            const response = await axios.post(`${backendURL}/currency/addCurrency`,currencyData);
            if(response.status===201){
                Swal.fire({icon:'success',text:'currency added',timer:3000});
                navigate("/dashboard/settings/currency");
            }
        }catch(error){
            console.log("error : ",error);
            Swal.fire({icon:'error',text:'error while adding data',timer:3000});
        }
    }

    return (
        <form method='post' onSubmit={handleSubmit}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Currency Name: </FormLabel>
                    <TextField name="Currency_Name" type="text" size="small" onChange={(e)=>{getData(e)}} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Currency Symbol: </FormLabel>
                    <TextField name="Currency_Symbol" type="text" size="small" onChange={(e)=>{getData(e)}} fullWidth required></TextField>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <FormControl fullWidth>
                        <FormLabel required>Currency Position: </FormLabel>
                        <Select required name="Currency_Position" size="small" onChange={(e)=>{getData(e)}} >
                            <MenuItem value="Before">Before</MenuItem>
                            <MenuItem value="After">After</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Decimal Separator: </FormLabel>
                    <TextField name="Decimal_Separator" type="text" size="small" onChange={(e)=>{getData(e)}} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Thousand Separator: </FormLabel>
                    <TextField name="Thousand_Separator" type="text" size="small" onChange={(e)=>{getData(e)}} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Cent Precision: </FormLabel>
                    <TextField name="Cent_Precision" type="number" size="small" onChange={(e)=>{getData(e)}} fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Zero Format: </FormLabel>
                    <Switch name="Zero_Format" id='zero_format' onChange={(e)=>{getData(e)}} required></Switch>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Enabled: </FormLabel>
                    <Switch name="Enabled"  id='enabled' onChange={(e)=>{getData(e)}} required></Switch>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Button style={{ margin: "5px" }} variant="contained" color="primary" type="submit">Save</Button>
                    <Button style={{ margin: "5px" }} variant="outlined" color="primary" >Cancel</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default CurrencySettingForm