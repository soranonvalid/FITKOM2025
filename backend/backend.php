<?php
header("Content-Type: application/json"); 
include "koneksi.php";    

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM tb_sayur";
        $result = mysqli_query($conn, $sql);

        $data = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        };
        echo json_encode($data);
        break;

    default:
        echo json_encode(["error" => "Method not allowed"]);
        break;
};