const express = require("express");
const router = express.Router();
const {
  getLocationByAddress,
  sendEmailWithLocationDetials,
  getLocations,
} = require("../controllers/geoLocationController");

router.get("/", getLocations);
router.post("/location/:address", getLocationByAddress);
router.post("/sendEmail", sendEmailWithLocationDetials);

module.exports = router;
