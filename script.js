let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let addModal = true;

addBtn.addEventListener("click", function(){    
    if(addModal){
        modal.style.display = "flex";
        addModal = false;
    }else{
        modal.style.display = "none";
        addModal = true;
    }

})