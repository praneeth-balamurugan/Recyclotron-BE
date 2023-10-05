const express = require("express");
const multer = require("multer");
const WasteUpload = require("../model/waste-upload");

const router = express.Router();

const storageConfing = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const filename =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, filename);
  },
});

const upload = multer({ storage: storageConfing });

router.get("/", (req, res) => {
  WasteUpload.find({})
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

  WasteUpload.find({ _id: id })
    .then((waste) => {
      if (waste) {
        return res
          .json({ scrap: waste, message: "Wastes fetched successfully!" })
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

// get scrap by creator
router.get("/creator/:id", (req, res) => {
  const id = req.params.id;

  WasteUpload.find({ creator: id })
    .then((wastes) => {
      if (wastes.length > 0) {
        return res
          .json({ scraps: wastes, message: "Wastes fetched successfully!" })
          .status(200);
      }
      return res
        .json({ scraps: [], message: "No Waste(s) uploaded till now!" })
        .status(400);
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({ scraps: [], message: "Fetching Wastes failed!" })
        .status(500);
    });
});

// router.post("/add", upload.single('image'), (req, res) => {
router.post("/add", (req, res) => {
  const url = "http://" + req.get("host");

  const wasteUpload = new WasteUpload({
    product: req.body.product,
    quantity: req.body.quantity,
    wasteProcessingDescription: req.body.wasteProcessingDescription,
    wasteProducedTime: req.body.scrapTime,
    utilizableTime: req.body.utilizableTime,
    location: req.body.location,
    createdAt: req.body.createdAt,
    transportationAvailable: req.body.transportationOptions,
    image: req.body.image,
    creator: req.body.creator,
    isLocked: false,
  });

  wasteUpload
    .save()
    .then((waste) => {
      if (waste._id) {
        return res
          .json({ scrap: waste, message: "Your Scrap was uploaded!" })
          .status(200);
      }
      return res
        .json({ scrap: null, message: "Uploading your scrap failed!" })
        .status(400);
    })
    .catch((err) => {
      console.error(err);
      return res
        .json({ scrap: null, message: "Failed to upload your scrap!" })
        .status(500);
    });
});

router.put("/:id/lock-status", (req, res) => {
  const id = req.params.id;

  WasteUpload.findByIdAndUpdate(id, {
    isLocked: "true",
  })
    .then((waste) => {
      if (waste._id) {
        return res
          .json({ scrap: waste, message: "Your Scrap was update!" })
          .status(200);
      }
      return res
        .json({ scrap: null, message: "updating your scrap failed!" })
        .status(400);
    })
    .catch((err) => {
      console.error(err);
      return res
        .json({ scrap: null, message: "Failed to update your scrap!" })
        .status(500);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  WasteUpload.findByIdAndDelete(id, { password: 0 })
    .then((waste) => {
      if (waste._id) {
        return res
          .json({
            waste: waste,
            message: "Scrap Delete Successfully",
          })
          .status(200);
      }
      return res
        .json({
          waste: null,
          message: "Scrap Deleting Failed",
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
