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

export default function CollapsibleDailyTable() {
  const [rows, setRows] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    fetchData();
  }, [user.token]);

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
      dayDate: dateObject.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }),
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
                {rows.map((row, index) => (
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
