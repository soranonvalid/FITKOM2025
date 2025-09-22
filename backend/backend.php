<?php
header("Content-Type: application/json");
include "koneksi.php";

$method = $_SERVER["REQUEST_METHOD"];

$raw = file_get_contents("php://input");
$input = json_decode($raw, true);

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM `tb_smart_farm`";
        $result = mysqli_query($conn, $sql);
        $data = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        echo json_encode($data);
        break;

    case 'POST':
        $gambar = $input['gambar'] ?? null;
        $kode = $input['kode'] ?? null;
        $nama = $input['nama'] ?? null;
        $satuan = $input['satuan'] ?? null;
        $harga = $input['harga'] ?? null;

        if (!$gambar || !$kode || !$nama || !$satuan || !$harga) {
            echo json_encode([
                "status" => "error",
                "message" => "Data tidak lengkap"
            ]);
            break;
        }

        $sql = "INSERT INTO `tb_smart_farm`(`gambar`, `kode`, `nama`, `satuan`, `harga`) VALUES ('$gambar','$kode','$nama','$satuan','$harga')";
        $ok = mysqli_query($conn, $sql);

        echo json_encode([
            "status" => "success",
            "message" => "Data diterima",
            "data" => [
                "gambar" => $gambar,
                "kode" => $kode,
                "nama" => $nama,
                "satuan" => $satuan,
                "harga" => $harga
            ]
        ]);
        break;

    case 'PUT':
        $id = $input['id'] ?? null;
        $gambar = $input['gambar'] ?? null;
        $kode = $input['kode'] ?? null;
        $nama = $input['nama'] ?? null;
        $satuan = $input['satuan'] ?? null;
        $harga = $input['harga'] ?? null;

        if (!$id) {
            echo json_encode([
                "status" => "error",
                "message" => "ID tidak diberikan"
            ]);

            break;
        }

        if (!$gambar || !$kode || !$nama || !$satuan || !$harga) {
            echo json_encode([
                "status" => "error",
                "message" => "Data tidak lengkap"
            ]);
            break;
        }

        $sql = "UPDATE `tb_smart_farm` SET `gambar`='$gambar', `kode`='$kode',`nama`='$nama',`satuan`='$satuan',`harga`='$harga' WHERE `tb_smart_farm`.`id` = '$id'";
        $ok = mysqli_query($conn, $sql);

        echo json_encode([
            "status" => $ok ? "success" : "error",
            "message" => $ok ? "Data dengan ID $id berhasil diupdate" : "Gagal mengupdate data"
        ]);

        break;

    case 'DELETE':
        $id = $input['id'] ?? null;

        if (!$id) {
            echo json_encode([
                "status" => "error",
                "message" => "ID tidak diberikan"
            ]);

            break;
        }

        $sql = "DELETE FROM `tb_smart_farm` WHERE `id` = '$id'";
        $ok = mysqli_query($conn, $sql);

        echo json_encode([
            "status" => $ok ? "success" : "error",
            "message" => $ok ? "Data dengan ID $id dihapus" : "Gagal menghapus data"
        ]);
        break;

    default:
        echo json_encode(["error" => "Method not allowed"]);
        break;
};
