
import React from 'react'


const People = (props) => {
    const { persons } = props
    return (persons.map(person => <Person key={person.name} person={person} removeEntry={props.removeEntry} />))
}
const Person = (props) => {
    const { person } = props

    return (<div>{person.name} {person.number}<button onClick={() => props.removeEntry(person.id)}>DELETE</button></div>)
}
export default People