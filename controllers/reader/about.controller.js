const blogCategory = require("../../models/category.model");
const searchHelper = require("../../helpers/search");

module.exports.index = async (req,res) =>{
    let find = {
        deleted: false
    };
    //search
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }
    const category = await blogCategory.find(find);
    res.render("reader/pages/about/index.pug", {
        pageTitle: "About me",
        category:category,
        keyword: objectSearch.keyword
    });

}