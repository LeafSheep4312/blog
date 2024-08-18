const express = require("express");
const router = express.Router();    
const controller = require("../../controllers/admin/role.controller");
const {prefixAdmin} = require("../../config/system");

router.get("/", controller.index);

//Create
router.get("/create", controller.create);
router.post("/create", controller.createPost);

//Permission
router.get("/permissions", controller.permissions);
router.patch("/permissions", controller.permissionsPatch);
module.exports = router;