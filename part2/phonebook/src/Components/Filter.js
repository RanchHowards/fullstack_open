import React from 'react'

const Filter = (props) => {

    return (
        <input value={props.searchName} onChange={props.changeSearchName} />
    )
}

export default Filter