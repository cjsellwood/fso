const express = require("express");
const app = express();

app.use(express.json());

let persons = [
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
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res.status(404).json({ error: "person not found" });
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res.status(404).json({ error: "person not found" });
  }

  persons = persons.filter((person) => person.id !== id);
  res.json({ message: `${person.name} deleted` });
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  // If name or number not defined
  if (!name || !number) {
    return res
      .status(400)
      .json({ error: !name ? "Name not defined" : "Number not defined" });
  }

  // If name already exists
  if (persons.find((person) => person.name === name)) {
    return res.status(400).json({ error: "Person already in phonebook" });
  }

  const id = Math.floor(Math.random() * 10 ** 9);
  const newPerson = {
    id,
    name,
    number,
  };
  persons = [...persons, newPerson];
  res.json(newPerson);
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
