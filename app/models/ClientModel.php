<?php
    declare(strict_types=1);
  

    namespace App\Models;
    
    use App\Utils\DatabaseConn;
    

    class ClientModel{
        public function store_client_data(array $client_data){
            //access pdo static property connection from external class
            $pdo_conn = new DatabaseConn(); 
            $pdo_obg = $pdo_conn->pdo;

            if($pdo_obg){
                try{
                    $sql = "INSERT INTO clients(user_name,client_code) VALUES(:user_name, :client_code)";
                    $stmt = $pdo_obg->prepare($sql);
                    
                    // Bind parameters
                     $stmt->bindParam(':user_name', $client_data['user_name']);
                     $stmt->bindParam(':client_code', $client_data['client_code']);
     
                     $stmt->execute();
                     echo"User inserted successfully";
                 }catch (PDOException $e) {
                     // Handle the exception and display the error message
                     echo "Error inserting user: " . $e->getMessage();
                 } catch (Exception $e) {
                     // Handle any other exceptions
                     echo "An unexpected error occurred: " . $e->getMessage();
                 }
            }else{echo "pdo  not found";}
        }

        public function get_clients_data(){
            //access pdo static property connection from external class
            $pdo_conn = new DatabaseConn(); 
            $pdo_obg = $pdo_conn->pdo;

            if($pdo_obg){
                try{
                    $sql = "SELECT * FROM clients;";
                    $stmt = $pdo_obg->prepare($sql);

                    $stmt->execute();
                     // Fetch the results
                    $clients = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    
                    // Check if there are any results
                    if ($clients) {
                        echo json_encode($clients); 
                    } else {
                        echo "No clients found.";
                    }
                }catch (\PDOException $e) {
                    // Handle the exception and display the error message
                    echo "Error inserting user: " . $e->getMessage();
                } catch (Exception $e) {
                    // Handle any other exceptions
                    echo "An unexpected error occurred: " . $e->getMessage();
                }
            }else{echo "pdo  not found";}

        }
    }
?>