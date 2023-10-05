const mongoose = require("mongoose");

const wasteAvailabilitySchema = new mongoose.Schema({
  product: {
    type: String,
   // required: true,
  },
  edibility: {
    type: String,
   // required: true,
  },
  origin: {
    type: String,
   // required: true,
  },
  complexity: {
    type: String,
   // required: true,
  },
  treatment: {
    type: String,
  //  required: true,
  },
  bioDegradability: {
    type: String,
   // required: true,
  },
  stageOfSupplyChain: {
    type: String,
   // required: true,
  },
  packaging: {
    type: String,
   // required: true,
  },
  packagingDegradability: {
    type: String,
   // required: true,
  },
  detail: {
   // type: String,
  },
  scrapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WasteUpload",
   // required: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  //  required: true,
  },
  createdAt: {
    type: String,
  //  required: true,
  },
  industryName: {
    type: String,
  //  required: true,
  },
  scrapLocation: {
    type: String,
  //  required: true,
  },
   image: {
    type: String,
  //   required: true,
   }
});

module.exports = mongoose.model("WasteAvailability", wasteAvailabilitySchema);
exports.wasteAvailabilitySchema = wasteAvailabilitySchema;
