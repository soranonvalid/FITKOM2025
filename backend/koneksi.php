<?php

$host = "localhost";
$user = "root";
$pass = "";
$db = "sayur_mayur";
$conn =  mysqli_connect($host , $user, $pass, $db);
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}

mysqli_select_db($conn, $db);
