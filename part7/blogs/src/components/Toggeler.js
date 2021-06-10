import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Toggeler = (props) => {
  Toggeler.propTypes = {
    buttonName: PropTypes.string.isRequired,
    toggleVisibility: PropTypes.func.isRequired,
  }
  const showWhenVisible = { display: props.visible ? '' : 'none' }
  const hideWhenVisible = { display: props.visible ? 'none' : '' }

  const buttonStyle = { marginBottom: 10 }
  return (
    <div>
      <Button
        style={(showWhenVisible, buttonStyle)}
        onClick={props.toggleVisibility}
      >
        {props.buttonName}
      </Button>
      <div style={hideWhenVisible}>
        {props.children}
        <Button onClick={props.toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
}

export default Toggeler
