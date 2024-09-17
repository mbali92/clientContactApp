<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylesheet/style.css">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="client_details_box">
            <button>create new client</button>
            <div class="client_details clients_info">
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
                <div class="page_rows">
                    <div class="client_details_cols"><p>hello</p></div>
                    <div class="client_details_cols"></div>
                    <div class="client_details_cols"></div>
                </div>
            </div>
            <div class="error_message">
                <p>No clients(s) found</p>
            </div>
        </div>
        <div class="client_form_box">
            <div class="page_rows">
                <div class="col_tabs active">
                    <h5>General</h5>
                </div>
                <div class="col_tabs">
                    <h5>Contacts</h5>
                </div>
            </div>
            <div class="tab_info-box">
                <div class="general_tab">
                    <form action="">
                        <div>
                            <label for="">Name</label>
                            <input type="text">
                        </div>
                        <div>
                            <label for="">client code</label>
                            <input type="text">
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
                <div class="contacts_tab">
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
    <script src="script/client.js"></script>
</body>
</html>
