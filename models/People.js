const mongoose = require("mongoose");
const peopleSchema = new mongoose.Schema({
  name: String,
  surname: String,
  age: String,
});
module.exports = mongoose.model("People", peopleSchema);
