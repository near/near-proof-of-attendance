import React, {
  useState,
  useRef,
  useEffect,
  useCallback
} from "react";

import fleekStorage from "@fleekhq/fleek-storage-js";

import { SkynetClient } from "skynet-js";

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
  storeImageTextile,
  storeImageFirebase,
  storeImageFleek,

} from "../utils/store";

import {
  mint,
  
} from "../utils/mint";

import {
  checkAccountIds,

} from "../utils/wallet"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    marginRight: 20,
  },
  step: {
    marginBottom: 5
  }

}));

// Dirty solution for using Textile as Storage :/
// hasDeposit is define outside of CreateNewBadges Hook in order to avoid "calling a setDeposit = setState() inside of a useEffect" warning.
// hasDeposit is set true by default so it does not show up when redirect from Depositing NEAR Wallet Page back to the dApp.
// let hasDeposit = true;

export default function CreateNewBadges() {
  const classes = useStyles();

  const [attendees, setAttendees] = useState([]);
  const [accountsNotExist, setAccountsNotExist] = useState([])

  const [nftImage, setNFTImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fleekUrl, setFleekUrl] = useState(null);
  const [nftHash, setNFTHash] = useState(null);

  const [hasDeposit, setDeposit] = useState(false);

  const inputCSVFile = useRef(null);
  const inputImageFile = useRef(null);

  const imageAlt = "image not successfully uploaded";

  const componentDidMount = () => {
    // checkHasDeposit()
  }

  useEffect(componentDidMount, []);

  const checkHasDeposit = async () => {
    const deposit = await window.api.hasDeposit();
    if(deposit) {
      console.log("if deposit", deposit);
      console.log("if hasDeposit", hasDeposit);
      // hasDeposit = true;
      // the below line is commentted to avoid calling setState inside of a hook 
      setDeposit(deposit)
    }
    else {
      console.log("else deposit", deposit);
      // hasDeposit = false;
      setDeposit(false)
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
      checkHasDeposit()
    } catch (error) {
      console.log('error in add deposit');
    }
  }

  const uploadImage = (image) => {
    setNFTImage(image) // this comes from image.js line 11.
  }

  const onChangeImageUpload = async (event) => {
    const image = await importImage(event, uploadImage, setImageFile);
  }

  const onClickStoreImageTextile = () => {
    storeImageTextile(nftImage, imageFile.name, setNFTHash, checkHasDeposit);
  }

  const onClickStoreImageFirebase = () => {
    storeImageFirebase(imageFile, nftImage);
  }

  const onClickStoreImageFleek = async () => {
    storeImageFleek(imageFile, setFleekUrl);
  }

  const onClickUploadImage = () => {
    inputImageFile.current.click();
  }

  const onClickSkynet = async () => {
    const file = "somefile"
    const customOptions = {
      portalFileFieldname: "filename",

    }
    try {
      const customOptions = {
        portalFileFieldname: "filename",

      }
      const client = new SkynetClient(customOptions);

      console.log('clinet', client);
      // const { skylink } = await client.uploadFile(file, customOptions);
      console.log('await client.upload(file);', await client.uploadFile(client, file, customOptions));
      // console.log('skylink', skylink);
    } catch (error) {
      console.log(error);
    }
  }
  
  const onClickMintNFTs = () => {
    mint(attendees, fleekUrl);
  }

  return (
    <Box>
      <Typography variant="subtitle1">
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
                      <img src={nftImage} alt={imageAlt} width={100}/>
                    ) : (
                      "Here we display how the NFT media looks like"
                    )
                  }
                </Box>  
              </Paper>
            </Grid>
            <br />
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" className={classes.step}>STEP 1:</Typography>
              <input type="file" ref={inputCSVFile} style={{display: "none"}} onChange={onCSVUpload}/>
              <Button variant="contained" onClick={csvUpload}>
                CSV Upload
              </Button>
            </Grid>
            <br />
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" className={classes.step}>STEP 2:</Typography>
              <Button variant="contained" onClick={validateNEARAccounts}>
                Validate NEAR Accounts
              </Button>
            </Grid>
            <br />
            {/*
              {
              !hasDeposit && (
                <>
                  <br/>
                  <Grid item xs={12}>  
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" className={classes.step}>
                        Before uploading NFT first deposit NEAR
                      </Typography>
                      <Button variant="contained" onClick={addDeposit}>
                        Add Deposit
                      </Button>
                    </Grid> 
                  </Grid>
                </>
              )
            }

            */}

            <Grid item xs={12}>
              <Typography variant="subtitle2" className={classes.step}>STEP 3:</Typography>
              <input type="file" ref={inputImageFile} accept="image/*" style={{display: "none" }} onChange={onChangeImageUpload}/>
              <Button variant="contained" onClick={onClickUploadImage}>
                Upload JPEG/NFT
              </Button>
            </Grid>
            <br />

            <Grid item xs={12}>
                <Typography variant="subtitle2" className={classes.step}>STEP 4:</Typography>
                <Button variant="contained" className={classes.button} onClick={onClickStoreImageFleek}>
                  Store Fleek
                </Button>                

                {/*<Button variant="contained" className={classes.button} onClick={onClickStoreImageFirebase}>
                  Store Firebase
                </Button>*/}           

                {/*<Button variant="contained" className={classes.button} onClick={onClickStoreImageTextile}>
                  Store Textile
                </Button>*/}
                
                {/*<Button variant="contained" onClick={onClickSkynet}>
                  Store Skynet
                </Button>*/}
            </Grid>
            <br />

            <Grid item xs={12}>
              <Typography variant="subtitle2" className={classes.step}>STEP 5:</Typography>
              <Button variant="contained" onClick={onClickMintNFTs}>
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