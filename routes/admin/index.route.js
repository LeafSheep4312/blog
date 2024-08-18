const dashboardRouter = require("./dashboard.route") ;
const postRouter = require("./post.route") ;
const categoryRouter = require("./category.route") ;
const recycleRouter = require("./recycle.route") ;
const roleRouter = require("./role.route") ;
const accountRouter = require("./account.route") ;
const authRouter = require("./auth.route") ;
const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(
        PATH_ADMIN+"/dashboard",
        authMiddleware.requireAuth,
        dashboardRouter
    );
    app.use(PATH_ADMIN+"/posts",authMiddleware.requireAuth,postRouter);
    app.use(PATH_ADMIN+"/category",authMiddleware.requireAuth,categoryRouter);
    app.use(PATH_ADMIN+"/recycle",authMiddleware.requireAuth,recycleRouter);
    app.use(PATH_ADMIN+"/roles",authMiddleware.requireAuth,roleRouter);
    app.use(PATH_ADMIN+"/accounts",authMiddleware.requireAuth,accountRouter);
    app.use(PATH_ADMIN+"/auth",authRouter);
}