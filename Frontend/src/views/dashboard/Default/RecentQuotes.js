import TableStyle from "ui-component/TableStyle";
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
function RecentQuotes() {
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const recentQuotesData = [
    {
      id: 1,
      number: '989889999',
      client: 'jhon',
      total: 5665465,
      status: "Active",
    }
  ];
  const columns = [
    {
      field: 'number',
      headerName: 'Number',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'client',
      headerName: 'Client',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: () => {
        return (
          <Button variant="outlined">...</Button>
        )
      }
    }
  ];

  return (
    <div>
      {/* <TableStyle> */}
      <Box width="100%">
        <Card style={{ height: 'auto', paddingTop: '15px', padding: '10px' }}>
          <Typography style={{ padding: '10px' }} variant="h4">Recent Quotes</Typography>
          <DataGrid
            rows={recentQuotesData}
            columns={columns}
          // getRowId={(row) => row.id}
          />
        </Card>
      </Box>
      {/* </TableStyle> */}
    </div>
  )
}

export default RecentQuotes;