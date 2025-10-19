<?php

// $host = "sql12.freesqldatabase.com";
// $user = "sql12802531";
// $pass = "gnI1JbDhrm";
// $db = "sql12802531";

$host = "localhost";
$user = "root";
$pass = "root";
$db = "smart_farm_db";
$conn =  mysqli_connect($host , $user, $pass, $db);
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}

mysqli_select_db($conn, $db);
