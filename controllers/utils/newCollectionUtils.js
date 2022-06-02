const findIndexFirstNewLine = (data) => {
  return data.match(/\r|\n/).index;
};

const createNewHeadersArray = (data) => {
  const index = findIndexFirstNewLine(data);
  return data.slice(0, index).split(";");
};

const createTemplate = (name) => (captName) => (headers) => {
  return `const mongoose = require("mongoose"); 
  const ${name}Schema = new mongoose.Schema({
    ${headers.map((header) => `${header}: String`)}
  }); 
 module.exports = mongoose.model("${captName}", ${name}Schema)`;
};

const capitalizeFirstChar = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

module.exports = {
  findIndexFirstNewLine,
  createNewHeadersArray,
  capitalizeFirstChar,
  createTemplate,
};
