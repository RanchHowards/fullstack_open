import React, { useState, useEffect } from 'react'


import Filter from './Components/Filter'
import People from './Components/People'
import PersonForm from './Components/Form'

import phoneService from './Services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    }

    else {
      const newEntry = { name: newName, number: newNumber }
      phoneService.add(newEntry)
        .then(newEntry => setPersons(persons.concat(newEntry)))
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

  const removeEntry = (id) => {
    if (window.confirm(`Do you really want to delete this?`)) {
      phoneService.remove(id)
      setPersons(persons.filter(person => person.id !== id))
    }

  }

  const hook = () => {
    phoneService.getAll()
      .then(initialPeople => setPersons(initialPeople))
  }

  useEffect(hook, []) // the empty array means this efect will only be run after the first render

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
      <People persons={searchPersons} removeEntry={removeEntry} />
    </div>


  )
}

export default App