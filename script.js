let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let allPriorityColor = document.querySelectorAll(".priority-color");
let textAreaContent = document.querySelector(".textarea-cont");
let mainContent = document.querySelector(".main-cont");
let removebtn = document.querySelector(".rmv-btn");

let modalPriorityColor = "red";

let color = ["red", "blue", "green", "black"];

var uid = new ShortUniqueId();

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
        createTicket(textVal);
        modal.style.display = "none";
        addModal = true
    }
})

function createTicket(text){
    // <div class="ticket-cont">
    //         <div class="ticket-color blue"></div>
    //         <div class="ticket-id">#saefwe</div>
    //         <div class="ticket-area">Some Task</div>
    // </div>
    let id = uid();

    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");

    // console.log(ticketCont);
    ticketCont.innerHTML = `<div class="ticket-color ${modalPriorityColor}"></div>
                             <div class="ticket-id">#${id}</div>
                             <div class="ticket-area">${text}</div> 
                            `

    mainContent.append(ticketCont);

    ticketCont.addEventListener("click", function(){
        if(removeFlag){
            ticketCont.remove();
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