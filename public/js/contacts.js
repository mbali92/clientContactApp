
//access all the document objects
const domButtons  = document.querySelectorAll("#contact_client_info,#create-contacts,#submit-form,#contacts_general-header, #contacts_contact-header");
const domElements = document.querySelectorAll("#no_contacts_error,#no_clients_error,#client_form_error,#select_client,#contact_client_info,#contacts_form_box,#general_tab,#contacts_tab,#contacts_info_box,#select_contact");
const inputElements = document.querySelectorAll(".contact_input");

import {submitContentsToServer,showHideContent, addEventToLinkContacts, unlinkContact} from "./helpers.js";

const elementsObject = {};
domElements.forEach(element => {
    const key = element.id; 
    elementsObject[key] = element; 
});

//create contact 
function createContact(event){
    event.preventDefault();
    const data = {
        user_name:inputElements[0].value,
        surname:inputElements[1].value,
        email:inputElements[2].value
    } 
    submitContentsToServer("POST","/clientContactApp/contact/saveContacts",data).then(response=>{
        if(response == "ERROR"){elementsObject.client_form_error.innerHTML = "please complete all the fields";}else{
           location.reload();
        }
    }).catch(error=>{
        console.error(error);
    })
}
//retrieve contacts list 
function getContacts(){
       
        submitContentsToServer("GET","/clientContactApp/contact/accessContacts","").then(response=>{
            const parentBox = elementsObject.contacts_info_box;
            showHideContent(elementsObject.no_contacts_error,parentBox);
        
            submitContentsToServer("GET","/clientContactApp/client/totalContacts?type=contact","").then(countResponse=>{
                let contactNo = [];
                contactNo = JSON.parse(countResponse);
            
                JSON.parse(response).map((item,key)=>{
                    let total = 0;
                    const linkedContacts = contactNo.find(element => element.contact_id == item.id);
                    if(linkedContacts){total = linkedContacts.contact_count}    

                    parentBox.innerHTML += `<div class="page_rows" id=${item.id}>
                        <p class="contacts_details_cols">${item.user_name}</p>
                        <p class="contacts_details_cols">${item.surname}</p>
                        <p class="contacts_details_cols">${item.email}</p>
                        <p class="contacts_details_cols">${total}</p>
                    </div>`
                    elementsObject.select_contact.innerHTML += `<option value=${item.id}>${item.email}</option>`; 
                })
            }).catch(error=>console.error(error))    
            }).catch(error=>{
                showHideContent(elementsObject.contacts_info_box,elementsObject.no_contacts_error);
                elementsObject.select_contact.innerHTML += `<option disabled selected>no contacts </option>`;
            })
}
getContacts();

//find saved clients fro database
function getClients(){
    //hide error massage show the clients list
    
    const clientSelectBox = elementsObject.select_client;
    
    submitContentsToServer("GET","/clientContactApp/client/accessClients","").then(response=>{ 
        const parentBox = elementsObject.contact_client_info;

        showHideContent(elementsObject.no_clients_error,parentBox)
        
        JSON.parse(response).map((item)=>{
            parentBox.innerHTML += 
            `<div class="page_rows">
                <div class="contacts_details_cols">${item.user_name}</div>
                <div class="contacts_details_cols">${item.client_code}</div>
                <div class="contacts_details_cols unlink" id=${item.id}>unlink client</div>
            </div>`;
            clientSelectBox.innerHTML += `<option class="client_options" value=${item.id}>${item.user_name}</option>`;
        }) 
    }).catch(error=>{
        console.error(error) 
        console.log(elementsObject.contact_client_info,elementsObject.no_clients_error)
    })
}
getClients();

//call link contacts and clients method
addEventToLinkContacts(elementsObject.select_contact, elementsObject.select_client, elementsObject.client_form_error);

//call functions on click events
domButtons.forEach(element => {
    if(element instanceof HTMLElement){
       element.addEventListener('click',(event)=>{
            switch (element.id) {
                case "create-contacts":
                    showHideContent(element.parentElement,elementsObject.contacts_form_box);
                    break;
                case "contacts_general-header":
                    showHideContent(elementsObject.contacts_tab,elementsObject.general_tab);
                    break;
                case "contacts_contact-header":
                    showHideContent(elementsObject.general_tab,elementsObject.contacts_tab);
                    break;
                case "submit-form":
                    createContact(event);
                    break;
                case "contact_client_info":
                    unlinkContact(event,"client");
                    break;
                default:
                    break;
            }
       } )
    }
});