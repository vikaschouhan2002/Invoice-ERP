/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
// @mui
import { Stack, Button, Container, Typography, Card, Box, Divider } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import Popover from '@mui/material/Popover';
import { AiOutlineEye } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineFilePdf } from "react-icons/ai";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AiOutlineCreditCard } from "react-icons/ai";
import { getDataAPI } from 'hooks/getAPI';
import { deleteAPI } from 'hooks/deleteAPI';

// ----------------------------------------------------------------------

const Invoice = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverId, setPopoverId] = React.useState(null); // Unique popover ID
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setPopoverId(id); // Set the popover ID when clicking the button
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const [invoiceData, setInvoiceData] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleShowComponent = (id) => {
    navigate(`/dashboard/invoice/read/${id}`);
  }
  const handleUpdateComponent = (id) => {
    navigate(`/dashboard/invoice/update/${id}`);
  }
  const handleDownloadComponent = (id) => {
    alert(`Download ${id}`);
  }
  const handleRecordPaymentComponent = (id) => {
    navigate(`/dashboard/invoice/pay/${id}`);
  }

  const handleDeleteInvoice = async (id) => {
    try {
      const shouldDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this invoice!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (shouldDelete.isConfirmed) {
        const response = await deleteAPI("invoice", `deleteInvoice/${id}`);
        if (response.status === 200) {
          const deletedInvoice = response.data.deletedInvoice;
          Swal.fire('Deleted!', 'Your invoice has been deleted.', 'success');
          console.log('Deleted Invoice:', deletedInvoice);
          return deletedInvoice;
        } else {
          Swal.fire('Error', 'Failed to delete invoice. Please try again later.', 'error');
          console.error('Error deleting invoice:', response.data.message || 'Unknown error');
          return null;
        }
      } else {
        Swal.fire('Cancelled', 'Your invoice is safe :)', 'info');
        return null;
      }
    } catch (error) {
      console.error(`Error deleting invoice with ID ${id}`, error);
      Swal.fire('Error', 'Failed to delete invoice. Please try again later.', 'error',3000);
      throw error;
    }
  };

  const columns = [
    {
      field: 'invoiceNumber',
      headerName: 'Number',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'client',
      headerName: 'Client',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      valueGetter: (params) => params?.row?.client?.type == 'People' ? params?.row?.client?.People?.firstName + " " + params?.row?.client?.People?.lastName : params?.row?.client?.Company?.name
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 1
    },
    {
      field: 'expiryDate',
      headerName: 'Expired Date',
      flex: 1
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1
    },
    {
      field: 'paid',
      headerName: 'Paid',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1
    },
    {
      field: 'payment',
      headerName: 'Payment',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Created By',
      flex: 1,
      valueGetter: (params) => params?.row?.createdBy?.First_Name + " " + params?.row?.createdBy?.Last_Name

    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        return (
          <>

            <Button aria-describedby={popoverId} onClick={(event) => handleClick(event, params.row._id)} variant='text' color='info'>
              ...
            </Button>
            {
              open && popoverId === params.row._id ? (<Popover
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography id="show" onClick={() => { handleClose(); handleShowComponent(params.row._id) }} sx={{ p: 1, cursor: "pointer" }}><AiOutlineEye /> Show</Typography>
                <Typography id="edit" onClick={() => { handleClose(); handleUpdateComponent(params.row._id) }} sx={{ p: 1, cursor: "pointer" }} ><AiTwotoneEdit /> Edit</Typography>
                <Typography id="download" onClick={() => { handleClose(); handleDownloadComponent(params.row._id) }} sx={{ p: 1, cursor: "pointer" }} ><AiOutlineFilePdf /> Download</Typography>
                <Typography id="payment" onClick={() => { handleClose(); handleRecordPaymentComponent(params.row._id) }} sx={{ p: 1, cursor: "pointer" }} ><AiOutlineCreditCard /> Record Payment</Typography>
                <Divider orientation='horizontal' />
                <Typography id="delete" onClick={() => { handleClose(); handleDeleteInvoice(params.row._id) }} sx={{ p: 1, cursor: "pointer" }}><AiOutlineDelete /> Delete</Typography>
              </Popover>) : null
            }

          </>

        );
      }
      // eslint-disable-next-line arrow-body-style
    }

  ];

  const getInvoiceData = async () => {
    try {
      const response = await getDataAPI("invoice", "getInvoice");
      if (response.status === 200)
        console.log("response.data.InvoiceData----->", response.data.InvoiceData);
      setInvoiceData(response.data.InvoiceData);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  useEffect(() => {
    getInvoiceData();
  }, []);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Invoice List</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => {
              navigate('/dashboard/invoice/create');
            }}>
              Add New Invoice
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <DataGrid
              rows={invoiceData}
              columns={columns}
              disableRowSelectionOnClick
              disableColumnMenu
              getRowId={(row) => row._id}
            />
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Invoice;
