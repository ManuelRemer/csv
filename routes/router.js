const express = require("express");
const {
  getAllCollections,
  getAllItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
  addCsv,
  getCollectionKeys,
  createCsv,
} = require("../controllers/controllers");

const {
  checkIfModelCreateNewModel,
} = require("../controllers/collectionController");

const requireModel = require("../middleware/require-model");

const router = express.Router();

// api/v1/collections

router.route("/").get(getAllCollections);

router.route("/:collection/check").post(checkIfModelCreateNewModel);

router.route("/:collection/keys").get(requireModel, getCollectionKeys);

router
  .route("/:collection")
  .get(requireModel, getAllItems)
  .post(requireModel, addItem);

router
  .route("/:collection/csv")
  .post(requireModel, addCsv)
  .get(requireModel, createCsv);

router
  .route("/:collection/:id")
  .get(requireModel, getItem)
  .delete(requireModel, deleteItem)
  .patch(requireModel, updateItem);

module.exports = router;
