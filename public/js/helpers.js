//ajax post content submits  
export function submitContentsToServer(method, url,clientData) {
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

//show and hide contents when they are clicked
export function showHideContent (hideElement,showElement){
    hideElement.style.display = "none";
    showElement.style.display ="block";
};

//link clients and contacts
export function linkContacts(linkData){
    submitContentsToServer("POST","/clientContactApp/linkClientsContacts",linkData).then(response=>{
        console.log(response)
        location.reload();
    }).catch(error => 
        console.error(error)
    );   
}

export function addEventToLinkContacts(select_contact_box,select_client_box,errorBox){
    //set data to sent to link method
    let linkData;

    //add event listener to list of clients  
    select_contact_box.addEventListener('change',(event)=>{
       linkData = {clientId : select_client_box.options[select_client_box.selectedIndex].value,
        contactId : select_contact_box.options[select_contact_box.selectedIndex].value}

        //link the client and contact
        linkData.clientId && linkData.contactId ? linkContacts(linkData) : errorBox.innerHTML = "select client name";
    })
  
    select_client_box.addEventListener('change',(event)=>{
        linkData = {clientId : select_client_box.options[select_client_box.selectedIndex].value,
        contactId : select_contact_box.options[select_contact_box.selectedIndex].value}
        
        //link the client and contact
        linkData.clientId && linkData.contactId ? linkContacts(linkData) :errorBox.innerHTML ="select contact details";
    })

}

//unlink clients and contacts
export function unlinkContact(event, type){
    if(event.target.classList.contains("unlink")){
        const removeData ={
            id: event.target.getAttribute('id'),
            type: type
        }
        submitContentsToServer("POST","/clientContactApp/unlinkClientsContacts",removeData).then(response=>{
            console.log(response)
            location.reload();
        }).catch(error =>
            console.error(error)
        )
    }
}
//change selected tab's color
document.querySelectorAll('').forEach(tab=>tab.classList.add("active"));

