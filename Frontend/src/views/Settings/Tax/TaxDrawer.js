import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import { Button, Divider, Select, MenuItem, Typography, FormControl, FormLabel, TextField, Switch } from '@mui/material';
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import { getUser } from 'common/getUser';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    rate: Yup.string().required('Rate is required'),
    isDefault: Yup.boolean(),
    isEnabled: Yup.boolean()
});

export default function TaxDrawer(props) {

    const { open, handleClose, mode, data, setRowData, deleteData, handleSetMode } = props;
    const [data1, setData1] = useState({});

    const formik = useFormik({
        initialValues: {
            name: '',
            rate: '',
            isDefault: true,
            isEnabled: true,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                values.createdBy = getUser()._id;
                if (mode === "add") {
                    const result = await axios.post(`${backendURL}/tax/addTax`, values);
                    if (result.status === 201) {
                        Swal.fire({ icon: 'success', text: 'People added successfully', timer: 3000 });
                        formik.resetForm();
                        handleClose();
                    }
                } else if (mode === "edit") {
                    const result = await axios.put(`${backendURL}/tax/updateTax/${data._id}`, values);
                    if (result.status === 200) {
                        Swal.fire({ icon: 'success', text: 'data updated', timer: 3000 });
                        handleClose();
                    } else if (result.status === 203) {
                        Swal.fire({ icon: 'error', text: 'data not found', timer: 3000 });
                    }
                }
            } catch (error) {
                Swal.fire({ icon: 'error', text: 'Error While dealing backend', timer: 3000 });
                console.log("error : ", error);
            }
        },

    });

    useEffect(() => {
        if (mode === 'edit' && data) {
            formik.setValues({
                name: data.name || '',
                rate: data.rate || '',
                isDefault: data.isDefault || '',
                isEnabled: data.isEnabled || '',
                createdBy: formik.values.createdBy
            });
        } else if (mode === 'add') {
            formik.resetForm();
        }
    }, [mode, data]);

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                        anchor={anchor}
                        open={open}
                        onClose={handleClose}
                        sx={{
                            width: 350,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 350,
                                boxSizing: 'border-box',
                            },
                        }}
                    >
                        <Grid style={{ display: "flex", justifyContent: "start", margin: '10px' }}>
                            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                            <Divider orientation='vertical' style={{ marginLeft: '10px' }} />
                            <Typography variant='h2' style={{ marginLeft: '10px' }}> Tax </Typography>
                        </Grid>
                        <Divider orientation='horizontal' />

                        {mode === "add" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> ADD NEW TAX </Typography>
                            <Divider orientation='horizontal' />
                            <form method='post' onSubmit={formik.handleSubmit}>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Name</FormLabel>
                                        <TextField
                                            id="name"
                                            name="name"
                                            label=""
                                            size="small"
                                            fullWidth
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Rate</FormLabel>
                                        <TextField
                                            id="rate"
                                            name="rate"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            value={formik.values.rate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.rate && Boolean(formik.errors.rate)}
                                            helperText={formik.touched.rate && formik.errors.rate}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Default</FormLabel>
                                        <Switch
                                            name='isDefault'
                                            id='isDefault'
                                            checked={formik.values.isDefault}
                                            onChange={formik.handleChange} />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Enable</FormLabel>
                                        <Switch
                                            name='isEnabled'
                                            id='isEnabled'
                                            checked={formik.values.isEnabled}
                                            onChange={formik.handleChange} />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Submit</Button>
                                </Grid>
                            </form>
                        </Box> : null}

                        {mode === "edit" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}>EDIT TAX DETAILS </Typography>
                            <Divider orientation='horizontal' />
                            <form method='post' onSubmit={formik.handleSubmit}>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Name</FormLabel>
                                        <TextField
                                            id="name"
                                            name="name"
                                            label=""
                                            size="small"
                                            fullWidth
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Rate</FormLabel>
                                        <TextField
                                            id="rate"
                                            name="rate"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            value={formik.values.rate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.rate && Boolean(formik.errors.rate)}
                                            helperText={formik.touched.rate && formik.errors.rate}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Default</FormLabel>
                                        <Switch
                                            name='isDefault'
                                            id='isDefault'
                                            checked={formik.values.isDefault}
                                            onChange={formik.handleChange} />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Enable</FormLabel>
                                        <Switch
                                            name='isEnabled'
                                            id='isEnabled'
                                            checked={formik.values.isEnabled}
                                            onChange={formik.handleChange} />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Submit</Button>
                                    <Button variant='outlined' type='submit' style={{ margin: "10px" }}>Cancel</Button>
                                </Grid>
                            </form>
                        </Box> : null}

                        {mode === "show" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> TAX DETAILS </Typography>
                            <Divider orientation='horizontal' />
                            <Grid style={{ display: "flex", justifyContent: "space-between", width: "95%" }}>
                                <Grid style={{ display: "flex", justifyContent: "start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ marginLeft: '25px' }} > {data.name}</Typography>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", alignItems: 'center' }}>
                                    <Button variant='text' onClick={() => { handleSetMode('edit'); setRowData(data) }}><AiTwotoneEdit style={{ margin: "5px" }} /> Edit</Button>
                                    <Button variant='text' onClick={(e) => { deleteData(e) }} ><AiOutlineDelete style={{ margin: "5px" }} /> Remove</Button>
                                </Grid>
                            </Grid>
                            <Divider orientation='horizontal' />

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Name</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.name}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Rate</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.rate}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Default</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.isDefault === true ? 'True' : 'False'}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Enabled</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.isEnabled === true ? 'True' : 'False'}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Button variant='outlined' style={{ width: '95%', marginTop: '25px' }} >ADD NEW TAX</Button>
                            </Grid>
                        </Box> : null}

    
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}