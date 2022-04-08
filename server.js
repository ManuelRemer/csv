require("dotenv").config();
require("express-async-errors");

// node express mongoose
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// npm other packages
const fileUpload = require("express-fileupload");

// custom stuff
const notFound = require("./middleware/not-found-MW");
const errorHandler = require("./middleware/error-handler-MW");

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/api/v1", (req, res) => {
  res.send("Hallo from the backend");
});

// error handling middleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`listening on port ${port} ....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
