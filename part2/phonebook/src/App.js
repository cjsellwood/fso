import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import NewEntry from "./components/NewEntry";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personsService.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
    });
  }, []);

  const changeName = (e) => {
    setNewName(e.target.value);
  };

  const changeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const changeSearch = (e) => {
    setSearch(e.target.value);
  };

  const submitEntry = (e) => {
    e.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook`);
      return;
    }

    personsService
      .create({
        name: newName,
        number: newNumber,
      })
      .then((newPerson) => {
        setPersons([...persons, newPerson]);
        setNewName("");
        setNewNumber("");
      });
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${person.name} from phonebook`)) {
      return;
    }
    personsService.deleteEntry(id).then((data) => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} changeSearch={changeSearch} />
      <h3>Add a new</h3>
      <NewEntry
        newName={newName}
        newNumber={newNumber}
        changeName={changeName}
        changeNumber={changeNumber}
        submitEntry={submitEntry}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
