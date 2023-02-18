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
              Lettres
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Son initial
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Son final
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff" }}>
              Nom
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.lettres}>
              <TableCell component="th" scope="row" align="center">
                {row.lettres}
              </TableCell>
              <TableCell align="center">{row.sonInitial}</TableCell>
              <TableCell align="center">{row.sonFinal}</TableCell>
              <TableCell align="center">{row.nom}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableauxAlphabet;
