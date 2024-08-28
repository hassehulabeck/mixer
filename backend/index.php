<?php

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$table = 'WU23'; 
$dbName = 'wu23';
$db = new PDO('sqlite:' . $dbName . '.sqlite3');

$stmt = $db->query("SELECT * FROM '$table'");
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);

/* var_dump($db); */
