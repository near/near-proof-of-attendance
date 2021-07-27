import React, {
  useState,
  useRef,
  useEffect,
  useCallback
} from "react";

import fleekStorage from '@fleekhq/fleek-storage-js'

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
  importImage,
  storeImage,
  storeImageFirebase,
  uploadToFleek,
} from "../utils/image";

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

// Dirty solution :/
// hasDeposit is define outside of CreateNewBadges Hook in order to avoid "calling a setDeposit = setState() inside of a useEffect" warning.
// hasDeposit is set true by default so it does not show up when redirect from Depositing NEAR Wallet Page back to the dApp.
let hasDeposit = false;
// let hasDeposit;

export default function CreateNewBadges() {
  const classes = useStyles();
  const [attendees, setAttendees] = useState([]);
  const [accountsNotExist, setAccountsNotExist] = useState([]);
  const [nftImage, setNFTImage] = useState(null);
  const [filePath, setFilePath] = useState("/Users/jedi/dOrg/NEAR/proof-of-attendance/src/constants/kobe-gianna.png");
  const [imageFile, setImageFile] = useState('null');
  const inputCSVFile = useRef(null);
  const inputImageFile = useRef(null);

  // const [hasDeposit, setDeposit] = useState(false);
  const imageAlt = "image not successfully uploaded"

  const componentDidMount = () => {
    // console.log('didMount hasDeposit', hasDeposit);
    // checkHasDeposit()
  }
  
  useEffect(componentDidMount, []);
  
  const checkHasDeposit = async () => {
    const deposit = await window.api.hasDeposit();
    if(deposit) {
      console.log('if deposit', deposit);
      console.log('if hasDeposit', hasDeposit);
      hasDeposit = true;
      // the below line is commentted to avoid calling setState inside of a hook 
      // setDeposit(deposit)
    }
  }
  
  const csvUpload = () => {
    inputCSVFile.current.click();
  }

  const onCSVUpload = (event) => {
    const csv = importCSV(event, setAttendees);
  }
  
  const validateNEARAccounts = () => {
    checkAccountIds(attendees, setAttendees, setAccountsNotExist)
  }

  const addDeposit = async () => {
    try {
      const deposit = await window.api.addDeposit();
      setDeposit(true)
    } catch (error) {
      console.log('error in add deposit');
    }
  }
  
  const uploadImage = (image) => {
    // console.log('setImage', image);
    setNFTImage(image)
    // setFilePath("/Users/jedi/dOrg/NEAR/proof-of-attendance/src/constants/kobe-gianna.png")
  }
  
  const onChangeImageUpload = async (event) => {
    const image = await importImage(event, uploadImage, setImageFile);
  }
  
  const onClickStoreImage = () => {
    // console.log('onClickStoreImage nftImage', nftImage);
    // store(nftImage);
    storeImage(nftImage);
  }
  
  const onClickStoreImageFirebase = () => {
    // console.log('nftImage', nftImage);
    storeImageFirebase(imageFile, nftImage);
  }
  
  const onClickFleekUpload = () => {
    console.log('onClickFleekUpload');
    uploadToFleek(imageFile.name, nftImage);
  }
    
  const onClickUploadImage = () => {
    inputImageFile.current.click();
  }
  
  const mintNFTs = () => {
    console.log('attendees', attendees);
    console.log('accountsNotExist', accountsNotExist);
    console.log('nftImage', nftImage);
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
                  {
                    nftImage ? (
                      <img src={nftImage} alt={imageAlt}/>
                    ) : (
                      "Here we display how the NFT media looks like"
                    )
                  }
                </Box>  
              </Paper>
            </Grid>
            
            <br />
            <Grid item xs={12}>
              <Typography variant="subtitle2">STEP 1:</Typography>
              <input type="file" ref={inputCSVFile} style={{display: "none"}} onChange={onCSVUpload}/>
              <Button variant="contained" onClick={csvUpload}>
                CSV Upload
              </Button>
            </Grid>
            
            <br />
            <Grid item xs={12}>
              <Typography variant="subtitle2">STEP 2:</Typography>
              <Button variant="contained" onClick={validateNEARAccounts}>
                Validate NEAR Accounts
              </Button>
            </Grid>
            
            <br/>
            
            <Grid item xs={12}>  
              
              {/*
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Before uploading NFT first deposit NEAR
                </Typography>
              </Grid> 
              */}  
              <Grid item xs={12}>
                <Typography variant="subtitle2">STEP 2:</Typography>
                <Button variant="contained" onClick={addDeposit}>
                  Add Deposit
                </Button>
              </Grid>
            </Grid>

            <br />
            <Grid item xs={12}>
              <Typography variant="subtitle2">STEP 3:</Typography>
              <input type="file" ref={inputImageFile} style={{display: "none" }} onChange={onChangeImageUpload}/>
              <Button variant="contained" onClick={onClickUploadImage}>
                Upload JPEG/NFT
              </Button>
            </Grid>
            
            <br />
            <Grid item xs={12}>
              <Typography variant="subtitle2">STEP 4:</Typography>
              <Button variant="contained" onClick={onClickStoreImageFirebase}>
                Upload Fleek
              </Button>
            </Grid>
            
            <br />
            <Grid item xs={12}>
              <Typography variant="subtitle2">STEP 4:</Typography>
              <Button variant="contained" onClick={onClickStoreImageFirebase}>
                Upload Firebase
              </Button>
            </Grid>
            
            <br/>
            <Grid item xs={12}>
              <Typography variant="subtitle2">STEP 4:</Typography>
              <Button variant="contained" onClick={onClickStoreImage}>
                Store NFT Image
              </Button>
            </Grid>
            
            <br />
            <Grid item xs={12}>
              <Typography variant="subtitle2">STEP 5:</Typography>
              <Button variant="contained" onClick={mintNFTs}>
                Mint NFT
              </Button>
            </Grid>
            
          </Grid>
        </Grid>    
        
        {/* column 2 */}
        <Grid item xs={6}>
          <Grid item xs={12}>
            <AttendeesTable attendees={attendees} />
          </Grid>

          <br/>
          <Grid item xs={12}>
            {
              // For some weird reason we need to call setAccountsNotExist even though we are not rendering the below table.
              accountsNotExist.length > 0 && (
                <Box>
                  These Wallet ID's do not exist
                  <br/>
                  <br/>
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


