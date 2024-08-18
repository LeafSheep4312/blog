const blogCategory = require("../../models/category.model");
const systemConfig = require("../../config/system");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const treeHelper = require("../../helpers/createTree");
const moments = require('moment');

module.exports.category = async (req,res) =>{
    let find = {
        deleted: false
    };
    //search
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    //pagination
    const countCategory = await blogCategory.countDocuments(find);
    const objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 6
        },req.query,countCategory
        );

    const categories = await blogCategory.find(find)
            // .limit(objectPagination.limitItems)
            // .skip(objectPagination.skip);
    const newRecords = treeHelper.createTree(categories);
    res.render("admin/pages/category/index.pug",
        {
            pageTitle: "Category",
            categories:newRecords,
            moment:moments,
            keyword: objectSearch.keyword,
            pagination: objectPagination
        }
    );
}

//Delete
module.exports.deletePost = async (req,res) => {
    const id = req.params.id;
    await blogCategory.deleteOne({_id: id});
    req.flash("success", "Delete successfully");
    res.redirect('back');
}

//Create
module.exports.create = async (req,res) =>{
    let find = {
        deleted: false
    };

    const records = await blogCategory.find(find);
    const newRecords = treeHelper.createTree(records);

    res.render("admin/pages/category/create.pug",
        {
            pageTitle: "Create Category",
            records:newRecords
        }
    );
}
module.exports.createPost = async (req,res)=>{
    if(!req.body.position){
        const count= await blogCategory.countDocuments();
        req.body.position = count+1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    
    const category = new blogCategory(req.body);
    await category.save();

    res.redirect(`${systemConfig.prefixAdmin}/category`);
}

//Edit
module.exports.edit = async (req,res)=>{
    try {
        const find = {
            deleted:false
        };
        const category = await blogCategory.findOne({
            deleted:false,
            _id: req.params.id,
        });
        const records = await blogCategory.find(find);
        const newRecords = treeHelper.createTree(records);
        res.render("admin/pages/category/edit.pug",
            {
                pageTitle: "Edit Category",
                category: category,
                records: newRecords
            }
        );
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/category`);
    }
};

module.exports.editPatch = async (req, res) => {

    try {

        const updateResult = await blogCategory.updateOne({_id: req.params.id}, req.body);
        if (updateResult.nModified === 0) {
            req.flash("success", "No changes were made");
        } else {
            req.flash("success", "Update successfully");
        }
    } catch (error) {
        console.error(error);
        req.flash("error", "Failed to update the post");
    }
    
    res.redirect(`${systemConfig.prefixAdmin}/category`);
};
//End edit