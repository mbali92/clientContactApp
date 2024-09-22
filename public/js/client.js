

//access all the document objects
const domButtons  = document.querySelectorAll("#create-client,#submit-form,#client_general-header, #client_contact-header");
const domElements = document.querySelectorAll("#total_cont,#client_form_box,#general_tab,#contacts_tab,#error_msg,#link_contact_options,#client_info,#clients_info_box,#error_message,#select_client,#select_contact,#contact_details,#no_contacts");
const inputElements = document.querySelectorAll("#name,#client_code");

const elementsObject = {};
domElements.forEach(element => {
    const key = element.id; // Use the ID as the key
    elementsObject[key] = element; // Assign the element to the object
});

function showHideContent (hideElement,showElement){
    hideElement.style.display = "none";
    showElement.style.display ="block";
};

//ajax post content submits  
function submitContentsToServer(method, url, data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText)
          resolve(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      };
      xhr.onerror = function() {
        reject('Request error.');
      };
      xhr.send(JSON.stringify(data));
    });
}

//retrieve clients data through ajax
function getContacts(){
    const parentBox = elementsObject.contact_details;
    submitContentsToServer("GET","/clientContactApp/contact/accessContacts","").then(response=>{
      
        JSON.parse(response).map((item,key)=>{
            parentBox.innerHTML +=`<div class="page_rows" id="contacts_info">
            <p class="contacts_details_cols">${item.user_name} ${item.surname}</p>
            <p class="contacts_details_cols">${item.email}</p>
            <p class="contacts_details_cols"></p>
            </div>`
            elementsObject.select_contact.innerHTML += `<option value=${item.id}>${item.email}</option>`; 
        }) 
}).catch(error=>{
     console.log(error);
    elementsObject.select_contact.innerHTML += `<option disabled selected>no contacts </option>`;
})
}
getContacts();


function getClients(){
    submitContentsToServer("GET","/clientContactApp/client/accessClients","").then(response=>{
        //hide error massage show the clients list
        const parentBox = elementsObject.clients_info_box;
        showHideContent(elementsObject.error_message, parentBox)
    
        const clientInfo = elementsObject.client_info;
        const clientSelectBox = elementsObject.select_client;
        
        let contactNo = [];
        submitContentsToServer("GET","/clientContactApp/client/totalContacts","").then(response=>{
            contactNo = JSON.parse(response)
        }).catch(error =>{console.log(error);}) 

        JSON.parse(response).map((item,key)=>{
            clientInfo.innerHTML += `<div class="client_details_cols">${item.user_name}</div>
            <div class="client_details_cols">${item.client_code}</div>
            <div class="client_details_cols">${contactNo[key]}</div>`
            ;
            clientSelectBox.innerHTML += `<option class="client_options">${item.user_name}</option>`;
        }) 
    }).catch(error => 
        console.error(error)
    );   
}     
getClients()

function saveClients(event){
    
    const clientData = {
        user_name: inputElements[0].value,
        client_code: inputElements[1].value  
    }
    submitContentsToServer("POST","/clientContactApp/client/saveClient",clientData).then(response=>{
        if(response == "ERROR"){elementsObject.error_msg.innerHTML += "please complete all the fields";}else{
            location.reload();
        }
    }).catch(error =>
        console.error(error)
    )
}
saveClients()

//call functions on click events
domButtons.forEach(element => {
    if(element instanceof HTMLElement){
       element.addEventListener('click',(event)=>{
            switch (element.id) {
                case "create-client":
                    showHideContent(element.parentElement,elementsObject.client_form_box);
                    break;
                case "client_general-header":
                    showHideContent(elementsObject.contacts_tab,elementsObject.general_tab);
                    break;
                case "client_contact-header":
                    showHideContent(elementsObject.general_tab,elementsObject.contacts_tab);
                    break;
                case "submit-form":
                    saveClients(event);
                    break;
                default:
                    console.log("id match not found");
                    break;
            }
       } )
    }
});