const express = require("express");
const tours = require("../controllers/tours.controller");
const viewCount = require("../middleware/viewCount");
const router = express.Router();

router.route("/").get(tours.getTour).post(tours.createTourPackages);

router.route("/:id").get(viewCount, tours.getATourDetails);

module.exports = router;
