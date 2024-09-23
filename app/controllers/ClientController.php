<?php
  declare(strict_types=1);
  
  
  namespace App\Controllers;
  use App\Models\ClientModel; 

  class ClientController{

    public function home_page():void{
      header("Location:app/views/clientView.php");
    }

    public function save_client(array $client_data):void{
      $clientModel = new ClientModel();
      
      //call model if complete and throw error if not complete
      if($client_data["user_name"]  !== ""  && $client_data["client_code"]  !== "" ){
      $modelResponse = $clientModel->store_client_data($client_data);
      echo "$modelResponse";
      } else{echo "ERROR";} 
    }

    public function fetch_clients():void{
      $clientModel = new ClientModel();
      $getResponse =  $clientModel->get_clients_data();
      echo "$getResponse";
    } 

    public function unlink_contact_client($client_data){
      $clientModel = new ClientModel();
      if($client_data["type"]  !== ""  && $client_data["id"]  !== "" ){
        $response = $clientModel->remove_contacts($client_data);
        echo"$response";
      }else{
        echo "one value short";
      }
    }

    public function total_contacts($colType){
      $clientModel = new ClientModel();
      $total = $clientModel->sum_contacts($colType);
      echo "$total";
    }

    public function link_contact_client($client_data){
      $clientModel = new ClientModel();
      if($client_data["contactId"]  !== ""  && $client_data["clientId"]  !== "" ){ 
        $response = $clientModel->connect_contact($client_data);
        echo $response;
      }else{echo "error";}
    }

  }

?>