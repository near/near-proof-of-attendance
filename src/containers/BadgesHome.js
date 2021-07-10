import React from "react"
import { Link } from "react-router-dom";

export default function BadgesHome() {
  const account = "proofofattedanceplayground.testnet.near"
  return (
    <>
      <h2>Verify attendance with Event Cred</h2>
      <br />
      <input type="text" placeholder="NEAR Account Name" /> 
      {/* 2 column grid */}
      
      <Link to="/new">
        <button>Create New Badges</button>
      </Link>
      <Link to={`/badges/${account}`}>
        <button>View Your Badges</button>
      </Link>
    </>
  )
}