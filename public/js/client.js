

//access all the document objects
const domButtons  = document.querySelectorAll("#contact_details,#create-client,#submit-form,#client_general-header, #client_contact-header");
const domElements = document.querySelectorAll("#client_form_box,#general_tab,#contacts_tab,#error_msg,#link_contact_options,#clients_info_box,#error_message,#select_client,#select_contact,#contact_details,#no_contacts");
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
            <p class="contacts_details_cols unlink" id=${item.id}>unlink contacts</p>
            </div>`
            elementsObject.select_contact.innerHTML += `<option value=${item.id}>${item.email}</option>`; 
        }) 
        
}).catch(error=>{
     console.log(error);
    elementsObject.select_contact.innerHTML += `<option disabled selected>no contacts </option>`;
})
}
getContacts();

function unlinkContact(event){
    if(event.target.classList.contains("unlink")){
        const removeData ={
            id: event.target.getAttribute('id'),
            type:"contact"
        }
        submitContentsToServer("POST","/clientContactApp/unlinkClientsContacts",removeData).then(response=>{
            console.log(response)
        }).catch(error =>
            console.error(error)
        )
    }
}

function getClients(){
    submitContentsToServer("GET","/clientContactApp/client/accessClients","").then(response=>{
        //hide error massage show the clients list
        const parentBox = elementsObject.clients_info_box;
        showHideContent(elementsObject.error_message, parentBox)
    
        const clientInfo = elementsObject.clients_info_box;
        const clientSelectBox = elementsObject.select_client;
        
        submitContentsToServer("GET","/clientContactApp/client/totalContacts?type=client","").then(countResponse=>{
            let contactNo = [];
            contactNo = JSON.parse(countResponse);
            
            JSON.parse(response).map((item,key)=>{
                const total = contactNo[key] == undefined ? 0 : contactNo[key].contact_count; 
                clientInfo.innerHTML += 
                `<div class="page_rows">
                    <div class="client_details_cols">${item.user_name}</div>
                    <div class="client_details_cols">${item.client_code}</div>
                    <div class="client_details_cols">${total}</div>
                </div>`;
                clientSelectBox.innerHTML += `<option class="client_options" value=${item.id}>${item.user_name}</option>`;
            }) 
        }).catch(error =>{console.log(error);}) 
    }).catch(error => 
        console.error(error)
    );   
}     
getClients()


function linkContacts(linkData){
    submitContentsToServer("POST","/clientContactApp/linkClientsContacts",linkData).then(response=>{
        console.log(response)
    }).catch(error => 
        console.error(error)
    );   
}

elementsObject.select_contact.addEventListener('change',(event)=>{
   const contactId = elementsObject.select_contact.options[elementsObject.select_contact.selectedIndex].value;
   const clientId = elementsObject.select_client.options[elementsObject.select_client.selectedIndex].value;
   if(clientId){
    const linkData ={
        clientId : clientId,
        contactId :contactId
    }
    linkContacts(linkData);
   }else{console.log("select client name")}
   
})


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
                case "contact_details":
                    unlinkContact(event);
                    break;
                default:
                    console.log("id match not found");
                    break;
            }
       } )
    }
});