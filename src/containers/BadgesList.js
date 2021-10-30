import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ImageListItem,
  Button,

} from "@material-ui/core";
import {
  makeStyles,

} from "@material-ui/core/styles";

import { query } from "../utils/query"

const useStyles = makeStyles(theme => ({
  listItem: {
    flexDirection: "column",
  }
}));

const badgesList = [
  { name: "Michael Jordan", title: "Michael Jordan", media: "https://firebasestorage.googleapis.com/v0/b/proof-of-attendance.appspot.com/o/uxx7BQz.jpeg?alt=media" },
  { name: "Kobe & Gianna Bryant", title: "Kobe & Gianna Bryant", media: "https://firebasestorage.googleapis.com/v0/b/proof-of-attendance.appspot.com/o/ardmpqm.png?alt=media" },
]

export default function BadgesList() {
  const classes = useStyles();
  const params = useParams();
  const [badges, setBadges] = useState(badgesList);

  const getBadges = async () => {
    const badges = await query(params.account, setBadges);
    if(badges.error) {
      return;
    }
    setBadges(badges.data)
  }

  const componentDidMount = () => {
    getBadges();
  }

  useEffect(componentDidMount,[]);

  const BadgeItem = (props) => {
    return (
      <ListItem className={classes.listItem}>
        <div>
          { props.title }
        </div>
        <div>
          <img src={props.media} alt={props.title} width={100}/>    
        </div>      
      </ListItem>
    )
  }
  
  const mapBadgeItems = (badge, index) => {
    return (
      <BadgeItem key={index} name={badge.name} title={badge.title} media={badge.media}/>
    )
  }
  
  const BadgesList = () => {
    return (
      <List>
        {
          badges.map(mapBadgeItems)
        }
      </List>
    )
  }
  
  return (
    <Box>
      <Typography variant="h2">
        Attendance Badge List
      </Typography>
      <Grid item xs={12}>
        <Button variant="contained" onClick={getBadges}>
          Get Badges
        </Button>
      </Grid>
      <BadgesList />
    </Box>
  )
}