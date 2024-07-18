import React from 'react'
import { FormControl, FormLabel, Grid, Select, TextField, MenuItem, Switch, Button } from '@mui/material'


function CompanySettingForm() {
    return (
        <form encType="multipart/form-data">
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Mutli Branch:
                    </FormLabel>
                    <Switch required />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company Name: </FormLabel>
                    <TextField name="companyName" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company Address
                        : </FormLabel>
                    <TextField name="companyAddress" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company State
                        : </FormLabel>
                    <TextField name="companyState" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company Country
                        : </FormLabel>
                    <TextField name="companyCountry" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company Email
                        : </FormLabel>
                    <TextField name="companyEmail" type="email" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company Phone
                        : </FormLabel>
                    <TextField name="companyPhone" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company Cell
                        : </FormLabel>
                    <TextField name="companyCell" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company Website
                        : </FormLabel>
                    <TextField name="companyWebsite" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company Tax Number
                        : </FormLabel>
                    <TextField name="companyTaxNumber" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company Vat Number
                        : </FormLabel>
                    <TextField name="companyVatNumber" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Company Reg Number
                        : </FormLabel>
                    <TextField name="companyRegNumber" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >

                    <Button style={{ margin: "5px" }} variant="contained" color="primary" type="submit">Save</Button>
                    <Button style={{ margin: "5px" }} variant="outlined" color="primary" >Cancel</Button>

                </Grid>
            </Grid>
        </form>
    )
}

export default CompanySettingForm