import React from 'react'
import { FormControl, FormLabel, Grid, Select, TextField, MenuItem, Switch, Button } from '@mui/material'


function FinanceSettingForm() {
    return (
        <form encType="multipart/form-data">
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Last Invoice Number:
                    </FormLabel>
                    <TextField name="lastInvoiceNumber" type="number" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Last Quote Number: </FormLabel>
                    <TextField name="lastQuoteNumber" type="number" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Last Offer Number: </FormLabel>
                    <TextField name="lastOfferNumber" type="number" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Last Payment Number: </FormLabel>
                    <TextField name="lastPaymentNumber" type="number" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Invoice Prefix: </FormLabel>
                    <TextField name="invoicePrefix" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Quote Prefix: </FormLabel>
                    <TextField name="quotePrefix" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Offer Prefix: </FormLabel>
                    <TextField name="offerPrefix" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Payment Prefix: </FormLabel>
                    <TextField name="paymentPrefix" type="text" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Current Invoice Year: </FormLabel>
                    <TextField name="currentInvoiceYear" type="number" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Current Quote Year: </FormLabel>
                    <TextField name="currentQuoteYear" type="number" size="small"
                        fullWidth required></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel required>Current Offer Year: </FormLabel>
                    <TextField name="currentOfferYear" type="number" size="small"
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

export default FinanceSettingForm