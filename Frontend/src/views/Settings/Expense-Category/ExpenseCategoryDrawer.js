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
    description: Yup.string().required('Description is required'),
    color: Yup.string().required('Description is required'),
    isEnabled: Yup.boolean()
});

export default function ExpenseCategoryDrawer(props) {
    const { open, handleClose, mode, data, setRowData, deleteData, handleSetMode } = props;
    const colors = ["red", "black", "blue", "green", "yellow"];

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            color: '',
            isEnabled: true,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                values.createdBy = getUser()._id;
                if (mode === "add") {
                    const result = await axios.post(`${backendURL}/expensecategory/addNewCategory`, values);
                    if (result.status === 201) {
                        Swal.fire({ icon: 'success', text: 'People added successfully', timer: 3000 });
                        formik.resetForm();
                        handleClose();
                    }
                } else if (mode === "edit") {
                    const result = await axios.put(`${backendURL}/expensecategory/updateCategory/${data._id}`, values);
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
                description: data.description || '',
                color: data.color || '',
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
                        }}                    >
                        <Grid style={{ display: "flex", justifyContent: "start", margin: '10px' }}>
                            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                            <Divider orientation='vertical' style={{ marginLeft: '10px' }} />
                            <Typography variant='h2' style={{ marginLeft: '10px' }}>EXPANSE CATEGORY </Typography>
                        </Grid>
                        <Divider orientation='horizontal' />

                        {mode === "add" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> ADD EXPANCE CATEGORY </Typography>
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
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Description</FormLabel>
                                        <TextField
                                            id="description"
                                            name="description"
                                            size="small"
                                            maxRows={10}
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
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Color</FormLabel>
                                        <Select
                                            id="color"
                                            name="color"
                                            size="small"
                                            fullWidth
                                            value={formik.values.color}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.color && Boolean(formik.errors.color)}
                                            helperText={formik.touched.color && formik.errors.color}
                                        >
                                            {colors.map((color, index) => (
                                                <MenuItem value={color} key={index}>
                                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.color && formik.errors.color && (
                                            <Typography color="error">{formik.errors.color}</Typography>
                                        )}
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
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}>EDIT EXPANCE CATEGORY</Typography>
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
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Description</FormLabel>
                                        <TextField
                                            id="description"
                                            name="description"
                                            size="small"
                                            maxRows={10}
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
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Color</FormLabel>
                                        <Select
                                            id="color"
                                            name="color"
                                            size="small"
                                            fullWidth
                                            value={formik.values.color}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.color && Boolean(formik.errors.color)}
                                            helperText={formik.touched.color && formik.errors.color}
                                        >
                                            {colors.map((color, index) => (
                                                <MenuItem value={color} key={index}>
                                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.color && formik.errors.color && (
                                            <Typography color="error">{formik.errors.color}</Typography>
                                        )}
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
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}>EXPANCE CATEGORY</Typography>
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
                                    <Typography variant='h5' style={{ margin: "10px" }}>Description</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.description}</Typography>
                                </Grid>
                            </Grid>

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Color</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.color}</Typography>
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
                                <Button variant='outlined' style={{ width: '95%', marginTop: '25px' }} >ADD EXPANCE CATEGORY</Button>
                            </Grid>
                        </Box> : null}                   </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}