

//access all the document objects
const domButtons  = document.querySelectorAll("#contact_details,#create-client,#submit-form,#client_general-header, #client_contact-header");
const domElements = document.querySelectorAll(".col_tabs,#active,#no_contacts_error,#no_clients_error,#client_form_box,#general_tab,#contacts_tab,#client_form_error,#link_contact_options,#clients_info_box,#error_message,#select_client,#select_contact,#contact_details,#no_contacts");
const inputElements = document.querySelectorAll("#name,#client_code");

import {submitContentsToServer,showHideContent,addEventToLinkContacts,unlinkContact} from "./helpers.js";


const elementsObject = {};
domElements.forEach(element => {
    const key = element.id; // Use the ID as the key
    elementsObject[key] = element; 
});

console.log(elementsObject.col_tabs)



function getClients(){
    submitContentsToServer("GET","/clientContactApp/client/accessClients","").then(response=>{
        //hide error massage show the clients list
        const clientInfo = elementsObject.clients_info_box;
        showHideContent(elementsObject.no_clients_error, clientInfo)
    
        const clientSelectBox = elementsObject.select_client;
        
        submitContentsToServer("GET","/clientContactApp/client/totalContacts?type=client","").then(countResponse=>{
            let contactNo = [];
            contactNo = JSON.parse(countResponse);
            
            JSON.parse(response).map((item,key)=>{
                let total = 0;
                const linkedContacts = contactNo.find(element => element.client_id == item.id);
                if(linkedContacts){total = linkedContacts.contact_count}
                                    
                clientInfo.innerHTML += 
                `<div class="page_rows">
                    <div class="client_details_cols">${item.user_name}</div>
                    <div class="client_details_cols">${item.client_code}</div>
                    <div class="client_details_cols">${total}</div>
                </div>`;
                clientSelectBox.innerHTML += `<option class="client_options" value=${item.id}>${item.user_name}</option>`;
            }) 
        }).catch(error =>{console.log(error);}) 
    }).catch(error => {
        console.error(error);
        showHideContent(elementsObject.clients_info_box,elementsObject.no_clients_error)
    }
    );   
}     
getClients();

function getContacts(){
    
    submitContentsToServer("GET","/clientContactApp/contact/accessContacts","").then(response=>{
        const parentBox = elementsObject.contact_details;
        showHideContent(elementsObject.no_contacts_error,parentBox);

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
    showHideContent(elementsObject.contact_details,elementsObject.no_contacts_error);
    elementsObject.select_contact.innerHTML += `<option disabled selected>no contacts </option>`;
})
}
getContacts();


function saveClients(event){
    event.preventDefault();
    const clientData = {
        user_name: inputElements[0].value,
        client_code: inputElements[1].value  
    }
    submitContentsToServer("POST","/clientContactApp/client/saveClient",clientData).then(response=>{
        if(response == "ERROR"){elementsObject.client_form_error.innerHTML = "please complete all the fields";}else{
            location.reload();
        }
    }).catch(error =>
        console.error(error)
    )
}

//call link contacts and clients method
addEventToLinkContacts(elementsObject.select_contact, elementsObject.select_client, elementsObject.client_form_error);

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
                    unlinkContact(event,"contact");
                    break;
                default:
                    console.log("id match not found");
                    break;
            }
       } )
    }
});