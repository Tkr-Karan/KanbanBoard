let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let allPriorityColor = document.querySelectorAll(".priority-color");
let textAreaContent = document.querySelector(".textarea-cont");
let mainContent = document.querySelector(".main-cont");
let removebtn = document.querySelector(".rmv-btn");
let priorityColor = document.querySelectorAll(".toolbox-priority-cont div");

let modalPriorityColor = "red";

let color = ["red", "blue", "green", "black"];

let ticketArr = [];

var uid = new ShortUniqueId();

let addModal = true;
let removeFlag = false;
let lockFlag = false;


if(localStorage.getItem("tickets")){
    console.log(localStorage.getItem("tickets"))
    let strArr = localStorage.getItem("tickets");
    console.log(strArr);
    let tickArr = JSON.parse(strArr);

    for(let i = 0;i < tickArr.length; i++){
        console.log(tickArr[i])
        let ticket = tickArr[i];
        createTicket(ticket.task, ticket.color, ticket.id); 
    }
}

addBtn.addEventListener("click", function(){    
    if(addModal){
        modal.style.display = "flex";
        addModal = false;
    }else{
        modal.style.display = "none";
        addModal = true;
    }
    
})


// priority color selection
for(let i = 0; i < priorityColor.length; i++){
    priorityColor[i].addEventListener("click", function(){
        // console.log(priorityColor[i].classList[1]);

        let currentPriorityColor = priorityColor[i].classList[1];

        let allTicketColor = document.querySelectorAll(".ticket-color")
        for(let j = 0; j < allTicketColor.length; j++){
            // console.log(allTicketColor[j]);
            let currentTicketColor = allTicketColor[j].classList[1];
            // console.log(currentTicketColor);
            if(currentPriorityColor == currentTicketColor){
                console.log(currentPriorityColor, currentTicketColor)
                allTicketColor[j].parentElement.style.display = "block";
            }else{
                allTicketColor[j].parentElement.style.display = "none";
            }
        }

        priorityColor[i].addEventListener("dblclick", function(){
            for(let j = 0; j < allTicketColor.length; j++){
                allTicketColor[j].parentElement.style.display = "block";

            }
        })
    })

}


// Setting the marker
for(let i = 0; i < allPriorityColor.length;  i++){
    allPriorityColor[i].addEventListener("click", function(){
        for(let j = 0; j < allPriorityColor.length; j++){
            if(allPriorityColor[j].classList.contains("active")){
                allPriorityColor[j].classList.remove("active");
            }
        }
        allPriorityColor[i].classList.add("active");
        
        modalPriorityColor = allPriorityColor[i].classList[1];
        // console.log(modalPriorityColor);
        
        // console.log(allPriorityColor[i].classList[1]);
        
        
    })
    
}

textAreaContent.addEventListener("keydown", function(e){
    // console.log(e);
    if(e.key === "Enter"){
        // console.log(e.target.value);
        let textVal = e.target.value;
        textAreaContent.value = "";
        // console.log("Enter Clicked!!!!")
        createTicket(textVal, modalPriorityColor);
        modal.style.display = "none";
        addModal = true
    }
})

function createTicket(text, modalPriorityColor, ticketId){
    // <div class="ticket-cont">
    //         <div class="ticket-color blue"></div>
    //         <div class="ticket-id">#saefwe</div>
    //         <div class="ticket-area">Some Task</div>
    // </div>
    // let id = uid();

    let id;

    if(ticketId){
        id = ticketId;
    }else{
        id = uid();
    }
    
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    
    // console.log(ticketCont);
    ticketCont.innerHTML = `<div class="ticket-color ${modalPriorityColor}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="ticket-area">${text}</div> 
    <div class="lock-unlock">
    <i class="fa-solid fa-lock"></i>
    </div>
    `
    
    mainContent.append(ticketCont);
    ticketArr.push({id : id, color : modalPriorityColor, task: text});

    updateLocalStorage();   

    // console.log(ticketArr);


    
    ticketCont.addEventListener("click", function(){
        if(removeFlag){
            ticketCont.remove();
            let idx = ticketArr.findIndex(function(obj){
                return obj.id = id;
            })

            ticketArr.splice(idx, 1);
            updateLocalStorage();
        }
    })
    
    let ticketColor = ticketCont.querySelector(".ticket-color");
    
    ticketColor.addEventListener("click", function(){
        // console.log(ticketColor.classList[1]);
        
        let currentColor = ticketColor.classList[1];
        
        let currentColorIndex = color.findIndex((col) => {
            return col == currentColor;
        });
        
        // for(let i = 0; i < color.length; i++){
            //     if(color[i] == currentColor){
                //         currentColorIndex = i;
                //         break;
            //     }
            // }
            
            // console.log(currentColorIndex);
            
            let nextColorIndex = (currentColorIndex+1)%color.length;
            let nextColor = color[nextColorIndex];
            
            // console.log(nextColor);
            
            ticketColor.classList.remove(currentColor);
            ticketColor.classList.add(nextColor);

            let idx;
            for(let i = 0; i < ticketArr.length; i++){
                if(ticketArr[i].id == id){
                    idx = i;
                    break;
                }
            }
            console.log(idx);
            ticketArr[idx].color = nextColor;
            console.log(ticketArr);

            updateLocalStorage();
        })
                                        
    // lock and unlock event listener
    let lockUnlock = ticketCont.querySelector(".lock-unlock i");
    let taskArea = ticketCont.querySelector(".ticket-area");

    lockUnlock.addEventListener("click", function(){
        if(lockUnlock.classList.contains("fa-lock")){
            lockUnlock.classList.remove("fa-lock");
            lockUnlock.classList.add("fa-lock-open");
            taskArea.setAttribute("contenteditable", "true");
        }else{
            lockUnlock.classList.remove("fa-lock-open");
            lockUnlock.classList.add("fa-lock");
            taskArea.setAttribute("contenteditable", "false");
        }

        // let idx;
        // for(let i = 0; i < ticketArr.length; i++){
        //     if(ticketArr[i].id == id){
        //         idx = i;
        //         break;
        //     }
        // }

        let idx = ticketArr.findIndex(function(obj){
            return obj.id = id;
        })

        ticketArr[idx].task = taskArea.innerText;

        updateLocalStorage();
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


function updateLocalStorage(){
    let strArr = JSON.stringify(ticketArr);
    localStorage.setItem("tickets", strArr);
}