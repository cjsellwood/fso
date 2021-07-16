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
    return res.json(result);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => {
      console.log(result);
      if (result) {
        return res.json(result);
      } else {
        return next(new Error("person not found"));
      }
    })
    .catch((error) => next(error));
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

// Update number of person already in phonebook
app.put("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndUpdate(
    req.params.id,
    { number: req.body.number },
    { new: true, runValidators: true }
  ).then((result) => res.json(result));
});

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body;

  // If name or number not defined
  if (!name || !number) {
    return res
      .status(400)
      .json({ error: !name ? "Name not defined" : "Number not defined" });
  }

  // If name already exists
  // const existing = await Person.find({ name: name });
  // console.log(existing);

  // if (existing.length) {
  //   return next(new Error("Person already in phonebook"));
  // }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson
    .save()
    .then((result) => res.json(result))
    .catch((error) => next(new Error(error)));
});

app.get("/info", (req, res) => {
  Person.find().then((result) => {
    return res.send(
      `<div>
      <p>Phonebook had info for ${result.length} people</p>
      <p>${new Date()}</p>
      </div>`
    );
  });
});

app.use("*", (req, res, next) => {
  return next(new Error("Page not found"));
});

app.use((error, req, res, next) => {
  return res.status(400).json({ error: error.message });
});

const PORT = process.env.PORT || 3001;
app.listen(3001, () => {
  console.log("server on port " + PORT);
});
