import React from 'react';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Select, Divider, MenuItem, FormLabel, FormControl, InputAdornment } from '@mui/material';
import { getDataAPI } from 'hooks/getAPI';
import { getUser } from 'common/getUser';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { backendURL } from 'assets/url/url';
import axios from 'axios';

const validationSchema = Yup.object({
  lead: Yup.string().required('Lead is required'),
  number: Yup.number().required('Number is required').positive('Number must be positive'),
  year: Yup.string().required('Year is required'),
  status: Yup.string().required('Status is required'),
  note: Yup.string().required('Note is required'),
  currency: Yup.string().required('Required'),
  startDate: Yup.date().required('Date is required'),
  expiryDate: Yup.date().required('Expire Date is required'),
  itemList: Yup.array().of(
    Yup.object({
      item: Yup.string().required('Item is required'),
      description: Yup.string().required('Description is required'),
      quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
      price: Yup.number().required('Price is required').positive('Price must be positive'),
      total: Yup.number().required('Total is required').positive('Total must be positive')
    })
  ),
  tax: Yup.string().required('Tax is required'),
  taxAmount: Yup.number().required('Tax Value is required').positive('Tax Value must be positive'),
  subTotal: Yup.number().required('Sub Total is required').positive('Sub Total must be positive'),
  grandTotal: Yup.number().required('Total is required').positive('Total must be positive')
});
function CreateOffer() {
  const navigate = useNavigate();
  const [leadData, setLeadData] = useState([]);
  const [taxData, setTaxData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);

  const formik = useFormik({
    initialValues: {
      lead: null,
      createdBy: '',
      number: '',
      year: '',
      status: '',
      note: '',
      currency: null,
      startDate: '',
      expiryDate: '',
      itemList: [{ item: '', description: '', quantity: null, price: null, total: null }],
      tax: null,
      taxAmount: 0,
      subTotal: 0,
      grandTotal: 0
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('values :- ', values);
        values.createdBy = getUser()._id;
        const result = await axios.post(`${backendURL}/offer/addOffer`, values);
        if (result.status === 201) {
          Swal.fire({ icon: 'success', text: 'offer created  successfully', timer: 3000 });
          formik.resetForm();
        }
      } catch (error) {
        Swal.fire({ icon: 'error', text: 'Error While dealing backend', timer: 3000 });
        console.log('error : ', error);
      }
    }
  });

  const featchData = async (user) => {
    try {
      const lead = await getDataAPI('lead', `getLeads?createdBy=${user._id}`);
      const tax = await getDataAPI('tax', `getTax?createdBy=${user._id}`);
      const currency = await getDataAPI('currency', `getCurrencies?createdBy=${user._id}`);
      if (lead.status === 200) {
        console.log('lead:-', lead.data.leadData);
        setLeadData(lead.data.leadData);
      }
      if (tax.status === 200) {
        console.log('tax:-', tax.data.taxData);
        setTaxData(tax.data.taxData);
      }
      if (currency.status === 200) {
        console.log('currency:-', currency.data.currencyData);
        setCurrencyData(currency.data.currencyData);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };

  useEffect(() => {
    featchData(getUser());
  }, []);

  const handleChangeItemValue = (event, index) => {
    const { name, value } = event.target;
    const itemList = [...formik.values.itemList];
    const fieldName = name.split('.')[1];
    itemList[index] = { ...itemList[index], [fieldName]: value };
    formik.setFieldValue('itemList', itemList);
    updateTotals(itemList);
  };

  const handleTaxChange = (event) => {
    formik.handleChange(event);
    updateTotals(formik.values.itemList);
  };

  const handleAddItem = () => {
    formik.setFieldValue('itemList', [...formik.values.itemList, { item: '', description: '', quantity: 0, price: 0, total: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const itemList = [...formik.values.itemList];
    itemList.splice(index, 1);
    formik.setFieldValue('itemList', itemList);
    updateTotals(itemList);
  };

  const updateTotals = (itemList) => {
    const subTotal = itemList.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = formik.values.discount || 0;
    const tax = taxData.find((tax) => tax._id === formik.values.tax);
    const taxAmount = tax ? (subTotal * tax.rate) / 100 : 0;
    const grandTotal = subTotal - discount + taxAmount;

    formik.setFieldValue('subTotal', subTotal);
    formik.setFieldValue('grandTotal', grandTotal);
  };

  const calculateTaxValue = (subTotal, taxRate) => {
    return (subTotal * taxRate) / 100;
  };

  useEffect(() => {
    const selectedTax = taxData.find((tax) => tax._id === formik.values.tax);
    const taxRate = selectedTax ? selectedTax.rate : 0; // Assuming `rate` is a field in the tax data
    const taxAmount = calculateTaxValue(formik.values.subTotal, taxRate);
    formik.setFieldValue('taxAmount', taxAmount);
    formik.setFieldValue('grandTotal', formik.values.subTotal + taxAmount);
  }, [formik.values.subTotal, formik.values.tax]);

  return (
    <>
      <Card>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Grid
                container
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}
              >
                <Grid item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    onClick={() => {
                      navigate('/dashboard/offer');
                    }}
                    size="small"
                    style={{ color: 'black' }}
                  >
                    <AiOutlineArrowLeft />{' '}
                  </Button>
                  <Typography style={{ margin: '9px', marginLeft: '-15px' }} variant="h5">
                    New
                  </Typography>
                  <Button size="small" variant="outlined" style={{ color: 'black', borderColor: 'black' }}>
                    ==
                  </Button>
                </Grid>

                <Grid item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '20px' }}>
                  <Button
                    size="small"
                    onClick={() => {
                      navigate('/dashboard/offer');
                    }}
                    style={{ margin: '5px', color: 'black', borderColor: 'black' }}
                    variant="outlined"
                  >
                    <AiOutlineCloseCircle style={{ margin: '3px', marginLeft: '-3px' }} /> Cancel
                  </Button>
                  <Button size="small" style={{ margin: '5px' }} variant="contained">
                    <AiOutlinePlus style={{ margin: '3px', marginLeft: '-3px' }} /> Save
                  </Button>
                </Grid>
              </Grid>
              <Divider orientation="horizontal" style={{ margin: '20px' }} />
            </Box>
            <Box>
              <Grid
                container
                style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'top', marginBottom: '5px', paddingRight: '20px' }}
              >
                <Grid item xs={12} md={3} lg={3}>
                  <FormControl fullWidth style={{ margin: '10px' }}>
                    <FormLabel sx={{ marginBottom: '5px' }}>Lead</FormLabel>
                    <Select
                      id="lead"
                      name="lead"
                      size="small"
                      fullWidth
                      value={formik.values.lead}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {leadData.length > 0 ? (
                        leadData.map((lead, index) => (
                          <MenuItem value={lead._id} key={index + 1}>
                            {lead.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">No lead found</MenuItem>
                      )}
                    </Select>
                    {formik.touched.lead && formik.errors.lead && <Typography color="error">{formik.errors.lead}</Typography>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={2} lg={2}>
                  <FormControl fullWidth style={{ margin: '10px' }}>
                    <FormLabel required sx={{ marginBottom: '5px' }}>
                      Number
                    </FormLabel>
                    <TextField
                      id="number"
                      name="number"
                      size="small"
                      fullWidth
                      value={formik.values.number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.number && Boolean(formik.errors.number)}
                      helperText={formik.touched.number && formik.errors.number}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={2} lg={2}>
                  <FormControl fullWidth style={{ margin: '10px' }}>
                    <FormLabel required sx={{ marginBottom: '5px' }}>
                      Year
                    </FormLabel>
                    <TextField
                      id="year"
                      name="year"
                      size="small"
                      fullWidth
                      value={formik.values.year}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.year && Boolean(formik.errors.year)}
                      helperText={formik.touched.year && formik.errors.year}
                    />
                  </FormControl>
                </Grid>

                <Grid itemxs={12} md={2} lg={2}>
                  <FormControl fullWidth style={{ margin: '10px' }}>
                    <FormLabel required sx={{ marginBottom: '5px' }}>
                      Currency
                    </FormLabel>
                    <Select
                      id="currency"
                      name="currency"
                      size="small"
                      fullWidth
                      value={formik.values.currency}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {currencyData.length > 0 ? (
                        currencyData.map((currency, index) => (
                          <MenuItem value={currency._id} key={index + 1}>
                            {currency.currencyName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">No lead found</MenuItem>
                      )}
                    </Select>
                    {formik.touched.currency && formik.errors.currency && <Typography color="error">{formik.errors.currency}</Typography>}
                  </FormControl>
                </Grid>

                <Grid itemxs={12} md={2} lg={2}>
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
                      onBlur={formik.handleBlur}
                      error={formik.touched.status && Boolean(formik.errors.status)}
                      helperText={formik.touched.status && formik.errors.status}
                    >
                      <MenuItem value="Accepted">Accepted</MenuItem>
                      <MenuItem value="Decline">Decline</MenuItem>
                      <MenuItem value="Draft">Draft</MenuItem>
                      <MenuItem value="Pending">Peding</MenuItem>
                      <MenuItem value="Send   ">Send</MenuItem>
                    </Select>
                    {formik.touched.status && formik.errors.status && <Typography color="error">{formik.errors.status}</Typography>}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                container
                style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'top', marginBottom: '5px', paddingRight: '20px' }}
              >
                <Grid item xs={12} md={4} lg={4}>
                  <FormControl fullWidth style={{ margin: '10px' }}>
                    <FormLabel sx={{ marginBottom: '5px' }}>Date</FormLabel>
                    <TextField
                      id="startDate"
                      name="startDate"
                      type="date"
                      size="small"
                      placeholder="Enter Start Date"
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                      helperText={formik.touched.startDate && formik.errors.startDate}
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3} lg={3}>
                  <FormControl fullWidth style={{ margin: '10px' }}>
                    <FormLabel required sx={{ marginBottom: '5px' }}>
                      Expirey Date
                    </FormLabel>
                    <TextField
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      size="small"
                      placeholder="Enter Expiry Date"
                      value={formik.values.expiryDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                      helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                      fullWidth
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                  <FormControl fullWidth style={{ margin: '10px' }}>
                    <FormLabel required sx={{ marginBottom: '5px' }}>
                      Note
                    </FormLabel>
                    <TextField
                      id="note"
                      name="note"
                      size="small"
                      fullWidth
                      value={formik.values.note}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.note && Boolean(formik.errors.note)}
                      helperText={formik.touched.note && formik.errors.note}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Divider orientation="horizontal" style={{ margin: '20px' }} />
            </Box>
            <Box>
              <Grid container style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'top', marginLeft: '15px' }}>
                <Grid item xs={2} md={2} lg={2}>
                  <FormLabel required id="lead">
                    Item
                  </FormLabel>
                </Grid>
                <Grid item xs={3} md={3} lg={3}>
                  <FormLabel required>Description</FormLabel>
                </Grid>
                <Grid item xs={1} md={1} lg={1}>
                  <FormLabel required>Qty</FormLabel>
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                  <FormLabel required>Price</FormLabel>
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                  <FormLabel required>Total</FormLabel>
                </Grid>
                <Grid item xs={1} md={1} lg={1}>
                  <FormLabel required>Remove</FormLabel>
                </Grid>
              </Grid>
              {formik.values.itemList.map((item, index) => {
                return (
                  <>
                    <Grid container style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'top' }}>
                      <Grid item xs={12} md={2} lg={2}>
                        <FormControl fullWidth style={{ margin: '10px' }}>
                          <TextField
                            id={`itemList[${index}].item`}
                            name={`itemList[${index}].item`}
                            type="text"
                            size="small"
                            placeholder="Enter Item"
                            value={formik.values.itemList[index].item}
                            onChange={(e) => handleChangeItemValue(e, index)}
                            error={formik.touched.itemList && formik.errors.itemList && Boolean(formik.errors.itemList[index]?.item)}
                            helperText={formik.touched.itemList && formik.errors.itemList && formik.errors.itemList[index]?.item}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3} lg={3}>
                        <FormControl fullWidth style={{ margin: '10px' }}>
                          <TextField
                            id={`itemList[${index}].description`}
                            name={`itemList[${index}].description`}
                            type="text"
                            size="small"
                            placeholder="Enter Description"
                            value={formik.values.itemList[index].description}
                            onChange={(e) => handleChangeItemValue(e, index)}
                            error={formik.touched.itemList && formik.errors.itemList && Boolean(formik.errors.itemList[index]?.description)}
                            helperText={formik.touched.itemList && formik.errors.itemList && formik.errors.itemList[index]?.description}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={1} lg={1}>
                        <FormControl fullWidth style={{ margin: '10px' }}>
                          <TextField
                            id={`itemList[${index}].quantity`}
                            name={`itemList[${index}].quantity`}
                            type="number"
                            size="small"
                            placeholder="Enter Quantity"
                            value={formik.values.itemList[index].quantity}
                            onChange={(e) => handleChangeItemValue(e, index)}
                            error={formik.touched.itemList && formik.errors.itemList && Boolean(formik.errors.itemList[index]?.quantity)}
                            helperText={formik.touched.itemList && formik.errors.itemList && formik.errors.itemList[index]?.quantity}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid itemxs={12} md={2} lg={2}>
                        <FormControl fullWidth style={{ margin: '10px' }}>
                          <TextField
                            id={`itemList[${index}].price`}
                            name={`itemList[${index}].price`}
                            type="number"
                            size="small"
                            placeholder="Enter Price"
                            value={formik.values.itemList[index].price}
                            onChange={(e) => handleChangeItemValue(e, index)}
                            error={formik.touched.itemList && formik.errors.itemList && Boolean(formik.errors.itemList[index]?.price)}
                            helperText={formik.touched.itemList && formik.errors.itemList && formik.errors.itemList[index]?.price}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid itemxs={12} md={2} lg={2}>
                        <FormControl fullWidth style={{ margin: '10px' }}>
                          <TextField
                            id={`itemList[${index}].total`}
                            name={`itemList[${index}].total`}
                            type="number"
                            size="small"
                            placeholder="Total"
                            value={formik.values.itemList[index].quantity * formik.values.itemList[index].price}
                            readOnly
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                      <Grid itemxs={12} md={1} lg={1}>
                        <Button
                          onClick={() => {
                            handleRemoveItem(index);
                          }}
                          size="small"
                          style={{ marginTop: '15px', marginLeft: '15px' }}
                          variant="text"
                          startIcon={<DeleteIcon />}
                        ></Button>
                      </Grid>
                    </Grid>
                  </>
                );
              })}
              <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px' }}>
                <Grid item xs={12} md={12} lg={12}>
                  <Button variant="outlined" fullWidth onClick={handleAddItem} style={{ color: 'black', border: '1px ddotted black' }}>
                    <AiOutlinePlus style={{ margin: '5px' }} /> Add Field
                  </Button>
                </Grid>
              </Grid>
              <Divider orientation="horizontal" style={{ margin: '20px', marginTop: '5px', marginBottom: '5px' }} />
            </Box>
            <Box>
              <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'top', padding: '20px' }}>
                <Grid item xs={12} md={6} lg={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'start' }}>
                  <Button type="submit" variant="contained">
                    <AiOutlinePlus /> Save
                  </Button>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Grid
                    spacing={2}
                    container
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '20px' }}
                  >
                    <Grid item xs={12} md={4} lg={4} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                      <FormLabel>Sub Total : </FormLabel>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField
                        id="subTotal"
                        name="subTotal"
                        type="number"
                        size="small"
                        placeholder="Enter Sub Total"
                        value={formik.values.subTotal}
                        onChange={formik.handleChange}
                        error={formik.touched.subTotal && Boolean(formik.errors.subTotal)}
                        helperText={formik.touched.subTotal && formik.errors.subTotal}
                        fullWidth
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '20px' }}
                  >
                    <Grid item xs={12} md={4} lg={4}>
                      <FormControl fullWidth>
                        <Select
                          id="tax"
                          name="tax"
                          size="small"
                          value={formik.values.tax}
                          onChange={handleTaxChange}
                          error={formik.touched.tax && Boolean(formik.errors.tax)}
                        >
                          {taxData.length > 0 ? (
                            taxData.map((tax, index) => (
                              <MenuItem value={tax._id} key={index + 1}>
                                {tax.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="">No lead found</MenuItem>
                          )}
                        </Select>
                        {formik.touched.tax && formik.errors.tax && <Typography color="error">{formik.errors.tax}</Typography>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField
                        name="taxAmount"
                        type="number"
                        size="small"
                        aria-readonly={true}
                        fullWidth
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        value={formik.values.taxAmount}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '20px' }}
                  >
                    <Grid item xs={12} md={4} lg={4} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                      <FormLabel>Total : </FormLabel>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <TextField
                        id="grandTotal"
                        name="grandTotal"
                        type="number"
                        size="small"
                        placeholder="Enter Grand Total"
                        value={formik.values.grandTotal}
                        onChange={formik.handleChange}
                        error={formik.touched.grandTotal && Boolean(formik.errors.grandTotal)}
                        helperText={formik.touched.grandTotal && formik.errors.grandTotal}
                        fullWidth
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Card>
    </>
  );
}

export default CreateOffer;
