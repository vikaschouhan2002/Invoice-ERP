import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { tableCellClasses } from '@mui/material/TableCell';
import Iconify from '../../ui-component/iconify';
import { backendURL } from 'assets/url/url';
import { getDataAPI } from 'hooks/getAPI';
import CustomerDrawer from './CustomerDrawer';
import ActionsPopover from 'views/ActionPopover/Actionpopover';
import { Table, TableBody, TableCell, TableContainer, CardContent, Input, TableHead, TableRow, Paper, Container, Typography, Stack, TablePagination, Button, Divider, Card } from '@mui/material';
import { getUser } from '../../common/getUser'


const Customer = () => {
  const [mode, setMode] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [rowData, setRowData] = useState()
  const [clientData, setClientData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClickOpen = () => setOpenDialog(true);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleSetMode = (newmode) => setMode(newmode);

  useEffect(() => {
    fetchData(getUser());
  }, [openAdd]);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleSearch = useCallback(debounce((value) => {
    setSearchTerm(value);
  }, 300), []);


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#808080',
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  const deleteData = async (e) => {
    e.stopPropagation();
    try {
      const shouldDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this client!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (shouldDelete.isConfirmed) {
        const response = await axios.delete(`${backendURL}/client/deleteClient/${rowData._id}`);
        if (response.status === 200) {
          Swal.fire('Deleted!', 'Your client has been deleted.', 'success');
          fetchData(getUser());
          return null;
        } else {
          Swal.fire('Error', 'Failed to delete client. Please try again later.', 'error');
          return null;
        }
      } else {
        Swal.fire('Cancelled', 'Your client is safe :)', 'info');
        return null;
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete client. Please try again later.', 'error', 3000);
      throw error;
    }
  };

  const fetchData = async (user) => {
    try {
      const response = await getDataAPI("client", `getClient?createdBy=${user._id}`);
      if (response.status === 200)
        setClientData(response.data.clientData);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.log("error : ", error);
    }
  }


  return (
    <>
      <CustomerDrawer fetchData={fetchData} handleSetMode={handleSetMode} setRowData={setRowData} open={openAdd} handleClose={handleCloseAdd} mode={mode} deleteData={deleteData} data={rowData} />
      <Container style={{ padding: '0px' }}>
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <div className='bg-light'>
              <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Grid item>
                  <h2>Client List</h2>
                </Grid>
                <Grid item >
                  <Grid container spacing={2}>
                    <Grid>
                      <TextField size='small'
                        placeholder="Search"
                        InputProps={{
                          startAdornment: (
                            <SearchIcon color="action" />
                          ),
                          style: {
                            height: '30px',
                          },
                        }}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </Grid>
                    <Grid>
                      <Button variant="outlined" size="small" startIcon={<Iconify icon="mdi:refresh" />}>
                        Refresh
                      </Button>
                    </Grid>
                    <Grid>
                      <Button variant="contained" size="small" onClick={() => { setMode('add'); handleOpenAdd() }}>
                        Add New Client
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div>
                <Paper sx={{ width: 'auto', marginTop: '10px', height: 'auto' }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 'auto' }} aria-label="customized table">
                      <TableHead sx={{ "& .css-buyxz3-MuiTableCell-root": { padding: '10px !important' } }}>
                        <TableRow>
                          <StyledTableCell align="center">Type</StyledTableCell>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">Country</StyledTableCell>
                          <StyledTableCell align="center">Phone</StyledTableCell>
                          <StyledTableCell align="center">Email</StyledTableCell>
                          <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ "& .css-1k81cpr-MuiTableCell-root": { padding: '5px !important' } }}>
                        {clientData
                          .filter(client =>
                            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            client.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            client.phone.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((row, index) => {
                            return (
                              <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell align='center' sx={{ height: '25px!important' }}> {row.type}</StyledTableCell>
                                <StyledTableCell align='center' sx={{ height: '25px!important' }}>{row.name}</StyledTableCell>
                                <StyledTableCell align='center' sx={{ height: '25px!important' }}>{row.country}</StyledTableCell>
                                <StyledTableCell align='center' sx={{ height: '25px!important' }}>{row.email}</StyledTableCell>
                                <StyledTableCell align='center' sx={{ height: '25px!important' }}>{row.phone}</StyledTableCell>
                                <StyledTableCell align='center' sx={{ height: '25px!important' }}>
                                  <ActionsPopover c_role="Customer" row={row} handleSetMode={handleSetMode} deleteData={deleteData} setRowData={setRowData} handleClickOpen={handleClickOpen} handleOpenAdd={handleOpenAdd} />
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totalRecords}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value, 10));
                      setPage(0);
                    }}
                  />
                </Paper>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Customer;
