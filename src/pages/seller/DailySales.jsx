import React, { useState, useEffect } from 'react';
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
import { backendBaseURL } from "../../utils/imageUrl";
import { useAuthContext } from "../../hooks/useAuthContext";
import SelectSmall from '../../components/MonthDropdown';

export default function CollapsibleDailyTable() {
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const { user } = useAuthContext();

  // Function to generate random dummy data
  function generateDummyData() {
    const startDate = new Date(2023, 0, 1); // January 1, 2023
    const endDate = new Date(); // Current date

    const daysDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const dummyData = [];

    for (let i = 0; i < daysDifference; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const formattedDate = currentDate.toISOString().split('T')[0];
      const totalOrders = Math.floor(Math.random() * 10) + 1; // Random number of orders
      const totalDailySales = Math.floor(Math.random() * 1000) + 1; // Random total sales

      dummyData.push(createData(formattedDate, totalOrders, totalDailySales));
    }

    return dummyData;
  }

  //fetch real data
  // useEffect(() => {
  //   fetchData();
  // }, [user.token, selectedMonth]);

  // useEffect to fetch data (replace the existing fetchData function)
  useEffect(() => {
    // Fetch data or use the generated dummy data
    const dummyData = generateDummyData();
    setRows(dummyData);
  }, []);

  // Function to group orders by date
  function groupOrdersByDate(orders) {
    const groupedOrders = {};

    orders
      .filter(order => order.status === true) // Filter orders with status true
      .forEach(order => {
        const date = new Date(order.createdAt).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });

        if (!groupedOrders[date]) {
          groupedOrders[date] = [order];
        } else {
          groupedOrders[date].push(order);
        }
      });

    return groupedOrders;
  }

  // Function to process orders and calculate totalDailySales
  function processOrders(orders) {
    const groupedOrders = groupOrdersByDate(orders);

    const processedData = Object.entries(groupedOrders).map(([dayDate, orders]) => {
      // Calculate totalDailySales by summing up totalAmount of all orders on the same date
      const totalDailySales = orders.reduce((total, order) => total + order.totalAmount, 0);

      return createData(dayDate, orders.length, totalDailySales);
    });

    return processedData;
  }

  async function fetchData() {
    try {
      const response = await fetch(backendBaseURL + "/api/order", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const orders = await response.json();

      if (!Array.isArray(orders)) {
        throw new Error('Invalid response format. Expected an array.');
      }

      const processedData = processOrders(orders);

      setRows(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed
    }
  }

  function createData(dayDate, totalOrders, totalDailySales) {
    const dateObject = new Date(dayDate);
  
    return {
      dayDate: dateObject.toISOString().split('T')[0], // Use ISO date string
      totalOrders,
      totalDailySales,
      history: [
        {
          product: 'nasi lemak',
          productPrice: 5,
          totalProductOrder: 3,
        },
        {
          product: 'udang',
          productPrice: 5,
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
          <TableCell>{row.totalOrders}</TableCell>
          <TableCell>{row.totalDailySales}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Products</TableCell>
                      <TableCell>Product Price</TableCell>
                      <TableCell align="left">Total Product Ordered</TableCell>
                      <TableCell align="left">Total Product Sales</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow, index) => (
                      <TableRow key={index}>
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
      totalOrders: PropTypes.number,
      totalDailySales: PropTypes.number,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          product: PropTypes.string.isRequired,
          productPrice: PropTypes.number.isRequired,
          totalProductOrder: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }).isRequired,
  };

  // Function to get the month from a date string
  function getMonthFromDate(dateString) {
    const dateObject = new Date(dateString);
    const month = dateObject.getMonth() + 1; // Months are zero-indexed, so we add 1
    return month < 10 ? `0${month}` : `${month}`; // Pad single-digit months with a leading zero
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SelectSmall onMonthChange={setSelectedMonth} />
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
                {rows
                  .filter(row => !selectedMonth || getMonthFromDate(row.dayDate) === selectedMonth) // Filter by selected month
                  .map((row, index) => (
                    <Row key={index} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
