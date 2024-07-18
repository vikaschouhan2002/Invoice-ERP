import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import { Button, Divider, Select, MenuItem, Typography, FormControl, FormLabel, TextField } from '@mui/material';
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import Swal from 'sweetalert2';
import { getDataAPI } from 'hooks/getAPI';
import { getUser } from 'common/getUser';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    contact: Yup.string().required('Contact is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    country: Yup.string().required('Country is required'),
    phone: Yup.string().required('Phone is required'),
    website: Yup.string().url('Invalid URL format').required('Website is required')
});

export default function CompanyDrawer(props) {
    const { open, handleClose, mode, data, setRowData, deleteData, handleSetMode } = props;
    const [peopleData, setPeopleData] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: '',
            contact: null,
            email: '',
            country: '',
            phone: '',
            website: '',
            createdBy: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                values.createdBy = getUser()._id;
                if (mode === 'add') {
                    const result = await axios.post(`${backendURL}/company/addCompany`, values);
                    if (result.status === 201) {
                        Swal.fire({ icon: "success", text: "Data Added", showConfirmButton: false, timer: 3000 });
                        formik.resetForm();
                    } else {
                        Swal.fire({ icon: "error", text: "Error while adding data", showConfirmButton: false, timer: 3000 });
                    }
                } else if (mode === 'edit') {
                    const result = await axios.put(`${backendURL}/company/updateCompanyData/${data._id}`, values);
                    if (result.status === 200) {
                        Swal.fire({ icon: 'success', text: 'Data updated', timer: 3000 });
                    } else {
                        Swal.fire({ icon: 'error', text: 'Data not found' });
                    }
                }
            } catch (error) {
                console.log("error : ", error);
                Swal.fire({ icon: "error", text: "Error while dealing with backend", showConfirmButton: false, timer: 3000 });
            }
        }
    });

    const fetchPeople = async (user) => {
        try {
            const result = await getDataAPI("people", `getPeopleData?createdBy=${user._id}`);
            if (result.status === 200)
                setPeopleData(result.data.peopleData);
        } catch (error) {
            console.log("error : ", error);
        }
    }

    useEffect(() => {
        if (mode === 'edit' && data) {
            formik.setValues({
                name: data.name || '',
                contact: data.contact_id || '',
                email: data.email || '',
                phone: data.phone || '',
                website: data.website || '',
                country: data.country || '',
                createdBy: formik.values.createdBy
            });
        } else if (mode === 'add') {
            formik.resetForm();
        }
        fetchPeople(getUser());
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
                            }
                        }}
                    >
                        <Grid style={{ display: "flex", justifyContent: "start", margin: '10px' }}>
                            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                            <Divider orientation='vertical' style={{ marginLeft: '10px' }} />
                            <Typography variant='h2' style={{ marginLeft: '10px' }}> Company </Typography>
                        </Grid>
                        <Divider orientation='horizontal' />
                        {mode === "add" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> ADD NEW COMPANY </Typography>
                            <Divider orientation='horizontal' />
                            <form onSubmit={formik.handleSubmit} method='post'>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} > Name</FormLabel>
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
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Contact</FormLabel>
                                        <Select
                                            id="contact"
                                            name="contact"
                                            size="small"
                                            fullWidth
                                            value={formik.values.contact}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.contact && Boolean(formik.errors.contact)}
                                        >
                                            {peopleData.length > 0 ? peopleData.map((person, index) => (
                                                <MenuItem value={person._id} key={index + 1}>
                                                    {person.firstName + " " + person.lastName}
                                                </MenuItem>
                                            )) : (
                                                <MenuItem value="">No Contact Found</MenuItem>
                                            )}
                                        </Select>
                                        {formik.touched.contact && formik.errors.contact && (
                                            <Typography color="error">{formik.errors.contact}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Country</FormLabel>
                                        <Select
                                            id="country"
                                            name="country"
                                            size="small"
                                            fullWidth
                                            value={formik.values.country}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.country && Boolean(formik.errors.country)}
                                        >
                                            <MenuItem value="India">India</MenuItem>
                                            <MenuItem value="Australia">Australia</MenuItem>
                                        </Select>
                                        {formik.touched.country && formik.errors.country && (
                                            <Typography color="error">{formik.errors.country}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Phone</FormLabel>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            label=""
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
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Email</FormLabel>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label=""
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
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Website</FormLabel>
                                        <TextField
                                            id="website"
                                            name="website"
                                            label=""
                                            size="small"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">http://</InputAdornment>,
                                            }}
                                            value={formik.values.website}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.website && Boolean(formik.errors.website)}
                                            helperText={formik.touched.website && formik.errors.website}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Submit</Button>
                                </Grid>
                            </form>
                        </Box> : null}
                        {mode === "edit" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> EDIT COMPANY DETAILS </Typography>
                            <Divider orientation='horizontal' />
                            <form method='post' onSubmit={formik.handleSubmit}>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} > Name</FormLabel>
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
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} > Contact</FormLabel>
                                        <Select
                                            id="contact"
                                            name="contact"
                                            size="small"
                                            fullWidth
                                            value={formik.values.contact}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.contact && Boolean(formik.errors.contact)}
                                        >
                                            {peopleData.length > 0 ? peopleData.map((person, index) => (
                                                <MenuItem value={person._id} key={index + 1}>
                                                    {person.firstName + " " + person.lastName}
                                                </MenuItem>
                                            )) : (
                                                <MenuItem value="">No Contact Found</MenuItem>
                                            )}
                                        </Select>
                                        {formik.touched.contact && formik.errors.contact && (
                                            <Typography color="error">{formik.errors.contact}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} > Country</FormLabel>
                                        <Select
                                            id="country"
                                            name="country"
                                            size="small"
                                            fullWidth
                                            value={formik.values.country}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.country && Boolean(formik.errors.country)}
                                        >
                                            <MenuItem value="India">India</MenuItem>
                                            <MenuItem value="Australia">Australia</MenuItem>
                                        </Select>
                                        {formik.touched.country && formik.errors.country && (
                                            <Typography color="error">{formik.errors.country}</Typography>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} > Phone</FormLabel>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            label=""
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
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} > Email</FormLabel>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label=""
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
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px", paddingBottom: '0px' }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }} >Website</FormLabel>
                                        <TextField
                                            id="website"
                                            name="website"
                                            label=""
                                            size="small"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">http://</InputAdornment>,
                                            }}
                                            value={formik.values.website}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.website && Boolean(formik.errors.website)}
                                            helperText={formik.touched.website && formik.errors.website}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Save</Button>
                                    <Button variant='outlined' type='' style={{ margin: "10px" }}>Cancel</Button>
                                </Grid>
                            </form>
                        </Box> : null}

                        {mode === "show" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> COMPANY DETAILS </Typography>
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
                                    <Typography variant='h5' style={{ margin: "10px" }}>Contact</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.contact}</Typography>
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
                                    <Typography variant='h5' style={{ margin: "10px" }}>Website</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.website}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Button variant='outlined' style={{ width: '95%', marginTop: '25px' }} >ADD NEW COMPANY</Button>
                            </Grid>
                        </Box> : null}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}