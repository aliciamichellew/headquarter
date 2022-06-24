const notFound = (request, response, next) => {
  const error = new Error(`Not Found - ${request.originalUrl}`);
  response.status(404);
  next(error);
};

const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  response.status(statusCode);
  response.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

const handleError = (res, err) => {
  res.status(err.code).json({
    errors: {
      msg: err.message,
    },
  });
};

const handleSuccess = (res, obj) => {
  res.status(200).json(obj);
};

const buildErrorObject = (code, message) => {
  return { code, message };
};

const buildSuccessObject = (message) => {
  return message;
};

const itemNotFound = (error, item, reject, message) => {
  if (error) {
    reject(this.buildErrorObject(422, error.message));
  }
  if (!item) {
    reject(this.buildErrorObject(404, message));
  }
};

module.exports = {
  notFound,
  errorHandler,
  handleError,
  handleSuccess,
  buildErrorObject,
  buildSuccessObject,
  itemNotFound,
};
