import React from 'react'


const People = ({ persons }) => {

    return (persons.map(person => <Person key={person.name} person={person} />))
}
const Person = ({ person }) => {

    return (<div>{person.name} {person.number}</div>)
}
export default People