import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ImageListItem,

} from "@material-ui/core";
import {
  makeStyles,

} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  listItem: {
    flexDirection: "column",
  }
}));

const badgesList = [
  // { name: "Michael Jordan", media: "http://i.imgur.com/uxx7BQz.jpg" },
  // { name: "Kobe & Gianna Bryant", media: "http://i.imgur.com/ardmpqm.png" },
  { name: "Michael Jordan", media: "https://firebasestorage.googleapis.com/v0/b/proof-of-attendance.appspot.com/o/uxx7BQz.jpeg?alt=media" },
  { name: "Kobe & Gianna Bryant", media: "https://firebasestorage.googleapis.com/v0/b/proof-of-attendance.appspot.com/o/ardmpqm.png?alt=media" },
];

export default function BadgesList() {
  const classes = useStyles();
  
  const BadgeItem = (props) => {
    return (
      <ListItem className={classes.listItem}>
        <div>
          { props.name }
        </div>
        <div>
          <img src={props.media} alt={props.name} width={100}/>    
        </div>      
      </ListItem>
    )
  }
  
  const mapBadgeItems = (badge, index) => {
    return (
      <BadgeItem key={index} name={badge.name} media={badge.media}/>
    )
  }
  
  const BadgesList = () => {
    return (
      <List>
        {
          badgesList.map(mapBadgeItems)
        }
      </List>
    )
  }
  
  return (
    <Box>
      <Typography variant="h2">
        Attendance Badge List
      </Typography>
      <BadgesList />
    </Box>
  )
}