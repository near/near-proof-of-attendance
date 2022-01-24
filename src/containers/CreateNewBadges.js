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
  Snackbar,

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
import Alert from '@mui/material/Alert';
import { Stack } from "@mui/material";

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
  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [isSuccessful, setIsSuccessfull] = useState(false)

  const componentDidMount = () => {
    // This Effect can be needed.
  }

  useEffect(componentDidMount, []);

  useEffect(() => {
    if(fleekUrl === "error") {
      setSnackMessage("Error on uploading image"); 
      setIsSuccessfull(false);
      setOpen(true);
    }
    if(fleekUrl !== "error" && fleekUrl !== null) {
      setSnackMessage("Image correctly uploaded to IPFS")
      setIsSuccessfull(true)
      setOpen(true);
    }
  }, [fleekUrl]);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setSnackMessage("")
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

  const uploadImage = (image) => {
    setNFTImage(image) // this comes from image.js line 11.
  }

  const onChangeImageUpload = async (event) => {
    const image = await importImage(event, uploadImage, setImageFile);
  }

  const onClickStoreImageFleek = async () => {
    storeImageFleek(imageFile, setFleekUrl);
  }

  const onClickUploadImage = () => {
     inputImageFile.current.click();
  }

  
  const onClickMintNFTs = async () => {
    const mint_res = await mint(attendees, fleekUrl, imageFile.name);
    mint_res.error && window.open(`https://explorer.testnet.near.org/transactions/${mint_res.error.transaction_outcome.id}`);
    mint_res.transaction && window.open(`https://explorer.testnet.near.org/transactions/${mint_res.transaction.hash}`);
    if(mint_res) {
      setSnackMessage("Badge correctly minted")
      setIsSuccessfull(true)
      setOpen(true);
    }
    if(mint_res.error){
      setSnackMessage("There was an error while minting the badge")
      setIsSuccessfull(true)
      setOpen(true);
    }
  }

  return (
    <>
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

    <Snackbar autoHideDuration={6000} open={open} onClose={handleClose}>
       <Alert onClose={handleClose} severity={isSuccessful ? "success" : "error"} sx={{ width: '100%' }}>
        {snackMessage} 
       </Alert>
    </Snackbar>
    </>
  )
}