<?php
// Define the autoloader function
function myAutoloader($class) {
    // Define base directories for different components
    $baseDirs = [
        __DIR__ . 'controllers/',
        __DIR__ . 'models/',
        __DIR__ . 'views/'
    ];

    foreach ($baseDirs as $baseDir) {
        // Convert namespace separators to directory separators
        $file = $baseDir . str_replace('\\', '/', $class) . '.php';

        // Check if the file exists and include it
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
}

// Register the autoloader function
spl_autoload_register('myAutoloader');
?>
