const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const blogCategorySchema = new mongoose.Schema({
    title: String,
    parent_id:{
        type:String,
        default:""
    },
    image:String,
    description:String,
    deleted:{
        type: Boolean,
        default: false
    },
    position:Number,
    createdAt:Date,
    deletedAt:Date,
    slug: {
        type:String,
        slug:"title",
        unique:true
    },
    },{
        timestamps:true
    }
);

const blogCategory = mongoose.model("blogCategory", blogCategorySchema, "Category");

module.exports = blogCategory;