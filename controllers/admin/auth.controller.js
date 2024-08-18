const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const md5= require("md5");
module.exports.login = (req,res) =>{
    if(req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else{
        res.render("admin/pages/auth/login.pug",
            {
                pageTitle: "Login"
            }
        );
    }
}

module.exports.loginPost = async (req,res) =>{
    const {email, password} = req.body;
    const user = await Account.findOne({email:email, deleted:false});
    if(!user){
        req.flash("error","Email khong ton tai");
        res.redirect("back");
        return;
    }
    if(md5(password) != user.password){
        req.flash("error","Password wrong");
        res.redirect("back");
        return;
    }
    if(user.status == "inactive"){
        req.flash("error","Tai khoan da bi khoa");
        res.redirect("back");
    }
    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}

module.exports.logout = (req,res) =>{
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}