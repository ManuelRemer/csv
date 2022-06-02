const { format } = require("@fast-csv/format");

const csvFromDatabase = (data, res) => {
  const csvStream = format({ delimiter: ";", headers: true });
  csvStream.pipe(res);

  const processData = (data) => {
    data.forEach((row) => {
      const { _id, __v, ...newRow } = row._doc;
      csvStream.write({ ...newRow });
    });
    csvStream.end();
  };

  processData(data);
};

module.exports = csvFromDatabase;
