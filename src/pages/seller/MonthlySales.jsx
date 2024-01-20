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
import Button from '@mui/material/Button'; // Import Button component
import { backendBaseURL } from "../../utils/imageUrl";
import { useAuthContext } from "../../hooks/useAuthContext";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CollapsibleMonthlyTable() {
  const [rows, setRows] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Step 1
  const { user } = useAuthContext();

  useEffect(() => {
    fetchData();
  }, [user.token, selectedYear]); // Step 5
  
  async function fetchData() {
    try {
      const response = await fetch(
        backendBaseURL + `/api/order?year=${selectedYear}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const orders = await response.json();

      if (!Array.isArray(orders)) {
        throw new Error('Invalid response format. Expected an array.');
      }

      const filteredOrders = orders.filter(
        (order) => new Date(order.createdAt).getFullYear() === selectedYear
      );

      const processedData = processOrders(filteredOrders);

      setRows(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error as needed
    }
  }
  
  function handleYearChange(event) {
    setSelectedYear(parseInt(event.target.value, 10)); // Step 4
  }

  function processOrders(orders) {
    const groupedOrders = groupOrdersByMonth(orders);

    const processedData = Object.entries(groupedOrders).map(([month, orders]) => {
      const totalDailySales = orders.reduce((total, order) => total + order.totalAmount, 0);

      return createData(month, orders.length, totalDailySales);
    });

    return processedData;
  }

  function groupOrdersByMonth(orders) {
    const groupedOrders = {};

    orders
      .filter(order => order.status === true && new Date(order.createdAt).getFullYear() === selectedYear)
      .forEach(order => {
        const month = new Date(order.createdAt).toLocaleDateString(undefined, {
          month: 'long',
          // year: 'numeric',
        });

        if (!groupedOrders[month]) {
          groupedOrders[month] = [order];
        } else {
          groupedOrders[month].push(order);
        }
      });

    return groupedOrders;
  }

  function createData(month, totalOrders, totalDailySales) {
    return {
      month,
      totalOrders,
      totalDailySales,
    };
  }

  function Row(props) {
    const { row } = props;

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell></TableCell>
          <TableCell component="th" scope="row">{row.month}</TableCell>
          <TableCell>{row.totalOrders}</TableCell>
          <TableCell>RM {row.totalDailySales.toFixed(2)}</TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      month: PropTypes.string,
      totalOrders: PropTypes.number,
      totalDailySales: PropTypes.number,
    }).isRequired,
  };

  function handleDownload() {
    const pdf = new jsPDF();

    const headers = [['Month', 'Total Orders', 'Total Monthly Sales']];
    const data = rows.map(row => [row.month, row.totalOrders, `RM ${row.totalDailySales.toFixed(2)}`]);

    const tableConfig = {
      startY: 40,
      head: headers,
      body: data,
      autoSize: true,
      headStyles: { fillColor: [255, 214, 0], textColor: [0, 0, 0] },
    };

    // Set title at the center
    const titleText = 'Daily Sales Report';
    const titleWidth = pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const titleX = (pdf.internal.pageSize.getWidth() - titleWidth) / 2;
    pdf.text(titleText, titleX, 20);

    // Set smaller year and month text
    const textSize = 13;
    pdf.setFontSize(textSize);
    const selectedText = `${user.businessName}: ${selectedYear || 'All'} `;
    const selectedTextWidth = pdf.getStringUnitWidth(selectedText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const selectedTextX = (pdf.internal.pageSize.getWidth() - selectedTextWidth) / 2;
    pdf.text(selectedText, selectedTextX, 30);

    // Generate table
    pdf.autoTable(tableConfig);

    //save file name in pdf
    pdf.save(`${user.businessName}_${selectedYear}_monthly_sales_report.pdf`);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <div className="flex space-x-2">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={selectedYear}
                label="Year"
                onChange={handleYearChange}
              >
                {Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i).map(
                  (year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </div>
        <Paper className="m-2">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow className="bg-yellow-500">
                  <TableCell />
                  <TableCell>Month</TableCell>
                  <TableCell>Total Orders</TableCell>
                  <TableCell>Total Monthly Sales</TableCell>
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
        <div className="grid grid-cols-1 justify-items-end">
          <button className="bg-yellow-500 text-black mt-4 mb-4 mr-4 px-4 py-2 rounded" onClick={handleDownload}>
            Download PDF
          </button>
        </div>
      </Grid>
    </Grid>
  );
}