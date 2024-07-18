import React, { useState, useEffect } from 'react';
// @mui
import { Table, TableBody, TableCell, TableContainer, CardContent, Input, Switch, TableHead, TableRow, Paper, Container, Typography, Stack, TablePagination, Button, Divider, Card } from '@mui/material';
import Iconify from '../../ui-component/iconify';
import ProductDrawer from './ProductDrawer';
import { getDataAPI } from 'hooks/getAPI';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Swal from 'sweetalert2';
import ActionsPopover from 'views/ActionPopover/Actionpopover';
import { getUser } from 'common/getUser';

const Products = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [productData, setProductData] = useState([]);
    const [mode, setMode] = useState('');
    const [rowData, setRowData] = useState({});
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    const handleSetMode = (newmode) => setMode(newmode);

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

    const fetchData = async (user) => {
        try {
            const response = await getDataAPI("product", `getProducts?createdBy=${user._id}`);
            if (response.status === 200) {
                setProductData(response.data.productData);
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
                text: 'You will not be able to recover this product!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            });

            if (shouldDelete.isConfirmed) {
                const response = await axios.delete(`${backendURL}/product/deleteProduct/${rowData._id}`);
                if (response.status === 200) {
                    Swal.fire('Deleted!', 'Your people has been product.', 'success');
                    fetchData(getUser());
                    return null;
                } else {
                    Swal.fire('Error', 'Failed to delete product. Please try again later.', 'error');
                    return null;
                }
            } else {
                Swal.fire('Cancelled', 'Your product  is safe :)', 'info');
                return null;
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to delete product. Please try again later.', 'error', 3000);
            throw error;
        }
    };

    useEffect(() => {
        fetchData(getUser());
    }, [openAdd]);

    return (
        <>
            <ProductDrawer fetchData={fetchData} open={openAdd} handleClose={handleCloseAdd} handleSetMode={handleSetMode} setRowData={setRowData} mode={mode} deleteData={deleteData} data={rowData} />
            <Container style={{ padding: '0px' }} >
                <Card style={{ backgroundColor: '#FFFFFF' }}>
                    <CardContent>
                        <div className='bg-light'>
                            <Grid container spacing={2} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Grid item>
                                    <h2>Product List</h2>
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
                                                Add New Product 
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
                                                    <StyledTableCell align="center">Product Category</StyledTableCell>
                                                    <StyledTableCell align="center">Currency</StyledTableCell>
                                                    <StyledTableCell align="center">Price</StyledTableCell>
                                                    <StyledTableCell align="center">Description</StyledTableCell>
                                                    <StyledTableCell align="center">Reference</StyledTableCell>
                                                    <StyledTableCell align="center">Action</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody  sx={{ "& .css-1wb42bh-MuiTableCell-root": { padding: '5px !important' } }}>
                                                {productData.map((row, index) => {
                                                    console.log("row : ", row);
                                                    return (
                                                        <StyledTableRow key={index}>
                                                            <StyledTableCell align='center'>{row.name}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.categoryname}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.currencyName}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.price}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.description}</StyledTableCell>
                                                            <StyledTableCell align='center'>{row.ref}</StyledTableCell>
                                                            <StyledTableCell align='center'>
                                                                <ActionsPopover c_role="product" row={row} handleSetMode={handleSetMode} setRowData={setRowData} deleteData={deleteData} handleClickOpen={handleClickOpen} handleOpenAdd={handleOpenAdd} />
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

export default Products;
