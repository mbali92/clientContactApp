
//access all the document objects
const domButtons  = document.querySelectorAll("#contact_client_info,#create-contacts,#submit-form,#contacts_general-header, #contacts_contact-header");
const domElements = document.querySelectorAll("#select_clients,#contact_client_info,#contacts_form_box,#general_tab,#contacts_tab,#contacts_info_box,#error_msg,#select_contacts,#error_msg");
const inputElements = document.querySelectorAll(".contact_input");



const elementsObject = {};
domElements.forEach(element => {
    const key = element.id; 
    elementsObject[key] = element; 
});

export function showHideContent (hideElement,showElement){
    hideElement.style.display = "none";
    showElement.style.display ="block";
};

//ajax post content submits  
function submitContentsToServer(method, url,clientData) {
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      };
      xhr.onerror = function() {
        reject('Request error.');
      };
      xhr.send(JSON.stringify(clientData));
    });
}

//create contact 
function createContact(event){
    event.preventDefault();
    const data = {
        user_name:inputElements[0].value,
        surname:inputElements[1].value,
        email:inputElements[2].value
    } 
    submitContentsToServer("POST","/clientContactApp/contact/saveContacts",data).then(response=>{
        if(response == "ERROR"){elementsObject.error_msg.innerHTML += "please complete all the fields";}else{
           location.reload();
        }
    }).catch(error=>{
        console.error(error);
    })
}
//retrieve contacts list 
function getContacts(){
        const parentBox = elementsObject.contacts_info_box;
        submitContentsToServer("GET","/clientContactApp/contact/accessContacts","").then(response=>{
            showHideContent(elementsObject.error_msg,parentBox);
        
            submitContentsToServer("GET","/clientContactApp/client/totalContacts?type=contact","").then(countResponse=>{
                let contactNo = [];
                contactNo = JSON.parse(countResponse);
                
                JSON.parse(response).map((item,key)=>{
                    const total = contactNo[key] == undefined ? 0 : contactNo[key].contact_count; 
                    parentBox.innerHTML += `<div class="page_rows" id=${item.id}>
                        <p class="contacts_details_cols">${item.user_name}</p>
                        <p class="contacts_details_cols">${item.surname}</p>
                        <p class="contacts_details_cols">${item.email}</p>
                        <p class="contacts_details_cols">${total}</p>
                    </div>`
                    elementsObject.select_contacts.innerHTML += `<option value=${item.id}>${item.surname}</option>`; 
                })
            }).catch(error=>console.error(error))    
            }).catch(error=>{
                showHideContent(parentBox,elementsObject.error_msg);
                elementsObject.select_contacts.innerHTML += `<option disabled selected>no contacts </option>`;
            })
}
getContacts();


function getClients(){
    submitContentsToServer("GET","/clientContactApp/client/accessClients","").then(response=>{
        //hide error massage show the clients list
        const parentBox = elementsObject.contact_client_info;
        const clientSelectBox = elementsObject.select_clients;
        // showHideContent(elementsObject.error_message, parentBox)

        JSON.parse(response).map((item,key)=>{
            parentBox .innerHTML += 
            `<div class="page_rows">
                <div class="contacts_details_cols">${item.user_name}</div>
                <div class="contacts_details_cols">${item.client_code}</div>
                <div class="contacts_details_cols unlink" id=${item.id}>unlink client</div>
            </div>`;
            clientSelectBox.innerHTML += `<option class="client_options" value=${item.id}>${item.user_name}</option>`;
        }) 
    })
}
getClients();

function linkContacts(linkData){
    submitContentsToServer("POST","/clientContactApp/linkClientsContacts",linkData).then(response=>{
        console.log(response)
    }).catch(error => 
        console.error(error)
    );   
}

elementsObject.select_clients.addEventListener('change',(event)=>{
   const contactId = elementsObject.select_contacts.options[elementsObject.select_contacts.selectedIndex].value;
   const clientId = elementsObject.select_clients.options[elementsObject.select_clients.selectedIndex].value;
   if(contactId){
    const linkData ={
        clientId : clientId,
        contactId :contactId
    }
    console.log(linkData);
    linkContacts(linkData);
   }else{console.log("select contact option")}
   
})

function unlinkContact(event){
    if(event.target.classList.contains("unlink")){
        console.log(event.target.getAttribute('id'));
        const removeData ={
            id: event.target.getAttribute('id'),
            type:"client"
        }
        submitContentsToServer("POST","/clientContactApp/unlinkClientsContacts",removeData).then(response=>{
            console.log(response)
        }).catch(error =>
            console.error(error)
        )
    }
}

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
                    unlinkContact(event);
                    break;
                default:
                    break;
            }
       } )
    }
});