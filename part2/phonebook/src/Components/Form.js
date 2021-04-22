import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addName}>
            <div>
                name: <input value={props.newName}
                    onChange={props.addNewName} />
            </div>
            <div>
                number: <input value={props.newNumber}
                    onChange={props.addNewNumber} />
            </div>
            <div>
                <button >add</button>
            </div>
        </form>
    )
}

export default PersonForm

