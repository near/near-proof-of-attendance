import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  TableContainer,
  Table, 
  TableHead, 
  TableBody,
  TableCell, 
  TableRow,
  Divider,

} from "@material-ui/core";

import { 
  makeStyles,

} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));

function createAttendee(name, walletId, attended, attendedTime) {
  const attendee = {
    name, 
    walletId, 
    attended, 
    attendedTime: attendedTime >= 30,
  }
  return attendee;
}

const attendeesList = [
  createAttendee("Tony", "stark.near", true, 34),
  createAttendee("Thor", "asgard.near", true, 29),
  createAttendee("Steve", "captainrogers.near", true, 40),
];

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
        { attendee.attended ? 'true' : 'false' }
      </TableCell>
      
      <TableCell>
        { attendee.attendedTime ? 'true' : 'false'}
      </TableCell>
      
    </TableRow>
  )
}

function AttendeesTable(props) {
  const classes = useStyles();
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
            attendeesList.map(renderAttendee)
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function CreateNewBadges() {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h2">
        Create New Badges
      </Typography>
      <Grid container spacing={3}>
        {/* 2 column grid */}
        
        {/* column 1 */}
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Box>
                  Here we display how the NFT media looks like
                </Box>  
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Button>
                Upload JPEG/NFT
              </Button>
            </Grid>
          </Grid>
          
          <Grid item xs={12}>
            <Button>
              Mint
            </Button>
          </Grid>
        </Grid>
        
        {/* column 2 */}
        <Grid item xs={6}>
          <Grid item xs={12}>
            <AttendeesTable />
          </Grid>
          <Grid item xs={12}>
            <Button>
              CSV Upload
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}


