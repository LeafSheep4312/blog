const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const md5= require("md5");
const Role = require("../../models/role.model");

module.exports.index = async (req,res) =>{
    let find = {
        deleted: false
    };

    const accounts = await Account.find(find).select("-password -token");
    for(const item of accounts){
        const role = await Role.findOne({_id: item.role_id, deleted:false});
        item.role = role;
    }
    res.render("admin/pages/accounts/index.pug",
        {
            pageTitle: "Account",
            accounts:accounts
        }
    );
}

//create
module.exports.create = async (req,res)=>{
    let find = {
        deleted: false
    };

    const roles = await Role.find(find);
    res.render("admin/pages/accounts/create.pug",
        {
            pageTitle: "Create new account",
            roles:roles
        }
    );
}
module.exports.createPost = async (req,res)=>{
    const emailExist = await Account.findOne({
        email:req.body.email,
        deleted:false
    });

    // console.log(emailExist);
    if(emailExist){
        req.flash("error", "Email existed");
        res.redirect(`back`);
    }else{
        req.body.password = md5(req.body.password);
        let account = new Account(req.body);
        await account.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}

//Edit
module.exports.edit = async (req,res)=>{
    try {
        const find = {
            deleted:false,
            _id: req.params.id,
        };
        const account = await Account.findOne(find);
        const roles = await Role.find({deleted:false});
        res.render("admin/pages/accounts/edit.pug",
            {
                pageTitle: "Update Account",
                account: account,
                roles:roles
            }
        );
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
};
module.exports.editPatch = async (req, res) => {

    try {
        const emailExist = await Account.findOne({
            _id: {$ne: req.params.id},
            email:req.body.email,
            deleted:false
        });

        if(emailExist){
            req.flash("error", "Email existed");
        } else{
            if(req.body.password){
                req.body.password = md5(req.body.password);
            } else{
                delete req.body.password;

            }
    
            await Account.updateOne({_id: req.params.id}, req.body);
            req.flash("success", "Update successfully");
        }
    } catch (error) {
        console.error(error);
        req.flash("error", "Failed to update the post");
    }
    
    res.redirect('back');
};
