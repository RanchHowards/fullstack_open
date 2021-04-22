import React, { useState } from 'react'

import Filter from './Components/Filter'
import People from './Components/People'
import PersonForm from './Components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    }

    else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName("")
      setNewNumber("")
    }
  }
  const addNewName = (event) => {
    setNewName(event.target.value)
  }
  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const reg = new RegExp(searchName, "i");

  const searchPersons = persons.filter(person => reg.exec(person.name))

  const changeSearchName = (event) => {
    setSearchName(event.target.value)

  }


  return (
    <div>
      {/* <div>debug: {searchPersons}</div> */}
      <h2>Phonebook</h2>
      <Filter changeSearchName={changeSearchName} />

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addNewNumber={addNewNumber}
        addName={addName}
        addNewName={addNewName}
      />
      <h2>Numbers</h2>
      <People searchName={searchName} persons={searchPersons} />
    </div>


  )
}

export default App