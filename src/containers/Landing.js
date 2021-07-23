import React from "react";
import {
  Box,
  Typography,
  Button,
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles'


import { 
  login,
  login2
} from '../utils/auth';

const useStyles = makeStyles(theme => ({}))


function Home() {
  const classes = useStyles();
  return (
    <Box>
      <Box>
        <Typography variant="h3" component="span" color="primary">
          Welcome to Event Cred
        </Typography>
      </Box>
      <br />
      <Box>
        <Button onClick={login} color="primary" variant="outlined">Sign in</Button>
      </Box>     
    </Box>
  )
}

export default Home;