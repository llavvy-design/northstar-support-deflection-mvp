const express = require("express");

const router = express.Router();

const {
    getOrder
} = require("../controllers/orderController");


// GET /api/orders/:orderId
router.get("/:orderId", getOrder);


module.exports = router;