const express = require("express");
const {
  trending,
  cheapest,
  updateTour,
} = require("../controllers/logicalTour.controller");
const router = express.Router();

router.route("/trending").get(trending);
router.route("/cheapest").get(cheapest);
router.route("/:id").patch(updateTour);

module.exports = router;
