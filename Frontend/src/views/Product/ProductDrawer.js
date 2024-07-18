import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import { Button, Divider, Select, MenuItem, Typography, FormControl, FormLabel, TextField, TextareaAutosize } from '@mui/material';
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect } from 'react';
import { getDataAPI } from 'hooks/getAPI';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import Box from '@mui/material/Box';
import { getUser } from 'common/getUser';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    name: Yup.string().required(' Name is required'),
    productCategory: Yup.string().required('Product Category is required'),
    currency: Yup.string().required('Currency is required'),
    price: Yup.string().required('Price required'),
    description: Yup.string().required('Description required'),
});

export default function ProductDrawer(props) {
    const { open, handleClose, mode, data, setRowData, deleteData, handleSetMode } = props;
    const [categoryData, setCategoryData] = useState([]);
    const [currencyData, setCurrencyData] = useState([]);
    const [data1, setData1] = useState({});

    const formik = useFormik({
        initialValues: {
            name: '',
            productCategory: null,
            currency: null,
            price: '',
            description: '',
            ref: '',
            createdBy: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                values.createdBy = getUser()._id;
                if (mode === "add") {
                    const result = await axios.post(`${backendURL}/product/addProduct`, values);
                    if (result.status === 201) {
                        Swal.fire({ icon: 'success', text: 'People added successfully', timer: 3000 });
                        formik.resetForm();
                        handleClose();
                    }
                } else if (mode === "edit") {
                    const result = await axios.put(`${backendURL}/product/updateProduct/${data._id}`, data);
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


    const getData2 = (e) => {
        if (mode === 'edit') {
            setRowData({ ...data, [e.target.name]: e.target.value });
        }
        else {
            setData1({ ...data1, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${backendURL}/product/addProduct`, data1);
            if (response.status === 201) {
                Swal.fire({ icon: 'success', text: 'Data Added ', timer: 3000 });
                fetchData();
                handleClose();
            }
        } catch (error) {
            console.log("error : ", error);
            Swal.fire({ icon: 'error', text: 'Error while adding data', timer: 3000 });
        }
    }

    const handleSubmit2 = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.put(`${backendURL}/product/updateProduct/${data._id}`, data);
            if (response.status === 200) {
                Swal.fire({ icon: 'success', text: 'Data Updated ', timer: 3000 });
                handleClose();
            }
            else if (response.status === 204) {
                Swal.fire({ icon: 'error', text: 'data not found', timer: 3000 });
            }
        } catch (error) {
            console.log("error : ", error);
            Swal.fire({ icon: 'error', text: 'Error while adding data', timer: 3000 });
        }
    }

    const fetchData1 = async (user) => {
        try {
            const response1 = await getDataAPI("productcategory", `getProductCategory?createdBy=${user._id}`);
            const response2 = await getDataAPI("currency", `getCurrencies?createdBy=${user._id}`);
            if (response1.status === 200 && response2.status === 200) {
                setCategoryData(response1.data.productcategory);
                setCurrencyData(response2.data.currencyData);
            }
        } catch (error) {
            console.log("error : ", error);
        }
    }
    useEffect(() => {
        if (mode === 'edit' && data) {
            formik.setValues({
                name: data.name || '',
                productCategory: data.productCategory || '',
                currency: data.currency || '',
                price: data.price || '',
                description: data.description || '',
                ref: data.ref || '',
                createdBy: formik.values.createdBy
            });
        } else if (mode === 'add') {
            formik.resetForm();
        }
        fetchData1(getUser());
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
                            <Typography variant='h2' style={{ marginLeft: '10px' }}> Product </Typography>
                        </Grid>
                        <Divider orientation='horizontal' />



                        {mode === "add" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> ADD NEW PEOPLE </Typography>
                            <Divider orientation='horizontal' />
                            <form method='post' onSubmit={formik.handleSubmit}>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Name</FormLabel>
                                        <TextField
                                            id="name"
                                            name="name"
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
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Product Category</FormLabel>
                                        <Select
                                            id="productCategory"
                                            name="productCategory"
                                            size="small"
                                            fullWidth
                                            value={formik.values.productCategory}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.productCategory && Boolean(formik.errors.productCategory)}
                                            helperText={formik.touched.productCategory && formik.errors.productCategory}
                                        >
                                            {(categoryData.length > 0) ?
                                                categoryData.map((category, index) => (
                                                    <MenuItem key={index + 1} value={category._id}>{category.name}</MenuItem>
                                                ))
                                                :
                                                <MenuItem value="">No Data Found</MenuItem>
                                            }
                                        </Select>
                                        {formik.touched.productCategory && formik.errors.productCategory && (
                                            <Typography color="error">{formik.errors.productCategory}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Currency</FormLabel>
                                        <Select
                                            id="currency"
                                            name="currency"
                                            size="small"
                                            fullWidth
                                            value={formik.values.currency}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.currency && Boolean(formik.errors.currency)}
                                            helperText={formik.touched.currency && formik.errors.currency}
                                        >
                                            {(currencyData.length > 0) ?
                                                currencyData.map((currency, index) => (
                                                    <MenuItem key={index + 1} value={currency._id}>{currency.currencyName}</MenuItem>
                                                ))
                                                :
                                                <MenuItem value="">No Data Found</MenuItem>
                                            }
                                        </Select>
                                        {formik.touched.currency && formik.errors.currency && (
                                            <Typography color="error">{formik.errors.currency}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Price</FormLabel>
                                        <TextField
                                            id="price"
                                            name="price"
                                            size="small"
                                            fullWidth
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.price && Boolean(formik.errors.price)}
                                            helperText={formik.touched.price && formik.errors.price}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Description</FormLabel>
                                        <TextField
                                            id="description"
                                            name="description"
                                            size="small"
                                            fullWidth
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Reference</FormLabel>
                                        <TextField
                                            id="ref"
                                            name="ref"
                                            size="small"
                                            fullWidth
                                            value={formik.values.ref}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.ref && Boolean(formik.errors.ref)}
                                            helperText={formik.touched.ref && formik.errors.ref}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Submit</Button>
                                </Grid>
                            </form>
                        </Box> : null}
                        {mode === "edit" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> EDIT PEOPLE DETAILS </Typography>
                            <Divider orientation='horizontal' />
                            <form method='post' onSubmit={formik.handleSubmit}>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Name</FormLabel>
                                        <TextField
                                            id="name"
                                            name="name"
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
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Product Category</FormLabel>
                                        <Select
                                            id="productCategory"
                                            name="productCategory"
                                            size="small"
                                            fullWidth
                                            value={formik.values.productCategory}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.productCategory && Boolean(formik.errors.productCategory)}
                                            helperText={formik.touched.productCategory && formik.errors.productCategory}
                                        >
                                            {(categoryData.length > 0) ?
                                                categoryData.map((category, index) => (
                                                    <MenuItem key={index + 1} value={category._id}>{category.name}</MenuItem>
                                                ))
                                                :
                                                <MenuItem value="">No Data Found</MenuItem>
                                            }
                                        </Select>
                                        {formik.touched.productCategory && formik.errors.productCategory && (
                                            <Typography color="error">{formik.errors.productCategory}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Currency</FormLabel>
                                        <Select
                                            id="currency"
                                            name="currency"
                                            size="small"
                                            fullWidth
                                            value={formik.values.currency}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.currency && Boolean(formik.errors.currency)}
                                            helperText={formik.touched.currency && formik.errors.currency}
                                        >
                                            {(currencyData.length > 0) ?
                                                currencyData.map((currency, index) => (
                                                    <MenuItem key={index + 1} value={currency._id}>{currency.currencyName}</MenuItem>
                                                ))
                                                :
                                                <MenuItem value="">No Data Found</MenuItem>
                                            }
                                        </Select>
                                        {formik.touched.currency && formik.errors.currency && (
                                            <Typography color="error">{formik.errors.currency}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Price</FormLabel>
                                        <TextField
                                            id="price"
                                            name="price"
                                            size="small"
                                            fullWidth
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.price && Boolean(formik.errors.price)}
                                            helperText={formik.touched.price && formik.errors.price}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Description</FormLabel>
                                        <TextField
                                            id="description"
                                            name="description"
                                            size="small"
                                            fullWidth
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Reference</FormLabel>
                                        <TextField
                                            id="ref"
                                            name="ref"
                                            size="small"
                                            fullWidth
                                            value={formik.values.ref}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.ref && Boolean(formik.errors.ref)}
                                            helperText={formik.touched.ref && formik.errors.ref}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Submit</Button>
                                    <Button variant='outlined' type='submit' style={{ margin: "10px" }}>Cancel</Button>
                                </Grid>
                            </form>
                        </Box> : null}


                        {mode === "show" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> PEOPLE DETAILS </Typography>
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
                                    <Typography variant='h5' style={{ margin: "10px" }}>Category</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.categoryname}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Description</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.description}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Price</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.price}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Reference</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.ref}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Button variant='outlined' style={{ width: '95%', marginTop: '25px' }} >ADD PRODUCT CATEGORY</Button>
                            </Grid>
                        </Box> : null}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}