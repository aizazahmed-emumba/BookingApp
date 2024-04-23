import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";

type props = {
  Bookings: Booking[];
};

interface Booking {
  name: string;
  email: string;
  numOfAdults: number;
  numOfChilds: number;
  paymentMethod: string;
}

const BasicTable: React.FC<props> = ({ Bookings }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">No of Adults</TableCell>
            <TableCell align="right">No of Children</TableCell>
            <TableCell align="right">Payment Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Bookings.map((Booking) => (
            <TableRow
              key={Booking.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Booking.name}
              </TableCell>
              <TableCell align="right">{Booking.email}</TableCell>
              <TableCell align="right">{Booking.numOfAdults}</TableCell>
              <TableCell align="right">{Booking.numOfChilds}</TableCell>
              <TableCell align="right">{Booking.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
