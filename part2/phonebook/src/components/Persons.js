import React from "react";
import Person from "./Person";

const Persons = ({ persons, search, deletePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((person) => (
          <Person key={person.name} person={person} deletePerson={deletePerson} />
        ))}
    </ul>
  );
};

export default Persons;
