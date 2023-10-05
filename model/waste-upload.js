const mongoose = require("mongoose");


const wasteUploadSchema = new mongoose.Schema({
  product: {
    type: String,
   // required: true,
  },
  quantity: {
    type: String,
    //required: true,
  },
  location: {
    type: String,
    //required: true,
  },
  wasteProcessingDescription: {
    type: String,
    //required: true,
  },
  wasteProducedTime: {
    type: String,
    //required: true,
  },
  utilizableTime: {
    type: String,
    //required: true,
  },
  transportationAvailable: {
    type: String,
    //required: true,
  },
   image: {
    type: String,
  //   required: true,
   },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  //  required: true,
  },
  createdAt: {
    type: String,
   // required: true,
  },
  isLocked: {
    type: String,
   // required: true,
  }
});

module.exports = mongoose.model("WasteUpload", wasteUploadSchema);
exports.wasteUploadSchema = wasteUploadSchema;
