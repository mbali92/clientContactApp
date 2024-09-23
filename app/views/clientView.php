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
        <nav>
            <a href="clientView.php">Clients</a>
            <a href="contactView.php">Contacts</a>
        </nav>
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
            </div>
            <div class="error_message" id="no_clients_error">
                <p>No clients(s) found</p>
            </div>
        </div>
        <div class="client_form_box" id="client_form_box">
            <div class="page_rows">
                <div class="col_tabs" id="client_general-header" >
                    <h5>General</h5>
                </div>
                <div class="col_tabs" id="client_contact-header">
                    <h5>Contacts</h5>
                </div>
            </div>
            <div class="tab_info-box">
                <div class="general_tab" id="general_tab">
                    <select style="padding:10px;margin-right:10px;cursor: pointer;" name="" id="select_client">
                      <option value="" disabled selected>Select client</option>
                    </select>
                    <select style="padding:10px;cursor: pointer;" name="" id="select_contact">
                      <option value="" disabled selected>Link multiple contacts to client</option>
                    </select>
                    <p id=client_form_error></p>
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
                    <div class="client_details" id="contact_details">
                        <div class="page_rows">
                            <div class="client_details_cols">
                                <h6>FullName</h6>
                            </div>
                            <div class="client_details_cols">
                                <h6>Email</h6>
                            </div>
                            <div class="client_details_cols">
                            </div>
                        </div>
                    </div>
                    <div class="error_message" id="no_contacts_error">
                        <p>No contact(s) found</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="../../public/js/client.js"></script>
</body>
</html>
