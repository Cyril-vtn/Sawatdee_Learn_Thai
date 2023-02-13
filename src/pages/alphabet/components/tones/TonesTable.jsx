import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableauxTon = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="Thai tons table">
        <TableHead sx={{ backgroundColor: props.color }}>
          <TableRow>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Ton
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Symbole de prononciation
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Exemple
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.ton}>
              <TableCell component="th" scope="row" align="center">
                {row.ton}
              </TableCell>
              <TableCell align="center">{row.symbole}</TableCell>
              <TableCell align="center">{row.exemple}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableauxTon;
