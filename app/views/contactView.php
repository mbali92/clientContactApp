
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
        <div class="contacts_details_box">
            <button id="create-contacts">create new contacts</button>
            <div class="contacts_details" id="contacts_info_box">
                <div class="page_rows">
                    <div class="contacts_details_cols">
                        <h6>Name</h6>
                    </div>
                    <div class="contacts_details_cols">
                       <h6>Surname</h6>
                    </div>
                    <div class="contacts_details_cols">
                       <h6>Email</h6>
                    </div>
                    <div class="contacts_details_cols linked_contacts_col">
                        <h6>No. of linked clients</h6>
                    </div>
                </div>
            </div>
            <div class="error_message" id="no_contacts_error">
                <p>No contacts(s) found</p>
            </div>
        </div>
        <div class="contacts_form_box" id="contacts_form_box">
            <div class="page_rows">
                <div class="col_tabs" id="contacts_general-header" >
                    <h5>General</h5>
                </div>
                <div class="col_tabs" id="contacts_contact-header">
                    <h5>Contacts</h5>
                </div>
            </div>
            <div class="tab_info-box">
                <div class="general_tab" id="general_tab">
                    <select style="padding:10px;margin-right:10px;cursor: pointer;" name="" id="select_contact">
                      <option value="" disabled selected>Select contacts</option>
                    </select>
                    <select style="padding:10px;cursor: pointer;" name="" id="select_client">
                      <option value="" disabled selected>Link multiple contacts to clients</option>
                    </select>
                    <p id=client_form_error></p>
                    <form id="contacts_form">
                        <div>
                            <label for="">Name</label>
                            <input class="contact_input" type="text" required>
                        </div>
                        <div>
                            <label for="">Surname</label>
                            <input class="contact_input" type="text" required>
                        </div>
                        <div>
                            <label for="">Email</label>
                            <input class="contact_input" type="text" required>
                        </div>
                        <button id='submit-form'>Submit</button>
                    </form>
                </div>
                <div class="contacts_tab" id="contacts_tab">
                    <div class="contacts_details" id="contact_client_info">
                        <div class="page_rows">
                            <div class="contacts_details_cols">
                                <h6>Name</h6>
                            </div>
                            <div class="contacts_details_cols">
                                <h6>Client_code</h6>
                            </div>
                            <div class="contacts_details_cols">
                               <h6></h6>
                            </div>
                        </div>
                    </div>
                    <div class="error_message" id="no_clients_error">
                        <p>No contacts(s) found</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="../../public/js/contacts.js"></script>
</body>
</html>