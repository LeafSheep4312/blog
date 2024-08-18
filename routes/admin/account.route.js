const express = require("express");
const router = express.Router();    
const controller = require("../../controllers/admin/account.controller");
//Multer

const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
//Validate
const validate = require("../../validates/admin/account.validate");

router.get("/", controller.index);

//Create
router.get("/create", controller.create);
router.post("/create",
    upload.single("avatar"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost);

//Edit
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
    upload.single("avatar"),
    uploadCloud.upload,
    validate.editPatch,
    controller.editPatch
);
module.exports = router;