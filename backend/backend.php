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
        $type = $_GET['type'] ?? '';
        if ($type == 'gudang') {
            $sql = "SELECT * FROM gudang";
            $result = mysqli_query($conn, $sql);
            $data = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            echo json_encode($data);
            break;
        } elseif ($type == 'kendaraan') {
            $sql = "SELECT * FROM kendaraan";
            $result = mysqli_query($conn, $sql);
            $data = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            echo json_encode($data);
            break;
        } elseif ($type == 'daftarpengirimanbarang') {
            $sql = "SELECT a.kodekirim, a.tglkirim, a.nopol, b.nopol, b.namadriver, a.totalqty FROM masterkirim a JOIN kendaraan b ON a.nopol = b.nopol ORDER BY a.id ASC";
            $result = mysqli_query($conn, $sql);
            $data = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            echo json_encode($data);
            break;
        } else {
            $sql = "SELECT p.id, p.kodeproduk, p.nama, p.satuan, p.harga, p.gambar, g.kodegudang, g.namagudang FROM produk p JOIN gudang g ON p.kodegudang = g.kodegudang ORDER BY p.id ASC";
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
        $namagudang = $input['namagudang'] ?? null;
        $alamat = $input['alamat'] ?? null;
        $kontak = $input['kontak'] ?? null;
        $kapasitas = $input['kapasitas'] ?? null;
        $nopol = $input['nopol'] ?? null;
        $namakendaraan = $input['namakendaraan'] ?? null;
        $jeniskendaraan = $input['jeniskendaraan'] ?? null;
        $namadriver = $input['namadriver'] ?? null;
        $kontakdriver = $input['kontakdriver'] ?? null;
        $tahun = $input['tahun'] ?? null;
        $foto = $input['foto'] ?? null;

        $sql = "";

        if (isset($_GET['type']) && $_GET['type'] == 'gudang') {
            $sql = "INSERT INTO `gudang`(`kodegudang`, `namagudang`, `alamat`, `kontak`, `kapasitas`) VALUES ('$kodegudang','$namagudang','$alamat','$kontak','$kapasitas')";
        } elseif (isset($_GET['type']) && $_GET['type'] == 'kendaraan') {
            $sql = "INSERT INTO `kendaraan`(`nopol`, `namakendaraan`, `jeniskendaraan`, `namadriver`, `kontakdriver`, `tahun`, `kapasitas`, `foto`) VALUES ('$nopol','$namakendaraan','$jeniskendaraan','$namadriver','$kontakdriver','$tahun','$kapasitas','$foto')";
        } else {
            $sql = "INSERT INTO `produk`(`kodeproduk`, `nama`, `satuan`, `harga`, `gambar`, `kodegudang`) VALUES ('$kode','$nama','$satuan','$harga','$gambar','$kodegudang')";
        }
        $ok = mysqli_query($conn, $sql);

        if (!$ok) {
            echo json_encode([
                "sql" => $sql
            ]);
        } else {
            echo json_encode([
                "status" => "success",
                "message" => "Data diterima",
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
        $kodegudang = $input['kodegudang'] ?? null;
        $kapasitas = $input['kapasitas'] ?? null;
        $nopol = $input['nopol'] ?? null;
        $namakendaraan = $input['namakendaraan'] ?? null;
        $jeniskendaraan = $input['jeniskendaraan'] ?? null;
        $namadriver = $input['namadriver'] ?? null;
        $kontakdriver = $input['kontakdriver'] ?? null;
        $tahun = $input['tahun'] ?? null;
        $foto = $input['foto'] ?? null;

        if (!$id) {
            echo json_encode([
                "status" => "error",
                "message" => "ID tidak diberikan"
            ]);

            break;
        }

        $sql = "";

        if (isset($_GET['type']) && $_GET['type'] == 'gudang') {
            $sql = "INSERT INTO `gudang`(`kodegudang`, `namagudang`, `alamat`, `kontak`, `kapasitas`) VALUES ('$kodegudang','$namagudang','$alamat','$kontak','$kapasitas')";
        } elseif (isset($_GET['type']) && $_GET['type'] == 'kendaraan') {
            $sql = "UPDATE `kendaraan` SET `nopol`='$nopol', `namakendaraan`='$namakendaraan', `jeniskendaraan`='$jeniskendaraan', `namadriver`='$namadriver', `kontakdriver`='$kontakdriver', `tahun`='$tahun', `kapasitas`='$kapasitas', `foto`='$foto' WHERE `kendaraan`.`id` = '$id'";
        } else {
            $sql = "UPDATE `produk` SET `gambar`='$gambar', `kodeproduk`='$kode',`nama`='$nama',`satuan`='$satuan',`harga`='$harga', `kodegudang`='$kodegudang' WHERE `produk`.`id` = '$id'";
        }
        
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

        $sql = "DELETE FROM `produk` WHERE `id` = '$id'";
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
