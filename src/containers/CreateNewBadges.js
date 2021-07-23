import React, {
  useState,
  useRef,
  useEffect,
  useCallback
} from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,

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
  checkAccountIds,

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
  const [hasDeposit, setDeposit] = useState(false);
  
  const componentDidMount = () => {
    // checkHasDeposit()
  }
  
  useEffect(componentDidMount, []);
  
  const checkHasDeposit = async () => {
    const hasDeposit = await window.api.hasDeposit();
    if(hasDeposit) {
      setDeposit(true)
    }
  }
  
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

  const addDeposit = async () => {
    try {
      console.log('1');
      const deposit = await window.api.addDeposit();
      console.log('2');
      setDeposit(true)
    } catch (error) {
      console.log('error in add deposit');
    }
  }
  
  const uploadJPG = async () => {
    const obj = {hello: 'world2'};
    const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
      try {
        const file = blob;
        const store = await window.api.store(file)
        console.log('store', store)
      } catch (error) {
        console.log('error in store', error);
      }
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
      <br />
      <Grid container spacing={3}>
        {/* column 1 */}
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Box>
                  Here we display how the NFT media looks like
                </Box>  
              </Paper>
            </Grid>
            
            <br/>
            <br/>
            <br/>
            
            {
              !hasDeposit && (
                <Grid item xs={12}>  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">
                      Before uploading NFT first deposit NEAR
                    </Typography>
                  </Grid>  
                  <br />
                  <Grid item xs={12}>
                    <Button variant="contained" onClick={addDeposit}>
                      Add Deposit
                    </Button>
                  </Grid>
                </Grid>
              )
            }
            
            <br />
            <Grid item xs={12}>
              <Button variant="contained" onClick={uploadJPG}>
                Upload JPEG/NFT
              </Button>
            </Grid>
            <br />
            <Grid item xs={12}>
              <Button variant="contained" onClick={mintNFTs}>
                Mint NFT
              </Button>
            </Grid>
          
            <br />
            <Grid item xs={12}>
              <Button variant="contained" onClick={initStorageSession}>
                Init Storage Session
              </Button>
            </Grid>
            
          </Grid>
        </Grid>    
        
        {/* column 2 */}
        <Grid item xs={6}>
          <Grid item xs={12}>
            <AttendeesTable attendees={attendees} />
          </Grid>
          <br />
          <Grid item xs={12}>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onCSVUpload}/>
            <Button variant="contained" onClick={csvUpload}>
              CSV Upload
            </Button>
          </Grid>
          <br/>
          <Grid item xs={12}>
            {
              attendees.length > 0 && (
                <Button variant="contained" onClick={validateNEARAccounts}>
                  Validate NEAR Accounts
                </Button>
              )
            }
          </Grid>
          <br/>
          <Grid item xs={12}>
            {
              // For some weird reason we need to call setAccountsNotExist even though we are not rendering the below table.
              accountsNotExist.length > 0 && (
                <Box>
                  These Wallet ID's do not exist
                  <AttendeesTable attendees={accountsNotExist} />
                </Box>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}


