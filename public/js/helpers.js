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
    }).catch(error => 
        console.error(error)
    );   
}