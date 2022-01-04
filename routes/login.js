"use strict";
const express = require("express");
const router = express.Router();
const mdlUsers = require('../models/mdlUsers')
router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
const data = await mdlUsers.getUser(req.body.user, req.body.pass)
if(data != undefined) {
  console.log(data.userName)
  req.session.user = req.body.user
  console.log(req.session.userName)
  
  res.render('secret')
} else {
  res.redirect('/')
}
});
module.exports = router;
