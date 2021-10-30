import React, { useEffect } from "react"

import { 
  Container, 
  CssBaseline,

} from "@material-ui/core";
import { 
  ThemeProvider,
  makeStyles,

} from "@material-ui/core/styles";

import { 
  AppRouter,
  
} from "./";

import { theme } from "../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 100,
    paddingBottom: 100,
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root}>
        <AppRouter />
        <CssBaseline />
      </Container>
    </ThemeProvider>
  )
}
