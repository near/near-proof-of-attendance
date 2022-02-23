import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Notification } from "./";

import { login, logout } from "../utils/auth";

import getConfig from "../config";

// FIXME: The ui is not correctly fetching the envs so we hardcode it here
const { networkId } = getConfig("mainnet");
// const { networkId } = getConfig("development");

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

export default function AppHeader() {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <Typography variant="h6">
            Home
          </Typography>
        </Link>
        <Typography variant="h6">
          Network ID: { networkId }
        </Typography>
        <Link to="">
          <Typography variant="h6" onClick={logout}>
            Sign out
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
