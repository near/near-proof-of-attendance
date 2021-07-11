import React from "react"

import { 
  Container, 
  CssBaseline,

} from "@material-ui/core";

import { 
  AppRouter,
  
} from "./";

import {
  AppHeader,

} from "../components";

export default function App() {
  
  return (
    <Container >
      <AppRouter />
      <CssBaseline />
    </Container>
  )
}
