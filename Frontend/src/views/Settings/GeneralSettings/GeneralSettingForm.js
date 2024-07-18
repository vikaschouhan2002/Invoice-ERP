import { FormControl, FormLabel, Grid, Select, TextField, MenuItem, Switch, Button } from '@mui/material'
import React from 'react'

function GeneralSettingForm() {
    return (
        <form encType="multipart/form-data">
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Application Name:
                    </FormLabel>
                    <TextField
                        name="applicationName"
                        size="small"
                        fullWidth
                        type="text"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormControl fullWidth>
                        <FormLabel>Language: </FormLabel>
                        <Select name="language" size="small" >
                            <MenuItem value="English">US English</MenuItem>
                            <MenuItem value="French">FR French</MenuItem>
                            <MenuItem value="Hindi">IN Hindi </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Allow Registration: </FormLabel>
                    <Switch />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Date Format:</FormLabel>
                    <TextField name="dateFormat" type="date" size="small"
                        fullWidth></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Application Email: </FormLabel>
                    <TextField name="email" type="email" size="small"
                        fullWidth></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Server Url
                        : </FormLabel>
                    <TextField name="serverUrl" type="text" size="small"
                        fullWidth></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Application Url
                        : </FormLabel>
                    <TextField name="applicationUrl" type="text" size="small"
                        fullWidth></TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={12} >

                    <Button style={{ margin: "5px" }} variant="contained" color="primary" type="submit">Save</Button>
                    <Button style={{ margin: "5px" }} variant="outlined" color="primary" >Cancel</Button>

                </Grid>
            </Grid>
        </form>
    )
}

export default GeneralSettingForm