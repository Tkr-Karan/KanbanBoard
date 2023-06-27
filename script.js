let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let allPriorityColor = document.querySelectorAll(".priority-color");
let textAreaContent = document.querySelector(".textarea-cont");
let mainContent = document.querySelector(".main-cont");
let removebtn = document.querySelector(".rmv-btn");


let addModal = true;
let removeFlag = false;

addBtn.addEventListener("click", function(){    
    if(addModal){
        modal.style.display = "flex";
        addModal = false;
    }else{
        modal.style.display = "none";
        addModal = true;
    }

})


// Setting the marker
for(let i = 0; i < allPriorityColor.length;  i++){
    allPriorityColor[i].addEventListener("click", function(){
        for(let j = 0; j < allPriorityColor.length; j++){
            if(allPriorityColor[j].classList.contains("active")){
                allPriorityColor[j].classList.remove("active");
            }
        }
        allPriorityColor[i].classList.add("active");
    })

}

textAreaContent.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        textAreaContent.value = "";
        console.log("Enter Clicked!!!!")
        createTicket();
        modal.style.display = "none";
        addModal = true
    }
})

function createTicket(){
    // <div class="ticket-cont">
    //         <div class="ticket-color blue"></div>
    //         <div class="ticket-id">#saefwe</div>
    //         <div class="ticket-area">Some Task</div>
    // </div>

    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");

    console.log(ticketCont);
    ticketCont.innerHTML = `<div class="ticket-color blue"></div>
                             <div class="ticket-id">#saefwe</div>
                             <div class="ticket-area">Some Task</div> 
                            `

    mainContent.append(ticketCont);

    ticketCont.addEventListener("click", function(){
        if(removeFlag){
            ticketCont.remove();
        }
    })

}


// chane the color of remove and remove the ticket.

removebtn.addEventListener("click", function(){
    if(removeFlag){
        removebtn.style.color = "black";
        removeFlag = false;
    }else{
        removebtn.style.color = "red";
        removeFlag = true;
    }
})