const express = require("express");
const WasteAvailability = require("../model/waste-availability");

const router = express.Router();

router.get("/", (req, res) => {
  WasteAvailability.find({})
    .then((wastes) => {
      if (wastes.length > 0) {
        return res
          .json({ scraps: wastes, message: "Wastes fetched successfully!" })
          .status(200);
      }
      return res
        .json({ scraps: null, message: "No Waste(s) uploaded till now!" })
        .status(400);
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({ scraps: null, message: "Fetching Wastes failed!" })
        .status(500);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  WasteAvailability.find({ _id: id })
    .then((waste) => {
      if (waste) {
        return res
          .json({ scrap: waste[0], message: "Waste fetched successfully!" })
          .status(200);
      }
      return res
        .json({ scrap: null, message: "Waste Fetching failed!" })
        .status(400);
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({ scrap: null, message: "Fetching Wastes failed!" })
        .status(500);
    });
});

router.post("/", (req, res) => {
  const wasteAvailability = new WasteAvailability({
    product: req.body.product,
    edibility: req.body.edibility,
    origin: req.body.origin,
    complexity: req.body.complexity,
    treatment: req.body.treatment,
    bioDegradability: req.body.bioDegradability,
    stageOfSupplyChain: req.body.stageOfSupplyChain,
    packaging: req.body.packaging,
    packagingDegradability: req.body.packagingDegradability,
    detail: req.body.detail,
    image: req.body.image,
    scrapId: req.body.scrapId,
    creatorId: req.body.creatorId,
    createdAt: req.body.createdAt,
   // industryName: req.body.industryName.toLowerCase(),
    scrapLocation: req.body.scrapLocation,
  });

  wasteAvailability
    .save()
    .then((waste) => {
      if (waste._id) {
        return res
          .json({ scrap: waste, message: "Scrap was uploaded!" })
          .status(200);
      }
      return res
        .json({ scrap: null, message: "Uploading scrap failed!" })
        .status(400);
    })
    .catch((err) => {
      console.error(err);
      return res
        .json({ scrap: null, message: "Failed to upload scrap!" })
        .status(500);
    });
});

router.post("/non-tech", (req, res) => {
  let responseArray = [];

  if (req.body.industryName != "") { 
    WasteAvailability.find({
      industryName: req.body.industryName,
    })
      .then((industry) => {
        if (req.body.industryLocation != "") {
          for (let i of industry) {
            if (i.scrapLocation == req.body.industryLocation) {
              responseArray.push(i);
            }
          }
          return res
            .json({ scrap: responseArray, message: "Scraps Fetched" })
            .status(200);
        } else {
          if (industry.length > 0) {
            responseArray = industry;
            return res
              .json({ scrap: responseArray, message: "Scraps Fetched" })
              .status(200);
          }
          return res
            .json({ scrap: null, message: "No Scraps Fetched" })
            .status(400);
        }
      })
      .catch((err) => {
        console.error(err);
        return res
          .json({ scrap: null, message: "Scraps Fetching Failed" })
          .status(500);
      });
  } else {
    if (req.body.industryLocation != "") {
      WasteAvailability.find({
        scrapLocation: req.body.industryLocation,
      })
        .then((industry) => {
          if (industry.length > 0) {
            responseArray = industry;
            return res
              .json({ scrap: responseArray, message: "Scraps Fetched" })
              .status(200);
          }
        })
        .catch((err) => {
          console.error(err);
          return res
            .json({ scrap: null, message: "Scraps Fetching Failed" })
            .status(500);
        });
    }
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  WasteAvailability.findByIdAndDelete(id, { password: 0 })
    .then((waste) => {
      if (waste._id) {
        return res
          .json({
            waste: waste,
            message: "Scrap  Delete Successfully",
          })
          .status(200);
      }
      return res
        .json({
          waste: null,
          message: "Scraps Deleting Failed",
        })
        .status(404);
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({ waste: null, message: "Failed to Delete Scrap!" })
        .status(500);
    });
});

module.exports = router;
