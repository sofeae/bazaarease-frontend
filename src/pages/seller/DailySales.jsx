import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(dayDate, totalOrders, totalDailySales) {
  return {
    dayDate,
    totalOrders,
    totalDailySales,
    history: [
      {
        product: '2020-01-05',
        productPrice: 5,
        customerId: '11091700',
        totalProductOrder: 3,
      },
      {
        product: '2020-01-05',
        productPrice: 5,
        customerId: 'Anonymous',
        totalProductOrder: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.dayDate}</TableCell>
        <TableCell>(calories){row.totalOrders}</TableCell>
        <TableCell>RM (fat){row.totalDailySales}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Products(date)</TableCell>
                    <TableCell>Product Price(new)</TableCell>
                    <TableCell align="left">Total Product Ordered(amount)</TableCell>
                    <TableCell align="left">Total Product Sales(price)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.product}>
                      <TableCell>{historyRow.product}</TableCell>
                      <TableCell align="left">{historyRow.productPrice}</TableCell>
                      <TableCell align="left">{historyRow.totalProductOrder}</TableCell>
                      <TableCell align="left">
                        {Math.round(historyRow.totalProductOrder * historyRow.productPrice)} 
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    dayDate: PropTypes.string.isRequired,
    totalOrders: PropTypes.number.isRequired,
    totalDailySales: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        product: PropTypes.string.isRequired,
        productPrice: PropTypes.number.isRequired,  // Change the type to number
        customerId: PropTypes.string.isRequired,
        totalProductOrder: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData('2020-01-05', 3, 15),  // Adjusted values to match the createData function
  createData('2020-01-02', 1, 5),
  // Add more rows if needed
];

export default function CollapsibleDailyTable() {

  return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className="m-2">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow className="bg-yellow-500">
                    <TableCell />
                    <TableCell>Date</TableCell>
                    <TableCell>Total Orders</TableCell>
                    <TableCell>Total Daily Sales</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.dayDate} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
  );
}
