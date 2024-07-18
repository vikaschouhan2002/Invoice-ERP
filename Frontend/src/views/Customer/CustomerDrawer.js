import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Divider, Select, MenuItem, Typography, FormControl, FormLabel } from '@mui/material';
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { backendURL } from 'assets/url/url';
import { getDataAPI } from 'hooks/getAPI';
import { getUser } from '../../common/getUser'

const validationSchema = Yup.object({
    type: Yup.string().required('Type is required'),
    people: Yup.string().when('type', {
        is: 'People',
        then: Yup.string().required('People is required')
    }),
    company: Yup.string().when('type', {
        is: 'Company',
        then: Yup.string().required('Company is required')
    })
});

export default function CustomerDrawer(props) {
    let user;
    const { fetchData, open, handleClose, mode, data, handleSetMode, setRowData, deleteData } = props;
    const [peopleData, setPeopleData] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [userData, setUserData] = useState(null);

    const formikAdd = useFormik({
        initialValues: {
            type: '',
            people: '',
            company: '',
            createdBy: userData ? userData._id : null
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${backendURL}/client/addClient`, values);
                if (response.status === 201) {
                    Swal.fire({ icon: "success", text: "Data Added", timer: 3000 });
                    fetchData();
                    handleClose();
                }
            } catch (error) {
                console.log("error : ", error);
                Swal.fire({ icon: "error", text: "Error while dealing with backend", timer: 3000 });
            }
        }
    });

    const formikUpdate = useFormik({
        initialValues: {
            type: data ? data.type : '',
            people: data ? data.people : '',
            company: data ? data.company : '',
            createdBy: userData ? userData._id : null
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.put(`${backendURL}/client/updateClientData/${data._id}`, values);
                if (response.status === 200) {
                    Swal.fire({ icon: 'success', text: 'Data updated', timer: 3000 });
                    fetchData();
                    handleClose();
                } else {
                    Swal.fire({ icon: 'error', text: 'Data not found', timer: 3000 });
                }
            } catch (error) {
                console.log("error while dealing with backend : ", error);
                Swal.fire({ icon: 'error', text: 'Error while dealing with backend' });
            }
        }
    });

    const getData = async (user) => {
        try {
            const response1 = await getDataAPI("people", `getPeopleData?createdBy=${user._id}`);
            const response2 = await getDataAPI("company", `getCompanyData?createdBy=${user._id}`);
            if (response1.status === 200 && response2.status === 200) {
                setPeopleData(response1.data.peopleData);
                setCompanyData(response2.data.companyData);
            }
        } catch (error) {
            console.log("error : ", error);
        }
    }

    useEffect(() => {
        const handleUserData = async () => {
            const user = await getUser();
            setUserData(user);
            getData(user);
        };
        handleUserData();
    }, []);

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
                            <Typography variant='h2' style={{ marginLeft: '10px' }}> Client </Typography>
                        </Grid>
                        <Divider orientation='horizontal' />

                        {mode === "add" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> ADD NEW CLIENT </Typography>
                            <Divider orientation='horizontal' />
                            <form method='post' onSubmit={formikAdd.handleSubmit}>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "10px" }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Type</FormLabel>
                                        <Select id="type" name="type" size="small" fullWidth value={formikAdd.values.type} onChange={formikAdd.handleChange} onBlur={formikAdd.handleBlur} >
                                            <MenuItem value="People">People</MenuItem>
                                            <MenuItem value="Company">Company</MenuItem>
                                        </Select>
                                        {formikAdd.touched.type && formikAdd.errors.type ? (
                                            <div>{formikAdd.errors.type}</div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                {formikAdd.values.type === "People" && (
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <FormControl fullWidth style={{ margin: "10px" }}>
                                            <FormLabel sx={{ marginBottom: '5px' }}>People</FormLabel>
                                            <Select
                                                id="people"
                                                name="people"
                                                size="small"
                                                fullWidth
                                                value={formikAdd.values.people}
                                                onChange={formikAdd.handleChange}
                                                onBlur={formikAdd.handleBlur}
                                            >
                                                {peopleData.length > 0 ? (
                                                    peopleData.map((people, index) => (
                                                        <MenuItem value={people._id} key={index + 1}>
                                                            {people.firstName + " " + people.lastName}
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <MenuItem value="">No People Found</MenuItem>
                                                )}
                                            </Select>
                                            {formikAdd.touched.people && formikAdd.errors.people ? (
                                                <div>{formikAdd.errors.people}</div>
                                            ) : null}
                                        </FormControl>
                                    </Grid>
                                )}
                                {formikAdd.values.type === "Company" && (
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <FormControl fullWidth style={{ margin: "10px" }}>
                                            <FormLabel sx={{ marginBottom: '5px' }}>Company</FormLabel>
                                            <Select
                                                id="company"
                                                name="company"
                                                size="small"
                                                fullWidth
                                                value={formikAdd.values.company}
                                                onChange={formikAdd.handleChange}
                                                onBlur={formikAdd.handleBlur}
                                            >
                                                {companyData.length > 0 ? (
                                                    companyData.map((company, index) => (
                                                        <MenuItem value={company._id} key={index + 1}>
                                                            {company.name}
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <MenuItem value="">No Company Found</MenuItem>
                                                )}
                                            </Select>
                                            {formikAdd.touched.company && formikAdd.errors.company ? (
                                                <div>{formikAdd.errors.company}</div>
                                            ) : null}
                                        </FormControl>
                                    </Grid>
                                )}
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Submit</Button>
                                </Grid>
                            </form>
                        </Box> : null}

                        {mode === "edit" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> EDIT CLIENT DETAILS </Typography>
                            <Divider orientation='horizontal' />
                            <form method='post' onSubmit={formikUpdate.handleSubmit}>
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", marginTop: '15px', padding: "5px" }}>
                                    <FormControl fullWidth style={{ margin: "10px" }}>
                                        <FormLabel required sx={{ marginBottom: '5px' }}>Type</FormLabel>
                                        <Select
                                            id="type"
                                            name="type"
                                            size="small"
                                            fullWidth
                                            required
                                            value={formikUpdate.values.type}
                                            onChange={formikUpdate.handleChange}
                                            onBlur={formikUpdate.handleBlur}
                                        >
                                            <MenuItem value="People">People</MenuItem>
                                            <MenuItem value="Company">Company</MenuItem>
                                        </Select>
                                        {formikUpdate.touched.type && formikUpdate.errors.type ? (
                                            <div>{formikUpdate.errors.type}</div>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                {formikUpdate.values.type === "People" && (
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <FormControl fullWidth style={{ margin: "10px" }}>
                                            <FormLabel sx={{ marginBottom: '5px' }}>People</FormLabel>
                                            <Select
                                                id="people"
                                                name="people"
                                                size="small"
                                                fullWidth
                                                value={formikUpdate.values.people}
                                                onChange={formikUpdate.handleChange}
                                                onBlur={formikUpdate.handleBlur}
                                            >
                                                {peopleData.length > 0 ? (
                                                    peopleData.map((people, index) => (
                                                        <MenuItem value={people._id} key={index + 1}>
                                                            {people.firstName + " " + people.lastName}
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <MenuItem value="">No People Found</MenuItem>
                                                )}
                                            </Select>
                                            {formikUpdate.touched.people && formikUpdate.errors.people ? (
                                                <div>{formikUpdate.errors.people}</div>
                                            ) : null}
                                        </FormControl>
                                    </Grid>
                                )}
                                {formikUpdate.values.type === "Company" && (
                                    <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                        <FormControl fullWidth style={{ margin: "10px" }}>
                                            <FormLabel sx={{ marginBottom: '5px' }}>Company</FormLabel>
                                            <Select
                                                id="company"
                                                name="company"
                                                size="small"
                                                fullWidth
                                                value={formikUpdate.values.company}
                                                onChange={formikUpdate.handleChange}
                                                onBlur={formikUpdate.handleBlur}
                                            >
                                                {companyData.length > 0 ? (
                                                    companyData.map((company, index) => (
                                                        <MenuItem value={company._id} key={index + 1}>
                                                            {company.name}
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <MenuItem value="">No Company Found</MenuItem>
                                                )}
                                            </Select>
                                            {formikUpdate.touched.company && formikUpdate.errors.company ? (
                                                <div>{formikUpdate.errors.company}</div>
                                            ) : null}
                                        </FormControl>
                                    </Grid>
                                )}
                                <Grid style={{ display: "flex", justifyContent: "start", width: "100%", padding: "5px" }}>
                                    <Button variant='contained' type='submit' style={{ margin: "10px" }}>Save</Button>
                                    <Button variant='outlined' type='reset' onClick={handleClose} style={{ margin: "10px" }}>Cancel</Button>
                                </Grid>
                            </form>
                        </Box> : null}

                        {mode === "show" ? <Box>
                            <Typography variant='h2' style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}> CLIENTS DETAILS </Typography>
                            <Divider orientation='horizontal' />
                            <Grid style={{ display: "flex", justifyContent: "space-between", width: "95%" }}>
                                <Grid style={{ display: "flex", justifyContent: "start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ marginLeft: '25px' }} > {data.Name} </Typography>
                                </Grid>
                                <Grid style={{ display: "flex", justifyContent: "start", alignItems: 'center' }}>
                                    <Button variant='text' onClick={() => { handleSetMode('edit'); setRowData(data) }}><AiTwotoneEdit style={{ margin: "5px" }} /> Edit</Button>
                                    <Button variant='text' onClick={(e) => { deleteData(e) }} ><AiOutlineDelete style={{ margin: "5px" }} /> Remove</Button>
                                </Grid>
                            </Grid>
                            <Divider orientation='horizontal' />

                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>Type</Typography>
                                </Grid>
                                <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                    <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                    <Typography variant='h5' style={{ margin: "10px" }}>{data.type}</Typography>
                                </Grid>
                            </Grid>

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

                            {
                                (data.Type === "People") ?
                                    <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                        <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                            <Typography variant='h5' style={{ margin: "10px" }}>People</Typography>
                                        </Grid>
                                        <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                            <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                            <Typography variant='h5' style={{ margin: "10px" }}>{data.name}</Typography>
                                        </Grid>
                                    </Grid>

                                    :
                                    <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>
                                        <Grid xs={6} md={4} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                            <Typography variant='h5' style={{ margin: "10px" }}>Company</Typography>
                                        </Grid>
                                        <Grid xs={6} md={8} style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }}>
                                            <Typography variant='h5' style={{ margin: "10px" }}>:</Typography>
                                            <Typography variant='h5' style={{ margin: "10px" }}>{data.name}</Typography>
                                        </Grid>
                                    </Grid>
                            }
                            <Grid container style={{ display: "flex", justifyContent: "center", width: "95%", margin: '15px' }}>

                                <Button variant='outlined' style={{ width: '95%', marginTop: '25px' }} >ADD NEW CLIENT</Button>
                            </Grid>
                        </Box> : null}

                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}