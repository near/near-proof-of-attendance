import React from "react";
import ReactDOM from "react-dom";

// import App from "./components/App";
// import { initContract } from "./utils";
import { 
  App,

} from "./containers";

import { initContract } from "./nft";

import "./global.css"

const RenderApp = () => {
  ReactDOM.render(
    <App />,
    document.querySelector("#root")
  )
}

window.nearInitPromise = initContract().then(RenderApp).catch(console.error)
