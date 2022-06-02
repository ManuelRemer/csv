const express = require("express");
const {
  createProductsFromCSV,
  getAllItems,
  requireModelUploadData,
  getAllCollections,
  getCollectionKeys,
} = require("../controllers/controllers");

const router = express.Router();

// router.route("/").post(createProductsFromCSV);

router.route("/").post(requireModelUploadData).get(getCollectionKeys);

// router.route("/").get(getAllProducts).post(createSingleProduct);

// router
//   .route("/:id")
//   .get(getSingleProduct)
//   .delete(deleteSingleProduct)
//   .patch(updateSingleProduct);

// router.route("/csv").post(createProductsFromCSV).get(getProductsAsCsv);

module.exports = router;
