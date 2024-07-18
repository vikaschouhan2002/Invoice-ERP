/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// @mui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Stack,
  TablePagination,
  Button,
  Divider,
  styled,
  tableCellClasses,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Popover,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { AiOutlineEye, AiTwotoneEdit, AiOutlineDelete, AiOutlineFilePdf, AiOutlineCreditCard } from 'react-icons/ai';
import Iconify from '../../ui-component/iconify';
import SearchIcon from '@mui/icons-material/Search';
import { getDataAPI } from 'hooks/getAPI';
import { getUser } from 'common/getUser';
import ActionsPopover from 'views/ActionPopover/Actionpopover';
import Swal from 'sweetalert2';
import axios from 'axios';
import { backendURL } from 'assets/url/url';

// ----------------------------------------------------------------------

const Offer = () => {
  const navigate = useNavigate();
  const [offerData, setOfferData] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

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

  const show = (id) => {
    navigate(`/dashboard/offer/read/${id}`);
  };

  const update = (id) => {
    navigate(`/dashboard/offer/update/${id}`);
  };

  const download = (id) => {
    alert(`Download ${id}`);
  };

  const payment = (id) => {
    navigate(`/dashboard/invoice/pay/${id}`);
  };

  const deleteData = async (e) => {
    e.stopPropagation();
    try {
      const shouldDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Offer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (shouldDelete.isConfirmed) {
        const response = await axios.delete(`${backendURL}/offer/deleteOffer/${rowData._id}`);
        if (response.status === 200) {
          Swal.fire('Deleted!', 'Your Offer has been deleted.', 'success');
          fetchData(getUser());
          return null;
        } else {
          Swal.fire('Error', 'Failed to delete lead. Please try again later.', 'error');
          return null;
        }
      } else {
        Swal.fire('Cancelled', 'Your Offer is safe', 'info');
        return null;
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete Offer. Please try again later.', 'error', 3000);
      throw error;
    }
  };

  const fetchData = async (user) => {
    try {
      const response = await getDataAPI('offer', `getOffer?createdBy=${user._id}`);
      if (response.status === 200) {
        console.log('response status offer : ', response.data.offerData);
        setOfferData(response.data.offerData);
        setTotalRecords(response.data.totalRecords);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };
  useEffect(() => {
    fetchData(getUser());
  }, []);

  return (
    <>
      <Container style={{ padding: '0px' }}>
        <Card style={{ backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <div className="bg-light">
              <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Grid item xs={6}>
                  <h2>Offer List</h2>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Grid item marginTop={1.25}>
                      <TextField
                        size="small"
                        placeholder="Search"
                        InputProps={{
                          startAdornment: <SearchIcon color="action" />,
                          style: {
                            height: '30px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item marginTop={1.25}>
                      <Button variant="outlined" size="small" startIcon={<Iconify icon="mdi:refresh" />}>
                        Refresh
                      </Button>
                    </Grid>
                    <Grid item marginTop={1.25}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          navigate('/dashboard/offer/create');
                        }}
                      >
                        Add New Offer
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div>
                <Paper sx={{ width: 'auto', marginTop: '10px' }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 'auto' }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">Number</StyledTableCell>
                          <StyledTableCell align="center">Company</StyledTableCell>
                          <StyledTableCell align="center">Date</StyledTableCell>
                          <StyledTableCell align="center">Total</StyledTableCell>
                          <StyledTableCell align="center">Note</StyledTableCell>
                          <StyledTableCell align="center">Status</StyledTableCell>
                          <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {offerData?.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="center">{row?.number}</StyledTableCell>
                              <StyledTableCell align="center">
                                {row?.lead.type == 'People'
                                  ? row?.lead?.people?.firstName + ' ' + row?.lead?.people?.lastName
                                  : row?.lead?.company?.name}
                              </StyledTableCell>
                              <StyledTableCell align="center">{row?.startDate}</StyledTableCell>
                              <StyledTableCell align="center">{row?.grandTotal}</StyledTableCell>
                              <StyledTableCell align="center">{row?.note}</StyledTableCell>
                              <StyledTableCell align="center">{row?.status}</StyledTableCell>
                              <StyledTableCell align="center">
                                <ActionsPopover
                                  c_role="offer"
                                  row={row}
                                  show={show}
                                  setRowData={setRowData}
                                  update={update}
                                  download={download}
                                  payment={payment}
                                  deleteData={deleteData}
                                />
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

export default Offer;
