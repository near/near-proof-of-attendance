import React from "react";

import { login } from '../utils';

const styles = {
  textAlign: "center", 
  marginTop: "2.5em",

}

function Home() {
  return (
    <main>
      <h1>Welcome to Event Cred</h1>
      <p style={styles}>
        <button onClick={login}>Sign in</button>
      </p>
    </main>
  )
}

export default Home;