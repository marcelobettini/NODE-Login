"use strict";

const express = require("express");
const router = express.Router();
const mdlUsers = require("../models/mdlUsers");

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.post("/", async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  const data = await mdlUsers.getUser(user, pass);

  if (data != undefined) {
    req.session.user = user;
    res.render("secret", { user });
  } else {
    res.render("Login");
  }
});

module.exports = router;
