import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import { Button, Divider, Select, MenuItem, Typography, FormControl, FormLabel, TextField } from '@mui/material';
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { useState } from 'react';
import { backendURL } from 'assets/url/url';
import { useEffect } from 'react';
import { getDataAPI } from 'hooks/getAPI';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import { getUser } from 'common/getUser';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    country: Yup.string().required('Country is required'),
    company: Yup.string().required('Company is required'),
});

export default function PeopleDrawer(props) {
    const { open, handleClose, mode, data, setRowData, deleteData, handleSetMode } = props;
    const [companyData, setData] = useState([]);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            country: '',
            company: null,
            phone: '',
            createdBy: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                values.createdBy = getUser()._id;
                if (mode === "add") {
                    const result = await axios.post(`${backendURL}/people/addPeople`, values);
                    if (result.status === 201) {
                        Swal.fire({ icon: 'success', text: 'People added successfully', timer: 3000 });
                        formik.resetForm();
                        handleClose();
                    }
                } else if (mode === "edit") {
                    const result = await axios.put(`${backendURL}/people/updatePeopleData/${data._id}`, values);
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

    const fetchCompany = async (user) => {
        try {
            const result = await getDataAPI("company", `getCompanyData?createdBy=${user._id}`);
            if (result.status === 200)
                setData(result.data.companyData);
        } catch (error) {
            console.log("error : ", error);
        }
    }

    useEffect(() => {
        if (mode === 'edit' && data) {
            formik.setValues({
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                country: data.country || '',
                company: data.company || '',
                phone: data.phone || '',
                createdBy: formik.values.createdBy
            });
        } else if (mode === 'add') {
            formik.resetForm();
        }
        fetchCompany(getUser());
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
                            <Typography variant='h2' style={{ marginLeft: '10px' }}> People </Typography>
                        </Grid>
                        <Divider orientation='horizontal' />

                        {mode === "add" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> ADD NEW PEOPLE </Typography>
                            <Divider orientation='horizontal' />
                            <form method='post' onSubmit={formik.handleSubmit}>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >First Name</FormLabel>
                                        <TextField
                                            id="firstName"
                                            name="firstName"
                                            size="small"
                                            fullWidth
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                            helperText={formik.touched.firstName && formik.errors.firstName}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Last name</FormLabel>
                                        <TextField
                                            id="lastName"
                                            name="lastName"
                                            size="small"
                                            fullWidth
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                            helperText={formik.touched.lastName && formik.errors.lastName}
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Company</FormLabel>
                                        <Select
                                            id="company"
                                            name="company"
                                            size="small"
                                            fullWidth
                                            value={formik.values.company}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.company && Boolean(formik.errors.company)}
                                            helperText={formik.touched.company && formik.errors.company}
                                        >
                                            {(companyData.length > 0) ?
                                                companyData.map((company, index) => (
                                                    <MenuItem key={index + 1} value={company._id}>{company.name}</MenuItem>
                                                ))
                                                :
                                                <MenuItem value="">No Data Found</MenuItem>
                                            }
                                        </Select>
                                        {formik.touched.company && formik.errors.company && (
                                            <Typography color="error">{formik.errors.company}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Country</FormLabel>
                                        <Select
                                            id="country"
                                            name="country"
                                            size="small"
                                            fullWidth
                                            value={formik.values.country}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.country && Boolean(formik.errors.country)}
                                            helperText={formik.touched.country && formik.errors.country}
                                        >
                                            <MenuItem value="India">India</MenuItem>
                                            <MenuItem value="Australia">Australia</MenuItem>
                                        </Select>
                                        {formik.touched.country && formik.errors.country && (
                                            <Typography color="error">{formik.errors.country}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Phone</FormLabel>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            size="small"
                                            fullWidth
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                                            helperText={formik.touched.phone && formik.errors.phone}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Email</FormLabel>
                                        <TextField
                                            id="email"
                                            name="email"
                                            size="small"
                                            fullWidth
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
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
                                        <FormLabel sx={{ marginBottom: '5px' }} >First Name</FormLabel>
                                        <TextField
                                            id="firstName"
                                            name="firstName"
                                            size="small"
                                            fullWidth

                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                            helperText={formik.touched.firstName && formik.errors.firstName}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel sx={{ marginBottom: '5px' }}>Last name</FormLabel>
                                        <TextField
                                            id="lastName"
                                            name="lastName"
                                            size="small"
                                            fullWidth
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                            helperText={formik.touched.lastName && formik.errors.lastName}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel sx={{ marginBottom: '5px' }}>Company</FormLabel>
                                        <Select
                                            id="company"
                                            name="company"
                                            size="small"
                                            fullWidth
                                            value={formik.values.company}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.company && Boolean(formik.errors.company)}
                                            helperText={formik.touched.company && formik.errors.company}
                                        >
                                            {(companyData.length > 0) ?
                                                companyData.map((company, index) => (
                                                    <MenuItem key={index + 1} value={company._id}>{company.name}</MenuItem>
                                                ))
                                                :
                                                <MenuItem value="">No Data Found</MenuItem>
                                            }
                                        </Select>
                                        {formik.touched.company && formik.errors.company && (
                                            <Typography color="error">{formik.errors.company}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel sx={{ marginBottom: '5px' }}>Country</FormLabel>
                                        <Select
                                            id="country"
                                            name="country"
                                            size="small"
                                            fullWidth
                                            value={formik.values.country}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.country && Boolean(formik.errors.country)}
                                            helperText={formik.touched.country && formik.errors.country}
                                        >
                                            <MenuItem value="India">India</MenuItem>
                                            <MenuItem value="Australia">Australia</MenuItem>
                                        </Select>
                                        {formik.touched.country && formik.errors.country && (
                                            <Typography color="error">{formik.errors.country}</Typography>
                                        )}                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel sx={{ marginBottom: '5px' }}>Phone</FormLabel>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            size="small"
                                            fullWidth
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                                            helperText={formik.touched.phone && formik.errors.phone}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel sx={{ marginBottom: '5px' }}>Email</FormLabel>
                                        <TextField
                                            id="email"
                                            name="email"
                                            size="small"
                                            fullWidth
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
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
                                    <Typography variant='h5' style={{ marginLeft: '25px' }} > {data.firstName + ' ' + data.lastName}</Typography>
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
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.firstName + ' ' + data.lastName}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Country</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.country}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Phone</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.phone}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Email</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.email}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Company</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.colorompany}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>

                                <Button variant='outlined' style={{ width: '95%', marginTop: '25px' }} >ADD NEW PERSON</Button>
                            </Grid>
                        </Box> : null}
                    </Drawer>
                </React.Fragment >
            ))
            }
        </div >
    );
}