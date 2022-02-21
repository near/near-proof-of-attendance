import React from "react"

// this component gets rendered by App after the form is submitted
function Notification(props) {
  return (
    <aside>
      <div>
        { props.message }  { props.networkId && `in network: ${props.networkId}` } 
      </div>
    </aside>
  )
}

export default Notification;