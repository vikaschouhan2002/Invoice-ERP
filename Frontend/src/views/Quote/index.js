/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useState } from 'react';
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
import { useNavigate } from 'react-router';
// ----------------------------------------------------------------------

const emailData = [
  {
    id: 1,
    number: '62',
    client: '	Max Mustermann',
    date: '15/02/2024',
    expiredDate: '16/03/2024',
    subTotal: "$ 69.00",
    total: "$ 87.63",
    status: "Sent"
  }
];
const Quote = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [quoteName, setQuoteName] = useState('');
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleShowComponent = (id) => {
    navigate(`/dashboard/quote/read/${id}`);
  }
  const handleUpdateComponent = (id) => {
    navigate(`/dashboard/quote/update/${id}`);
  }
  const handleDownloadComponent = (id) => {
    alert(`Download ${id}`);
  }
  const columns = [
    {
      field: 'number',
      headerName: 'Number',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'client',
      headerName: 'Client',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1
    },
    {
      field: 'expiredDate',
      headerName: 'Expired Date',
      flex: 1
    },
    {
      field: 'subTotal',
      headerName: 'Sub Total',
      flex: 1
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        return (
          <>

            <Button aria-describedby={id} onClick={handleClick} variant='text' color='info'>
              ...
            </Button>
            {
              open ? <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography id="show" onClick={() => { handleClose(); handleShowComponent(params.row.id) }} sx={{ p: 1, cursor: "pointer" }}><AiOutlineEye /> Show</Typography>
                <Typography id="edit" onClick={() => { handleClose(); handleUpdateComponent(params.row.id) }} sx={{ p: 1, cursor: "pointer" }} ><AiTwotoneEdit /> Edit</Typography>
                <Typography id="download" onClick={() => { handleClose(); handleDownloadComponent(params.row.id) }} sx={{ p: 1, cursor: "pointer" }} ><AiOutlineFilePdf /> Download</Typography>
                <Divider orientation='horizontal' />
                <Typography id="delete" onClick={() => { setQuoteName(params.row.client); handleClose(); handleClickOpen() }} sx={{ p: 1, cursor: "pointer" }}><AiOutlineDelete /> Delete</Typography>
              </Popover> : null
            }
          </>

        );
      }
      // eslint-disable-next-line arrow-body-style
    }
  ];
  return (
    <>

      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Quote List</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => {
              navigate('/dashboard/quote/create');
            }}>
              Add New Quote
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={emailData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant='h3' id="alert-dialog-title">
          Remove Item        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete : {quoteName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleCloseDialog}>Cancel</Button>
          <Button variant='contained' onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Quote;
