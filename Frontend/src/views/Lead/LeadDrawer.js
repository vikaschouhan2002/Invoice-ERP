import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';
import { Button, Divider, Select, MenuItem, Typography, FormControl, FormLabel, TextField } from '@mui/material';
import { AiTwotoneEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDataAPI } from 'hooks/getAPI';
import Swal from 'sweetalert2';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import { getUser } from 'common/getUser';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  type: yup.string().required('Type is required'),
  people: yup.string().when('type', {
    is: 'People',
    then: yup.string().required('People is required'),
    otherwise: yup.string().nullable()
  }),
  company: yup.string().when('type', {
    is: 'Company',
    then: yup.string().required('Company is required'),
    otherwise: yup.string().nullable()
  }),
  status: yup.string().required('Status is required'),
  source: yup.string().required('Source is required'),
  note: yup.string().required('Note is required')
});

export default function LeadDrawer(props) {
  const { open, handleClose, mode, data, setRowData, deleteData, handleSetMode } = props;
  const statuses = ['Draft', 'New', 'Won', 'Loose', 'Waiting'];
  const sources = ['LinkedIn', 'Twitter', 'Website', 'Ads', 'Sales'];
  const [peopleData, setPeople] = useState([]);
  const [companyData, setCompany] = useState([]);

  const formik = useFormik({
    initialValues: {
      type: '',
      status: '',
      source: '',
      note: '',
      people: null,
      company: null,
      createdBy: null
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        values.createdBy = getUser()._id;
        if (mode === 'add') {
          const result = await axios.post(`${backendURL}/lead/addLead`, values);
          if (result.status === 201) {
            Swal.fire({ icon: 'success', text: 'People added successfully', timer: 3000 });
            formik.resetForm();
            handleClose();
          }
        } else if (mode === 'edit') {
          const result = await axios.put(`${backendURL}/lead/updateLead/${data._id}`, values);
          if (result.status === 200) {
            Swal.fire({ icon: 'success', text: 'data updated', timer: 3000 });
            handleClose();
          } else if (result.status === 203) {
            Swal.fire({ icon: 'error', text: 'data not found', timer: 3000 });
          }
        }
      } catch (error) {
        Swal.fire({ icon: 'error', text: 'Error While dealing backend', timer: 3000 });
        console.log('error : ', error);
      }
    }
  });

  const fetchData1 = async (user) => {
    try {
      const response1 = await getDataAPI('people', `getPeopleData?createdBy=${user._id}`);
      const response2 = await getDataAPI('company', `getCompanyData?createdBy=${user._id}`);

      if (response1.status === 200 && response2.status === 200) {
        setPeople(response1.data.peopleData);
        setCompany(response2.data.companyData);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };

  useEffect(() => {
    if (mode === 'edit' && data) {
      formik.setValues({
        type: data.type || '',
        status: data.status || '',
        source: data.source || '',
        note: data.note || '',
        people: data.people || null,
        company: data.company || null,
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
                boxSizing: 'border-box'
              }
            }}
          >
            <Grid style={{ display: 'flex', justifyContent: 'start', margin: '10px' }}>
              <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
              <Divider orientation="vertical" style={{ marginLeft: '10px' }} />
              <Typography variant="h2" style={{ marginLeft: '10px' }}>
                {' '}
                Lead{' '}
              </Typography>
            </Grid>
            <Divider orientation="horizontal" />

            {mode === 'add' ? (
              <Box>
                <Typography variant="h2" style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}>
                  {' '}
                  ADD NEW LEAD{' '}
                </Typography>
                <Divider orientation="horizontal" />
                <form method="post" onSubmit={formik.handleSubmit}>
                  <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px', paddingBottom: '0px' }}>
                    <FormControl fullWidth style={{ margin: '10px' }}>
                      <FormLabel required sx={{ marginBottom: '5px' }}>
                        Type
                      </FormLabel>
                      <Select
                        id="type"
                        name="type"
                        size="small"
                        fullWidth
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        helperText={formik.touched.type && formik.errors.type}
                      >
                        <MenuItem value="People">People</MenuItem>
                        <MenuItem value="Company">Company</MenuItem>
                      </Select>
                      {formik.touched.type && formik.errors.type && <Typography color="error">{formik.errors.type}</Typography>}
                    </FormControl>
                  </Grid>
                  <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px', paddingBottom: '0px' }}>
                    <FormControl fullWidth style={{ margin: '10px' }}>
                      <FormLabel required sx={{ marginBottom: '5px' }}>
                        Status
                      </FormLabel>
                      <Select
                        id="status"
                        name="status"
                        size="small"
                        fullWidth
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        error={formik.touched.status && Boolean(formik.errors.status)}
                        helperText={formik.touched.status && formik.errors.status}
                      >
                        {statuses.map((status, index) => {
                          return (
                            <MenuItem value={status} key={index}>
                              {status}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {formik.touched.status && formik.errors.status && <Typography color="error">{formik.errors.status}</Typography>}
                    </FormControl>
                  </Grid>
                  <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px', paddingBottom: '0px' }}>
                    <FormControl fullWidth style={{ margin: '10px' }}>
                      <FormLabel required sx={{ marginBottom: '5px' }}>
                        Source
                      </FormLabel>
                      <Select
                        id="source"
                        name="source"
                        size="small"
                        fullWidth
                        value={formik.values.source}
                        onChange={formik.handleChange}
                        error={formik.touched.source && Boolean(formik.errors.source)}
                        helperText={formik.touched.source && formik.errors.source}
                      >
                        {sources.map((source, index) => {
                          return (
                            <MenuItem value={source} key={index}>
                              {source}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {formik.touched.source && formik.errors.source && <Typography color="error">{formik.errors.source}</Typography>}
                    </FormControl>
                  </Grid>
                  {formik.values.type === 'People' && (
                    <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px' }}>
                      <FormControl fullWidth style={{ margin: '10px' }}>
                        <FormLabel sx={{ marginBottom: '5px' }}>People</FormLabel>
                        <Select
                          id="people"
                          name="people"
                          size="small"
                          fullWidth
                          value={formik.values.people}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          {peopleData.length > 0 ? (
                            peopleData.map((people, index) => (
                              <MenuItem value={people._id} key={index + 1}>
                                {people.firstName + ' ' + people.lastName}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">No People Found</MenuItem>
                          )}
                        </Select>
                        {formik.touched.people && formik.errors.people && <Typography color="error">{formik.errors.people}</Typography>}
                      </FormControl>
                    </Grid>
                  )}
                  {formik.values.type === 'Company' && (
                    <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px' }}>
                      <FormControl fullWidth style={{ margin: '10px' }}>
                        <FormLabel sx={{ marginBottom: '5px' }}>Company</FormLabel>
                        <Select
                          id="company"
                          name="company"
                          size="small"
                          fullWidth
                          value={formik.values.company}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                        {formik.touched.company && formik.errors.company && <Typography color="error">{formik.errors.company}</Typography>}
                      </FormControl>
                    </Grid>
                  )}
                  <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px', paddingBottom: '0px' }}>
                    <FormControl fullWidth style={{ margin: '10px' }}>
                      <FormLabel required sx={{ marginBottom: '5px' }}>
                        Note
                      </FormLabel>
                      <TextField
                        id="note"
                        name="note"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        maxRows={4}
                        value={formik.values.note}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.note && Boolean(formik.errors.note)}
                        helperText={formik.touched.note && formik.errors.note}
                      />
                    </FormControl>
                  </Grid>
                  <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px' }}>
                    <Button variant="contained" type="submit" style={{ margin: '10px' }}>
                      Submit
                    </Button>
                  </Grid>
                </form>
              </Box>
            ) : null}

            {mode === 'edit' ? (
              <Box>
                <Typography variant="h2" style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}>
                  {' '}
                  EDIT LEAD DETAILS{' '}
                </Typography>
                <Divider orientation="horizontal" />
                <form method="post" onSubmit={formik.handleSubmit}>
                  <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px', paddingBottom: '0px' }}>
                    <FormControl fullWidth style={{ margin: '10px' }}>
                      <FormLabel required sx={{ marginBottom: '5px' }}>
                        Type
                      </FormLabel>
                      <Select
                        id="type"
                        name="type"
                        size="small"
                        fullWidth
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                        helperText={formik.touched.type && formik.errors.type}
                      >
                        <MenuItem value="People">People</MenuItem>
                        <MenuItem value="Company">Company</MenuItem>
                      </Select>
                      {formik.touched.type && formik.errors.type && <Typography color="error">{formik.errors.type}</Typography>}
                    </FormControl>
                  </Grid>
                  <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px', paddingBottom: '0px' }}>
                    <FormControl fullWidth style={{ margin: '10px' }}>
                      <FormLabel required sx={{ marginBottom: '5px' }}>
                        Status
                      </FormLabel>
                      <Select
                        id="status"
                        name="status"
                        size="small"
                        fullWidth
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        error={formik.touched.status && Boolean(formik.errors.status)}
                        helperText={formik.touched.status && formik.errors.status}
                      >
                        {statuses.map((status, index) => {
                          return (
                            <MenuItem value={status} key={index}>
                              {status}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {formik.touched.status && formik.errors.status && <Typography color="error">{formik.errors.status}</Typography>}
                    </FormControl>
                  </Grid>
                  <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px', paddingBottom: '0px' }}>
                    <FormControl fullWidth style={{ margin: '10px' }}>
                      <FormLabel required sx={{ marginBottom: '5px' }}>
                        Source
                      </FormLabel>
                      <Select
                        id="source"
                        name="source"
                        size="small"
                        fullWidth
                        value={formik.values.source}
                        onChange={formik.handleChange}
                        error={formik.touched.source && Boolean(formik.errors.source)}
                        helperText={formik.touched.source && formik.errors.source}
                      >
                        {sources.map((source, index) => {
                          return (
                            <MenuItem value={source} key={index}>
                              {source}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {formik.touched.source && formik.errors.source && <Typography color="error">{formik.errors.source}</Typography>}
                    </FormControl>
                  </Grid>
                  {formik.values.type === 'People' && (
                    <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px' }}>
                      <FormControl fullWidth style={{ margin: '10px' }}>
                        <FormLabel sx={{ marginBottom: '5px' }}>People</FormLabel>
                        <Select
                          id="people"
                          name="people"
                          size="small"
                          fullWidth
                          value={formik.values.people}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          {peopleData.length > 0 ? (
                            peopleData.map((people, index) => (
                              <MenuItem value={people._id} key={index + 1}>
                                {people.firstName + ' ' + people.lastName}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">No People Found</MenuItem>
                          )}
                        </Select>
                        {formik.touched.people && formik.errors.people && <Typography color="error">{formik.errors.people}</Typography>}
                      </FormControl>
                    </Grid>
                  )}
                  {formik.values.type === 'Company' && (
                    <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px' }}>
                      <FormControl fullWidth style={{ margin: '10px' }}>
                        <FormLabel sx={{ marginBottom: '5px' }}>Company</FormLabel>
                        <Select
                          id="company"
                          name="company"
                          size="small"
                          fullWidth
                          value={formik.values.company}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
                        {formik.touched.company && formik.errors.company && <Typography color="error">{formik.errors.company}</Typography>}
                      </FormControl>
                    </Grid>
                  )}
                  <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px', paddingBottom: '0px' }}>
                    <FormControl fullWidth style={{ margin: '10px' }}>
                      <FormLabel required sx={{ marginBottom: '5px' }}>
                        Note
                      </FormLabel>
                      <TextField
                        id="note"
                        name="note"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        maxRows={4}
                        value={formik.values.note}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.note && Boolean(formik.errors.note)}
                        helperText={formik.touched.note && formik.errors.note}
                      />
                    </FormControl>
                  </Grid>
                  <Grid style={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '5px' }}>
                    <Button variant="contained" type="submit" style={{ margin: '10px' }}>
                      Save
                    </Button>
                    <Button variant="outlined" type="submit" style={{ margin: '10px' }}>
                      Cancel
                    </Button>
                  </Grid>
                </form>
              </Box>
            ) : null}

            {mode === 'show' ? (
              <Box>
                <Typography variant="h2" style={{ padding: '10px', textAlign: 'center', color: '#008DFF' }}>
                  {' '}
                  LEAD DETAILS{' '}
                </Typography>
                <Divider orientation="horizontal" />
                <Grid style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
                  <Grid style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ marginLeft: '25px' }}>
                      {' '}
                      {data.name}
                    </Typography>
                  </Grid>
                  <Grid style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <Button
                      variant="text"
                      onClick={() => {
                        handleSetMode('edit');
                        setRowData(data);
                      }}
                    >
                      <AiTwotoneEdit style={{ margin: '5px' }} /> Edit
                    </Button>
                    <Button
                      variant="text"
                      onClick={(e) => {
                        deleteData(e);
                      }}
                    >
                      <AiOutlineDelete style={{ margin: '5px' }} /> Remove
                    </Button>
                  </Grid>
                </Grid>
                <Divider orientation="horizontal" />

                <Grid container style={{ display: 'flex', justifyContent: 'center', width: '95%', margin: '15px' }}>
                  <Grid xs={6} md={4} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      Type
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={8} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      :
                    </Typography>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      {data.type}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container style={{ display: 'flex', justifyContent: 'center', width: '95%', margin: '15px' }}>
                  <Grid xs={6} md={4} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      Name
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={8} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      :
                    </Typography>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      {data.name}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container style={{ display: 'flex', justifyContent: 'center', width: '95%', margin: '15px' }}>
                  <Grid xs={6} md={4} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      Status
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={8} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      :
                    </Typography>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      {data.status}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container style={{ display: 'flex', justifyContent: 'center', width: '95%', margin: '15px' }}>
                  <Grid xs={6} md={4} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      Country
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={8} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      :
                    </Typography>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      {data.country}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container style={{ display: 'flex', justifyContent: 'center', width: '95%', margin: '15px' }}>
                  <Grid xs={6} md={4} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      Phone
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={8} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      :
                    </Typography>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      {data.phone}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container style={{ display: 'flex', justifyContent: 'center', width: '95%', margin: '15px' }}>
                  <Grid xs={6} md={4} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={8} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      :
                    </Typography>
                    <Typography variant="h5" style={{ margin: '10px' }}>
                      {data.email}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container style={{ display: 'flex', justifyContent: 'center', width: '95%', margin: '15px' }}>
                  <Button variant="outlined" style={{ width: '95%', marginTop: '25px' }}>
                    ADD NEW LEAD
                  </Button>
                </Grid>
              </Box>
            ) : null}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
