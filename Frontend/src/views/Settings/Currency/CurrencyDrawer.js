import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import { Button, Divider, Select, MenuItem, Typography, FormControl, FormLabel, TextField,  Switch, FormHelperText } from '@mui/material';
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUser } from 'common/getUser';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
    currencyName: Yup.string()
        .required('Currency name is required')
        .max(100, 'Currency name must be at most 100 characters long'),
    currencySymbol: Yup.string()
        .required('Currency symbol is required')
        .max(10, 'Currency symbol must be at most 10 characters long'),
    currencyPosition: Yup.string()
        .required('Currency position is required'),
    decimalSeparator: Yup.string()
        .required('Decimal separator is required')
        .max(1, 'Decimal separator must be a single character'),
    thousandSeparator: Yup.string()
        .required('Thousand separator is required')
        .max(1, 'Thousand separator must be a single character'),
    centPrecision: Yup.number()
        .required('Cent precision is required')
        .min(0, 'Cent precision must be at least 0')
        .max(10, 'Cent precision must be at most 10')
    });

const CurrecyDrwaer = (props) => {
    const { open, handleClose, mode, data, setRowData, deleteData, handleSetMode } = props;
    const navigate = useNavigate();
    const positions = ["Before", "After"];

    const formik = useFormik({
        initialValues: {
            currencyName: '',
            currencySymbol: '',
            currencyPosition: '',
            decimalSeparator: '',
            thousandSeparator: '',
            centPrecision: '',
            zeroFormate: true,
            isEnabled: true,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            console.log('values :- ', values);
            try {
                values.createdBy = getUser()._id;
                if (mode === "add") {
                    const result = await axios.post(`${backendURL}/currency/addCurrency`, values);
                    if (result.status === 201) {
                        Swal.fire({ icon: 'success', text: 'People added successfully', timer: 3000 });
                        formik.resetForm();
                        handleClose();
                    }
                } else if (mode === "edit") {
                    const response = await axios.put(`${backendURL}/currency/updateCurrency/${data._id}`, values);
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

    const getData = (e) => {
        const { name, value } = e.target;
        if (name === "Enabled") {
            setRowData({ ...data, [name]: !e.target.defaultChecked });
        }
        else if (name === "Zero_Format") {
            setRowData({ ...data, [name]: !e.target.defaultChecked });
        }
        else {
            setRowData({ ...data, [name]: value });
        }
        console.log("currencyData : ", data);
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("data : ", data);
            const response = await axios.put(`${backendURL}/currency/updateCurrency/${data._id}`, data);

            if (response.status === 200) {
                Swal.fire({ icon: 'success', text: 'data updated', timer: 3000 });
                handleClose();
                fetchData();
            }
            else if (response.status === 204) {
                Swal.fire({ icon: 'error', text: 'data not found', timer: 3000 });
                handleClose();
            }
        } catch (error) {
            console.log("error : ", error);
            Swal.fire({ icon: 'error', text: 'error while updating ', timer: 3000 });
        }
    }

    useEffect(() => {
        if (mode === 'edit' && data) {
            formik.setValues({
                currencyName: data.currencyName || '',
                currencySymbol: data.currencySymbol || '',
                currencyPosition: data.currencyPosition || '',
                decimalSeparator: data.decimalSeparator || '',
                thousandSeparator: data.thousandSeparator || '',
                centPrecision: data.centPrecision || '',
                zeroFormate: data.zeroFormate || '',
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
                            <Typography variant='h2' style={{ marginLeft: '10px' }}> Currency </Typography>
                        </Grid>
                        <Divider orientation='horizontal' />

                        {mode === "add" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> ADD NEW CURRENCY </Typography>
                            <Divider orientation='horizontal' />
                            <form method='post' onSubmit={formik.handleSubmit}>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Currency Name</FormLabel>
                                        <TextField
                                            id="currencyName"
                                            name="currencyName"
                                            size="small"
                                            fullWidth
                                            value={formik.values.currencyName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.currencyName && Boolean(formik.errors.currencyName)}
                                            helperText={formik.touched.currencyName && formik.errors.currencyName}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Currency Symbol</FormLabel>
                                        <TextField
                                            id="currencySymbol"
                                            name="currencySymbol"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            value={formik.values.currencySymbol}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.currencySymbol && Boolean(formik.errors.currencySymbol)}
                                            helperText={formik.touched.currencySymbol && formik.errors.currencySymbol}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Currency Position</FormLabel>
                                        <Select
                                            id="currencyPosition"
                                            name="currencyPosition"
                                            size="small"
                                            fullWidth
                                            value={formik.values.currencyPosition}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.currencyPosition && Boolean(formik.errors.currencyPosition)}
                                            helperText={formik.touched.currencyPosition && formik.errors.currencyPosition}
                                        >
                                            {positions.map((position, index) => (
                                                <MenuItem value={position} key={index}>
                                                    {position.charAt(0).toUpperCase() + position.slice(1)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.currencyPosition && formik.errors.currencyPosition && (
                                            <FormHelperText error>{formik.errors.currencyPosition}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Decimal Separator</FormLabel>
                                        <TextField
                                            id="decimalSeparator"
                                            name="decimalSeparator"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            value={formik.values.decimalSeparator}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.decimalSeparator && Boolean(formik.errors.decimalSeparator)}
                                            helperText={formik.touched.decimalSeparator && formik.errors.decimalSeparator}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Thousand Separator</FormLabel>
                                        <TextField
                                            id="thousandSeparator"
                                            name="thousandSeparator"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            value={formik.values.thousandSeparator}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.thousandSeparator && Boolean(formik.errors.thousandSeparator)}
                                            helperText={formik.touched.thousandSeparator && formik.errors.thousandSeparator}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Cent Precision </FormLabel>
                                        <TextField
                                            id="centPrecision"
                                            name="centPrecision"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            value={formik.values.centPrecision}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.centPrecision && Boolean(formik.errors.centPrecision)}
                                            helperText={formik.touched.centPrecision && formik.errors.centPrecision}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Zero Formate</FormLabel>
                                        <Switch
                                            id='zeroFormate'
                                            name='zeroFormate'
                                            checked={formik.values.zeroFormate}
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
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> EDIT CURRENCY DETAILS </Typography>
                            <Divider orientation='horizontal' />
                            <form method='post' onSubmit={formik.handleSubmit}>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Currency Name</FormLabel>
                                        <TextField
                                            id="currencyName"
                                            name="currencyName"
                                            size="small"
                                            fullWidth
                                            value={formik.values.currencyName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.currencyName && Boolean(formik.errors.currencyName)}
                                            helperText={formik.touched.currencyName && formik.errors.currencyName}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Currency Symbol</FormLabel>
                                        <TextField
                                            id="currencySymbol"
                                            name="currencySymbol"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            value={formik.values.currencySymbol}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.currencySymbol && Boolean(formik.errors.currencySymbol)}
                                            helperText={formik.touched.currencySymbol && formik.errors.currencySymbol}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Currency Position</FormLabel>
                                        <Select
                                            id="currencyPosition"
                                            name="currencyPosition"
                                            size="small"
                                            fullWidth
                                            value={formik.values.currencyPosition}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.currencyPosition && Boolean(formik.errors.currencyPosition)}
                                            helperText={formik.touched.currencyPosition && formik.errors.currencyPosition}
                                        >
                                            {positions.map((position, index) => (
                                                <MenuItem value={position} key={index}>
                                                    {position.charAt(0).toUpperCase() + position.slice(1)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.currencyPosition && formik.errors.currencyPosition && (
                                            <FormHelperText error>{formik.errors.currencyPosition}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Decimal Separator</FormLabel>
                                        <TextField
                                            id="decimalSeparator"
                                            name="decimalSeparator"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            value={formik.values.decimalSeparator}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.decimalSeparator && Boolean(formik.errors.decimalSeparator)}
                                            helperText={formik.touched.decimalSeparator && formik.errors.decimalSeparator}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Thousand Separator</FormLabel>
                                        <TextField
                                            id="thousandSeparator"
                                            name="thousandSeparator"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            value={formik.values.thousandSeparator}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.thousandSeparator && Boolean(formik.errors.thousandSeparator)}
                                            helperText={formik.touched.thousandSeparator && formik.errors.thousandSeparator}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Cent Precision </FormLabel>
                                        <TextField
                                            id="centPrecision"
                                            name="centPrecision"
                                            size="small"
                                            maxRows={10}
                                            fullWidth
                                            value={formik.values.centPrecision}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.centPrecision && Boolean(formik.errors.centPrecision)}
                                            helperText={formik.touched.centPrecision && formik.errors.centPrecision}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Zero Formate</FormLabel>
                                        <Switch
                                            name='zeroFormate'
                                            id='zeroFormate'
                                            checked={formik.values.zeroFormate}
                                            onChange={formik.handleChange} />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Enable</FormLabel>
                                        <Switch
                                            name='isEnabled'
                                            id='enable'
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
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> CURRENCY DETAILS </Typography>
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
                                    <Typography variant='h5' style={{ margin: "10px" }}> Name</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.currencyName}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}> Symbol</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.currencySymbol}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Position</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.currencyPosition}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Decimal-separator</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.decimalSeparator}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Thousand-separator</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.thousandSeparator}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Cent-presicion</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.centPrecision}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Zero-formate</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.zeroFormate === true ? 'True' : 'False'}</Typography>
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
                                <Button variant='outlined' style={{ width: '95%', marginTop: '25px' }} >ADD NEW CURRENCY</Button>
                            </Grid>
                        </Box> : null}

                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export default CurrecyDrwaer;