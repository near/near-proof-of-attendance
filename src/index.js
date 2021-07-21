import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom";

import { 
  App,

} from "./containers";

import { initContract } from "./utils/auth"

import "./global.css"

const RenderApp = () => {
  ReactDOM.render(
    <App />,
    document.querySelector("#root")
  )
}

window.nearInitPromise = initContract().then(RenderApp).catch(console.error)
