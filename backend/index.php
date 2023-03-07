<?php

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$db = new PDO('sqlite:wu22.sqlite3');

$stmt = $db->query("SELECT * FROM WU22");
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);
