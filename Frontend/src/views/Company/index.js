import { useState, useEffect } from 'react';
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Stack, TablePagination, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Iconify from '../../ui-component/iconify';
import CompanyDrawer from './CompanyDrawer';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import { tableCellClasses } from '@mui/material/TableCell';
import Swal from 'sweetalert2';
import { getDataAPI } from 'hooks/getAPI';
import ActionsPopover from 'views/ActionPopover/Actionpopover';
import { getUser } from '../../common/getUser'
// ----------------------------------------------------------------------

const Call = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [rowData, setRowData] = useState({});
  const [rows, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Regular');
  const handleToggle = () => {
    setSelectedOption((prevOption) => (prevOption === 'Regular' ? 'Wholesale' : 'Regular'));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const columns = [
    { id: 'id', label: "ID", align: 'center', minWidth: 70 },
    { id: 'name', label: 'Name', align: 'center', minWidth: 170 },
    { id: 'contact', label: 'Contact', align: 'center', minWidth: 170 },
    { id: 'country', label: 'Country', align: 'center', minWidth: 170 },
    { id: 'phone', label: 'Phone', align: 'center', minWidth: 170 },
    { id: 'email', label: 'Email', align: 'center', minWidth: 170 },
    { id: 'website', label: 'Website', align: 'center', minWidth: 170 },
    { id: 'Action', label: 'Action', align: 'center', minWidth: 170 }
  ];

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

  const handleSetMode = (newMode) => setMode(newMode);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchData = async (user) => {
    try {
      const result = await getDataAPI("company", `getCompanyData?createdBy=${user._id}`);
      if (result.status === 200) {
        setData(result.data.companyData);
        setTotalRecords(result.data.totalRecords)
      }
    } catch (error) {
      console.log("error while fetching data : ", error);
    }
  }

  const deleteData = async (e) => {
    e.stopPropagation();
    try {
      const shouldDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this company!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (shouldDelete.isConfirmed) {
        const response = await axios.delete(`${backendURL}/company/deleteCompanyData/${rowData._id}`);
        if (response.status === 200) {
          Swal.fire('Deleted!', 'Your people has been company.', 'success');
          fetchData(getUser());
          return null;
        } else {
          Swal.fire('Error', 'Failed to delete company. Please try again later.', 'error');
          return null;
        }
      } else {
        Swal.fire('Cancelled', 'Your company is safe :)', 'info');
        return null;
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete company. Please try again later.', 'error', 3000);
      throw error;
    }
  };


  useEffect(() => {
    fetchData(getUser());
  }, []);

  return (
    <>
      <CompanyDrawer fetchData={fetchData} open={openAdd} handleClose={handleCloseAdd} handleSetMode={handleSetMode} setRowData={setRowData} mode={mode} deleteData={deleteData} data={rowData} />
      <Container style={{ padding: '0px' }}>
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <div className='bg-light'>
              <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Grid item>
                  <h2>Company List</h2>
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
                        Add New Company
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
                          <StyledTableCell align="center">Contact</StyledTableCell>
                          <StyledTableCell align="center">Country</StyledTableCell>
                          <StyledTableCell align="center">Phone</StyledTableCell>
                          <StyledTableCell align="center">Email</StyledTableCell>
                          <StyledTableCell align="center">Website</StyledTableCell>
                          <StyledTableCell align="center">Action</StyledTableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ "& .css-1wb42bh-MuiTableCell-root": { padding: '5px !important' } }}>
                        {rows.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              {columns.slice(1).map(
                                (
                                  column 
                                ) => (
                                  <StyledTableCell key={column.id} align={column.align}>
                                    {column.id === 'Action' ? (
                                      <ActionsPopover c_role="Company" row={row} handleSetMode={handleSetMode} setRowData={setRowData} deleteData={deleteData} handleClickOpen={handleClickOpen} handleOpenAdd={handleOpenAdd} />
                                    ) : (
                                      row[column.id]
                                    )
                                    }
                                  </StyledTableCell>
                                )
                              )}
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

export default Call;
