const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  console.log(error)

  next(error);
};

module.exports = {
  errorHandler,
};
