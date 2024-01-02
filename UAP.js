function beliBarang() {
    var kodeBarang = document.getElementsByName("kodeBarang")[0].value;
    var qty = document.getElementsByName("qty")[0].value;

    // Memeriksa inputan
    if (kodeBarang === "" || qty === "") {
        alert("Mohon isi kode barang dan juga Jumlah Barang");
    } else {
        // Memeriksa ketersediaan barang
        var tabel = document.getElementById("daftarBarang");
        var dataBarang = null;

        for (var i = 1; i < tabel.rows.length; i++) {
            var row = tabel.rows[i];
            var noBarang = row.cells[0].innerText.replace(".", "");

            if (noBarang === kodeBarang) {
                var nama = row.cells[1].innerText;
                var harga = row.cells[2].innerText;
                dataBarang = { no: kodeBarang, nama: nama, harga: harga };
                break;
            }
        }

        if (dataBarang === null) {
            alert("Kode barang tidak ditemukan");
        } else {
            // Menampilkan detail barang
            var detailBarang = "Detail Barang:\n\n";
            detailBarang += "Kode Barang: " + dataBarang.no + "\n";
            detailBarang += "Nama Barang: " + dataBarang.nama + "\n";
            detailBarang += "Harga: " + dataBarang.harga + "\n";
            detailBarang += "Qty: " + qty + "\n";
            
            // Menghitung total harga
            var hargaSatuan = parseInt(dataBarang.harga.replace("Rp. ", "").replace(".", ""));
            var totalHarga = hargaSatuan * parseInt(qty);
            var formattedTotalHarga = "Rp. " + totalHarga.toLocaleString();

            detailBarang += "Total Harga: " + formattedTotalHarga + "\n";

            // Menampilkan opsi lanjut atau batal
            if (confirm(detailBarang + "\nLanjutkan pembelian?")) {
                // Meminta inputan uang pembayaran
                var uangPembayaran = 0;

                while (uangPembayaran < totalHarga) {
                    uangPembayaran = parseInt(prompt("Total Harga: " + formattedTotalHarga + "\nMasukkan uang pembayaran:"));

                    if (uangPembayaran < totalHarga) {
                        alert("Uang tidak cukup");
                    }
                }

                // Menghitung kembalian
                var kembalian = uangPembayaran - totalHarga;

                // Menampilkan pop up pembayaran berhasil atau kembalian
                if (kembalian === 0) {
                    alert("Pembayaran berhasil");
                } else if (kembalian > 0) {
                    alert("Pembayaran berhasil\nKembalian: " + kembalian.toLocaleString());
                }
            }
        }
    }
}