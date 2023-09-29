const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/images", express.static(__dirname + "/images"));

// Cors
app.use(cors());
app.options("*", cors());

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((e) => {
    console.log(e);
  });

const userRoutes = require("./routes/users");
const wasteUploadRoutes = require("./routes/waste-uploads");
const wasteAvailabilityRoutes = require("./routes/waste-availabilities");

app.use("/user", userRoutes);
app.use("/scrap", wasteUploadRoutes);
app.use("/waste", wasteAvailabilityRoutes);

//test
app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(3000, () => {
  console.log("Server is ready!");
});
