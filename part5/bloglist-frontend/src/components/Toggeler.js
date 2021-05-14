import React from 'react'

const Toggeler = (props) => {
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