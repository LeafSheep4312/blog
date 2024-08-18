const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const blogPostSchema = new mongoose.Schema({
    title: String,
    category_id:{
        type:String,
        default:""
    },
    image:String,
    description:String,
    content: String,
    tags:Array,
    deleted:{
        type: Boolean,
        default: false
    },
    createdAt:Date,
    createdBy:{
        account_id:String,
        createdAt: {
            type:Date,
            default: Date.now
        }
    },
    deletedBy:{
        account_id:String,
        deletedBy:Date
    },
    updatedBy:[
        {
        account_id:String,
        updatedAt:Date
        }
    ],
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

const blogPost = mongoose.model("blogPost", blogPostSchema, "BlogPost");

module.exports = blogPost;