import React, {
  useState,
  useRef,
  useEffect,

} from "react";
import {
  Paper,
  TableContainer,
  Table, 
  TableHead, 
  TableBody,
  TableCell, 
  TableRow,

} from "@material-ui/core";

import { 
  makeStyles,

} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

const renderAttendee = (attendee, index) => {
  return (
    <TableRow key={index}>
      <TableCell>
        { attendee.name }
      </TableCell>
      
      <TableCell>
        { attendee.walletId }
      </TableCell>
      
      <TableCell>
        { attendee.attended ? "true" : "false" }
      </TableCell>
      
      <TableCell>
        { attendee.attendedTime ? "true" : "false"}
      </TableCell>
      
    </TableRow>
  )
}

export default function AttendeesTable(props) {
  const classes = useStyles();
  const { attendees } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">Name</TableCell>
            <TableCell>Wallet ID</TableCell>
            <TableCell>Attended</TableCell>
            <TableCell> Attended &#62; than 30 Minutes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { 
            attendees.length > 0 ? attendees.map(renderAttendee) : (
                <TableRow>
                  <TableCell>No attendees uploaded</TableCell>
                </TableRow>
              )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}


