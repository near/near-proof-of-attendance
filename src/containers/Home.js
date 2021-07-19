import React from "react"
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,

} from "@material-ui/core";

import { 
  makeStyles,

} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    textAlign: 'center',
  }
}));

export default function Home() {
  const classes = useStyles();
  const account = "proofofattedanceplayground.testnet.near";
  
  const onKeyDown = (event) => {
    console.log(event)
    event.key === "Enter" ? console.log(`Hitting Enter navigate to BadgesList with corresponding Account Name from input text${event.target.value}`) : console.log("not enter")
  }

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h2">Verify attendance with Event Cred</Typography>
        </Grid>
        
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TextField id="standard-basic" label="NEAR Account Name" onKeyDown={onKeyDown}/>
          </Paper>
        </Grid>
        
        {/* 2 column grid */}
        
        {/* column 1 */}
        <Grid item xs={6}>
         <Paper className={classes.paper}>
           <Link to="/new">
             <Button>Create New Badges</Button>
           </Link>
         </Paper>
        </Grid>
        
        {/* column 2 */}
        <Grid item xs={6}>
         <Paper className={classes.paper}>
           <Link to={`/badges/${account}`}>
             <Button>View Your Badges</Button>
           </Link>
         </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}