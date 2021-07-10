import React from 'react'

function AttendeesTable() {
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Wallet ID</th>
          <th>Attended</th>
          <th> &#62; 30 Min</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tony</td>
          <td>stark.near</td>
          <td>yes</td>
          <td>yes</td>
        </tr>
        <tr>
          <td>Thor</td>
          <td>asgard.near</td>
          <td>yes</td>
          <td>no</td>
        </tr>
        <tr>
          <td>Steve</td>
          <td>captainsteverogers.near</td>
          <td>yes</td>
          <td>yes</td>
        </tr>
      </tbody>
    </table>
  )
}

export default function CreateNewBadges() {
  return (
    <>
      <h2>Create New Badges</h2>
      <button>Upload JPEG/NFT</button>
      <button>Mint</button>
      <button>CSV Upload</button>
      <AttendeesTable />
    </>
  )
}


