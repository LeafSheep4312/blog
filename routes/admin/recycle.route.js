const express = require("express");
const router = express.Router();    
const controller = require("../../controllers/admin/recycle.controller");

router.get("/", controller.recycle);

//Delete
router.delete("/delete/:id", controller.deletePost);

//Restore
router.patch("/restore/:id", controller.restore);

module.exports = router;