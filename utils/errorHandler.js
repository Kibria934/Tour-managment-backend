module.exports.errorHandler = (err, req, res, next) => {
  res.status(400).send({
    status: "Fail",
    message: "Something went wrong",
    error: err.message,
  });
};
