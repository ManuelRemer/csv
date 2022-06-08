const mongoose = require("mongoose");
const { createWriteStream, existsSync } = require("fs");
const path = require("path");

const { format } = require("@fast-csv/format");

// custom stuff
const uploadToDatabase = require("./utils/uploadToDatabase");
const csvFromDatabase = require("./utils/csvFromDatabase");

const addCsv = async (req, res) => {
  const { tempFilePath } = req.body;
  const { model } = req;
  console.log("server: ", tempFilePath);

  if (!existsSync(tempFilePath)) {
    throw new Error(`Temporary File does not exist: ${tempFilePath}`);
  }
  const data = await uploadToDatabase(tempFilePath, model);
  res
    .status(200)
    .json({ success: true, msg: `${data.length} datasets uploaded`, data });
};

const createCsv = async (req, res) => {
  const { model } = req;
  const items = await model.find({});
  res.setHeader("Content-disposition", "attachment; filename=file.csv");
  res.setHeader("Content-type", "text/html; charset=UTF-8");
  csvFromDatabase(items, res);
};

const getAllCollections = async (req, res) => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  const collNames = collections.map((coll) => coll.name);
  res.status(200).json({ success: true, collections: collNames });
};

const getAllItems = async (req, res) => {
  const { model } = req;
  const items = await model.find({});
  res.status(200).json({ success: true, items });
};

const getCollectionKeys = async (req, res) => {
  const { model } = req;
  const firstEntry = await model.findOne({});
  const keys = Object.keys(firstEntry.toJSON());
  res.status(200).json({ success: true, keys });
};

const addItem = async (req, res) => {
  const { model, body } = req;
  await model.create(body);
  res.status(200).json({ success: true });
};

const getItem = async (req, res) => {
  const { id } = req.params;
  const { model } = req;
  const item = await model.findOne({ _id: id });
  res.status(200).json({ success: true, item });
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  const { model } = req;
  const item = await model.deleteOne({ _id: id });
  res.status(200).json({ success: true, msg: "deleted", item });
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { model, body } = req;
  const item = await model.findOneAndUpdate(
    { _id: id },
    { ...body },
    {
      new: true,
    }
  );
  res.status(200).json({ item });
};

module.exports = {
  addCsv,
  addItem,
  getAllItems,
  getItem,
  deleteItem,
  updateItem,
  getAllCollections,
  getCollectionKeys,
  createCsv,
};
