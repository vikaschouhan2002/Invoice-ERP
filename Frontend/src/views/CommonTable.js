import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import PrintIcon from '@mui/icons-material/Print';
// import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import CopyToClipboard from 'react-copy-to-clipboard';
import * as XLSX from 'xlsx';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { backendURL } from 'assets/url/url';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24
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
  function PhoneBook() {
    //   const [data, setData] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(10);
      const [orderBy, setOrderBy] = useState('');
      const [order, setOrder] = useState('asc');
      const [editedRowData, setEditedRowData] = useState(null);
      const [id, setId] = useState([]);
      const [peopleData,setPeopleData] = useState([]);
      const columns = [
        { id: 'id', label: 'ID', align: 'center', minWidth: 70 },
        { id: 'Name', label: 'Name', align: 'center', minWidth: 170 },
        { id: 'Contact', label: 'Contact', align: 'center', minWidth: 170 },
        { id: 'Email', label: 'Email', align: 'center', minWidth: 170 },
        { id: 'Phone', label: 'Phone', align: 'center', minWidth: 170 },
        { id: 'Website', label: 'Website', align: 'center', minWidth: 170 },
        { id: "Action" , label: 'Action' , align: 'center', minWidth: 170}
      ];
      const fetchCompany = async()=>{
        try{
            const response = await axios.get(`${backendURL}/company/getCompanyData`);
             if(response.status===200)
             setPeopleData(response.data.companyData);
                         
        }catch(error){
            console.log("error while fetching data of people : ",error);
        }
    }
      useEffect(() => {
        // const fetchData = async () => {
        //   try {
        //     const response = await axios.get('http://localhost:8080/customer');
        //     console.log('response.data213131312', response.data);
        //     const transformedData = response.data?.data?.map((item) => ({
        //       name: item.c_name,
        //       contact: item.cus_contact,
        //       email: item.c_email,
        //       address: item.c_address,
        //     }));
        //     setData(transformedData);
        //     console.log('response data----------->', transformedData);
        //     const ids = transformedData.map((item) => item.id);
        //     console.log('IDs:', ids);
        //     setId(ids);
        //   } catch (error) {
        //     console.error('Error fetching data:', error);
        //   }
        // };
        fetchCompany();
      }, []);
      console.log('set===-->', peopleData);
      const rows = peopleData;
      console.log("rows-->",rows)
      const handleChangePage = (event, newPage) => {
          setPage(newPage);
      };
      const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
      };
      const [copied, setCopied] = useState(false);
      const handlePrint = () => {
          window.print();
      };
      const handleExportCSV = () => {
          // Define CSV headers
          const headers = [
              { label: 'Name', key: 'Name' },
              { label: 'Phone', key: 'Phone' },
              { label: 'Email', key: 'Email' },
              { label: 'Webiste', key: 'Webiste' },
              { label: 'Contact', key:'Contact'}
          ];
          // Create CSV data
          const csvData = [
              headers,
              ...data.map(item => Object.values(item)),
          ];
          // Create CSV file
          const csvFile = new Blob([csvData.map(row => row.join(',')).join('\n')], { type: 'text/csv' });
          const csvUrl = URL.createObjectURL(csvFile);
          // Trigger download
          const link = document.createElement('a');
          link.href = csvUrl;
          link.setAttribute('download', 'manage_hospital_data.csv'); //short --stock----------------manage_hospital----------------------------
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      };
      const handleExportExcel = () => {
          // Create Excel workbook
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(data), 'Manage Hospital Data');
          // Create Excel file
          const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'blob' });
          const excelUrl = URL.createObjectURL(excelFile);
          // Trigger download
          const link = document.createElement('a');
          link.href = excelUrl;
          link.setAttribute('download', 'manage_hospital_data.xlsx'); //-----------------out of stock-----manage_hospital---------------------
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      };
      const handleExportPDF = () => {
          const pdf = new jsPDF();
          pdf.text('Manage Hospital Data', 10, 10);
          pdf.autoTable({
              head: [['Name', 'Phone', 'Email', 'Website']],
              body: data.map(item => Object.values(item)),
          });
          pdf.save('manage_hospital_data.pdf'); //short--stock----manage_hospital---------------------------------------------------------------------
      };
    //   const filteredRows = rows.filter((row) => Object.values(row).some((value) => value));
    //   const sortedRows = stableSort(filteredRows, getComparator(order, orderBy));
    //   const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedRows.length - page * rowsPerPage);
      function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
    //   function getComparator(order, orderBy) {
    //     return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
    //   }
      function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
      const [selectedOption, setSelectedOption] = useState('Regular');
      const handleToggle = () => {
        setSelectedOption((prevOption) => (prevOption === 'Regular' ? 'Wholesale' : 'Regular'));
      };
      return (
        
          <div style={{ margin: '10px' }}>
            {
                console.log("peopleData ",peopleData)
            }
              <Card style={{ backgroundColor: '#FFFFFF' }}>
                  <CardContent>
                      <div className='bg-light'>
                          <Grid container spacing={2}>
                              <Grid xs={6} md={10} lg={10}>
                                  <h3>Company</h3>
                              </Grid>
                          </Grid>
                          <Divider sx={{ borderColor: 'blue', marginBottom: '5px' }} />
                          <Stack direction="row" spacing={2} style={{ marginBottom: '5px' }}>
                              <CopyToClipboard text="Your data to copy" onCopy={() => setCopied(true)}>
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
                              </Button>
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
                            <StyledTableCell align="center">Contact</StyledTableCell>
                            <StyledTableCell align="center">Country</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Website</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                            
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, index) => {
                            return (
                              <StyledTableRow key={row.id}>
                                {columns.slice(1).map(
                                  (
                                    column // Exclude the first column (ID)
                                  ) => (
                                    <StyledTableCell key={column.id} align={column.align}>
                                      {column.id === 'imageUrl' ? (
                                        row[column.id] ? (
                                          <img
                                            src={row[column.id]}
                                            alt="img"
                                            style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%' }} // Fixed typo: '50spx' to '50px'
                                          />
                                        ) : (
                                          'no image'
                                        )
                                      ) : (
                                        row[column.id]
                                      )}
                                       {column.id === 'Action' ? (<div style={{display:'flex', justifyContent:'evenly'}}>
                                         <IconButton variant='contained' style={{margin:'5px',borderRadius:'50%',background:'blue' , color:"white"}}><VisibilityIcon/></IconButton>
                                         <IconButton variant='contained' style={{margin:'5px',borderRadius:'50%',background:'green', color:"white"}}><EditIcon/></IconButton>
                                         <IconButton variant='contained' style={{margin:'5px',background:'red',borderRadius:'50%', color:"white"}}><DeleteIcon/></IconButton>
                                         </div>
                                        ) : (
                                          ''
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
          </div>
      );
  }
  export default PhoneBook

 