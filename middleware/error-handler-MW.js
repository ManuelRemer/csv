const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  if (err.name === "CastError") {
    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      msg: `Can't find ${err.kind}: ${err.value}`,
    };
  }

  if (err.name === "ValidationError") {
    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      msg: Object.values(err.errors)
        .map((item) => item.message)
        .join(", "),
    };
  }

  if (err.code === "MODULE_NOT_FOUND") {
    customError = {
      statusCode: StatusCodes.BAD_REQUEST,
      msg: `There is no such collection in DB`,
    };
  }

  console.log(err.message);
  res.status(customError.statusCode).json({ msg: customError.msg, err });
};

module.exports = errorHandler;
