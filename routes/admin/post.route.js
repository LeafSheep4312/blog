const express = require("express");
const router = express.Router();    
const controller = require("../../controllers/admin/post.controller");
//Multer

const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
//Validate
const validate = require("../../validates/admin/post.validate");

router.get("/", controller.post);

//Delete
router.delete("/delete/:id", controller.deletePost);

//Detail
router.get("/detail/:id", controller.detail);

//Create
router.get("/create", controller.create);
router.post("/create",
    upload.single("image"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);

//Edit
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
    upload.single("image"),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
);

module.exports = router;