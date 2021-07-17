import React, {
  useState,
  useRef,
} from "react";
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

} from "@material-ui/core";

import { 
  makeStyles,

} from "@material-ui/core/styles";

import {
  importCSV
} from "../utils/csv";
import {
  checkAccountIds
} from "../utils/wallet"


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

export default function CreateNewBadges() {
  const classes = useStyles();
  const [attendees, setAttendees] = useState([]);
  const [accountsNotExist, setAccountsNotExist] = useState([]);
  const inputFile = useRef(null);

  const csvUpload = () => {
    inputFile.current.click();
  }

  const onCSVUpload = (event) => {
    const csv = importCSV(event, setAttendees);
  }
  
  const validateNEARAccounts = () => {
    // const walletIds = []
    // attendees.map((attendee) => {
    //   walletIds.push(attendee.walletId);
    // });
    checkAccountIds(attendees, setAccountsNotExist)
  }

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
            <AttendeesTable attendees={attendees} />
          </Grid>
          <Grid item xs={12}>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onCSVUpload}/>
            <Button onClick={csvUpload}>
              CSV Upload
            </Button>
          </Grid>
          <Grid item xs={12}>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onCSVUpload}/>
            <Button onClick={validateNEARAccounts}>
              Validate NEAR Accounts
            </Button>
          </Grid>
          <Grid item xs={12}>
            {
              accountsNotExist.length > 0 && (
                <>
                This Wallet ID's do not exist
                <AttendeesTable attendees={accountsNotExist} />
                </>
              )
            }
            
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}


