const express = require("express");
const tours = require("../controllers/tour.controller");
const viewCount = require("../middleware/viewCount");
const router = express.Router();

router.route("/").get(tours.getTour).post(tours.createTourPackages);

router.route("/:id").get(tours.getATourDetails);

module.exports = router;
