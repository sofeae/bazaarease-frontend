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
// import SparkLineChart from '../../components/elements/SparkLineChart';
// import UseSalesTabSwitch from "./UseSalesTabSwitch";
import { SalesTabs } from "./SalesTabs";

function createData(month, totalMonthly, calories, carbs, protein, price) {
  return {
    month,
    totalMonthly,
    calories,
    // carbs,
    // protein,
    // price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
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
          <TableCell component="th" scope="row">{row.month}</TableCell>
          {/* <TableCell align="left">{row.calories}</TableCell> */}
          <TableCell>RM {row.totalMonthly}</TableCell>
          {/* <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell> */}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>Date</TableCell> */}
                      <TableCell>Date</TableCell>
                      <TableCell>Total daily sales</TableCell>
                      {/* <TableCell align="left">Total Price</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        {/* <TableCell component="th" scope="row">{historyRow.date}</TableCell> */}
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="left">{historyRow.amount}</TableCell>
                        {/* <TableCell align="left">
                          {Math.round(historyRow.amount * historyRow.price * 100)}
                        </TableCell> */}
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
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    totalMonthly: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    month: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('January', 159, 6.0, 24, 4.0, 3.99),
  createData('February', 237, 9.0, 37, 4.3, 4.99),
  createData('March', 262, 16.0, 24, 6.0, 3.79),
  createData('April', 305, 3.7, 67, 4.3, 2.5),
  createData('May', 356, 16.0, 49, 3.9, 1.5),
  createData('June', 356, 16.0, 49, 3.9, 1.5),
  createData('July', 356, 16.0, 49, 3.9, 1.5),
  createData('August', 356, 16.0, 49, 3.9, 1.5),
  createData('September', 356, 16.0, 49, 3.9, 1.5),
  createData('October', 356, 16.0, 49, 3.9, 1.5),
  createData('November', 356, 16.0, 49, 3.9, 1.5),
  createData('December', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleMonthlyTable() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className="m-2"> {/* Apply margin outside of the Paper component */}
          <TableContainer component={Paper}> {/* Add more padding to the right side of the table */}
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow className="bg-yellow-500">
                  <TableCell />
                  <TableCell>Month</TableCell>
                  {/* <TableCell align="center" >Total Orders</TableCell> */}
                  <TableCell>Total Monthly Sales</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.month} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
