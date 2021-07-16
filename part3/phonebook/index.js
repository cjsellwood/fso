require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.json());
app.use(cors());

morgan.token("body", function getBody(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

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
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res.status(404).json({ error: "person not found" });
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;

  // If name or number not defined
  if (!name || !number) {
    return res
      .status(400)
      .json({ error: !name ? "Name not defined" : "Number not defined" });
  }

  // If name already exists
  const existing = await Person.find({ name: name });
  console.log(existing);

  if (existing.length) {
    return res.status(400).json({ error: "Person already in phonebook" });
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save();
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

const PORT = process.env.PORT || 3001;
app.listen(3001, () => {
  console.log("server on port " + PORT);
});
