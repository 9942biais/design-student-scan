<?php
declare(strict_types=1);

return [
    'db' => [
        'host' => 'localhost',
        'name' => 'YOUR_DATABASE_NAME',
        'user' => 'YOUR_DATABASE_USER',
        'password' => 'YOUR_DATABASE_PASSWORD',
        'charset' => 'utf8mb4',
    ],
    'admin' => [
        'password_hash' => password_hash('CHANGE_THIS_PASSWORD', PASSWORD_DEFAULT),
    ],
    'session' => [
        'name' => 'dif_scan_admin',
        'secure' => true,
    ],
];
