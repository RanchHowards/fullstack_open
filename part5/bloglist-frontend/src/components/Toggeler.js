/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'

const Toggeler = (props) => {

    Toggeler.propTypes = {
        buttonName: PropTypes.string.isRequired,
        toggleVisibility: PropTypes.func.isRequired
    }
    const showWhenVisible = { display: props.visible ? '' : 'none' }
    const hideWhenVisible = { display: props.visible ? 'none' : '' }
    return (<div>
        <button style={showWhenVisible} onClick={props.toggleVisibility}>{props.buttonName}</button>
        <div style={hideWhenVisible}>
            {props.children}
            <button onClick={props.toggleVisibility}>cancel</button>
        </div>
    </div>
    )
}

export default Toggeler