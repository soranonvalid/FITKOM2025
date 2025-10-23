<?php
$host = "192.168.0.10";
$user = "timbkodein";
$pass = "timbkodein";
$db = "timbkodein";

$conn =  mysqli_connect($host , $user, $pass, $db);
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}

mysqli_select_db($conn, $db);
