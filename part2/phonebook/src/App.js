import React, { useState } from "react";
import Filter from "./components/Filter";
import NewEntry from "./components/NewEntry";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
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
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;
