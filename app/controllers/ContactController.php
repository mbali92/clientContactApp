<?php
  
   namespace App\Controllers;
   use App\Models\ContactModel;

   class  ContactController{
    
        public function save_contacts(array $client_data):void{
            $contactModel = new ContactModel();
            if($client_data["user_name"]  !== ""  && $client_data["surname"] !== "" && $client_data["email"] !== ""){
                $modelResponse = $contactModel->store_contacts($client_data);
                echo "$modelResponse";
            } else{echo "ERROR";} 
        }

        public function fetch_contacts():void{
            $contactModel = new ContactModel();
            $getResponse = $contactModel->get_contacts();
            echo "$getResponse";
        } 
   }

 

   

?>