
//access all the document objects
const domButtons  = document.querySelectorAll("#create-contacts,#submit-form,#contacts_general-header, #contacts_contact-header");
const domElements = document.querySelectorAll("#contacts_form_box,#general_tab,#contacts_tab,#contacts_info_box,#error_msg,#select_contacts,#error_msg,#contact_details")
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
        const parentBox = elementsObject.contact_details;
        submitContentsToServer("GET","/clientContactApp/contact/accessContacts","").then(response=>{
       
        showHideContent(elementsObject.error_msg,parentBox);
    
        JSON.parse(response).map((item)=>{
            parentBox.innerHTML +=`<div class="page_rows" id=${item.id}>
              <p class="contacts_details_cols">${item.user_name} ${item.surname}</p>
              <p class="contacts_details_cols">${item.email}</p>
              <p class="contacts_details_cols" id="unlink_clients">Unlink clients</p>
            </div>`
            elementsObject.select_contacts.innerHTML += `<option value=${item.id}>${item.surname}</option>`; 
        }) 
    }).catch(error=>{
        showHideContent(parentBox,elementsObject.error_msg);
        elementsObject.select_contacts.innerHTML += `<option disabled selected>no contacts </option>`;
    })
}
getContacts();


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
                default:
                    break;
            }
       } )
    }
});