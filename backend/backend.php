<?php
header("Content-Type: application/json");
include "koneksi.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

$method = $_SERVER["REQUEST_METHOD"];

$raw = file_get_contents("php://input");
$input = json_decode($raw, true);

switch ($method) {
    case 'GET':
        if (isset($_GET['type']) && $_GET['type'] == 'gudang') {
            $sql = "SELECT * FROM tb_gudang";
            $result = mysqli_query($conn, $sql);
            $data = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            echo json_encode($data);
            break;
        } else {
            // Return products ordered by id as requested
            $sql = "SELECT p.id, p.kode, p.nama, p.satuan, p.harga, p.gambar, g.namagudang, g.golongan FROM tb_produk p JOIN tb_gudang g ON p.kodegudang = g.kodegudang ORDER BY p.id ASC";
            $result = mysqli_query($conn, $sql);
            $data = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            echo json_encode($data);
            break;
        }



    case 'POST':
        $gambar = $input['gambar'] ?? null;
        $kode = $input['kode'] ?? null;
        $nama = $input['nama'] ?? null;
        $satuan = $input['satuan'] ?? null;
        $harga = $input['harga'] ?? null;
        $kodegudang = $input['kodegudang'] ?? null;

        if (!$gambar || !$kode || !$nama || !$satuan || !$harga || !$kodegudang) {
            echo json_encode([
                "status" => "error",
                "message" => "Data tidak lengkap"
            ]);
            break;
        }

        $sql = "INSERT INTO `tb_produk`(`kode`, `nama`, `satuan`, `harga`, `gambar`, `kodegudang`) VALUES ('$kode','$nama','$satuan','$harga','$gambar','$kodegudang')";
        $ok = mysqli_query($conn, $sql);

        if (!$ok) {
            echo json_encode([
                "sql" => $sql
            ]);
        } else {
            echo json_encode([
                "status" => "success",
                "message" => "Data diterima",
                "data" => [
                    "gambar" => $gambar,
                    "kode" => $kode,
                    "nama" => $nama,
                    "satuan" => $satuan,
                    "harga" => $harga,
                    "kodegudang" => $kodegudang
                ],
            ]);
        }
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

        $sql = "UPDATE `tb_produk` SET `gambar`='$gambar', `kode`='$kode',`nama`='$nama',`satuan`='$satuan',`harga`='$harga' WHERE `tb_produk`.`id` = '$id'";
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

        $sql = "DELETE FROM `tb_produk` WHERE `id` = '$id'";
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
