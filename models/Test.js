const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
  Hauptartikelnr: String,
  Artikelname: String,
  Hersteller: String,
  Beschreibung: String,
  Materialangaben: String,
  Geschlecht: String,
  Produktart: String,
  Ärmel: String,
  Bein: String,
  Kragen: String,
  Herstellung: String,
  Taschenart: String,
  Grammatur: String,
  Material: String,
  Ursprungsland: String,
  Bildname: String,
});
module.exports = mongoose.model("Test", testSchema);
