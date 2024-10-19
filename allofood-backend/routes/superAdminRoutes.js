const superAdminController = require("../controllers/superAdmin/superAdminController");
const express = require("express");
const router = express.Router();

router.post("/add", superAdminController.addRestaurant);

module.exports = router;
