/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
// @mui
import { Table, TableBody, TableCell, TableContainer , CardContent,Input,Switch, TableHead, TableRow, Paper, Container, Typography, Stack, TablePagination, Button, Divider,Card } from '@mui/material';
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
import ExpenseDrawer from './ExpenseDrawer';
import axios from 'axios';
import { useEffect } from 'react';
import { backendURL } from 'assets/url/url';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import Grid from '@mui/material/Unstable_Grid2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Swal from 'sweetalert2';
import { getDataAPI } from 'hooks/getAPI';
import { Image } from 'mui-image';
import ActionsPopover from 'views/ActionPopover/Actionpopover';

// ----------------------------------------------------------------------

const Expense = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [expenseData,setExpenseData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);  
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
      setOpenDialog(false);
  };

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

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleSetMode = (newmode) => setMode(newmode);   

  const fetchData = async()=>{
      try{
          const response = await getDataAPI('expenses','getExpenses');
          if(response.status === 200){
             setExpenseData(response.data.expenseData);
          }
      }catch(error){
          console.log("error : ",error);
      }
  }

  const deleteData = async()=>{
    try{
        const response = await axios.delete(`${backendURL}/expenses/deleteExpense/${rowData._id}`);
        if(response.status===200){
           Swal.fire({icon:'success',text:'data deleted successfully ',timer:3000});
        }
        else if(response.status===204){
           Swal.fire({icon:'error',text:'data not found',timer:3000});
        }
    }catch(error){
        console.log("error while deleting : ",error);
        Swal.fire({icon:'error',text:'error while deleting ',timer:3000});
    }
  }

  useEffect(()=>{
       fetchData();
  },[]);

  return (
    <>
      <ExpenseDrawer fetchData={fetchData} setRowData={setRowData} open={openAdd} handleClose={handleCloseAdd} mode={mode} data={rowData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Expense List</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => { setMode('add'); handleOpenAdd() }}>
              Add New Expense
            </Button>
          </Stack>
        </Stack>
        <Card style={{ backgroundColor: '#FFFFFF' }}>
                    <CardContent>
                        <div className='bg-light'>
                            <Grid container spacing={2}>
                                <Grid xs={6} md={10} lg={10}>
                                    <h3>Admin</h3>
                                </Grid>
                            </Grid>
                            <Divider sx={{ borderColor: 'blue', marginBottom: '5px' }} />
                            <Stack direction="row" spacing={2} style={{ marginBottom: '5px' }}>
                                {/* <CopyToClipboard text="Your data to copy" onCopy={() => setCopied(true)}>
                                    <Button variant="outlined">
                                        Copy
                                    </Button>
                                </CopyToClipboard>
                                <Button variant="outlined" onClick={handleExportCSV}>
                                    CSV
                                </Button>
                                <Button variant="outlined" onClick={handleExportExcel}>
                                    Excel
                                </Button>
                                <Button variant="outlined" onClick={handleExportPDF}>
                                    PDF
                                </Button>
                                <Button variant="outlined" onClick={handlePrint}>
                                    Print
                                </Button> */}
                                <Input
                                    placeholder='Search'
                                    style={{ marginLeft: 'auto', marginRight: '15px' }}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Stack>
                            <div>
                                <Paper sx={{ width: 'auto', marginTop: '10px' }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 'auto' }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Expense Category</StyledTableCell>
                                        <StyledTableCell align="center">Currency</StyledTableCell>
                                        <StyledTableCell align="center">Total</StyledTableCell>
                                        <StyledTableCell align="center">Description</StyledTableCell>
                                        <StyledTableCell align="center">Reference</StyledTableCell>                      
                                        <StyledTableCell align="center">Action</StyledTableCell>                      
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {expenseData.map((row, index) => {
                                            return (
                                                <StyledTableRow key={index}>
                                                <StyledTableCell align='center'>{row.Name}</StyledTableCell>                                
                                                <StyledTableCell align='center'>{row.Category_Name}</StyledTableCell>                                
                                                <StyledTableCell align='center'>{row.Currency_Name}</StyledTableCell>                                
                                                <StyledTableCell align='center'>{row.Total}</StyledTableCell>                                
                                                <StyledTableCell align='center'>{row.Description}</StyledTableCell>                                
                                                <StyledTableCell align='center'>{row.Ref}</StyledTableCell>                                
                                                <StyledTableCell align='center'>                                                
                                                    <ActionsPopover c_role="expense" row={row} handleSetMode={handleSetMode} setRowData={setRowData} handleClickOpen={handleClickOpen} handleOpenAdd={handleOpenAdd} />
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
                                //   count={sortedRows.length}
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant='h3' id="alert-dialog-title">
          Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete : 
            {
              rowData ? rowData.Name : ''
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleCloseDialog}>Cancel</Button>
          <Button variant='contained' onClick={()=>{deleteData(); handleCloseDialog(); handleCloseAdd(); fetchData()}} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Expense;
