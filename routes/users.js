const express = require("express");
const User = require("../model/user");

const router = express.Router();

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length === 0) {
        return res
          .json({
            user: null,
            message: "No account found with email " + req.body.email,
          })
          .status(404);
      }
      if (user[0].password === req.body.password) {
        return res
          .json({ user: user, message: "Login Successfull" })
          .status(200);
      } else {
        return res
          .json({ user: null, message: "Invalid Password!" })
          .status(400);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ user: null, message: "User Login Failed" }).status(500);
    });
});

router.post("/signup", (req, res) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    industryName: req.body.industryName,
    industryLocation: req.body.industryLocation,
    phoneNo: req.body.phoneNo,
    isAdmin: req.body.isAdmin,
  });

  user
    .save()
    .then((user) => {
      return res
        .json({ user: user, message: "Signup Successfull!" })
        .status(200);
    })
    .catch((err) => {
      console.log(err);
      if (err.keyPattern.email) {
        return res
          .json({
            user: null,
            message: `Email ${err.keyValue.email}, Already exsist!`,
          })
          .status(500);
      }
      return res.json({ user: null, message: "Signup Failed!" }).status(500);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      if (user) {
        return res
          .json({ user: user, message: "User Fetched successfully" })
          .status(200);
      }
      return res.json({ user: null, message: "User not found" }).status(404);
    })
    .catch((err) => {
      console.log(err);
      return res
        .json({ user: null, message: "Fetching user failed" })
        .status(500);
    });
});

module.exports = router;
