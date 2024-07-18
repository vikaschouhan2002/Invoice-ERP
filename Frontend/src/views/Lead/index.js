import { useState, useEffect } from 'react';
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, CardContent, Input, TableHead, TableRow, Paper, Container, Typography, Stack, TablePagination, Button, Divider, Card } from '@mui/material';
import Iconify from '../../ui-component/iconify';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { tableCellClasses } from '@mui/material/TableCell';
import LeadDrawer from './LeadDrawer';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import Swal from 'sweetalert2';
import { getDataAPI } from 'hooks/getAPI';
import ActionsPopover from 'views/ActionPopover/Actionpopover';
import { getUser } from '../../common/getUser'


const Lead = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleSetMode = (newmode) => setMode(newmode);

  const [leadData, setLeadData] = useState([]);

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
        text: 'You will not be able to recover this lead!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (shouldDelete.isConfirmed) {
        const response = await axios.delete(`${backendURL}/lead/deleteLead/${rowData._id}`);
        if (response.status === 200) {
          Swal.fire('Deleted!', 'Your people has been deleted.', 'success');
          fetchData(getUser());
          return null;
        } else {
          Swal.fire('Error', 'Failed to delete lead. Please try again later.', 'error');
          return null;
        }
      } else {
        Swal.fire('Cancelled', 'Your lead is safe :)', 'info');
        return null;
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete lead. Please try again later.', 'error', 3000);
      throw error;
    }
  };

  const fetchData = async (user) => {
    try {
      const response = await getDataAPI("lead", `getLeads?createdBy=${user._id}`);
      if (response.status === 200) {
        setLeadData(response.data.leadData);
        setTotalRecords(response.data.totalRecords)

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
      <LeadDrawer fetchData={fetchData} open={openAdd} handleClose={handleCloseAdd}  handleSetMode={handleSetMode} setRowData={setRowData} mode={mode} deleteData={deleteData} data={rowData} />
      <Container style={{ padding: '0px' }}>
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <div className='bg-light'>
              <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Grid item>
                  <h2>Lead List</h2>
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
                        }} />
                    </Grid>
                    <Grid>
                      <Button variant="outlined" size="small" startIcon={<Iconify icon="mdi:refresh" />}>
                        Refresh
                      </Button>
                    </Grid>
                    <Grid>
                      <Button variant="contained" size="small" onClick={() => { setMode('add'); handleOpenAdd() }}>
                        Add New Lead
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
                          <StyledTableCell align="center">Type</StyledTableCell>
                          <StyledTableCell align="center">Name</StyledTableCell>
                          <StyledTableCell align="center">Status</StyledTableCell>
                          <StyledTableCell align="center">Source</StyledTableCell>
                          <StyledTableCell align="center">Country</StyledTableCell>
                          <StyledTableCell align="center">Phone</StyledTableCell>
                          <StyledTableCell align="center">Email</StyledTableCell>
                          <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ "& .css-1wb42bh-MuiTableCell-root": { padding: '5px !important' } }}>
                        {leadData.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell align='center'>{row.type}</StyledTableCell>
                              <StyledTableCell align='center'>{row.name}</StyledTableCell>
                              <StyledTableCell align='center'>{row.status}</StyledTableCell>
                              <StyledTableCell align='center'>{row.source}</StyledTableCell>
                              <StyledTableCell align='center'>{row.country}</StyledTableCell>
                              <StyledTableCell align='center'>{row.phone}</StyledTableCell>
                              <StyledTableCell align='center'>{row.email}</StyledTableCell>
                              <StyledTableCell align='center'>
                                <ActionsPopover c_role="Lead" row={row} handleSetMode={handleSetMode} setRowData={setRowData} deleteData={deleteData} handleClickOpen={handleClickOpen} handleOpenAdd={handleOpenAdd} />
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

export default Lead;
