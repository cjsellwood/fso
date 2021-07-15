const express = require("express");
const app = express();

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const person = persons.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(404).json({ error: "person not found" });
  }
  res.json(person);
});

app.get("/info", (req, res) => {
  res.send(
    `<div>
    <p>Phonebook had info for ${persons.length} people</p>
    <p>${new Date()}</p>
    </div>`
  );
});

app.listen(3001, () => {
  console.log("server on port 3001");
});
