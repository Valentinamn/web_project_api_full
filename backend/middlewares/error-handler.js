module.exports = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? 'Error interno del servidor' : err.message;

  res.status(statusCode).send({ message });
};
