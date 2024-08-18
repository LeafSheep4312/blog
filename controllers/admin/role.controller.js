const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req,res) =>{
    let find = {
        deleted: false
    };
    const records = await Role.find(find);

    res.render("admin/pages/roles/index.pug",
        {
            pageTitle: "Roles",
            records: records
        }
    );
}

//CREATE
module.exports.create = async (req,res) =>{
    res.render("admin/pages/roles/create.pug",
        {
            pageTitle: "Create role",
        }
    );
}
module.exports.createPost = async (req,res)=>{
    let newRole = new Role(req.body);
    await newRole.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

//PERMISSION
module.exports.permissions = async (req,res)=>{
    let find = {
        deleted: false
    };
    const records = await Role.find(find);
    res.render("admin/pages/roles/permission.pug",
        {
            pageTitle: "Permission",
            records: records
        }
    );
}
module.exports.permissionsPatch = async (req,res)=>{
    const permissions = JSON.parse(req.body.permissions);
    for(const item of permissions){
        const id = item.id;
        const permissions = item.permissions;
        await Role.updateOne({_id: id}, {permission: permissions})
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`);
}
