import React, {
  useState,
  useRef,
  useEffect,

} from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,

} from "@material-ui/core";

import { 
  makeStyles,

} from "@material-ui/core/styles";

import {
  AttendeesTable,

} from "../components";

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
  }
}));

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
    checkAccountIds(attendees, setAttendees, setAccountsNotExist)
  }
  
  const initStorageSession = () => {
    
  }
  
  const uploadJPG = () => {
    
  }
  
  const mintNFTs = () => {
    console.log('attendees', attendees);
    console.log('accountsNotExist', accountsNotExist);
  }


  return (
    <Box>
      <Typography variant="h2">
        Create New Badges
      </Typography>
      <Grid container spacing={3}>

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
              <Button onClick={uploadJPG}>
                Upload JPEG/NFT
              </Button>
            </Grid>
          </Grid>
          
          <Grid item xs={12}>
            <Button onClick={mintNFTs}>
              Mint
            </Button>
          </Grid>
          
          <Grid item xs={12}>
            <Button onClick={initStorageSession}>
              Init Storage Session
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
            {
              attendees.length > 0 && (
                <Button onClick={validateNEARAccounts}>
                  Validate NEAR Accounts
                </Button>
              )
            }
          </Grid>
          <Grid item xs={12}>
            {
              // For some weird reason we need to call setAccountsNotExist even though we are not rendering the below table.
              accountsNotExist.length > 0 && (
                <>
                  These Wallet ID's do not exist
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


