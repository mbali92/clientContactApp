<?php
    require_once 'app/controllers/ClientController.php';

    use app\controllers\ClientController;
    
    
    //instantiate controller classes 
    $clientController = new ClientController();
    
    //access the requested url
    $requestUri = $_SERVER['REQUEST_URI'];

    //remove project name from the path for better redirects
    $basePath = "/clientContactApp";
    $subPath = substr($requestUri, strlen($basePath));

    //route requests to appropriate controllers 
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $jsonData =  file_get_contents('php://input');
        $data = json_decode($jsonData,true);

        switch ($subPath) {
            case '/client/saveClient':
                $clientController->save_client($data);
                break;
            default:
                # code...
                break;
        }
    }
    if($_SERVER['REQUEST_METHOD'] == "GET"){
        if($subPath == '/'){
            $clientController->home_page();
        }
    }
    
    

    
?>