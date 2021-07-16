import React, { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import NewEntry from "./components/NewEntry";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personsService.getAll().then((returnedPersons) => {
      console.log(returnedPersons);
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

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the old number with a new one`
        )
      ) {
        return personsService
          .update(existingPerson.id, { name: newName, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setSuccess(`Updated the number of ${newName}`);

            setTimeout(() => {
              setSuccess(null);
            }, 5000);
          })
          .catch((error) => {
            setError(
              `Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      }
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
        setSuccess(`Added ${newPerson.name}`);

        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      });
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${person.name} from phonebook`)) {
      return;
    }
    personsService.deleteEntry(id).then((data) => {
      setPersons(persons.filter((person) => person.id !== id));
      setSuccess(`Deleted ${person.name}`);

      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={success} />
      <ErrorMessage message={error} />
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
