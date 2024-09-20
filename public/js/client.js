//access all the document objects
const domButtons  = document.querySelectorAll("#create-client,#submit-form,#client_general-header, #client_contact-header");
const domElements = document.querySelectorAll("#client_form_box,#general_tab,#contacts_tab,#error_msg,#link_contact_options,#client_info,#clients_info_box,#error_message");
const inputElements = document.querySelectorAll("#name,#client_code");

const elementsObject = {};
domElements.forEach(element => {
    const key = element.id; // Use the ID as the key
    elementsObject[key] = element; // Assign the element to the object
});

//show create client view
const showHideContent = (hideElement,showElement)=> {
    hideElement.style.display = "none";
    showElement.style.display ="block";
};


//ajax post content submits  
function submitContentsToServer(method, url, event, key) {
    //prevent form submissions 
    if(event !== ""){event.preventDefault();}

    //read clients data from dom into object
    const clientData = {
        user_name: inputElements[0].value,
        client_code: inputElements[1].value  
    }

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

//retrieve clients data through ajax
function contactList() {
    submitContentsToServer("GET","fetchContacts","");

    const selectElement = elementsObject.link_contact_options;
    const noContacts = document.createElement('option');
    
    if(databaseResponsesObg.getContacts == "" ||  databaseResponsesObg.getContacts == "no contacts"){
        // Set the value, text, and disabled attribute
        noContacts.value = '';
        noContacts.textContent = 'No contacts to select';
        noContacts.disabled = true;
        selectElement.appendChild(noContacts);
    }else{

    }
}

function getClients(){
    
    submitContentsToServer("GET","/clientContactApp/client/accessClients","").then(response=>{
        //hide error massage show the clients list
        const parentBox = elementsObject.clients_info_box;
        showHideContent(elementsObject.error_message, parentBox)

        const clientInfo = elementsObject.client_info;
        JSON.parse(response).map((item)=>{
            clientInfo.innerHTML += `<div class="client_details_cols">${item.user_name}</div><div class="client_details_cols">${item.client_code}</div>`;
        })        
    }).catch(error => 
        console.error(error)
    );   
}     

getClients()


//call functions on click events
domButtons.forEach(element => {
    if(element instanceof HTMLElement){
       element.addEventListener('click',(event)=>{
            switch (element.id) {
                case "create-client":
                    showHideContent(element.parentElement, domElements[0]);
                    break;
                case "client_general-header":
                    showHideContent(elementsObject.contacts_tab,elementsObject.general_tab);
                    break;
                case "client_contact-header":
                    showHideContent(elementsObject.general_tab,elementsObject.contacts_tab);
                    break;
                case "submit-form":
                    submitContentsToServer("POST","saveClient",event);
                    break;
                default:
                    break;
            }
       } )
    }
});