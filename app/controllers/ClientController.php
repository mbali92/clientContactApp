<?php
  declare(strict_types=1);
  
  namespace app\controllers;

  class ClientController{

    public function home_page():void{
      header("Location: app/views/clientView.php");
    }

    public function save_client(array $client_data):void{
      echo "(string)$client_data";
    }
    
  
  }

?>