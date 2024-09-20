<?php
    
    namespace App\Utils; 
    use PDO;

    //create reusable pdo connection to the database
    class DatabaseConn {
        public $pdo;
    
        // Constructor to initialize the connection
        public function __construct() {
                try {
                    $user = $_ENV['MYSQL_USER'];
                    $pass = $_ENV['MYSQL_PASSWORD'];
                    $data_base_name = $_ENV['MYSQL_DATABASE'];
                    $host = $_ENV['MYSQL_HOST'];
    
                    $dsn = "mysql:host=$host;dbname=$data_base_name;charset=utf8mb4";
                    $options = [
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                    ];
    
                    $this-> pdo = new PDO($dsn, $user, $pass, $options);
                } catch (PDOException $e) {
                    // Handle connection errors
                    echo "Database connection error: " . $e->getMessage();
                    $this-> pdo = null; // Set to null on failure
                }
            }
        
    }
    

?>