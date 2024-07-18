// import React, { useState } from 'react';
// import { Stack, Button, Container, Typography, Card, Box, Divider } from '@mui/material';
// import TableStyle from '../../ui-component/TableStyle';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useNavigate } from 'react-router';
// // ----------------------------------------------------------------------

// const emailData = [
//     {
//         id: 1,
//         number: '62',
//         client: 'Max Mustermann',
//         amount: "15",
//         date: '17/03/2024',
//         number1: '214',
//         year: "2024",
//         paymentMode: "Gpay"
//     }
// ];
// const Payment = () => {
//     const navigate = useNavigate();
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//     const open = Boolean(anchorEl);
//     const id = open ? 'simple-popover' : undefined;
//     const [openDialog, setOpenDialog] = React.useState(false);
//     const [paymentName, setPaymentName] = useState('');
// const handleClickOpen = () => {
//     setOpenDialog(true);
// };
// const handleCloseDialog = () => {
//     setOpenDialog(false);
// };

//     const columns = [
//         {
//             field: 'number',
//             headerName: 'Number',
//             flex: 1,
//             cellClassName: 'name-column--cell name-column--cell--capitalize'
//         },
//         {
//             field: 'client',
//             headerName: 'Client',
//             flex: 1,
//             cellClassName: 'name-column--cell--capitalize'
//         },
//         {
//             field: 'amount',
//             headerName: 'Amount',
//             flex: 1
//         },
//         {
//             field: 'date',
//             headerName: 'Date',
//             flex: 1
//         },
//         {
//             field: 'number1',
//             headerName: 'Number',
//             flex: 1
//         },
//         {
//             field: 'year',
//             headerName: 'Year',
//             flex: 1
//         },
//         {
//             field: 'paymentMode',
//             headerName: 'Payment Mode',
//             flex: 1
//         },
//         {
//             field: 'action',
//             headerName: 'Action',
//             flex: 1,
//             renderCell: (params) => {
//                 return (
//                     <>
//                         <Button aria-describedby={id} onClick={handleClick} variant='text' color='info'>
//                             ...
//                         </Button>
//                         {
//                             open ? <Popover
//                                 id={id}
//                                 open={open}
//                                 anchorEl={anchorEl}
//                                 onClose={handleClose}
//                                 anchorOrigin={{
//                                     vertical: 'bottom',
//                                     horizontal: 'left',
//                                 }}
//                             >
//                                 <Typography id="show" onClick={() => { handleClose(); handleShowComponent(params.row.id) }} sx={{ p: 1, cursor: "pointer" }}><AiOutlineEye /> Show</Typography>
//                                 <Typography id="edit" onClick={() => { handleClose(); handleUpdateComponent(params.row.id) }} sx={{ p: 1, cursor: "pointer" }} ><AiTwotoneEdit /> Edit</Typography>
//                                 <Typography id="download" onClick={() => { handleClose(); handleDownloadComponent(params.row.id) }} sx={{ p: 1, cursor: "pointer" }} ><AiOutlineFilePdf /> Download</Typography>
//                                 <Divider orientation='horizontal' />
//                                 <Typography id="delete" onClick={() => { setPaymentName(params.row.client); handleClose(); handleClickOpen() }} sx={{ p: 1, cursor: "pointer" }}><AiOutlineDelete /> Delete</Typography>
//                             </Popover> : null
//                         }
//                     </>

//                 );
//             }
//         }
//     ];
//     return (
//         <>
//             <Container>
//                 <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
//                     <Typography variant="h4">Payment List</Typography>
//                     {/* <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
//                         <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
//                             Add New Quote
//                         </Button>
//                     </Stack> */}
//                 </Stack>
//                 <TableStyle>
//                     <Box width="100%">
//                         <Card style={{ height: '600px', paddingTop: '15px' }}>
//                             <DataGrid
//                                 rows={emailData}
//                                 columns={columns}
//                                 checkboxSelection
//                                 getRowId={(row) => row.id}
//                                 slots={{ toolbar: GridToolbar }}
//                                 slotProps={{ toolbar: { showQuickFilter: true } }}
//                             />
//                         </Card>
//                     </Box>
//                 </TableStyle>
//             </Container>
//             <Dialog
//                 open={openDialog}
//                 onClose={handleCloseDialog}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle variant='h3' id="alert-dialog-title">
//                     Remove Item        </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         Do you want delete : {paymentName}
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button variant='outlined' onClick={handleCloseDialog}>Cancel</Button>
//                     <Button variant='contained' onClick={handleCloseDialog} autoFocus>
//                         OK
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };

// export default Payment;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Unstable_Grid2';
import Iconify from '../../ui-component/iconify'
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {
    Table, TableBody, TableCell,
    TableContainer, CardContent, Input,
    Switch, TableHead, TableRow, Paper,
    Container, Typography, Stack, Card,
    TablePagination, Button, Divider
} from '@mui/material';
import { AiOutlineEye } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineFilePdf } from "react-icons/ai";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { getDataAPI } from 'hooks/getAPI';
import { backendURL } from 'assets/url/url';
import { getUser } from 'common/getUser';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
const Payment = () => {
    const navigate = useNavigate();
    const [openAdd, setOpenAdd] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [mode, setMode] = useState('');
    const [rowData, setRowData] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [paymodeData, setPayModeData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleSetMode = (newmode) => setMode(newmode);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleShowComponent = (id) => {
        navigate(`/dashboard/payment/read/${id}`);
    }
    const handleUpdateComponent = (id) => {
        navigate(`/dashboard/payment/update/${id}`);
    }
    const handleDownloadComponent = (id) => {
        alert(`Download ${id}`);
    }

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

    const fetchData = async (user) => {
        try {
            const response = await getDataAPI("paymentmode", `getModes?createdBy=${user._id}`);
            if (response.status === 200) {
                setPayModeData(response.data.payementmodeData);
                setTotalRecords(response.data.totalRecords);
            }
        } catch (error) {
            console.log("error : ", error);
        }
    }

    const deleteData = async (e) => {
        e.stopPropagation();
        try {
            const shouldDelete = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this  payment mode!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (shouldDelete.isConfirmed) {
                const response = await axios.delete(`${backendURL}/paymentmode/deleteMode/${rowData._id}`);
                if (response.status === 200) {
                    Swal.fire('Deleted!', 'Your people has been payment mode.', 'success');
                    fetchData(getUser());
                    return null;
                } else {
                    Swal.fire('Error', 'Failed to delete payment mode. Please try again later.', 'error');
                    return null;
                }
            } else {
                Swal.fire('Cancelled', 'Your  payment mode is safe :)', 'info');
                return null;
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to delete  payment mode. Please try again later.', 'error', 3000);
            throw error;
        }
    };

    useEffect(() => {
        fetchData(getUser());
    }, [openAdd]);
    return (
        <>
            <Container style={{ padding: '0px' }}>
                <Card style={{ backgroundColor: '#FFFFFF' }}>
                    <CardContent>
                        <div className='bg-light'>
                            <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Grid item>
                                    <h2>Payment List</h2>
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
                                    </Grid>
                                </Grid>
                            </Grid>
                            <div>
                                <Paper sx={{ width: 'auto', marginTop: '10px' }}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 'auto' }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">Name</StyledTableCell>
                                                    <StyledTableCell align="center">Description</StyledTableCell>
                                                    <StyledTableCell align="center">Default</StyledTableCell>
                                                    <StyledTableCell align="center">Enable</StyledTableCell>
                                                    <StyledTableCell align="center">Enable</StyledTableCell>
                                                    <StyledTableCell align="center">Enable</StyledTableCell>
                                                    <StyledTableCell align="center">Enable</StyledTableCell>
                                                    <StyledTableCell align="center">Action</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {paymodeData.map((row, index) => {
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell align='center'>{row.name}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.description}</StyledTableCell>
                                                            <StyledTableCell align='center'><Switch disabled={true} checked={row.invoiceNumber} /></StyledTableCell>
                                                            <StyledTableCell align='center'><Switch disabled={true} checked={row.isEnabled} /></StyledTableCell>
                                                            <StyledTableCell align='center'><Switch disabled={true} checked={row.isEnabled} /></StyledTableCell>
                                                            <StyledTableCell align='center'><Switch disabled={true} checked={row.isEnabled} /></StyledTableCell>
                                                            <StyledTableCell align='center'><Switch disabled={true} checked={row.isEnabled} /></StyledTableCell>
                                                            <StyledTableCell align='center'>
                                                                <Button aria-describedby={id} onClick={handleClick} variant='text' color='info'>...</Button>
                                                                <Box>
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
                                                                            <Typography id="show" onClick={() => { handleClose(); handleShowComponent(row?._id) }} sx={{ p: 1, cursor: "pointer" }}><AiOutlineEye /> Show</Typography>
                                                                            <Typography id="edit" onClick={() => { handleClose(); handleUpdateComponent(row?._id) }} sx={{ p: 1, cursor: "pointer" }} ><AiTwotoneEdit /> Edit</Typography>
                                                                            <Typography id="download" onClick={() => { handleClose(); handleDownloadComponent(row?._id) }} sx={{ p: 1, cursor: "pointer" }} ><AiOutlineFilePdf /> Download</Typography>
                                                                            <Divider orientation='horizontal' />
                                                                            <Typography id="delete" onClick={() => { setPaymentName(params.row.client); handleClose(); handleClickOpen() }} sx={{ p: 1, cursor: "pointer" }}><AiOutlineDelete /> Delete</Typography>
                                                                        </Popover> : null
                                                                    }
                                                                </Box>

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
            </Container >
        </>
    );
};

export default Payment;
