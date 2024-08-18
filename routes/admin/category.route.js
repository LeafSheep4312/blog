const express = require("express");
const router = express.Router();    
const controller = require("../../controllers/admin/category.controller");
//Multer

const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
//Validate
const validate = require("../../validates/admin/category.validate");

router.get("/", controller.category);

//Create
router.get("/create", controller.create);
router.post("/create",
    upload.single("image"),
    uploadCloud.upload,
    validate.createCategory,
    controller.createPost
);

//Delete
router.delete("/delete/:id", controller.deletePost);

//Edit
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
    upload.single("image"),
    uploadCloud.upload,
    validate.createCategory,
    controller.editPatch
);

module.exports = router;