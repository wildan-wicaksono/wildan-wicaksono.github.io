---
layout: single
title: "Panduan Studio TikZ"
permalink: /tools/studio-tikz/panduan.html
comments: false
---

{% include studio-tikz-language.html language="id" id="/tools/studio-tikz/panduan.html" en="/tools/studio-tikz/en/guide.html" %}

Studio TikZ membantu kamu menggambar konstruksi geometri dan menyalinnya ke modul LaTeX. Kamu bisa mengambil gambar lengkap atau memakai koordinatnya saja jika sudah punya gaya TikZ sendiri. [Buka editor](./index.html) · [Pilih animasi dari katalog](#katalog-animasi).

Di atas kanvas, klik **+ Tambah lembar** untuk membuka tab kosong. Studio memakai nomor terkecil yang tersedia. Misalnya, jika **Lembar 1** dan **Lembar 3** masih terbuka, tab berikutnya bernama **Lembar 2**. Setiap gambar memiliki tab sendiri. Klik tab untuk berpindah gambar. **Ganti nama lembar** memudahkanmu membedakan dua lembar yang terbuka. Di menu **Lembar**, **Contoh Studio** memuat contoh konstruksi dan **Contoh penggunaan Wildan** memuat tiga diagram soal. Dari contoh mana pun, klik tab yang kamu inginkan atau pilih **Lembar saya → Gambar saya** untuk kembali ke lembar pribadi terakhir.

Di sebelah **Lembar**, pilih **Tata letak → Berdampingan** untuk melihat kanvas di kiri dan kode di kanan, atau **Bertumpuk** untuk menempatkan kode di bawah kanvas. **Otomatis** mengikuti lebar layar. Pilihan tersimpan di browser dan berlaku saat kamu membuka gambar lain.

Pilihan **Indonesia / English** berlaku juga untuk panduan alat. Untuk memperbesar kanvas, fokuskan gambar, lalu tekan **+** atau **−**. Pilih persentase pembesaran untuk kembali ke tampilan tertentu. **Skala TikZ** di panel kode mengatur ukuran saat dicetak.

## Kisi dan koordinat

Saat editor pertama kali dibuka, kisi persegi dan pelekatan ke kisi sudah aktif. Mencentang **Tampilkan kisi** juga mengaktifkan **Lekat ke kisi**. Pelekatan hanya bekerja di dekat perpotongan garis kisi. Hilangkan centang **Lekat ke kisi** jika ingin menempatkan titik bebas sangat dekat dengan perpotongan tanpa melekat. Menyembunyikan kisi mempertahankan pilihan pelekatan. Browser mengingat pengaturanmu.

**Jarak kisi** menunjukkan langkah yang dipakai untuk meletakkan atau menggeser titik. Pada pembesaran kanvas 50%, jaraknya 2 satuan. Naikkan pembesaran ke 100% untuk jarak 1 satuan atau ke 200% untuk 0,5 satuan. Perubahan pembesaran yang kecil bisa tetap memakai langkah yang sama. Titik yang sudah digambar tetap di koordinatnya. Kisi persegi tanpa sumbu ini hanya muncul di kanvas.

Untuk mencoba, atur pembesaran ke 100% dan pastikan **Lekat ke kisi** aktif. Pilih **Titik**, arahkan kursor ke ruang kosong, lalu klik saat penanda menunjukkan $(2,0)$. Untuk memindahkan titik itu, pilih **Pilih / geser** dan seret bulatan titiknya. Lepaskan saat penanda menunjukkan koordinat tujuan. Menyeret hurufnya hanya memindahkan label.

Pada setiap langkah yang menerima titik baru, dekatkan kursor ke perpotongan kisi untuk melekat, atau klik di antara perpotongan untuk memakai posisi kursor. Misalnya, pilih **Poligon**, letakkan titik sudut pertama di $(2,0)$, lalu klik di tengah petak untuk membuat titik sudut kedua di luar kisi. Jika alat meminta objek yang sudah ada, misalnya lingkaran acuan untuk inversi, pilih langsung objek itu.

Titik yang terikat pada garis atau lingkaran mengikuti objeknya saat diseret. Titik itu melekat ke perpotongan kisi terdekat jika perpotongan tersebut terletak pada objeknya. Titik potong dua objek tetap ditentukan oleh keduanya. Jika garis melalui dua titik bebas bisa digeser utuh, titik penentu pertama bisa melekat ke perpotongan kisi terdekat dan titik lainnya ikut berpindah sejauh dan searah dengannya. Untuk garis sejajar, tegak lurus, atau antiparalel yang bisa digeser, titik yang dilalui garis menjadi acuannya.

## Gambar pertama dalam lima langkah

Kita akan menggambar segitiga $ABC$ dan titik $D$ pada $AB$ sehingga $AD=2\cdot DB$, lalu menghubungkan $C$ ke $D$.

1. Klik **+ Tambah lembar**, lalu pilih **Poligon** pada bilah alat atau di menu **Bidang**. Klik $A$ di kiri bawah, $B$ di kanan bawah, dan $C$ di atas. Klik kembali $A$ atau tekan **Enter** untuk menutup segitiga.
2. Pilih **Titik → Titik dari rumus vektor**, ketik `D = (A + 2B)/3`, lalu klik **Buat titik**. $D$ muncul dua pertiga perjalanan dari $A$ ke $B$.
3. Klik **Ruas**, lalu klik $C$ dan $D$. Pada **Pola garis**, pilih **Putus-putus** agar $CD$ mudah dibedakan dari sisi segitiga.
4. Klik **Sudut** di samping **Label** pada bilah alat atas. Klik $A$, $C$, lalu $B$ untuk menandai $\angle ACB$. Pada **Label sudut**, pilih **Besar sudut otomatis (°)** untuk menampilkan ukurannya. Kamu juga bisa memasukkan label LaTeX sendiri.
5. Aktifkan **Pilih / geser** dan pindahkan bulatan $B$. $D$ tetap membagi $AB$ dengan perbandingan $2:1$, sedangkan besar $\angle ACB$ berubah. Untuk merapikan posisi huruf $B$, seret hurufnya.

Seret $A$, $B$, atau $C$ pada [diagram pembagian ruas interaktif](./contoh-vektor.html). Untuk menyunting konstruksinya di Studio, unduh proyek contoh, lalu pilih **Buka file**. <a href="./contoh-segitiga.stikz.json" download="contoh-segitiga.stikz.json">Contoh segitiga dengan $AD:DB=2:1$</a>.

Untuk mengikuti satu soal dari awal sampai menjadi diagram modul, buka [tiga contoh penggunaan dari Wildan](./contoh-penggunaan.html). Setiap contoh dapat dibuka di Studio dan memiliki berkas TikZ yang bisa disalin.

## Membuat konstruksi yang mengikuti gambar

| Yang ingin digambar | Urutan tindakan |
| --- | --- |
| Titik bebas | Pilih **Titik**, lalu klik ruang kosong. Kamu juga bisa menempatkan titik bebas di bagian dalam bangun berwarna, jauh dari garis yang digambar. |
| Titik $P$ pada ruas, busur, atau lingkaran | Dengan **Titik**, klik ruas, busur, atau keliling lingkaran. Aktifkan **Pilih / geser** lalu seret $P$ sepanjang objeknya. |
| Titik di perpotongan | Dengan **Titik**, arahkan kursor ke perpotongan dua objek. Klik saat tanda silang muncul. Titik akan mengikuti kedua objek saat gambarnya berubah. |
| Garis sumbu ruas $AB$ | Pilih **Garis → Garis sumbu**. Klik ruasnya, atau pilih $A$ lalu $B$. Geser $A$ untuk memeriksa bahwa garis tetap tegak lurus dan melalui titik tengah. |
| Garis antiparalel | Dalam segitiga $ABC$, pilih **Garis → Garis antiparalel**, klik $BC$, lalu klik sebuah titik $D$ pada $AB$. Perpotongan garis baru dengan $AC$ adalah $E$. Jika titiknya berbeda, $B$, $C$, $E$, dan $D$ terletak pada satu lingkaran. |
| Lingkaran lewat tiga titik | Pilih **Lingkaran → Lingkaran lewat 3 titik**, klik $A$ dan $B$, lalu gerakkan kursor. Pratinjau muncul selama posisi kursor dan kedua titik tidak segaris. Klik titik $C$ atau tempat kosong untuk menetapkan titik ketiga. |
| Lingkaran dengan radius dari ruas | Buat ruas yang diperlukan. Pilih **Lingkaran → Lingkaran dengan rumus jari-jari**. Pilih **Jari-jari r**, masukkan misalnya `(AB + CD)/2`, lalu klik pusatnya. **Sisipkan panjang ruas** membantu memilih nama ruas yang benar. |
| Inversi titik $P$ dengan kuasa $OA\cdot OB$ | Buat ruas $OA$ dan $OB$. Pilih **Transformasi → Inversi**, gunakan **Jari-jari atau kuasa**, pilih kuasa $k=r^2$, lalu isi `OA * OB`. Klik $P$, kemudian pusat $O$. Bayangan $P^{\ast}$ memenuhi $OP\cdot OP^{\ast}=OA\cdot OB$. |

Di perpotongan, tahan **Shift** lalu klik pada garis atau keliling yang ingin diikuti jika titiknya harus bisa digeser sepanjang satu objek. Jika di tempat itu sudah ada bulatan titik, klik biasa memilih titik tersebut.

### Memilih bangun untuk transformasi

Pilih alatnya, lalu klik objek asal. Klik bagian dalam poligon atau juring untuk memilih seluruh bangun. Klik satu sisi poligon untuk memilih ruas itu saja. Pada gambar yang padat, pilih benda yang dimaksud dari daftar **Objek asal**. Di [**Lembar → Contoh Studio → Contoh transformasi bangun**](index.html#contoh/transformasi-bangun), geser titik $A$ pada segi lima hijau. Ikuti $A^{\prime}$ pada hasil refleksi biru dan $A^{\ast}$ pada hasil inversi jingga. Ulangi dengan $E$ untuk melihat $E^{\prime}$ dan $E^{\ast}$ bergerak.

| Alat | Setelah memilih objek asal |
| --- | --- |
| Translasi | Klik pangkal vektor, lalu ujungnya. |
| Rotasi | Masukkan sudut putaran, lalu pilih pusatnya. |
| Refleksi | Klik titik untuk pusat pencerminan atau garis untuk sumbu. Jika cerminnya ruas, Studio memakai garis yang memuat ruas itu. |
| Dilatasi | Masukkan faktor skala, lalu pilih pusatnya. |
| Inversi | Klik keliling lingkaran acuan. Dengan opsi **Jari-jari atau kuasa**, isi nilai atau rumus lalu klik pusatnya. |

Untuk menyusun dua transformasi, pilih bayangan pertama sebagai objek asal berikutnya. Misalnya, refleksikan segi lima terhadap sebuah garis, lalu inversikan hasil refleksinya. Menggeser titik awal memperbarui kedua bayangan. Tekan **Esc** untuk kembali ke **Pilih / geser**.

### Menginversi sisi, bangun, dan anotasi

Di [Panduan alat → Inversi](./index.html#panduan/invert), gunakan **Contoh inversi** untuk memilih **Segitiga**, **Garis**, **Lingkaran**, atau **Jari-jari atau kuasa**.

Pada contoh segitiga, $A$ dan $B$ berada pada lingkaran acuan dan $M$ adalah titik tengah $AB$. Tekan **Putar animasi** untuk mengikuti urutan kliknya. Buka **Utak-atik contoh**, lalu geser $C$ atau $O$. Cari $M^{\ast}$, bayangan $M$, pada busur hasil inversi ruas $AB$. Saat $O$ digeser, perhatikan bahwa $OM\cdot OM^{\ast}=r^2$, dengan $r$ jari-jari lingkaran acuan.

| Objek asal | Bayangannya terhadap lingkaran berpusat $O$ |
| --- | --- |
| Titik $P$ | Bayangan $P^{\ast}$ berada pada sinar $OP$ dengan $OP\cdot OP^{\ast}=r^2$. Titik $O$ sendiri tidak memiliki bayangan hingga. |
| Garis | Garis yang melalui $O$ kembali ke garis yang sama. Garis lain menjadi lingkaran melalui $O$. |
| Lingkaran | Lingkaran yang melalui $O$ menjadi garis. Lingkaran lain tetap berbentuk lingkaran. |
| Ruas $AB$ pada garis yang menghindari $O$ | Busur dari $A^{\ast}$ ke $B^{\ast}$ yang menghindari $O$. Untuk menginversi seluruh garisnya, buat **Garis melalui dua titik**. |
| Ruas pada garis melalui $O$ | Jika $O$ di luar ruas, hasilnya ruas. Jika $O$ di salah satu ujungnya, bagian sisanya menjadi sinar. Jika $O$ di antara kedua ujung, hasilnya dua sinar. |
| Sinar, busur, atau juring | Bagian kurva yang dipilih menentukan bayangannya. Pada juring, kedua jari-jari dan busurnya ikut menentukan batas. |
| Poligon | Setiap sisi mendapat bayangannya sendiri. Umumnya, segitiga menghasilkan tiga busur dan segi lima menghasilkan lima busur. Pindahkan pusat ke dalam bangun untuk melihat isiannya meluas ke luar batas lengkung. Jika pusat berada pada sisi, bagian yang tak terbatas terlihat sampai tepi gambar. |
| Label bebas atau penanda sudut | Titik letak label berpeta dan tulisannya tetap tegak. Penanda sudut mengikuti arah singgung di bayangan titik sudut dan mempertahankan besar sudutnya. Titik letak atau titik sudut yang berimpit dengan $O$ tidak memiliki bayangan hingga. |

Proyek lama tetap memakai konstruksi yang tersimpan. Pada proyek yang dahulu menginversi **garis pendukung** dari sebuah ruas, buat inversi baru jika ingin memperoleh bayangan ruasnya saja.

Pada [diagram antiparalel interaktif](./latihan-antiparalel.html), geser $A$, $B$, atau $C$ untuk mengubah bentuk segitiga. Kamu juga bisa menggeser $D$ sepanjang $AB$ atau menyeret ruas $DE$. Saat segitiga berubah, $E$ mengikuti perpotongan garis antiparalel dengan $AC$. Perhatikan keempat titik $B$, $C$, $D$, dan $E$ pada satu lingkaran.

### Pusat dan lingkaran segitiga

Setelah membuat segitiga dengan **Poligon**, buka menu **Segitiga**, pilih alat yang diinginkan, lalu klik bagian dalam segitiga. Jika gambarmu hanya berisi titik dan ruas, pilih ketiga titik sudut satu per satu. Titik pusat dan lingkarannya mengikuti perubahan saat kamu menggeser salah satu titik sudut.

| Alat | Hasil pada segitiga $ABC$ |
| --- | --- |
| **Pusat lingkaran luar** | $O$, perpotongan garis sumbu sisi. Jarak $OA$, $OB$, dan $OC$ sama. |
| **Titik tinggi** | $H$, perpotongan ketiga garis tinggi. Pada segitiga tumpul, $H$ berada di luar segitiga. |
| **Pusat lingkaran dalam** atau **Lingkaran dalam** | $I$, perpotongan garis bagi sudut dalam. Alat lingkaran juga menggambar lingkaran yang menyinggung ketiga sisi. |
| **Pusat lingkaran singgung luar** atau **Lingkaran singgung luar** | Setelah mengeklik segitiga, klik $A$, $B$, atau $C$ untuk memilih pusat $I_A$, $I_B$, atau $I_C$. Dengan cara tiga titik, klik titik sudut yang dihadapi lingkaran terlebih dahulu. Misalnya, urutan $B,C,A$ menghasilkan $I_B$. |

Lingkaran singgung luar di hadapan $A$ menyinggung ruas $BC$ serta perpanjangan $AB$ dan $AC$. Jika $I_A$ sudah dibuat, alat **Lingkaran singgung luar** memakai pusat itu kembali. Jika nama khusus sudah dipakai titik lain, Studio menambahkan tanda prima pada nama pusat yang baru, misalnya $O'$.

Untuk membagi $\angle BAC$, buka menu **Garis**, pilih **Garis bagi sudut dalam** atau **Garis bagi sudut luar**, lalu klik $B$, $A$, dan $C$. Titik kedua, $A$, adalah puncak sudut. Jika sudah ada penanda sudut di sana, cukup klik penandanya. Coba buat kedua garis lalu geser $C$. Kedua garis tetap tegak lurus satu sama lain.

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

Untuk menamai titik $A^{\ast}$, pilih bulatan titiknya dan isi **Nama** dengan `A*`. Bentuk `A^*` dan `A^{*}` juga diterima. Kanvas dan label TikZ menampilkan bintang sebagai superskrip. Untuk $A_1^{\ast}$, ketik `A_1*`. Saat membuat inversi baru dari $A$, Studio memilih nama $A^{\ast}$ secara otomatis. Proyek lama memakai nama yang sudah tersimpan.

Kalau ada banyak garis di dekat $I_A$, geser hurufnya atau pilih titiknya dan aktifkan **Latar label transparan**. Atur opasitas latar sambil melihat garis di bawah teks. Pengaturan ini juga berlaku untuk label bebas dan label sudut dan ikut dibawa ke TikZ. Alat **Sudut** mengganti busur dengan tanda siku-siku saat kedua kaki tegak lurus. Jika titik digeser sehingga sudutnya berubah, busur muncul kembali. Klik tanda siku-siku lalu atur **Ukuran siku-siku** agar muat di antara kedua kaki sudut. Ukuran tanda tidak mengubah sudut geometrinya.

## Menyimpan beberapa diagram dan memakai Studio secara luring

**Simpan lembar** mengunduh gambar yang sedang ditampilkan, termasuk rumus, hubungan konstruksi, dan gayanya, sebagai satu berkas `.stikz.json`. Beri setiap diagram nama yang mudah dicari, misalnya `01-garis-berat.stikz.json`. Dengan **Buka file**, tiap berkas yang dipilih menjadi tab baru di samping lembar yang sudah terbuka. Cara ini juga bisa dipakai untuk menjadikan contoh yang sudah kamu sunting sebagai lembar pribadi.

Jika penyimpanan browser tersedia, Studio otomatis mengingat semua lembar pribadi yang terbuka dan tab terakhir yang dipilih. Setiap tab menyimpan posisi kanvas serta riwayat **Urungkan** dan **Ulangi** selama sesi berlangsung. Riwayat dimulai kembali setelah halaman dimuat ulang. File hasil **Simpan lembar** bisa dipindah ke browser atau perangkat lain.

Untuk menggambar dari awal di tab yang sama, pilih tab pribadi lalu klik **Kosongkan gambar**. Nama tab tetap tersimpan. Gunakan **Urungkan** untuk mengembalikan gambar selama sesi masih terbuka.

Untuk membuang gambar dari daftar tab dan penyimpanan browser, pilih tabnya, klik **Hapus lembar**, periksa namanya, lalu konfirmasi. Untuk menyimpan salinan, klik **Simpan lembar** sebelum menghapusnya. Salinan yang sudah diunduh tetap bisa dibuka lagi. Saat tinggal satu lembar pribadi, tombol **Hapus lembar** nonaktif. Untuk mengosongkan lembar itu, pilih **Kosongkan gambar**.

Untuk bekerja tanpa internet, <a href="./index.html" download="Studio-TikZ.html">unduh Studio-TikZ.html</a> dan buka melalui browser. Jika sedang membaca panduan di GitHub, buka berkas editor lalu gunakan **Download raw file**. Untuk memperbarui salinan luring, unduh HTML terbaru dan buka kembali proyek `.stikz.json`. Pada versi daring, muat ulang halaman setelah pembaruan diterbitkan. [Berkas editor](./index.html).

## Mengimpor gambar GeoGebra

Klik **Buka file** atau seret satu berkas `.ggb` ke kanvas. Studio membaca konstruksi 2D yang dikenali, termasuk posisi titik, ruas, sisi poligon, dan lingkaran. Titik dari GeoGebra memakai posisi tersimpan saat impor. Sebagian hubungan konstruksi, seperti lingkaran melalui titik yang dikenali, dapat dibangun kembali. Grafik fungsi, objek 3D, dan perintah GeoGebra lainnya berada di luar cakupan impor.

Periksa pesan impor serta daftar **Objek**. Jika sebuah titik perlu terus mengikuti lingkaran atau garis, kamu dapat membuat titik terikat di Studio melalui alat **Titik**. Simpan hasil yang akan disunting sebagai proyek `.stikz.json`.

### Membatasi gambar untuk dicetak

Di dekat tombol pembesaran kanvas, pilih **Clip gambar → Persegi panjang**. Klik dua sudut yang berseberangan. Untuk mengikuti keliling yang sudah digambar, pilih **Bangun yang sudah ada**, lalu pilih lingkaran penuh, juring, atau poligon di kanvas atau dalam daftar. Jika bentuk itu berubah, batas ikut berubah.

Kanvas dan **Gambar lengkap** di TikZ menampilkan bagian yang sama, termasuk potongan label di tepi batas. Proyek menyimpan batas dan objek aslinya. Gunakan **Ubah clip** untuk memilih batas lain atau **Hapus clip** untuk kembali melihat seluruh gambar. [Buka animasi clip gambar](./index.html#panduan/editor-clip).

## Menyalin diagram Asymptote dari AoPS

1. [Buka konverter Asymptote](./index.html#asymptote) atau klik **Tempel Asymptote** di bilah atas editor. Tempel satu diagram ke kolom **Kode Asymptote**, dengan atau tanpa tag `[asy]` dan `[/asy]`. Untuk mencoba contoh siap pakai, pilih **Proyeksi dan pencerminan** dari **Contoh AoPS**.
2. Klik **Konversi ke TikZ**, lalu **Buka di lembar baru** untuk membawa gambar yang didukung ke kanvas. Studio membuka tab pribadi baru di samping lembar yang sudah ada.
3. Dengan **Pilih / geser**, seret bulatan titik $P$ pada contoh tersebut. Perhatikan ruas yang terhubung ke $P$ dan koordinat yang ikut berubah di panel **Kode TikZ**. Klik **Salin TikZ** untuk mengambil gambar, lalu **Salin preamble** untuk memperoleh paket yang diperlukan. **Simpan lembar** mengunduh salinan yang bisa dibuka kembali.

Pada contoh ini, $H$ tetap menjadi kaki tegak lurus dari $P$ ke garis $AB$, dan $Q$ ikut bergerak sebagai bayangan $P$ terhadap $AB$. Studio mengenali hubungan itu dari perintah `foot(P,A,B)` dan `reflect(A,B)*P`. Sebagian rumus lain hanya menghasilkan koordinat saat diimpor. Begitu pula pada **Persegi bersarang**, perulangan menentukan jumlah persegi saat konversi. Untuk mengubah jumlahnya, buka kembali **Tempel Asymptote**, sunting sumber yang masih ada di sana lalu konversi lagi.

**Lingkaran dari tiga titik.** Ekspor Asymptote dari GeoGebra kadang menyimpan lingkaran sebagai `CR((x,y),r)`. Setelah konversi, periksa pilihan ini sebelum membuka lembar. Studio menyarankan tiga titik jika tepat tiga titik yang sesuai berada di keliling, atau jika di antara titik-titik itu ada tepat satu segitiga yang digambar. Kamu bisa mengganti ketiganya atau mempertahankan pusat dan jari-jari dari kode.

Misalnya, pada sebuah ekspor GeoGebra dengan tiga lingkaran, hasilnya seperti berikut.

| Lingkaran | Titik yang terletak pada keliling saat diimpor | Pilihan awal |
| --- | --- | --- |
| 1 | $A,B,C,D,E,M,H',A'$ | $A,B,C$, karena segitiga $ABC$ digambar. |
| 2 | $D,E,F,K$ | Pusat dan jari-jari dari kode. Pilih tiga titik jika ingin lingkarannya mengikuti titik-titik itu. |
| 3 | $F,K,M,H'$ | Pusat dan jari-jari dari kode. Jika kamu memilih $F,K,M$, posisi $H'$ tidak ikut menentukan lingkaran. |

Untuk memeriksa hasil impor, pilih $D,E,K$ pada lingkaran kedua, buka lembar, lalu geser $D$. Lingkaran akan tetap melalui $D,E,K$, sedangkan $F$ dapat berada di dalam atau di luar lingkaran. Ekspor ini hanya menyimpan koordinat $F$. Jika $F$ seharusnya merupakan titik potong tertentu, buat kembali titik potong itu di Studio sesuai soal. Untuk mengganti tiga titik penentu pada diagram yang pernah diimpor, konversikan kembali sumber Asymptote-nya dan buka sebagai lembar baru.

Kamu juga bisa tetap di konverter dan menyunting kolom **Kode TikZ** langsung. **Salin TikZ** di sana menyalin teks yang sudah disunting. Tempel di badan dokumen dan kompilasi untuk melihat perubahannya. **Pratinjau hasil konversi** dan **Buka di lembar baru** menggunakan gambar dari sumber Asymptote. Jalur SVG, PDF, dan TikZ yang dibungkus dalam label menyediakan kode untuk disalin.

Pilih **Pulihkan hasil konversi** untuk mengembalikan kode sebelum disunting. Suntingan tetap tersedia saat sumber diubah, contoh lain dipilih, atau konversi gagal. Jika hasil konversi berikutnya berbeda, pilih **Ganti dengan hasil baru** untuk memakainya atau **Pertahankan suntingan** untuk melanjutkan kode sebelumnya. Kolom yang sama juga bisa disunting saat kamu membuka SVG, mengambil kembali TikZ dari label Asymptote, atau membuat kode penyisipan PDF.

| Contoh AoPS | Yang bisa dicoba |
| --- | --- |
| Setengah lingkaran dan tali busur | Ganti `palered` dengan `white` pada isian pertama. Perhatikan bagian yang berubah dan posisi label $16$ di atas tali busur. |
| Persegi bersarang | Ganti `n = 25` menjadi `n = 5`. Perulangan menggambar dan mewarnai lima persegi bergantian. Perintah terakhir menambahkan satu persegi kecil lagi sebagai garis tepi. |
| Empat lingkaran | Baris `draw(circle(O, 6/23));` menggambar lingkaran keempat. Ganti jari-jarinya menjadi `1` untuk membandingkannya dengan lingkaran berpusat di $A$. |
| Proyeksi dan pencerminan | Perhatikan koordinat titik $P$ di panel kode saat menggesernya di kanvas. Untuk mengganti koordinat awal bagi konversi berikutnya, sunting $P$ di kode Asymptote. |

Konverter langsung membaca bagian Asymptote 2D yang banyak dipakai pada diagram olimpiade, termasuk fungsi bantu, array titik, perulangan, isian transparan, dan beberapa perintah modul `olympiad` dan `cse5`. Misalnya, `foot` membuat kaki tegak lurus dan `clip(path)` atau `clip(currentpicture,path)` membatasi gambar yang sudah dibuat hingga baris itu. Objek yang digambar sesudah perintah tersebut tetap dapat muncul di luar batas.

Coba salah satu soal berikut dari **AoPS Contests**. Buka tautannya, lalu klik diagram di **postingan pertama**. Pada jendela **Asymptote code below**, pilih teks mulai dari `[asy]` sampai `[/asy]`, salin, lalu tempel di **Tempel Asymptote**.

- [AIME II 2023, soal 6](https://artofproblemsolving.com/community/c5h3016174p27101321#post27101321) — daerah berbentuk L dari tiga persegi satuan.
- [Canadian Open Mathematics Challenge 2017, soal A2](https://artofproblemsolving.com/community/c4h1722001p11140110#post11140110) — tiga lingkaran berpusat di titik sudut segitiga sama sisi, dengan juring yang diarsir.
- [Olimpiade Matematika Nasional Cile 2020, level 2 soal 2](https://artofproblemsolving.com/community/c6h2945846p26371900#post26371900) — kisi $4\times4$ titik untuk menyelidiki banyak persegi.

Ketiga blok lengkap dari postingan ini sudah dicoba di Studio. Hasil TikZ masing-masing berhasil dikompilasi dengan pdfLaTeX.

**Jika konversi gagal**, periksa apakah seluruh diagram sudah tersalin. Bila Studio menampilkan baris dan kolom, klik **Ke baris ini** untuk memeriksa sumbernya. Untuk mempertahankan hasil dari spline, modul khusus, atau proyeksi 3D, gunakan **Konversi dari SVG hasil Asymptote**.

1. Klik **Unduh diagram.asy**. Siapkan Asymptote beserta modul yang dipakai di komputermu, lalu jalankan `asy -f svg diagram.asy` di folder berkas itu.
2. Klik **Buka hasil SVG** dan pilih `diagram.svg`. Periksa pratinjau, lalu salin TikZ dan preamble. Hasilnya berupa lintasan gambar statis. Huruf yang dirender sebagai kontur ikut menjadi lintasan. Untuk mengubah rumus atau menggeser titik acuan, sunting sumber Asymptote lalu render kembali.
3. Jika bingkai SVG memotong sebagian gambar, jalankan `asy -f pdf diagram.asy`, lalu `pdftocairo -svg diagram.pdf diagram.svg` dengan Poppler. Buka SVG hasilnya melalui langkah kedua.
4. Jika SVG memuat bitmap atau filter yang belum didukung, jalankan `asy -f pdf diagram.asy`. Letakkan `diagram.pdf` di folder dokumen LaTeX, tambahkan `\usepackage{graphicx}` ke preamble, lalu gunakan `\includegraphics{diagram.pdf}`.

### Membawa TikZ ke AoPS

Klik **Format AoPS** pada panel kode. Pilih **Ambil dari kanvas** atau tempel `tikzpicture` milikmu. Klik **Salin [asy]** untuk membungkus gambar sebagai blok `[asy]`. Di dalam blok itu, `usepackage("tikz")` memuat TikZ dan `label(...)` menempatkan lingkungan `tikzpicture`. Gunakan hasil salinan lengkap saat menempelkan gambar ke forum. Jika satu blok Asymptote hanya membungkus satu gambar TikZ di dalam label, tempelkan blok itu kembali ke konverter untuk mengambil TikZ aslinya. Jika label memakai makro modulmu, tambahkan definisi atau paket yang diperlukan di **Preamble tambahan** dan periksa bahwa lingkungan LaTeX AoPS mendukungnya.

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

- **Titik lepas saat lingkaran digeser.** Pilih titiknya dan periksa keterangan ikatan di bawah kanvas. Aktifkan **Titik** dan klik tepat pada keliling untuk membuat titik yang mengikuti lingkaran.
- **Perpotongan berada pada perpanjangan ruas.** Alat **Titik potong** memperpanjang ruas menjadi garis penuh. Untuk mengambil perpotongan pada bagian ruas yang terlihat, gunakan **Titik** dan klik tanda silang di kanvas.
- **Gambar tampak hilang.** Coba **Pas ke gambar** dan periksa **Lihat objek tersembunyi**. Sebagian konstruksi juga bisa hilang sementara, misalnya lingkaran melalui tiga titik yang menjadi segaris. Geser salah satu titik agar lingkarannya muncul kembali.
- **Browser membatasi penyalinan.** Setelah menekan **Salin TikZ**, gunakan **Ctrl+C** atau **⌘C** jika editor membuka kotak kode yang sudah terseleksi.

## Katalog animasi

Di bilah alat atas, **Sudut** menandai sudut dan **Label** di sebelahnya menambahkan teks atau rumus bebas. Gunakan **Poligon** untuk membuat segitiga atau bangun bersisi lebih banyak. Menu **Titik**, **Garis**, **Bidang**, dan **Transformasi** menampilkan alat dalam daftar vertikal. Menu **Lingkaran** dan **Segitiga** mengelompokkan alat menurut jenis konstruksinya. Klik nama alat berikut untuk membuka panduannya di Studio. Saat memakai HTML luring, pilih alat di kanvas, klik **?** di sebelah namanya, atau cari judul yang sama melalui **Panduan alat**.

### Titik

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Titik](./index.html#panduan/point) | Klik ruang kosong, garis, keliling, atau perpotongan untuk menentukan letak dan ikatan titik. |
| [Titik dari rumus vektor](./index.html#panduan/pointFormula) | Menempatkan $D$ dari koordinat titik lain, misalnya $D=\frac{A+2B}{3}$. |
| [Titik tengah](./index.html#panduan/mid) | Menentukan titik tengah dari dua titik ujung. |
| [Titik potong](./index.html#panduan/cut) | Menandai perpotongan dua objek, termasuk kedua perpotongan dua lingkaran. |
| [Kaki tegak lurus](./index.html#panduan/foot) | Memproyeksikan titik ke garis dan menggambar ruas tegak lurusnya. |

### Garis

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Ruas](./index.html#panduan/segment) | Menghubungkan dua titik dengan ruas. |
| [Garis melalui dua titik](./index.html#panduan/line) | Memperpanjang garis melalui dua titik ke kedua arah. |
| [Sinar](./index.html#panduan/ray) | Membuat sinar dari pangkal melalui titik penentu arah. |
| [Garis sejajar](./index.html#panduan/parallel) | Menggeser pratinjau garis sejajar hingga melalui titik pilihan. |
| [Garis tegak lurus](./index.html#panduan/normal) | Menarik garis tegak lurus acuan melalui titik pilihan. |
| [Garis sumbu](./index.html#panduan/perpendicularBisector) | Membagi ruas menjadi dua bagian sama panjang dan tegak lurus. |
| [Garis bagi sudut dalam](./index.html#panduan/bisectInternal) | Membagi sudut dalam menjadi dua sudut yang sama besar. |
| [Garis bagi sudut luar](./index.html#panduan/bisectExternal) | Membagi sudut antara satu sisi dan perpanjangan sisi lainnya. |
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

### Bidang

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Poligon](./index.html#panduan/polygon) | Klik tiga titik sudut untuk segitiga, atau tambahkan titik sudut berikutnya untuk bangun lain. Klik titik pertama atau tekan **Enter** untuk menutupnya. |
| [Poligon beraturan](./index.html#panduan/regularPolygon) | Melengkapi poligon beraturan dari satu sisi dan jumlah sudut. |

### Transformasi

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Translasi](./index.html#panduan/translate) | Menggeser objek mengikuti vektor dari satu titik ke titik lain. |
| [Rotasi](./index.html#panduan/rotate) | Memutar objek terhadap pusat dengan sudut tertentu. |
| [Refleksi](./index.html#panduan/reflect) | Klik objek asal lalu klik titik atau garis cermin. |
| [Refleksi terhadap garis](./index.html#panduan/reflectLine) | Mencerminkan objek terhadap sebuah garis. |
| [Refleksi terhadap titik](./index.html#panduan/reflectPoint) | Mencerminkan objek terhadap sebuah titik pusat. |
| [Dilatasi](./index.html#panduan/dilate) | Menskalakan objek terhadap titik pusat dengan faktor tertentu. |
| [Inversi](./index.html#panduan/invert) | Pilih titik, garis, lingkaran, atau bangun lain. Gunakan lingkaran acuan yang sudah ada atau tentukan pusat dan jari-jari atau kuasanya. |

### Bilah alat atas

| Animasi alat | Yang dicontohkan |
| --- | --- |
| [Pilih / geser](./index.html#panduan/move) | Memilih objek, menyeret titik, atau merapikan letak label. |
| [Label](./index.html#panduan/label) | Meletakkan teks atau rumus LaTeX di posisi pilihan. |
| [Sudut](./index.html#panduan/angle) | Klik tiga titik dengan titik sudut sebagai pilihan kedua. Pada $90^\circ$, penandanya otomatis menjadi siku-siku. |

### 20 animasi editor dan ekspor

Gunakan bagian ini jika konstruksinya sudah jadi dan kamu ingin mengubah tampilan, menyimpan lembar, atau menyiapkan gambar untuk dicetak.

| Kebutuhan | Pilih animasi |
| --- | --- |
| Memilih dan menjelajah | [Pilih beberapa objek dan hapus bersama](./index.html#panduan/editor-selection) · [Batalkan, hapus, dan urungkan](./index.html#panduan/editor-undo) · [Gulir dan geser tampilan kanvas](./index.html#panduan/editor-pan) · [Perbesar tampilan dan lekatkan titik ke kisi](./index.html#panduan/editor-view) · [Tema dan latar kanvas](./index.html#panduan/editor-theme) · [Clip gambar](./index.html#panduan/editor-clip) |
| Merapikan warna dan garis | [Sembunyikan dan tampilkan objek](./index.html#panduan/editor-visibility) · [Warna dan opasitas objek](./index.html#panduan/editor-color) · [Ketebalan, pola garis, dan tanda ruas](./index.html#panduan/editor-stroke) · [Warnai bagian dalam bangun](./index.html#panduan/editor-fill) |
| Menyunting label dan konstruksi | [Nama, koordinat, dan posisi label titik](./index.html#panduan/editor-point-label) · [Sunting atau pindahkan label bebas](./index.html#panduan/editor-annotation) · [Tanda dan label besar sudut](./index.html#panduan/editor-angle-style) · [Ubah lingkaran menjadi busur](./index.html#panduan/editor-arc) · [Sunting rumus titik atau jari-jari](./index.html#panduan/editor-formulas) |
| Mengelola lembar dan proyek | [Mulai lembar baru atau coba contoh](./index.html#panduan/editor-sheets) · [Simpan dan buka kembali lembar](./index.html#panduan/editor-project) · [Buka gambar GeoGebra](./index.html#panduan/editor-import) |
| Membawa gambar ke modul | [Salin gambar TikZ atau koordinat](./index.html#panduan/editor-export) · [Skala cetak gambar TikZ](./index.html#panduan/editor-scale) |
