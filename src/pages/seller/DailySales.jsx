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
import Button from '@mui/material/Button';  // Import Button component
import { backendBaseURL } from '../../utils/imageUrl';
import { useAuthContext } from '../../hooks/useAuthContext';
import SelectSmall from '../../components/MonthDropdown';
import { format } from 'date-fns';
import SelectYear from '../../components/DailyYearDropdown';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CollapsibleDailyTable() {
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('01');
  console.log('Selected Month:', selectedMonth);
  const [selectedYear, setSelectedYear] = useState('2024');  // State for the selected year
  console.log('Selected Year:', selectedYear)
  const { user } = useAuthContext();
  const [downloadData, setDownloadData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [user.token, selectedMonth, selectedYear]);  // Include selectedYear in the dependency array

  async function fetchData() {
    try {
      const response = await fetch(`${backendBaseURL}/api/order`, {
        method: 'GET',
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

      // Filter orders where status is true
      const filteredOrders = orders.filter(order => order.status === true);

      console.log('Fetched orders:', filteredOrders);

      const processedData = processOrders(filteredOrders);

      console.log('Processed data:', processedData);

      setRows(processedData);
      setDownloadData(processedData);  // Set the downloaded data
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed
    }
  }

  function handleDownload() {
    const filteredData = downloadData
      .filter(row => (!selectedMonth || getMonthFromDate(row.dayDate) === selectedMonth) &&
        (!selectedYear || new Date(row.dayDate).getFullYear() === parseInt(selectedYear)));

    const pdf = new jsPDF();

    // Set table headers
    const headers = [['Date', 'Total Orders', 'Total Daily Sales']];

    // Extract table data
    const data = filteredData.map(row => [row.dayDate, row.totalOrders, `RM ${row.totalDailySales.toFixed(2)}`]);

    // Set table layout
    const tableConfig = {
      startY: 40, // Adjust startY to make space for the title
      head: headers,
      body: data,
      autoSize: true,
      headStyles: { fillColor: [255, 214, 0], textColor: [0, 0, 0] },
    };

    // Display chosen year and month at the top
    const selectedMonthName = selectedMonth ? new Date(2000, parseInt(selectedMonth) - 1, 1).toLocaleString('en-US', { month: 'long' }) : 'All';
    // pdf.text(`Year: ${selectedYear || 'All'} | Month: ${selectedMonthName}`, 20, 30);

    // Set title at the center
    const titleText = 'Daily Sales Report';
    const titleWidth = pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const titleX = (pdf.internal.pageSize.getWidth() - titleWidth) / 2;
    pdf.text(titleText, titleX, 20);

    // Set smaller year and month text
    const textSize = 12;
    pdf.setFontSize(textSize);
    const selectedText = `${user.businessName}: ${selectedMonthName} ${selectedYear || 'All'} `;
    const selectedTextWidth = pdf.getStringUnitWidth(selectedText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const selectedTextX = (pdf.internal.pageSize.getWidth() - selectedTextWidth) / 2;
    pdf.text(selectedText, selectedTextX, 30);

    // Generate table
    pdf.autoTable(tableConfig);

    // Assuming user contains the business name
    const businessName = user.businessName || 'UnknownBusiness';
    
    // Format selectedMonth to always be two digits
    // const formattedMonth = selectedMonth ? selectedMonth.padStart(2, '0') : 'All';

    // Save PDF with the specified filename
    pdf.save(`${businessName}_${selectedMonthName}_${selectedYear}_sales_report.pdf`);
}

  function processOrders(orders) {
    const groupedOrders = groupOrdersByDate(orders);

    const processedData = Object.entries(groupedOrders).map(([dayDate, orders]) => {
      const totalDailySales = orders.reduce((total, order) => total + order.totalAmount, 0);
      const productNames = getUniqueProductNames(orders);
      const orderDetails = getOrderDetails(orders);

      return createData(dayDate, orders.length, totalDailySales, orderDetails);
    });

    return processedData;
  }

  function groupOrdersByDate(orders) {
    const groupedOrders = {};

    orders.forEach(order => {
      const date = format(new Date(order.createdAt), 'yyyy-MM-dd'); // Use date-fns for consistent date formatting

      if (!groupedOrders[date]) {
        groupedOrders[date] = [order];
      } else {
        groupedOrders[date].push(order);
      }
    });

    return groupedOrders;
  }

  // Modify getUniqueProductNames function
  function getUniqueProductNames(orders) {
    const productNamesSet = new Set();

    orders.forEach(order => {
      if (order.cart && Array.isArray(order.cart)) {
        order.cart.forEach(product => {
          if (product && product.name) {
            productNamesSet.add(product.name);
          }
        });
      }
    });

    return Array.from(productNamesSet);
  }

  // Modify getOrderDetails function
  function getOrderDetails(orders) {
    return orders.map(order => ({
      products: order.cart || [],
      quantity: order.totalAmount,
    }));
  }

  function createData(dayDate, totalOrders, totalDailySales, orderDetails) {
    const dateObject = new Date(dayDate);

    return {
      dayDate: dateObject.toISOString().split('T')[0],
      totalOrders,
      totalDailySales,
      history: orderDetails.map((order, index) => ({
        products: order.products,
        quantity: order.quantity || 0,
      })),
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    // Sort and make product names non-redundant in history
    const sortedProductNames = [...new Set(row.history.flatMap(historyRow => historyRow.products.map(product => product.name)))];

    // Sort product names based on total amount in descending order
    sortedProductNames.sort((productNameA, productNameB) => {
      const totalAmountA = row.history
        .filter(historyRow => historyRow.products.some(product => product.name === productNameA))
        .reduce((total, historyRow) => total + historyRow.products.find(product => product.name === productNameA).amount, 0);

      const totalAmountB = row.history
        .filter(historyRow => historyRow.products.some(product => product.name === productNameB))
        .reduce((total, historyRow) => total + historyRow.products.find(product => product.name === productNameB).amount, 0);

      return totalAmountB - totalAmountA;
    });

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.dayDate}
          </TableCell>
          <TableCell>{row.totalOrders}</TableCell>
          <TableCell>{`RM ${row.totalDailySales.toFixed(2)}`}</TableCell>
          {/* Product Names column removed */}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Products</TableCell>
                      <TableCell align="left">Total Amount</TableCell>
                      <TableCell align="left">Product Price</TableCell>
                      <TableCell align="left">Total Product Sales</TableCell> {/* New column header */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedProductNames.map((productName, index) => {
                      const productData = row.history.find(historyRow => historyRow.products.some(product => product.name === productName)).products.find(product => product.name === productName);
                      const totalAmount = row.history
                        .filter(historyRow => historyRow.products.some(product => product.name === productName))
                        .reduce((total, historyRow) => total + historyRow.products.find(product => product.name === productName).amount, 0);
                      const totalProductSales = totalAmount * productData.price;

                      return (
                        <TableRow key={index}>
                          <TableCell>{productName}</TableCell>
                          <TableCell align="left">{totalAmount}</TableCell>
                          <TableCell align="left">RM {productData.price.toFixed(2)}</TableCell>
                          <TableCell align="left">RM {totalProductSales.toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })}
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
      dayDate: PropTypes.string,
      totalOrders: PropTypes.number,
      totalDailySales: PropTypes.number,
      productNames: PropTypes.arrayOf(PropTypes.string),
      history: PropTypes.arrayOf(
        PropTypes.shape({
          product: PropTypes.string,
          productPrice: PropTypes.number,
          totalProductOrder: PropTypes.number,
          totalProductSales: PropTypes.number,
        })
      ).isRequired,
    }).isRequired,
  };

  function getMonthFromDate(dateString) {
    const dateObject = new Date(dateString);
    const month = dateObject.getMonth() + 1; // Months are zero-indexed, so we add 1
    return month < 10 ? `0${month}` : `${month}`; // Pad single-digit months with a leading zero
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className="flex space-x-2">
          <SelectYear onYearChange={setSelectedYear} />
          <SelectSmall onMonthChange={setSelectedMonth} />
        </div>
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
                  .filter(row => (!selectedMonth || getMonthFromDate(row.dayDate) === selectedMonth) &&
                    (!selectedYear || new Date(row.dayDate).getFullYear() === parseInt(selectedYear)))
                  .map((row, index) => (
                    <Row key={index} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <div className="grid grid-cols-1 justify-items-end">
          <button className="bg-yellow-500 text-black mt-4 mb-4 mr-4 px-4 py-2 rounded" onClick={handleDownload}>
            Download PDF
          </button>
        </div>
      </Grid>
    </Grid>
  );
}

export default CollapsibleDailyTable;