---
layout: single
title: "Panduan Studio TikZ"
permalink: /tools/studio-tikz/panduan.html
comments: false
---

{% include studio-tikz-language.html language="id" id="/tools/studio-tikz/panduan.html" en="/tools/studio-tikz/en/guide.html" %}

Studio TikZ membantu kamu menggambar konstruksi geometri dan menyalinnya ke modul LaTeX. Kamu bisa mengambil gambar lengkap atau memakai koordinatnya saja jika sudah punya gaya TikZ sendiri. [Buka editor](./index.html) · [Pilih animasi dari katalog](#katalog-animasi).

Di sebelah **Lembar**, pilih **Tata letak → Berdampingan** untuk melihat kanvas di kiri dan kode di kanan, atau **Bertumpuk** untuk menempatkan kode di bawah kanvas. **Otomatis** mengikuti lebar layar. Pilihan tersimpan di browser dan berlaku saat kamu membuka gambar lain.

Untuk menyembunyikan titik-titik latar, hilangkan centang **Tampilkan kisi** di bawah kanvas, di sebelah **Latar**. Browser mengingat pilihan ini. **Lekat ke kisi 0,5** mengatur pelekatan titik secara terpisah.

Pilihan **Indonesia / English** berlaku juga untuk panduan alat. Untuk memperbesar kanvas, fokuskan gambar, lalu tekan **+** atau **−**. Pilih persentase pembesaran untuk kembali ke tampilan tertentu. **Skala TikZ** di panel kode mengatur ukuran saat dicetak.

## Gambar pertama dalam lima langkah

Kita akan menggambar segitiga $ABC$ dan titik $D$ pada $AB$ sehingga $AD=2\cdot DB$, lalu menghubungkan $C$ ke $D$.

1. Pilih **Lembar → Kanvas baru**, lalu **Segitiga**. Klik tiga tempat yang tidak segaris, urut $A$ di kiri bawah, $B$ di kanan bawah, dan $C$ di atas.
2. Pilih **Titik dan garis → Titik dari rumus vektor**, ketik `D = (A + 2B)/3`, lalu klik **Buat titik**. $D$ muncul dua pertiga perjalanan dari $A$ ke $B$.
3. Klik **Ruas**, lalu klik $C$ dan $D$. Pada **Pola garis**, pilih **Putus-putus** agar $CD$ mudah dibedakan dari sisi segitiga.
4. Pilih **Sudut dan label → Busur sudut**. Klik $A$, $C$, lalu $B$ untuk menandai $\angle ACB$. Pada **Label sudut**, pilih **Besar sudut otomatis (°)**.
5. Aktifkan **Pilih / geser** dan pindahkan bulatan $B$. $D$ tetap membagi $AB$ dengan perbandingan $2:1$, sedangkan besar $\angle ACB$ berubah. Untuk merapikan posisi huruf $B$, seret hurufnya.

Seret $A$, $B$, atau $C$ pada [diagram pembagian ruas interaktif](./contoh-vektor.html). Untuk menyunting konstruksinya di Studio, unduh proyek contoh, lalu pilih **Buka file**. <a href="./contoh-segitiga.stikz.json" download="contoh-segitiga.stikz.json">Contoh segitiga dengan $AD:DB=2:1$</a>.

Untuk mengikuti satu soal dari awal sampai menjadi diagram modul, buka [tiga contoh penggunaan dari Wildan](./contoh-penggunaan.html). Setiap contoh dapat dibuka di Studio dan memiliki berkas TikZ yang bisa disalin.

## Membuat konstruksi yang mengikuti gambar

| Yang ingin digambar | Urutan tindakan |
| --- | --- |
| Titik $P$ yang mengikuti lingkaran | Pilih **Titik** lalu klik keliling. Gunakan **Pilih / geser** untuk menggeser $P$ sepanjang lingkaran. Klik ruang kosong dengan alat Titik untuk membuat titik bebas. |
| Garis sumbu ruas $AB$ | Pilih **Titik dan garis → Garis sumbu**. Klik ruasnya, atau pilih $A$ lalu $B$. Geser $A$ untuk memeriksa bahwa garis tetap tegak lurus dan melalui titik tengah. |
| Garis antiparalel | Dalam segitiga $ABC$, pilih **Titik dan garis → Garis antiparalel**, klik $BC$, lalu klik sebuah titik $D$ pada $AB$. Perpotongan garis baru dengan $AC$ adalah $E$. Jika titiknya berbeda, $B$, $C$, $E$, dan $D$ terletak pada satu lingkaran. |
| Lingkaran lewat tiga titik | Pilih **Lingkaran → Lingkaran lewat 3 titik**, klik $A$ dan $B$, lalu gerakkan kursor. Pratinjau muncul selama posisi kursor dan kedua titik tidak segaris. Klik titik $C$ atau tempat kosong untuk menetapkan titik ketiga. |
| Lingkaran dengan radius dari ruas | Buat ruas yang diperlukan. Pilih **Lingkaran → Lingkaran dengan rumus jari-jari**. Pilih **Jari-jari r**, masukkan misalnya `(AB + CD)/2`, lalu klik pusatnya. **Sisipkan panjang ruas** membantu memilih nama ruas yang benar. |
| Inversi titik $P$ dengan kuasa $OA\cdot OB$ | Buat ruas $OA$ dan $OB$. Pilih **Transformasi → Inversi**, gunakan **Jari-jari atau kuasa**, pilih kuasa $k=r^2$, lalu isi `OA * OB`. Klik $P$, kemudian pusat $O$. Bayangan $P'$ memenuhi $OP\cdot OP'=OA\cdot OB$. |

### Memilih bangun untuk transformasi

Pilih alatnya, lalu klik objek asal. Klik bagian dalam poligon atau juring untuk memilih seluruh bangun. Klik satu sisi poligon untuk memilih ruas itu saja. Pada gambar yang padat, pilih benda yang dimaksud dari daftar **Objek asal**. Di [**Lembar → Contoh transformasi bangun**](index.html#contoh/transformasi-bangun), geser salah satu titik sudut segi lima dan amati kedua bayangannya.

| Alat | Setelah memilih objek asal |
| --- | --- |
| Translasi | Klik pangkal vektor, lalu ujungnya. |
| Rotasi | Masukkan sudut putaran, lalu pilih pusatnya. |
| Refleksi | Klik titik untuk pusat pencerminan atau garis untuk sumbu. Jika cerminnya ruas, Studio memakai garis yang memuat ruas itu. |
| Dilatasi | Masukkan faktor skala, lalu pilih pusatnya. |
| Inversi | Klik keliling lingkaran acuan. Dengan opsi **Jari-jari atau kuasa**, isi nilai atau rumus lalu klik pusatnya. |

Untuk menyusun dua transformasi, pilih bayangan pertama sebagai objek asal berikutnya. Misalnya, refleksikan segi lima terhadap sebuah garis, lalu inversikan hasil refleksinya. Menggeser titik awal memperbarui kedua bayangan. Tekan **Esc** untuk kembali ke **Pilih / geser**.

### Menginversi sisi, bangun, dan anotasi

Pada [contoh inversi segitiga](./index.html#panduan/invert), $A$ dan $B$ berada pada lingkaran acuan dan $M$ adalah titik tengah $AB$. Tekan **Putar animasi** untuk mengikuti urutan kliknya. Buka **Utak-atik contoh**, lalu geser $C$ atau $O$. Amati busur yang melalui $A'$, $M'$, dan $B'$.

| Objek asal | Bayangannya terhadap lingkaran berpusat $O$ |
| --- | --- |
| Titik $P$ | Bayangan $P'$ berada pada sinar $OP$ dengan $OP\cdot OP'=r^2$. Titik $O$ sendiri tidak memiliki bayangan hingga. |
| Ruas $AB$ pada garis yang menghindari $O$ | Busur dari $A'$ ke $B'$ yang menghindari $O$. Untuk menginversi seluruh garisnya, buat **Garis melalui dua titik**. |
| Ruas pada garis melalui $O$ | Jika $O$ di luar ruas, hasilnya ruas. Jika $O$ di salah satu ujungnya, bagian sisanya menjadi sinar. Jika $O$ di antara kedua ujung, hasilnya dua sinar. |
| Sinar, busur, atau juring | Bagian kurva yang dipilih menentukan bayangannya. Pada juring, kedua jari-jari dan busurnya ikut menentukan batas. |
| Poligon | Setiap sisi mendapat bayangannya sendiri. Umumnya, segitiga menghasilkan tiga busur dan segi lima menghasilkan lima busur. Pindahkan pusat ke dalam bangun untuk melihat isiannya meluas ke luar batas lengkung. Jika pusat berada pada sisi, bagian yang tak terbatas terlihat sampai tepi gambar. |
| Label bebas atau penanda sudut | Titik letak label berpeta dan tulisannya tetap tegak. Penanda sudut mengikuti arah singgung di bayangan titik sudut dan mempertahankan besar sudutnya. Titik letak atau titik sudut yang berimpit dengan $O$ tidak memiliki bayangan hingga. |

Proyek lama tetap memakai konstruksi yang tersimpan. Pada proyek yang dahulu menginversi **garis pendukung** dari sebuah ruas, buat inversi baru jika ingin memperoleh bayangan ruasnya saja.

Pada [diagram antiparalel interaktif](./latihan-antiparalel.html), geser $A$, $B$, atau $C$ untuk mengubah bentuk segitiga. Kamu juga bisa menggeser $D$ sepanjang $AB$ atau menyeret ruas $DE$. Saat segitiga berubah, $E$ mengikuti perpotongan garis antiparalel dengan $AC$. Perhatikan keempat titik $B$, $C$, $D$, dan $E$ pada satu lingkaran.

### Pusat dan lingkaran segitiga

Buka menu **Segitiga**, pilih alat yang diinginkan, lalu klik bagian dalam segitiga yang telah dibuat dengan alat **Segitiga**. Jika gambarmu hanya berisi titik dan ruas, pilih ketiga titik sudut satu per satu. Titik pusat dan lingkarannya mengikuti perubahan saat kamu menggeser salah satu titik sudut.

| Alat | Hasil pada segitiga $ABC$ |
| --- | --- |
| **Pusat lingkaran luar** | $O$, perpotongan garis sumbu sisi. Jarak $OA$, $OB$, dan $OC$ sama. |
| **Titik tinggi** | $H$, perpotongan ketiga garis tinggi. Pada segitiga tumpul, $H$ berada di luar segitiga. |
| **Pusat lingkaran dalam** atau **Lingkaran dalam** | $I$, perpotongan garis bagi sudut dalam. Alat lingkaran juga menggambar lingkaran yang menyinggung ketiga sisi. |
| **Pusat lingkaran singgung luar** atau **Lingkaran singgung luar** | Setelah mengeklik segitiga, klik $A$, $B$, atau $C$ untuk memilih pusat $I_A$, $I_B$, atau $I_C$. Dengan cara tiga titik, klik titik sudut yang dihadapi lingkaran terlebih dahulu. Misalnya, urutan $B,C,A$ menghasilkan $I_B$. |

Lingkaran singgung luar di hadapan $A$ menyinggung ruas $BC$ serta perpanjangan $AB$ dan $AC$. Jika $I_A$ sudah dibuat, alat **Lingkaran singgung luar** memakai pusat itu kembali. Jika nama khusus sudah dipakai titik lain, Studio menambahkan tanda prima pada nama pusat yang baru, misalnya $O'$.

Untuk membagi $\angle BAC$, pilih **Garis bagi sudut dalam** atau **Garis bagi sudut luar**, lalu klik $B$, $A$, dan $C$. Titik kedua, $A$, adalah puncak sudut. Jika sudah ada penanda sudut di sana, cukup klik penandanya. Coba buat kedua garis lalu geser $C$. Kedua garis tetap tegak lurus satu sama lain.

### Mengikuti animasi sambil mencoba alat

Buka **Panduan alat** di atas kanvas, lalu cari istilah seperti *singgung* atau *inversi*. Jika alatnya sudah dipilih, klik **?** di sebelah namanya. Tekan **Putar animasi** untuk melihat urutan pemilihan objek. Tekan **Jeda** untuk berhenti, gunakan tombol langkah sebelumnya atau berikutnya untuk mengikuti satu langkah, atau **Ulangi** untuk kembali ke awal. Setelah animasi alat gambar, pilih **Utak-atik contoh**. Seret titik acuan untuk melihat perubahan pada konstruksi. Contoh memakai kanvas tersendiri sehingga kamu bisa kembali ke gambar yang sedang dikerjakan.

Misalnya, lihat [sisi acuan untuk antiparalel](./index.html#panduan/antiTriangle) atau [pemilihan objek untuk lingkaran dari tiga syarat](./index.html#panduan/circleConstraints). Animasi alat konstruksi dan topik editor tersimpan dalam HTML. Versi luring dapat memutarnya tanpa koneksi internet.

## Menempelkan hasil ke LaTeX

Pada panel **Kode TikZ**, pilih mode ekspor, lalu klik **Salin preamble** di bagian **Paket LaTeX**. Tempel paket dan pustakanya satu kali sebelum `\begin{document}`. Untuk dokumen baru, mulailah dengan kerangka berikut.

```latex
\documentclass{article}
\usepackage[dvipsnames]{xcolor}
\usepackage{tikz}

\begin{document}
% Tempel hasil Gambar lengkap di sini.
\end{document}
```

**Warna.** Opsi `dvipsnames` membuat nama seperti `ForestGreen` dan `BurntOrange` tersedia di seluruh dokumen. Muat `xcolor` sebelum TikZ. Jika kelas atau templat lebih dahulu memuat `xcolor`, letakkan `\PassOptionsToPackage{dvipsnames}{xcolor}` sebelum `\documentclass`. Studio menulis nama warna langsung di perintah gambar, misalnya `\draw[PineGreen] (A)--(B);`. Aktifkan `dvipsnames` saat memakai nama dari palet tersebut.

| Mode | Tempat menempelkan hasil |
| --- | --- |
| **Gambar lengkap → Salin TikZ** | Tempel blok di badan dokumen, misalnya setelah teks soal. Studio menyertakan lingkungan `center` dan `tikzpicture`. |
| **Koordinat saja → Salin koordinat** | Tempel di dalam `tikzpicture` milikmu. Koordinat berupa angka, misalnya `\coordinate[label=below:$A$] (A) at (0,0);`. Tambahkan perintah gambarmu di bawahnya, misalnya `\draw (A)--(B)--(C)--cycle;`. |

| Jika kode gambar memakai… | Baris yang diperlukan |
| --- | --- |
| Busur sudut dengan `\pic` | `\usetikzlibrary{angles}` |
| Koordinat vektor dengan hitungan TikZ, misalnya `($(A)!0.5!(B)$)` | `\usetikzlibrary{calc}` |
| Tepi putih pada huruf dengan `\contour{white}{...}` yang ditambahkan sendiri | `\usepackage{contour}` |

Studio menampilkan pustaka TikZ yang dipakai konstruksi pada **Paket LaTeX** dan menyertakannya dalam salinan **Gambar lengkap**. Untuk makro buatan sendiri, sertakan definisi makro atau paket asalnya di preamble modul.

**Skala TikZ** mengatur ukuran gambar saat dicetak. Pada skala $2$, panjang ruas tercetak dua kali lebih besar. Kode menyesuaikan radius bulatan titik agar radius cetaknya tetap $1{,}5\,\mathrm{pt}$. Tombol **+** dan **−** di kanvas mengatur pembesaran tampilan kerja.

### Gaya beberapa objek dan label yang bertumpuk

Dalam **Pilih / geser**, tahan **Ctrl** atau **⌘** sambil mengeklik beberapa objek. Ubah warna atau opasitas pilihan di panel **Objek**, atau klik **Sembunyikan**. Beri **Nama grup**, lalu klik **Simpan grup**. Kamu bisa memilih grup itu lagi dari **Kelompok tersimpan**, termasuk setelah membuka kembali file proyek. Untuk menampilkan kembali, aktifkan **Lihat objek tersembunyi**, pilih objeknya, lalu klik **Tampilkan**. Palet **Warna isian** untuk bangun menawarkan warna yang sama seperti palet garis. **Opasitas isian** mengatur seberapa jelas objek di balik bangun terlihat.

Saat memilih segitiga di dalam lingkaran, klik ruang di tengah segitiga. Untuk memilih lingkaran, klik kelilingnya. Daftar **Objek** juga dapat dipakai untuk memilih bangun secara langsung. Poligon beraturan ditampilkan dengan jenis bangun dan nama titik sudutnya.

Kalau ada banyak garis di dekat $I_A$, geser hurufnya atau pilih titiknya dan aktifkan **Latar label transparan**. Atur opasitas latar sambil melihat garis di bawah teks. Pengaturan ini juga berlaku untuk label bebas dan label sudut dan ikut dibawa ke TikZ. Untuk penanda siku-siku, klik tandanya kemudian atur **Ukuran siku-siku** agar muat di antara kedua kaki sudut. Ukuran tanda tidak mengubah sudut geometrinya.

## Menyimpan beberapa diagram dan memakai Studio secara luring

Klik **Simpan proyek** untuk mengunduh konstruksi beserta rumus dan gayanya. Beri setiap diagram nama berkas yang mudah dicari, misalnya `01-garis-berat.stikz.json` dan `02-lingkaran-luar.stikz.json`. Pertahankan akhiran `.stikz.json`. Untuk melanjutkan diagram tertentu, klik **Buka file** dan pilih salinannya.

Studio mencoba menyimpan **satu lembar terakhir** di browser. Membuka contoh, membuat lembar baru, atau membuka proyek lain mengganti lembar yang diingat. Simpan proyek sebelum berpindah. Berkas proyek juga bisa dibuka pada komputer lain atau dipakai untuk kembali ke versi gambar sebelumnya.

Untuk bekerja tanpa internet, <a href="./index.html" download="Studio-TikZ.html">unduh Studio-TikZ.html</a> dan buka melalui browser. Jika sedang membaca panduan di GitHub, buka berkas editor lalu gunakan **Download raw file**. Untuk memperbarui salinan luring, unduh HTML terbaru dan buka kembali proyek `.stikz.json`. Pada versi daring, muat ulang halaman setelah pembaruan diterbitkan. [Berkas editor](./index.html).

## Mengimpor gambar GeoGebra

Klik **Buka file** atau seret satu berkas `.ggb` ke kanvas. Studio membaca konstruksi 2D yang dikenali, termasuk posisi titik, ruas, sisi poligon, dan lingkaran. Titik dari GeoGebra memakai posisi tersimpan saat impor. Sebagian hubungan konstruksi, seperti lingkaran melalui titik yang dikenali, dapat dibangun kembali. Grafik fungsi, objek 3D, dan perintah GeoGebra lainnya berada di luar cakupan impor.

Periksa pesan impor serta daftar **Objek**. Jika sebuah titik perlu terus mengikuti lingkaran atau garis, kamu dapat membuat titik terikat di Studio melalui alat **Titik**. Simpan hasil yang akan disunting sebagai proyek `.stikz.json`.

## Menyalin diagram Asymptote dari AoPS

1. [Buka konverter Asymptote](./index.html#asymptote) atau klik **Tempel Asymptote** di bilah atas editor. Tempel satu diagram, termasuk tag `[asy]` dan `[/asy]` jika ada, ke kolom **Kode Asymptote**. Kamu juga bisa memilih salah satu dari empat **Contoh AoPS**.
2. Klik **Konversi ke TikZ**, lalu periksa **Pratinjau**. Untuk menggeser titik pada gambar hasil konversi, ubah koordinatnya di sumber lalu konversi lagi. Alur ini menghasilkan potongan TikZ tersendiri. Konstruksi yang bisa diseret di kanvas dibuat dengan alat gambar Studio.
3. Di bagian **Paket LaTeX**, pilih **Salin preamble** dan tempel paket yang diperlukan sebelum `\begin{document}`. Klik **Salin TikZ**, lalu tempel gambarnya di badan dokumen, misalnya setelah teks soal.

| Contoh AoPS | Yang bisa dicoba |
| --- | --- |
| Setengah lingkaran dan tali busur | Ganti `palered` dengan `white` pada isian pertama. Perhatikan bagian yang berubah dan posisi label $16$ di atas tali busur. |
| Persegi bersarang | Ganti `n = 25` menjadi `n = 5`. Perulangan menggambar dan mewarnai lima persegi bergantian. Perintah terakhir menambahkan satu persegi kecil lagi sebagai garis tepi. |
| Empat lingkaran | Baris `draw(circle(O, 6/23));` menggambar lingkaran keempat. Ganti jari-jarinya menjadi `1` untuk membandingkannya dengan lingkaran berpusat di $A$. |
| Proyeksi dan pencerminan | Ubah titik asal, lalu amati kaki proyeksi dan bayangannya terhadap garis yang sama. |

Konverter menangani bentuk 2D seperti ruas, busur, lingkaran dan persegi panjang, beserta isian, titik, label, serta perhitungan pada contoh di atas. Variabel, perulangan `for` terbatas dan percabangan `if/else` bisa digunakan seperti pada contoh persegi. Jika kode memakai perintah di luar cakupan, misalnya `import three;` untuk gambar 3D, Studio menunjukkan baris dan kolomnya. Perbaiki bagian itu, lalu jalankan konversi lagi untuk mendapatkan gambar lengkap.

Konverter juga membaca array titik dan indeks, notasi seperti `2x` dan `dir(60)`, lintasan terpisah dengan `^^`, proyeksi `foot`, perpotongan antara ruas atau lingkaran, serta transformasi seperti `reflect` dan `rotate`. Dari 78 potongan Asymptote berbeda pada arsip soal dan pembahasan AMC/AIME tahun 1983–2024 yang diuji, 65 menghasilkan TikZ yang berhasil dikompilasi dengan pdfLaTeX. Tiga belas sisanya memakai fitur di luar cakupan, antara lain gambar 3D, spline, fungsi buatan pengguna, atau pemotongan dan gradasi daerah. [Arsip AIME](https://huggingface.co/datasets/gneubig/aime-1983-2024/blob/8d5c803ed4bc31a551565a90d235d7e214bae43e/AIME_Dataset_with_images.csv) · [Arsip contoh AMC](https://amcclub.org.cn/news/1830/)

### Membawa TikZ ke AoPS

Klik **Format AoPS** pada panel kode. Pilih **Ambil dari kanvas** atau tempel `tikzpicture` milikmu. Klik **Salin [asy]** untuk membungkus gambar sebagai blok `[asy]`. Di dalam blok itu, `usepackage("tikz")` memuat TikZ dan `label(...)` menempatkan lingkungan `tikzpicture`. Gunakan hasil salinan lengkap saat menempelkan gambar ke forum. Jika label memakai makro modulmu, tambahkan definisi atau paket yang diperlukan di **Preamble tambahan** dan periksa bahwa lingkungan LaTeX AoPS mendukungnya.

## Pintasan dan kendala umum

Klik kanvas sebelum memakai pintasan. Di Mac, gunakan **⌘** untuk kombinasi **Ctrl**.

| Tindakan | Pintasan |
| --- | --- |
| Batalkan konstruksi yang sedang dipilih | **Esc** |
| Urungkan / ulangi perubahan | **Ctrl+Z** / **Ctrl+Shift+Z** |
| Tambah atau keluarkan objek dari pilihan | **Ctrl+klik** dalam **Pilih / geser** |
| Pilih semua / hapus pilihan | **Ctrl+A** / **Delete**. Menghapus objek acuan juga menghapus konstruksi yang bergantung padanya. |
| Geser tampilan / perbesar di sekitar kursor | Seret area kosong dengan **Pilih / geser**, atau gulir / **Ctrl+gulir** |
| Perbesar atau perkecil kanvas | **+** / **−** saat fokus berada di kanvas. |
| Tampilkan seluruh diagram | **Home** atau **Pas ke gambar** |

- **Titik lepas saat lingkaran digeser.** Pilih titiknya dan periksa keterangan ikatan di bawah kanvas. Gunakan **Titik pada objek** dan klik keliling untuk membuat titik yang dapat meluncur di sana.
- **Perpotongan berada pada perpanjangan ruas.** Alat **Titik potong** memperpanjang ruas menjadi garis penuh. Untuk mengambil perpotongan pada bagian ruas yang terlihat, gunakan **Titik** dan klik tanda silang di kanvas.
- **Gambar tampak hilang.** Coba **Pas ke gambar** dan periksa **Lihat objek tersembunyi**. Sebagian konstruksi juga bisa hilang sementara, misalnya lingkaran melalui tiga titik yang menjadi segaris. Geser salah satu titik agar lingkarannya muncul kembali.
- **Browser membatasi penyalinan.** Setelah menekan **Salin TikZ**, gunakan **Ctrl+C** atau **⌘C** jika editor membuka kotak kode yang sudah terseleksi.

## Katalog animasi

Klik nama alat untuk membuka panduannya langsung di Studio. Saat memakai HTML luring, pilih alat di kanvas, klik **?** di sebelah namanya, atau cari judul yang sama melalui **Panduan alat**.

### Titik dan garis

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Titik](./index.html#panduan/point) | Membuat titik bebas atau mengikatnya pada garis, keliling, dan perpotongan. |
| [Titik dari rumus vektor](./index.html#panduan/pointFormula) | Menempatkan $D$ dari koordinat titik lain, misalnya $D=\frac{A+2B}{3}$. |
| [Titik pada objek](./index.html#panduan/on) | Menempatkan titik agar bisa digeser sepanjang satu objek. |
| [Titik tengah](./index.html#panduan/mid) | Menentukan titik tengah dari dua titik ujung. |
| [Titik potong](./index.html#panduan/cut) | Menandai perpotongan dua objek, termasuk kedua perpotongan dua lingkaran. |
| [Kaki tegak lurus](./index.html#panduan/foot) | Memproyeksikan titik ke garis dan menggambar ruas tegak lurusnya. |
| [Ruas](./index.html#panduan/segment) | Menghubungkan dua titik dengan ruas. |
| [Garis melalui dua titik](./index.html#panduan/line) | Memperpanjang garis melalui dua titik ke kedua arah. |
| [Sinar](./index.html#panduan/ray) | Membuat sinar dari pangkal melalui titik penentu arah. |
| [Garis sejajar](./index.html#panduan/parallel) | Menggeser pratinjau garis sejajar hingga melalui titik pilihan. |
| [Garis tegak lurus](./index.html#panduan/normal) | Menarik garis tegak lurus acuan melalui titik pilihan. |
| [Garis sumbu](./index.html#panduan/perpendicularBisector) | Membagi ruas menjadi dua bagian sama panjang dan tegak lurus. |
| [Garis antiparalel](./index.html#panduan/antiTriangle) | Membuat $DE$ antiparalel terhadap $BC$ dalam $\angle BAC$. |

### Lingkaran

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Lingkaran](./index.html#panduan/circle2) | Menggambar lingkaran dari pusat dan satu titik pada keliling. |
| [Lingkaran lewat 3 titik](./index.html#panduan/circle3) | Melihat pratinjau melalui dua titik dan kursor, lalu menetapkan titik ketiga. |
| [Lingkaran dengan jari-jari](./index.html#panduan/circleRadius) | Menetapkan panjang jari-jari, lalu memilih pusat. |
| [Lingkaran dengan rumus jari-jari](./index.html#panduan/circleFormula) | Menentukan jari-jari dari panjang ruas, operasi hitung, atau kuasa. |
| [Lingkaran berdiameter](./index.html#panduan/diameter) | Menggambar lingkaran dari kedua ujung diameter. |
| [Pusat lingkaran](./index.html#panduan/center) | Membuat titik yang mengikuti pusat lingkaran atau busur. |
| [Setengah lingkaran](./index.html#panduan/semicircle) | Menggambar busur $180^\circ$ dari kedua ujung diameter. |
| [Busur dengan sudut](./index.html#panduan/circleArc) | Menggambar busur dengan sudut pusat dan arah yang dipilih. |
| [Juring lingkaran](./index.html#panduan/sector) | Membatasi juring dengan dua jari-jari dan sebuah busur. |
| [Garis singgung pada keliling](./index.html#panduan/tangentAt) | Menggambar garis singgung di titik pilihan pada keliling. |
| [Garis singgung dari titik](./index.html#panduan/tangent) | Menarik garis singgung ke lingkaran dari sebuah titik. |
| [Garis singgung persekutuan](./index.html#panduan/commonTangent) | Menemukan garis yang menyinggung dua lingkaran. |
| [Lingkaran dari 3 syarat](./index.html#panduan/circleConstraints) | Memadukan tiga syarat melalui titik atau menyinggung garis dan lingkaran. |
| [Lingkaran singgung berjari-jari tetap](./index.html#panduan/circleFixedTangency) | Membuat lingkaran berjari-jari tertentu yang menyinggung dua lingkaran. |
| [Titik kutub dari garis](./index.html#panduan/pole) | Menentukan kutub suatu garis terhadap lingkaran. |
| [Garis polar dari titik](./index.html#panduan/polar) | Menggambar garis polar suatu titik terhadap lingkaran. |

### Segitiga

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Pusat lingkaran luar](./index.html#panduan/circumcenter) | Menandai $O$ yang berjarak sama dari ketiga titik sudut. |
| [Titik tinggi](./index.html#panduan/orthocenter) | Menemukan titik potong garis tinggi $H$. |
| [Pusat lingkaran dalam](./index.html#panduan/incenter) | Menandai $I$ yang berjarak sama dari ketiga sisi. |
| [Lingkaran dalam](./index.html#panduan/incircle) | Menggambar lingkaran berpusat di $I$ yang menyinggung ketiga sisi. |
| [Pusat lingkaran singgung luar](./index.html#panduan/excenter) | Memilih titik sudut untuk menentukan $I_A$, $I_B$, atau $I_C$. |
| [Lingkaran singgung luar](./index.html#panduan/excircle) | Membuat lingkaran yang menyinggung satu sisi dan perpanjangan dua sisi lainnya. |
| [Garis bagi sudut dalam](./index.html#panduan/bisectInternal) | Membagi sudut dalam menjadi dua sudut yang sama besar. |
| [Garis bagi sudut luar](./index.html#panduan/bisectExternal) | Membagi sudut antara satu sisi dan perpanjangan sisi lainnya. |

### Bidang

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Segitiga](./index.html#panduan/triangle) | Membuat segitiga yang daerah dan sisinya bisa dipilih. |
| [Poligon beraturan](./index.html#panduan/regularPolygon) | Melengkapi poligon beraturan dari satu sisi dan jumlah sudut. |
| [Poligon dari titik](./index.html#panduan/polygon) | Menutup daerah dengan mengeklik titik di sekeliling batasnya. |

### Sudut dan label

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Busur sudut](./index.html#panduan/angle) | Menandai sudut dari tiga titik dan menampilkan besar sudut atau label. |
| [Tanda siku-siku](./index.html#panduan/right) | Menempatkan tanda siku-siku di antara dua kaki yang tegak lurus. |
| [Label](./index.html#panduan/label) | Meletakkan teks atau rumus LaTeX di posisi pilihan. |

### Transformasi

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Translasi](./index.html#panduan/translate) | Menggeser objek mengikuti vektor dari satu titik ke titik lain. |
| [Rotasi](./index.html#panduan/rotate) | Memutar objek terhadap pusat dengan sudut tertentu. |
| [Refleksi](./index.html#panduan/reflect) | Klik objek asal lalu klik titik atau garis cermin. |
| [Refleksi terhadap garis](./index.html#panduan/reflectLine) | Mencerminkan objek terhadap sebuah garis. |
| [Refleksi terhadap titik](./index.html#panduan/reflectPoint) | Mencerminkan objek terhadap sebuah titik pusat. |
| [Dilatasi](./index.html#panduan/dilate) | Menskalakan objek terhadap titik pusat dengan faktor tertentu. |
| [Inversi dengan jari-jari atau kuasa](./index.html#panduan/invertFormula) | Menginversi dengan pusat dan nilai jari-jari atau kuasa pilihan. |
| [Inversi dengan lingkaran acuan](./index.html#panduan/invert) | Menginversi segitiga utuh dan melacak bayangan titik tengah salah satu sisinya. |
| [Inversi garis](./index.html#panduan/invertLine) | Menemukan bayangan garis terhadap lingkaran inversi. |
| [Inversi lingkaran](./index.html#panduan/invertCircle) | Menemukan bayangan lingkaran terhadap lingkaran inversi. |

### Alat pemilihan di bilah utama

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Pilih / geser](./index.html#panduan/move) | Memilih objek, menyeret titik, atau merapikan letak label. |

### 19 animasi editor dan ekspor

Gunakan bagian ini jika konstruksinya sudah jadi dan kamu ingin mengubah tampilan, menyimpan lembar, atau menyiapkan gambar untuk dicetak.

| Kebutuhan | Pilih animasi |
| --- | --- |
| Memilih dan menjelajah | [Pilih beberapa objek dan hapus bersama](./index.html#panduan/editor-selection) · [Batalkan, hapus, dan urungkan](./index.html#panduan/editor-undo) · [Gulir dan geser tampilan kanvas](./index.html#panduan/editor-pan) · [Perbesar tampilan dan lekatkan titik ke kisi](./index.html#panduan/editor-view) · [Tema dan latar kanvas](./index.html#panduan/editor-theme) |
| Merapikan warna dan garis | [Sembunyikan dan tampilkan objek](./index.html#panduan/editor-visibility) · [Warna dan opasitas objek](./index.html#panduan/editor-color) · [Ketebalan, pola garis, dan tanda ruas](./index.html#panduan/editor-stroke) · [Warnai bagian dalam bangun](./index.html#panduan/editor-fill) |
| Menyunting label dan konstruksi | [Nama, koordinat, dan posisi label titik](./index.html#panduan/editor-point-label) · [Sunting atau pindahkan label bebas](./index.html#panduan/editor-annotation) · [Tanda dan label besar sudut](./index.html#panduan/editor-angle-style) · [Ubah lingkaran menjadi busur](./index.html#panduan/editor-arc) · [Sunting rumus titik atau jari-jari](./index.html#panduan/editor-formulas) |
| Mengelola lembar dan proyek | [Mulai lembar baru atau coba contoh](./index.html#panduan/editor-sheets) · [Simpan dan buka kembali proyek](./index.html#panduan/editor-project) · [Buka gambar GeoGebra](./index.html#panduan/editor-import) |
| Membawa gambar ke modul | [Salin gambar TikZ atau koordinat](./index.html#panduan/editor-export) · [Skala cetak gambar TikZ](./index.html#panduan/editor-scale) |
