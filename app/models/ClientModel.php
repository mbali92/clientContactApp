<?php
    declare(strict_types=1);
  

    namespace App\Models;
    use App\Utils\DatabaseConn;
    use PDO;
    use PDOException;

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

        public function connect_contact($client_data){
            
            //access pdo static property connection from external class
            $pdo_conn = new DatabaseConn(); 
            $pdo_obg = $pdo_conn->pdo;

            if($pdo_obg){
                try{
                    $sql = "INSERT INTO client_contact(client_id,contact_id) VALUES(:client_id, :contact_id)";
                    $stmt = $pdo_obg->prepare($sql);
                    
                    // Bind parameters
                        $stmt->bindParam(':client_id', $client_data['clientId']);
                        $stmt->bindParam(':contact_id', $client_data['contactId']);
        
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

        public function sum_contacts() {
            // Access PDO static property connection from external class
            $pdo_conn = new DatabaseConn(); 
            $pdo_obg = $pdo_conn->pdo;  // Assuming $pdo is the PDO object
        
            if ($pdo_obg) {
                try {
                    // Prepare SQL query
                    $sql = "SELECT client_id, COUNT(contact_id) AS contact_count FROM client_contact GROUP BY client_id;";
                    $stmt = $pdo_obg->prepare($sql);
                    
                    // Execute the query
                    $stmt->execute();
         
                    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));  // Fetch results as associative array
                } catch (PDOException $e) {
                    // Handle the exception and display the error message
                    echo "Error fetching contact counts: " . $e->getMessage();
                } catch (Exception $e) {
                    // Handle any other exceptions
                    echo "An unexpected error occurred: " . $e->getMessage();
                }
            } else {
                echo "PDO object not found";
            }
        }

      
        public function remove_contacts($removeDetails) {
            // Access PDO static property connection from external class
            $pdo_conn = new DatabaseConn(); 
            $pdo_obg = $pdo_conn->pdo;  // Assuming $pdo is the PDO object
        
            if ($pdo_obg) {
                try {
                    // Prepare SQL query using named placeholders to prevent SQL injection
                    if ($removeDetails['type'] == "contact") {
                        $sql = "DELETE FROM client_contact WHERE contact_id = :contact_id";
                        $stmt = $pdo_obg->prepare($sql);
                        // Bind contact ID
                        $stmt->bindParam(':contact_id', $removeDetails['id'], PDO::PARAM_INT);
                    } else {
                        $sql = "DELETE FROM client_contact WHERE client_id = :client_id";
                        $stmt = $pdo_obg->prepare($sql);
                        // Bind client ID
                        $stmt->bindParam(':client_id', $removeDetails['id'], PDO::PARAM_INT);
                    }
        
                    // Execute the query
                    if ($stmt->execute()) {
                        echo "Contact successfully removed.";
                    } else {
                        echo "Failed to remove contact.";
                    }
        
                } catch (PDOException $e) {
                    // Handle the exception and display the error message
                    echo "Error removing contact: " . $e->getMessage();
                } catch (Exception $e) {
                    // Handle any other exceptions
                    echo "An unexpected error occurred: " . $e->getMessage();
                }
            } else {
                echo "PDO object not found";
            }
        }
        
    
    }
?>