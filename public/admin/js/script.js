//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination){
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", ()=> {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
//End pagination

// Delete item
const deleteButton = document.querySelectorAll("[delete-button]");
if(deleteButton.length>0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    deleteButton.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("ban co chac muon xoa khong?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
            
        });
    });
}   
//End Delete Item

//Upload image
const uploadImage =document.querySelector("[upload-image]");

if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]"); 
    uploadImageInput.addEventListener("change", (e)=> {
        console.log(e);
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file);
        }
    })   
}
//End Upload image

//Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("[data-time]"));
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    }, time) 
}
//End Alert

// Delete Permanently item
const deleteButton2 = document.querySelectorAll("[delete-button2]");
if(deleteButton2.length>0){
    const formDeleteItem = document.querySelector("#form-delete-item2");
    const path = formDeleteItem.getAttribute("data-path");

    deleteButton2.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("ban co chac muon xoa khong?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
            
        });
    });
}   
//End Delete Permanently Item

// Restore item
const restoreButton = document.querySelectorAll("[restore-button]");
if(restoreButton.length>0){
    const formRestoreItem = document.querySelector("#form-restore-item");
    const path = formRestoreItem.getAttribute("data-path");

    restoreButton.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("ban co chac muon phuc hoi khong?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                
                const action = `${path}/${id}?_method=PATCH`;
                formRestoreItem.action = action;
                formRestoreItem.submit();
            }
            
        });
    });
}   
//End Restore Item
