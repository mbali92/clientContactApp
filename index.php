<?php

    require __DIR__ . '/vendor/autoload.php';
    

    use App\Controllers\ClientController;
    use App\Controllers\ContactController;
    use Dotenv\Dotenv;
    

    //Load .env file
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
     
    //instantiate controller classes 
    $clientController = new ClientController();
    $contactController = new ContactController();
  
    //access the requested url
    $requestUri = $_SERVER['REQUEST_URI'];
    
    //remove project name from the path for better redirects
    $basePath = "/clientContactApp";
    $subPath = substr($requestUri, strlen($basePath));


    
    //route requests to appropriate controllers 
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $jsonData =  file_get_contents('php://input');
        $data = json_decode($jsonData,true);

        switch($subPath) {
            case '/client/saveClient':
                $clientController->save_client($data);
                break;
            case'/contact/saveContacts':
                $contactController->save_contacts($data);
                break;
            case'/unlinkClientsContacts':
                // $clientController->unlink_contact_client($data);
                break;
            case'/linkClientsContacts':
                $clientController->link_contact_client($data);
                break;
            default:
                echo "url invalid";
                break;
        }
    }
    if($_SERVER['REQUEST_METHOD'] == "GET"){
        switch ($subPath) {
            case '/':
                $clientController->home_page();
                break;
            case '/client/accessClients':
                $clientController->fetch_clients();
                break;
            case '/contact/accessContacts':
                $contactController->fetch_contacts();
                break;
            case '/client/totalContacts':
                $clientController->total_contacts();
                break;
            default:
                echo "url invalid";
                break;
        }
        
    }
    
    

    
?>