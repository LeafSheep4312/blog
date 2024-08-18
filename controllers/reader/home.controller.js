const blogPost = require("../../models/blog.model");
const Account = require("../../models/account.model");
const blogCategory = require("../../models/category.model");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const treeHelper = require("../../helpers/createTree");
const moments = require('moment');

module.exports.index = async (req,res) =>{
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

    const blogPosts = await blogPost.find(find).sort({createdAt: 'desc'}).limit(objectPagination.limitItems).skip(objectPagination.skip);

    for(const post of blogPosts){
        const user = await Account.findOne({_id:post.createdBy.account_id});
        if(user){
            post.author = user.fullName;
        }
    }

    res.render("reader/pages/home/index.pug", {
        moment:moments,
        pageTitle: "Home",
        blogPosts: blogPosts,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });

}

//Detail
module.exports.detail = async (req,res)=>{
    try {
        const find = {
            deleted:false,
            _id: req.params.id,
        };

        const blogPosts = await blogPost.findOne(find);
        const user = await Account.findOne({_id:blogPosts.createdBy.account_id});
        if(user){
            blogPosts.author = user.fullName;
        }

        const tag = await blogCategory.findOne({_id:blogPosts.category_id});
        if(tag){
            blogPosts.category = tag.title;
        }
        res.render("reader/pages/home/detail.pug",
            {
                pageTitle: blogPosts.title,
                blogPosts: blogPosts
            }
        );
    } catch (error) {
        res.redirect(`/`);
    }
};
