const blogPost = require("../../models/blog.model");
const Account = require("../../models/account.model");
const paginationHelper = require("../../helpers/pagination");
const searchHelper = require("../../helpers/search");
const moments = require("moment");

module.exports.recycle = async (req,res) =>{
    let find = {
        deleted: true
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
        const user = await Account.findOne({_id:post.deletedBy.account_id});
        if(user){
            post.moderator = user.fullName;
        }
    }
    res.render("admin/pages/recycle/index.pug",
        {
            moment:moments,
            pageTitle: "Recently Deleted",
            blogPosts: blogPosts,
            keyword: objectSearch.keyword,
            pagination: objectPagination
        }
    );
}

//Delete
module.exports.deletePost = async (req,res) => {
    const id = req.params.id;
    await blogPost.deleteOne({_id: id});
    req.flash("success", "Delete successfully");
    res.redirect('back');
}

//Restore 
module.exports.restore = async (req, res) => {
    const id = req.params.id;
    await blogPost.updateOne({_id: id}, {deleted: false});
    req.flash("success", "Restore successfully");
    res.redirect('back');
};

