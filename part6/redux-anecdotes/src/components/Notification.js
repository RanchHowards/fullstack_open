import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = props.notification !== null ?
    {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    } :
    { display: 'none' }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification === null ? null : state.notification.content
  }
}

export default connect(mapStateToProps)(Notification)