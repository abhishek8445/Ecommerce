const express = require("express");
const router = express.Router();
const {createProduct , subscribeToProduct, updateStock } = require("../controllers/product.controller");


router.post("/create", createProduct);
router.post("/subscribe", subscribeToProduct);
router.put("/update-stock/:productId", updateStock);

module.exports = router;