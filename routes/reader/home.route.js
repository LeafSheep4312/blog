const express = require("express");
const router = express.Router();    
const controller = require("../../controllers/reader/home.controller");

router.get("/", controller.index);

//Detail
router.get("/post/:id", controller.detail);


module.exports = router;