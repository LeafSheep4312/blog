const blogCategory = require("../../models/category.model");
const treeHelper = require("../../helpers/createTree");

module.exports.category = async (req,res,next)=>{
    const temp = await blogCategory.find({deleted:false});
    const newRecords = treeHelper.createTree(temp);
    res.locals.category = newRecords;
    next();
}