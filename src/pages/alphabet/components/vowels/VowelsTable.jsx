import React from "react";

// * Material UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableauxAlphabet = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        size="medium"
        aria-label="Thai alphabet table"
      >
        <TableHead sx={{ backgroundColor: props.color }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Voyelle
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Prononciation
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Exemple
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.vowels}>
              <TableCell component="th" scope="row" align="center">
                {row.vowels}
              </TableCell>
              <TableCell align="center">{row.pronunciation}</TableCell>
              <TableCell align="center">{row.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableauxAlphabet;
