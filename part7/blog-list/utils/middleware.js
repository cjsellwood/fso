const jwt = require("jsonwebtoken");

const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  console.log(error);

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = (req, res, next) => {
  if (req.token) {
    const decoded = jwt.verify(req.token, process.env.SECRET);
    req.userId = decoded.id;
  }
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
