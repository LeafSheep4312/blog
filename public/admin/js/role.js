//permission
const tablePermission=document.querySelector("[table-permission]");

if(tablePermission){
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click",()=>{
        let permissions=[];
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach((row)=>{
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if(name=="id"){
                inputs.forEach((input)=>{
                    const id = input.value;
                    permissions.push({
                        id: id,
                        permissions:[]
                    });
                });
            } else{
                inputs.forEach((input,index)=>{
                    const checked = input.checked;
                    if(checked){
                        permissions[index].permissions.push(name);
                    }
                    
                });
            }
        });
    if(permissions.length>0){
        const formPermissions = document.querySelector("#form-change-permissions");
        const input = formPermissions.querySelector("input[name='permissions']");
        input.value=JSON.stringify(permissions);
        formPermissions.submit();
    }
    });
}
//end permission

//Permission Default
const dataRecords = document.querySelector("[data-records]");
if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermission=document.querySelector("[table-permission]");
    records.forEach((item,index)=>{
        const permissions = item.permission;
        permissions.forEach(permission=>{
            const row = tablePermission.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked =true;
        });
    });
}
//End Permission Default

