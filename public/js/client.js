//access all the document objects
const domButtons  = document.querySelectorAll("#create-client,#submit-form,#client_general-header, #client_contact-header");
const domElements = document.querySelectorAll("#client_form_box,#general_tab,#contacts_tab")
const inputElements = document.querySelectorAll("#name,#client_code")



//retrieve clients data through ajax  

//ajax post content submits  
function submitContentsToServer(event){
   event.preventDefault();
   const clientData = {
    name: inputElements[0].value,
    client_code: inputElements[1].value  
   }
   console.log(clientData)
    // const xhr = new XMLHttpRequest;
    // xhr.open("POST", "",true);
    // xhr.setRequestHeader("Content-Type', 'application/json");
    // xhr.onload = function(){
    //     if(xhr.status >= 200 && xhr.status > 300){
    //         console.log(xhr.responseText)
    //     }else{
    //         console.error("Request failed",xhr.status)
    //     }
    // }
    // // Define what happens in case of error
    // xhr.onerror = function () {
    //     console.error('Request error.');
    // };

    // // Convert data object to JSON and send
    // xhr.send(JSON.stringify(clientData));

}  


//show create client view
const showHideContent = (hideElement,showElement)=> {
    hideElement.style.display = "none";
    showElement.style.display ="block";
};

//call functions on click events
domButtons.forEach(element => {
    if(element instanceof HTMLElement){
       element.addEventListener('click',(event)=>{
            switch (element.getAttribute("id")) {
                case "create-client":
                    showHideContent(element.parentElement, domElements[0]);
                    break;
                case "client_general-header":
                    showHideContent(domElements[2],domElements[1]);
                    break;
                case "client_contact-header":
                    showHideContent(domElements[1],domElements[2]);
                    break;
                case "submit-form":
                    submitContentsToServer(event);
                    break;
                default:
                    break;
            }
          
       } )
    }
});