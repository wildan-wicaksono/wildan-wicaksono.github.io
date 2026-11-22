---
layout: single
title: "Panduan Studio TikZ"
permalink: /tools/studio-tikz/panduan.html
comments: false
---

Studio TikZ membantu kamu menggambar konstruksi geometri dan menyalinnya ke modul LaTeX. Kamu bisa mengambil gambar lengkap atau memakai koordinatnya saja jika sudah punya gaya TikZ sendiri. [Buka editor](./index.html).

## Gambar pertama dalam lima langkah

Kita akan menggambar segitiga ABC dan titik D pada AB sehingga AD dua kali DB, lalu menghubungkan C ke D.

1. Pilih **Lembar → Kanvas baru**, lalu **Segitiga**. Klik tiga tempat yang tidak segaris, urut A di kiri bawah, B di kanan bawah, dan C di atas.
2. Pilih **Titik dan garis → Titik dari rumus vektor**, ketik `D = (A + 2B)/3`, lalu klik **Buat titik**. D muncul dua pertiga perjalanan dari A ke B.
3. Klik **Ruas**, lalu klik C dan D. Pada **Pola garis**, pilih **Putus-putus** agar CD mudah dibedakan dari sisi segitiga.
4. Pilih **Sudut dan label → Busur sudut**. Klik A, C, lalu B untuk menandai ∠ACB. Pada **Label sudut**, pilih **Besar sudut otomatis (°)**.
5. Aktifkan **Pilih / geser** dan pindahkan bulatan B. D tetap membagi AB dengan perbandingan 2 ∶ 1, sedangkan besar ∠ACB berubah. Untuk merapikan posisi huruf B, seret hurufnya.

Untuk membandingkan hasilmu, unduh proyek contoh, lalu buka lewat **Buka file** di Studio. <a href="./contoh-segitiga.stikz.json" download="contoh-segitiga.stikz.json">Contoh segitiga dengan AD ∶ DB = 2 ∶ 1</a>.

## Membuat konstruksi yang mengikuti gambar

| Yang ingin digambar | Urutan tindakan |
| --- | --- |
| Titik P yang mengikuti lingkaran | Pilih **Titik** lalu klik keliling. Gunakan **Pilih / geser** untuk menggeser P sepanjang lingkaran. Klik ruang kosong dengan alat Titik untuk membuat titik bebas. |
| Garis antiparalel | Dalam segitiga ABC, pilih **Titik dan garis → Garis antiparalel**, klik BC, lalu klik sebuah titik D pada AB. Perpotongan garis baru dengan AC adalah E. Jika titiknya berbeda, B, C, E, D terletak pada satu lingkaran. |
| Lingkaran dengan radius dari ruas | Buat ruas yang diperlukan. Pilih **Lingkaran → Lingkaran dengan rumus jari-jari**. Pilih **Jari-jari r**, masukkan misalnya `(AB + CD)/2`, lalu klik pusatnya. **Sisipkan panjang ruas** membantu memilih nama ruas yang benar. |
| Inversi titik P dengan kuasa OA × OB | Buat ruas OA dan OB. Pilih **Lingkaran → Inversi dengan jari-jari atau kuasa**. Pilih **Kuasa k = r²**, isi `OA * OB`, klik pusat O, lalu P. Bayangan P′ memenuhi OP × OP′ = OA × OB. |

**Panduan alat** di atas kanvas memuat 63 entri. Cari istilah seperti *singgung*, *siklis*, atau *inversi*. Tombol **?** di samping nama alat membuka langsung urutan klik dan ilustrasi alat aktif. Di menu **Lembar**, coba **Contoh antiparalel siklis** atau **Contoh inversi hasil kali**, lalu seret titik untuk melihat hubungan yang dipertahankan.

## Menempelkan hasil ke LaTeX

Tambahkan `\usepackage{tikz}` di preamble dokumen. Pilih mode di panel **Kode TikZ**.

| Mode | Tempat menempelkan hasil |
| --- | --- |
| **Gambar lengkap → Salin TikZ** | Tempel di badan dokumen, misalnya setelah teks soal. Ekspor sudah membungkus gambar dalam `center` dan `tikzpicture`, beserta perintah pustaka TikZ yang diperlukan. |
| **Koordinat saja → Salin koordinat** | Tempel di dalam lingkungan `tikzpicture` milikmu. Koordinat numerik dan label titik bisa langsung dipakai dengan perintah gambarmu sendiri, misalnya `\draw (A)--(B)--(C)--cycle;`. |

**Skala TikZ** mengatur ukuran gambar saat dicetak. Pada skala 2, panjang ruas tercetak dua kali lebih besar. Kode menyesuaikan radius bulatan titik agar radius cetaknya tetap **1,5 pt**. Tombol **+** dan **−** di kanvas mengatur pembesaran tampilan kerja.

Klik ruas untuk mengatur **Warna** atau **Opasitas**. Klik bagian dalam segitiga untuk mengatur **Warna isian**. Nama palet mengikuti **xcolor**, misalnya `ForestGreen`. Studio menyertakan `\providecolor` untuk nama yang memerlukannya. Kamu juga bisa memakai opsi `dvipsnames` pada templat LaTeX milikmu.

## Menyimpan beberapa diagram dan memakai Studio secara luring

Klik **Simpan proyek** untuk mengunduh konstruksi beserta rumus dan gayanya. Beri setiap diagram nama berkas yang mudah dicari, misalnya `01-garis-berat.stikz.json` dan `02-lingkaran-luar.stikz.json`. Pertahankan akhiran `.stikz.json`. Untuk melanjutkan diagram tertentu, klik **Buka file** dan pilih salinannya.

Studio mencoba menyimpan **satu lembar terakhir** di browser. Membuka contoh, membuat lembar baru, atau membuka proyek lain mengganti lembar yang diingat. Simpan proyek sebelum berpindah. Berkas proyek juga bisa dibuka pada komputer lain atau dipakai untuk kembali ke versi gambar sebelumnya.

Untuk bekerja tanpa internet, <a href="./index.html" download="Studio-TikZ.html">unduh Studio-TikZ.html</a> dan buka melalui browser. Jika sedang membaca panduan di GitHub, buka berkas editor lalu gunakan **Download raw file**. Untuk memperbarui salinan luring, unduh HTML terbaru dan buka kembali proyek `.stikz.json`. Pada versi daring, muat ulang halaman setelah pembaruan diterbitkan. [Berkas editor](./index.html).

## Mengimpor gambar GeoGebra

Klik **Buka file** atau seret satu berkas `.ggb` ke kanvas. Studio membaca konstruksi 2D yang dikenali, termasuk posisi titik, ruas, sisi poligon, dan lingkaran. Titik dari GeoGebra memakai posisi tersimpan saat impor. Sebagian hubungan konstruksi, seperti lingkaran melalui titik yang dikenali, dapat dibangun kembali. Grafik fungsi, objek 3D, dan perintah GeoGebra lainnya berada di luar cakupan impor.

Periksa pesan impor serta daftar **Objek**. Jika sebuah titik perlu terus mengikuti lingkaran atau garis, kamu dapat membuat titik terikat di Studio melalui alat **Titik**. Simpan hasil yang akan disunting sebagai proyek `.stikz.json`.

## Pintasan dan kendala umum

Klik kanvas sebelum memakai pintasan. Di Mac, gunakan **⌘** untuk kombinasi **Ctrl**.

| Tindakan | Pintasan |
| --- | --- |
| Batalkan konstruksi yang sedang dipilih | **Esc** |
| Urungkan / ulangi perubahan | **Ctrl+Z** / **Ctrl+Shift+Z** |
| Tambah atau keluarkan objek dari pilihan | **Ctrl+klik** dalam **Pilih / geser** |
| Pilih semua / hapus pilihan | **Ctrl+A** / **Delete**. Menghapus objek acuan juga menghapus konstruksi yang bergantung padanya. |
| Geser tampilan / perbesar di sekitar kursor | Seret area kosong dengan **Pilih / geser**, atau gulir / **Ctrl+gulir** |
| Tampilkan seluruh diagram | **Home** atau **Pas ke gambar** |

- **Titik lepas saat lingkaran digeser.** Pilih titiknya dan periksa keterangan ikatan di bawah kanvas. Gunakan **Titik pada objek** dan klik keliling untuk membuat titik yang dapat meluncur di sana.
- **Perpotongan berada pada perpanjangan ruas.** Alat **Titik potong** memperpanjang ruas menjadi garis penuh. Untuk mengambil perpotongan pada bagian ruas yang terlihat, gunakan **Titik** dan klik tanda silang di kanvas.
- **Gambar tampak hilang.** Coba **Pas ke gambar** dan periksa **Lihat objek tersembunyi**. Sebagian konstruksi juga bisa hilang sementara, misalnya lingkaran melalui tiga titik yang menjadi segaris. Geser salah satu titik agar lingkarannya muncul kembali.
- **Browser membatasi penyalinan.** Setelah menekan **Salin TikZ**, gunakan **Ctrl+C** atau **⌘C** jika editor membuka kotak kode yang sudah terseleksi.
