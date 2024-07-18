import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Divider } from '@mui/material';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { getDataAPI } from 'hooks/getAPI';

function ShowInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [offerData, setOfferData] = useState(null);

  const getInvoiceById = async (id) => {
    try {
      const response = await getDataAPI('offer', `getOfferById/${id}`);
      const offerData = response.data.offerData;
      setOfferData(offerData);
    } catch (error) {
      console.error(`Error fetching invoice with ID ${id}`, error);
    }
  };
  useEffect(() => {
    getInvoiceById(id);
  }, [id]);

  return (
    <>
      <Card>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Button
              onClick={() => {
                navigate('/dashboard/offer');
              }}
              size="small"
              style={{ marginTop: '15px', color: 'black' }}
            >
              <AiOutlineArrowLeft />
            </Button>
            <Typography style={{ marginTop: '15px', marginLeft: '-15px' }} variant="h4">
              Offer Leads # {offerData?.number}/{offerData?.year}
            </Typography>
            <Button size="small" variant="outlined" style={{ color: 'black', borderColor: 'black', margin: '10px' }}>
              {offerData?.status}
            </Button>
          </Grid>
          <Grid item xs={12} md={8} lg={8} style={{ display: 'flex', justifyContent: 'end', alignItems: 'end', textAlign: 'end' }}>
            <Button
              onClick={() => {
                navigate('/dashboard/invoice');
              }}
              style={{ margin: '5px', color: 'black', borderColor: 'black' }}
              variant="outlined"
            >
              <AiOutlineCloseCircle style={{ margin: '3px', marginLeft: '-3px' }} /> Close
            </Button>
            <Button style={{ margin: '5px', color: 'black', borderColor: 'black' }} variant="outlined">
              <AiOutlineFilePdf style={{ margin: '3px', marginLeft: '-3px' }} /> Download Pdf
            </Button>
            <Button style={{ margin: '5px', color: 'black', borderColor: 'black' }} variant="outlined">
              <AiOutlineMail style={{ margin: '3px', marginLeft: '-3px' }} /> Send By Email
            </Button>
            <Button
              onClick={() => {
                navigate('/dashboard/invoice/update/1');
              }}
              style={{ margin: '5px' }}
              variant="contained"
            >
              <AiOutlineEdit style={{ margin: '3px', marginLeft: '-3px' }} /> Edit
            </Button>
          </Grid>
        </Grid>

        <Grid spacing={2} style={{ margin: '10px', padding: '10px' }}>
          <Grid container xs={12} md={8} lg={8}>
            <Grid xs={12} md={2} lg={2}>
              <Typography style={{ color: 'gray' }} variant="h4">
                Status
              </Typography>
              <Typography variant="h2">{offerData?.status}</Typography>
            </Grid>
            <Grid xs={12} md={2} lg={2}>
              <Typography style={{ color: 'gray' }} variant="h4">
                Subtotal
              </Typography>
              <Typography variant="h2">${offerData?.subTotal}</Typography>
            </Grid>
            <Grid xs={12} md={2} lg={2}>
              <Typography style={{ color: 'gray' }} variant="h4">
                Total
              </Typography>
              <Typography variant="h2">${offerData?.grandTotal}</Typography>
            </Grid>
            <Grid xs={12} md={2} lg={2}>
              <Typography style={{ color: 'gray' }} variant="h4">
                Paid
              </Typography>
              <Typography variant="h2">${offerData?.paid ? offerData.paid : 0.0}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="horizontal" style={{ marginTop: '10px' }} />

        <Grid spacing={3} style={{ margin: '10px', padding: '10px' }}>
          <Typography style={{ marginBottom: '20px' }} variant="h4">
            Lead :
            {offerData?.lead?.type == 'People'
              ? ' ' + offerData?.lead?.people?.firstName + ' ' + offerData?.lead?.people?.lastName
              : offerData?.lead?.company?.country}
          </Typography>
          <Grid container xs={12} md={12} lg={12}>
            <Grid xs={12} md={4} lg={4}>
              <Typography style={{ color: 'gray' }} variant="h4">
                <span style={{ color: 'black' }}>Address : </span>
                {offerData?.lead?.type == 'People' ? ' ' + offerData?.lead?.people?.country : ' ' + offerData?.lead?.company?.name}
              </Typography>
            </Grid>
            <Grid xs={12} md={4} lg={4}>
              <Typography style={{ color: 'gray' }} variant="h4">
                <span style={{ color: 'black' }}>Email : </span>
                {offerData?.lead?.type == 'People' ? ' ' + offerData?.lead?.people?.email : ' ' + offerData?.lead?.company?.email}
              </Typography>
            </Grid>
            <Grid xs={12} md={4} lg={4}>
              <Typography style={{ color: 'gray' }} variant="h4">
                <span style={{ color: 'black' }}>Phone : </span>
                {offerData?.lead?.type == 'People' ? ' ' + offerData?.lead?.people?.phone : ' ' + offerData?.lead?.company?.phone}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Divider orientation="horizontal" style={{ marginTop: '10px' }} />

        <Grid spacing={3} style={{ margin: '10px', padding: '10px' }}>
          <Grid container xs={12} md={12} lg={12}>
            <Grid xs={12} md={1} lg={1}>
              <Typography style={{ color: 'black' }} variant="h4">
                S.no
              </Typography>
            </Grid>
            <Grid xs={12} md={5} lg={5}>
              <Typography style={{ color: 'black' }} variant="h4">
                Product
              </Typography>
            </Grid>
            <Grid xs={12} md={2} lg={2}>
              <Typography style={{ color: 'black' }} variant="h4">
                Price
              </Typography>
            </Grid>
            <Grid xs={12} md={2} lg={2}>
              <Typography style={{ color: 'black' }} variant="h4">
                Quantity
              </Typography>
            </Grid>
            <Grid xs={12} md={2} lg={2}>
              <Typography style={{ color: 'black' }} variant="h4">
                Total
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="horizontal" style={{ marginTop: '10px' }} />
        {offerData?.itemList.map((item, index) => (
          <>
            <Grid spacing={3} style={{ margin: '10px', padding: '10px' }}>
              <Grid container xs={12} md={12} lg={12} key={index}>
                <Grid xs={12} md={1} lg={1}>
                  <Typography style={{ color: 'black', fontWeight: '400' }} variant="h4">
                    {index + 1}
                  </Typography>
                </Grid>
                <Grid xs={12} md={5} lg={5}>
                  <Typography style={{ color: 'gray', fontWeight: '400' }} variant="h4">
                    <span style={{ color: 'black', fontWeight: '600' }}>{item.item}</span>
                    <br />
                    {item.description}
                  </Typography>
                </Grid>
                <Grid xs={12} md={2} lg={2}>
                  <Typography style={{ color: 'black' }} variant="h4">
                    ${item.price}
                  </Typography>
                </Grid>
                <Grid xs={12} md={2} lg={2}>
                  <Typography style={{ color: 'black' }} variant="h4">
                    {item.quantity}
                  </Typography>
                </Grid>
                <Grid xs={12} md={2} lg={2}>
                  <Typography style={{ color: 'black' }} variant="h4">
                    ${item.total}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="horizontal" style={{ marginTop: '10px' }} />
          </>
        ))}
        <Grid spacing={3} style={{ margin: '10px', padding: '10px' }}>
          <Grid container xs={12} md={12} lg={12}>
            <Grid xs={12} md={6} lg={6}></Grid>
            <Grid xs={12} md={2} lg={2}></Grid>
            <Grid xs={12} md={2} lg={2}>
              <Typography style={{ color: 'black' }} variant="h4">
                Sub Total :{' '}
              </Typography>
              <Typography style={{ color: 'black', marginTop: '10px' }} variant="h4">
                Tax Total ({offerData?.tax?.rate}%) :
              </Typography>
              <Typography style={{ color: 'black', marginTop: '10px' }} variant="h4">
                Total :{' '}
              </Typography>
            </Grid>
            <Grid xs={12} md={2} lg={2}>
              <Typography style={{ color: 'black' }} variant="h4">
                $ {offerData?.subTotal}
              </Typography>
              <Typography style={{ color: 'black', marginTop: '10px' }} variant="h4">
                {' '}
                $ {offerData?.taxAmount}
              </Typography>
              <Typography style={{ color: 'black', marginTop: '10px' }} variant="h4">
                $ {offerData?.grandTotal}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default ShowInvoice;
