<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/css/style.css">
    <title>Document</title>
   
</head>
<body>
    <div class="container">
        <div class="client_details_box">
            <button id="create-client">create new client</button>
            <div class="client_details" id="clients_info_box">
                <div class="page_rows">
                    <div class="client_details_cols">
                        <h6>Name</h6>
                    </div>
                    <div class="client_details_cols">
                       <h6>Client</h6>
                    </div>
                    <div class="client_details_cols linked_clients_col">
                        <h6>No. of linked contacts</h6>
                    </div>
                </div>
                <div class="page_rows" id="client_info">
                    
                </div>
            </div>
            <div class="error_message" id="error_message">
                <p>No clients(s) found</p>
            </div>
        </div>
        <div class="client_form_box" id="client_form_box">
            <div class="page_rows">
                <div class="col_tabs active" id="client_general-header" >
                    <h5>General</h5>
                </div>
                <div class="col_tabs" id="client_contact-header">
                    <h5>Contacts</h5>
                </div>
            </div>
            <div class="tab_info-box">
                <div class="general_tab" id="general_tab">
                    <select name="" id="link_contact_options">
                      <option value="" disabled selected>Select an option</option>
                    </select>
                    <p id=error_msg></p>
                    <form id="client_form">
                        <div>
                            <label for="">Name</label>
                            <input  id="name" type="text" required>
                        </div>
                        <div>
                            <label for="">client code</label>
                            <input id="client_code" type="text" required>
                        </div>
                        <button id='submit-form'>Submit</button>
                    </form>
                </div>
                <div class="contacts_tab" id="contacts_tab">
                    <div class="client_details">
                        <div class="page_rows">
                            <div class="client_details_cols">
                                <h6>Surname Name</h6>
                            </div>
                            <div class="client_details_cols">
                                <h6>Email</h6>
                            </div>
                            <div class="client_details_cols">
                            </div>
                        </div>
                        <div class="page_rows">
                            <div class="client_details_cols"></div>
                            <div class="client_details_cols"></div>
                            <div class="client_details_cols"><span id="unlink_contacts">Unlink contacts</span></div>
                        </div>
                    </div>
                    <div class="error_message">
                        <p>No clients(s) found</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

    <script src="../../public/js/client.js"></script>
    
</body>
</html>
