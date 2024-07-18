/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useState } from 'react';
// @mui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Stack, TablePagination, Button, Divider } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import Popover from '@mui/material/Popover';
import { AiOutlineEye } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PeopleDrawer from './PeopleDrawer';
import { useEffect } from 'react';
import { backendURL } from 'assets/url/url';
import { getDataAPI } from 'hooks/getAPI';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Input from '@mui/material/Input';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import ActionsPopover from 'views/ActionPopover/Actionpopover';
import { getUser } from '../../common/getUser'
import Swal from 'sweetalert2';

// ----------------------------------------------------------------------

const People = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState()
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [peopleData, setPeopleData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleSetMode = (newMode) => setMode(newMode);

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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  const deleteData = async (e) => {
    e.stopPropagation();
    try {
      const shouldDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this people!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (shouldDelete.isConfirmed) {
        const response = await axios.delete(`${backendURL}/people/deletePeopleData/${rowData._id}`);
        if (response.status === 200) {
          Swal.fire('Deleted!', 'Your people has been deleted.', 'success');
          fetchData(getUser());
          return null;
        } else {
          Swal.fire('Error', 'Failed to delete people. Please try again later.', 'error');
          return null;
        }
      } else {
        Swal.fire('Cancelled', 'Your people is safe :)', 'info');
        return null;
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete people. Please try again later.', 'error', 3000);
      throw error;
    }
  };

  const fetchData = async (user) => {
    try {
      const response = await getDataAPI("people", `getPeopleData?createdBy=${user._id}`);
      if (response.status === 200) {
        console.log("response ======> ", response.data);
        setPeopleData(response.data.peopleData);
        setTotalRecords(response.data.totalRecords);

      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  useEffect(() => {
    fetchData(getUser());
  }, [openAdd]);
  return (
    <>
      <PeopleDrawer fetchData={fetchData} open={openAdd} handleClose={handleCloseAdd}  handleSetMode={handleSetMode} setRowData={setRowData} mode={mode} deleteData={deleteData} data={rowData} />
      <Container style={{ padding: '0px' }}>
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <div className='bg-light'>
              <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Grid item>
                  <h2>People List</h2>
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
                            height: '30px', // Adjust the height here
                          },
                        }} />
                    </Grid>
                    <Grid>
                      <Button variant="outlined" size="small" startIcon={<Iconify icon="mdi:refresh" />}>
                        Refresh
                      </Button>
                    </Grid>
                    <Grid>
                      <Button variant="contained" size='small' onClick={() => { setMode('add'); handleOpenAdd() }}>
                        Add New Person
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div>
                <Paper sx={{ width: 'auto', marginTop: '10px' }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 'auto' }} aria-label="customized table">
                      <TableHead sx={{ "& .css-buyxz3-MuiTableCell-root": { padding: '10px !important' } }}>
                        <TableRow>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">Country</StyledTableCell>
                          <StyledTableCell align="center">Company</StyledTableCell>
                          <StyledTableCell align="center">Email</StyledTableCell>
                          <StyledTableCell align="center">Phone</StyledTableCell>
                          <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ "& .css-1wb42bh-MuiTableCell-root": { padding: '5px !important' } }}>
                        {peopleData.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell align='center'>{row.firstName + " " + row.lastName}</StyledTableCell>
                              <StyledTableCell align='center'>{row.country}</StyledTableCell>
                              <StyledTableCell align='center'>{row.company ? row.company : '---'}</StyledTableCell>
                              <StyledTableCell align='center'>{row.email}</StyledTableCell>
                              <StyledTableCell align='center'>{row.phone}</StyledTableCell>
                              <StyledTableCell align='center'>
                                <ActionsPopover c_role="People" row={row} handleSetMode={handleSetMode} setRowData={setRowData} deleteData={deleteData} handleClickOpen={handleClickOpen} handleOpenAdd={handleOpenAdd} />
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

export default People;
