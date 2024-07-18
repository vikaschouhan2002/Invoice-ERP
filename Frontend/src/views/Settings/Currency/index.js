import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Table, TableBody, TableCell, Grid, TableContainer, CardContent, Input, Switch, TableHead, TableRow, Paper, Container, Typography, Stack, TablePagination, Button, Divider, Card } from '@mui/material';
import Iconify from '../../../ui-component/iconify';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import ActionsPopover from 'views/ActionPopover/Actionpopover';
import CurrecyDrwaer from './CurrencyDrawer';
import { getDataAPI } from 'hooks/getAPI';
import { backendURL } from 'assets/url/url';
import { getUser } from 'common/getUser';


const Currency = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [rowData, setRowData] = useState({});
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [mode, setMode] = useState('');
    const [openAdd, setOpenAdd] = useState(false);
    const [currencyData, setCurrencyData] = useState([]);


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

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleSetMode = (newmode) => setMode(newmode);

    const fetchData = async (user) => {
        try {
            const response = await getDataAPI("currency", `getCurrencies?createdBy=${user._id}`);
            if (response.status === 200) {
                console.log("response : ", response);
                setCurrencyData(response.data.currencyData);
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
                text: 'You will not be able to recover this Currency!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (shouldDelete.isConfirmed) {
                const response = await axios.delete(`${backendURL}/currency/deleteCurrency/${rowData._id}`);
                if (response.status === 200) {
                    Swal.fire('Deleted!', 'Your people has been Currency.', 'success');
                    fetchData(getUser());
                    return null;
                } else {
                    Swal.fire('Error', 'Failed to delete Currency. Please try again later.', 'error');
                    return null;
                }
            } else {
                Swal.fire('Cancelled', 'Your Currency is safe :)', 'info');
                return null;
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to delete Currency. Please try again later.', 'error', 3000);
            throw error;
        }
    };
    useEffect(() => {
        fetchData(getUser());
    }, [openAdd]);
    return (
        <>
            <CurrecyDrwaer fetchData={fetchData} open={openAdd} handleClose={handleCloseAdd} handleSetMode={handleSetMode} setRowData={setRowData} mode={mode} deleteData={deleteData} data={rowData} />
            <Container style={{ padding: '0px' }}>
                <Card style={{ backgroundColor: '#FFFFFF' }}>
                    <CardContent>
                        <div className='bg-light'>
                            <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                <Grid item>
                                    <h2>Currecy List</h2>
                                </Grid>
                                <Grid item >
                                    <Grid container spacing={2}>
                                        <Grid item>
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
                                        <Grid item>
                                            <Button variant="outlined" size="small" startIcon={<Iconify icon="mdi:refresh" />}>
                                                Refresh
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" size="small" onClick={() => { setMode('add'); handleOpenAdd() }}>
                                                Add New Currecy
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
                                                    <StyledTableCell align="center">Currency Name</StyledTableCell>
                                                    <StyledTableCell align="center">Currency Symbol</StyledTableCell>
                                                    <StyledTableCell align="center">Currency Position</StyledTableCell>
                                                    <StyledTableCell align="center">Decimal Separator</StyledTableCell>
                                                    <StyledTableCell align="center">Thousand Separator</StyledTableCell>
                                                    <StyledTableCell align="center">Cent Precision</StyledTableCell>
                                                    <StyledTableCell align="center">Zero Format</StyledTableCell>
                                                    <StyledTableCell align="center">Enabled</StyledTableCell>
                                                    <StyledTableCell align="center">Action</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ "& .css-1wb42bh-MuiTableCell-root": { padding: '5px !important' } }}>
                                                {currencyData.map((row, index) => {
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell align='center'>{row.currencyName}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.currencySymbol}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.currencyPosition}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.decimalSeparator}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.thousandSeparator}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.centPrecision}</StyledTableCell>
                                                            <StyledTableCell align='center'>
                                                                <Switch checked={row.zeroFormate} disabled={true} />
                                                            </StyledTableCell>
                                                            <StyledTableCell align='center'>
                                                                <Switch checked={row.isEnabled} disabled={true} />
                                                            </StyledTableCell>
                                                            <StyledTableCell align='center'>
                                                                <ActionsPopover c_role="currency" row={row} handleSetMode={handleSetMode} setRowData={setRowData} deleteData={deleteData} handleClickOpen={handleClickOpen} handleOpenAdd={handleOpenAdd} />
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
    )
}

export default Currency;