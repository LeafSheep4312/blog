const categoryMiddleware = require("../../middlewares/reader/category.middleware");

const homeRouter = require("./home.route") ;
const aboutRouter = require("./about.route") ;
const donateRouter = require("./donate.route") ;

module.exports = (app)=>{
    app.use(categoryMiddleware.category);
    app.use("/",homeRouter);
    app.use("/about",aboutRouter);
    app.use("/donate",donateRouter);

}
