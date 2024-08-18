const blogPost = require("../../models/blog.model");
const blogCategory = require("../../models/category.model");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const treeHelper = require("../../helpers/createTree");
const systemConfig = require("../../config/system");
const moments = require('moment');
const Account = require("../../models/account.model");

module.exports.post = async (req,res) =>{
    let find = {
        deleted: false
    };
    //search
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    //pagination
    const countPosts = await blogPost.countDocuments(find);
    const objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 6
        },req.query,countPosts
        );

    const blogPosts = await blogPost.find(find)
            .sort({createdAt : "desc"})
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);

    for(const post of blogPosts){
        const user = await Account.findOne({_id:post.createdBy.account_id});
        if(user){
            post.author = user.fullName;
        }
    }
    res.render("admin/pages/posts/index.pug",
        {
            moment:moments,
            pageTitle: "Post",
            blogPosts: blogPosts,
            keyword: objectSearch.keyword,
            pagination: objectPagination
        }
    );
}

//Delete
module.exports.deletePost = async (req,res) => {
    const id = req.params.id;

    await blogPost.updateOne({_id: id}, {
        deleted: true,
        deletedBy :{
            account_id:res.locals.user.id, 
            deletedAt: new Date(),
        },
    }
    );

    req.flash("success", "Delete successfully");
    res.redirect('back');
}

//Detail
module.exports.detail = async (req,res)=>{
    try {
        const find = {
            deleted:false,
            _id: req.params.id,
        };
        const blogPosts = await blogPost.findOne(find);
        for(const update of blogPosts.updatedBy){
            const user = await Account.findOne({_id:update.account_id});
            if(user){
                update.editor = user.fullName;
            }
        }
        res.render("admin/pages/posts/detail.pug",
            {   
                moment:moments,
                pageTitle: blogPosts.title,
                blogPosts: blogPosts
            }
        );
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/posts`);
    }
};
//End detail

//Create item
module.exports.create = async (req,res)=>{
    const find = {
        deleted:false
    };
    const categories = await blogCategory.find(find);
    const newRecords = treeHelper.createTree(categories);
    res.render("admin/pages/posts/create.pug",
        {
            pageTitle: "Create new post",
            records:newRecords
        }
    );
}
module.exports.createPost = async (req,res)=>{
    req.body.createdBy = {
        account_id: res.locals.user.id
    };

    let newPost = new blogPost(req.body);
    await newPost.save();
    res.redirect(`${systemConfig.prefixAdmin}/posts`);
}

//Edit
module.exports.edit = async (req,res)=>{
    try {
        const find = {
            deleted:false,
            _id: req.params.id,
        };
        const blogPosts = await blogPost.findOne(find);
        const categories = await blogCategory.find({deleted:false})
        const newRecords = treeHelper.createTree(categories);
        res.render("admin/pages/posts/edit.pug",
            {
                pageTitle: "Edit Post",
                blogPosts: blogPosts,
                records:newRecords
            }
        );
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/posts`);
    }
};
module.exports.editPatch = async (req, res) => {

    try {
        const updatedBy = {
            account_id:res.locals.user.id,
            updatedAt:new Date()
        };

        const updateResult = await blogPost.updateOne({_id: req.params.id}, {
            ...req.body,
            $push: {updatedBy : updatedBy}
        });
        if (updateResult.modifiedCount === 0) {
            req.flash("success", "No changes were made");
        } else {
            req.flash("success", "Update successfully");
        }
    } catch (error) {
        console.error(error);
        req.flash("error", "Failed to update the post");
    }
    
    res.redirect('back');
};
//End edit