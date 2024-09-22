<?php
namespace App\Models;
use App\Utils\DatabaseConn;


class ContactModel {
    public function store_contacts(array $client_data){
       
        //access pdo static property connection from external class
        $pdo_conn = new DatabaseConn(); 
        $pdo_obg = $pdo_conn->pdo;

        if($pdo_obg){
            try{
                $sql = "INSERT INTO contacts(user_name,surname,email) VALUES(:user_name, :surname,:email)";
                $stmt = $pdo_obg->prepare($sql);
                
                // Bind parameters
                 $stmt->bindParam(':user_name', $client_data['user_name']);
                 $stmt->bindParam(':surname', $client_data['surname']);
                 $stmt->bindParam(':email', $client_data['email']);

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

    public function get_contacts(){
        //access pdo static property connection from external class
        $pdo_conn = new DatabaseConn(); 
        $pdo_obg = $pdo_conn->pdo;

        if($pdo_obg){
            try{
                $sql = "SELECT * FROM contacts;";
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