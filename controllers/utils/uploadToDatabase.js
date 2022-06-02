const { createReadStream, unlinkSync } = require("fs");
const csv = require("fast-csv");

const uploadToDatabase = async (path, model) => {
  return (promise = new Promise((resolve, reject) => {
    const fileRows = [];

    createReadStream(path)
      .pipe(csv.parse({ headers: true, delimiter: ";" }))
      .on("error", (err) => {
        console.log("error occurred at uploadToDatabase :", err);
        unlinkSync(path);
        reject(new Error(err));
      })
      .on("data", async (row) => {
        fileRows.push(row);
      })
      .on("end", async () => {
        await model.insertMany(fileRows);
        unlinkSync(path);
        resolve(fileRows);
      });
  }));
};
module.exports = uploadToDatabase;
