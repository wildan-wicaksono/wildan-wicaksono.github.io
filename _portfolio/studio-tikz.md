---
title: "Studio TikZ"
excerpt: "Editor geometri untuk menggambar di browser dan menyalin kode TikZ ke modul LaTeX. Bisa dipakai offline."
collection: portfolio
layout: single
permalink: /portfolio/studio-tikz/
comments: true
comments_path: /portfolio/studio-tikz/
header:
  teaser: /assets/studio-tikz-demo.png
  teaser_alt: "Contoh diagram geometri yang dibuat di Studio TikZ"
---

{% include studio-tikz-language.html language="id" id="/portfolio/studio-tikz/" en="/tools/studio-tikz/en/project.html" %}

<p><a class="btn btn--primary" href="{{ '/tools/studio-tikz/index.html' | relative_url }}">Buka Studio TikZ</a> <a class="btn" href="#contoh-studio-tikz">Contoh dan kode LaTeX</a> <a class="btn" href="{{ '/tools/studio-tikz/index.html' | relative_url }}" download="Studio-TikZ.html">Unduh versi offline</a></p>

[Komentar dan usulan fitur](#comments)

Kalau sedang menyiapkan diagram untuk modul olimpiade, saya biasanya membuka GeoGebra, mencoba beberapa posisi titik sampai gambarnya enak dibaca, lalu melihat koordinatnya. Setelah itu saya pindah ke dokumen LaTeX dan mengetik TikZ secara manual. GeoGebra sebenarnya sudah menyediakan ekspor TikZ. Saya tetap sering menulis ulang kodenya karena punya kebiasaan sendiri dalam memberi nama titik, menempatkan label, memilih warna, dan menandai sudut.

Saya membuat **Studio TikZ** supaya bisa menggambar dan melihat kode yang akan masuk ke modul di layar yang sama. Saya juga ingin orang yang sedang belajar TikZ bisa mengenal gaya penulisan saya. Coba buat satu ruas $AB$, klik ruasnya, lalu perhatikan baris kode yang disorot. Ubah garisnya menjadi putus-putus dan lihat apa yang berubah. Menurut saya, percobaan kecil seperti ini lebih mudah diikuti daripada membaca seluruh kode sebuah diagram sekaligus.

Dengan alat **Titik**, klik ruang kosong untuk membuat titik bebas, atau klik ruas $AB$ untuk menempatkan $P$ tepat pada ruas itu. Aktifkan **Pilih / geser** dan tarik $P$ sepanjang $AB$. Saat $B$ dipindah, $P$ ikut bergerak bersama ruasnya. [Coba animasi alat Titik]({{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/point).

Kalau saya ingin menaruh titik tepat di $(2,0)$, saya centang **Tampilkan kisi**. Ini juga mengaktifkan **Lekat ke kisi**. Pada pembesaran 100%, **Jarak kisi** menunjukkan $1$ satuan. Saya pilih **Titik**, arahkan kursor ke ruang kosong, lalu klik saat penanda menunjukkan $(2,0)$. Pada **Poligon**, saya juga bisa menaruh titik sudut pertama tepat di sana, lalu mengeklik di tengah petak untuk membuat titik sudut berikutnya di luar kisi. Pelekatan hanya bekerja di dekat perpotongan kisi. Untuk menggeser titik, pilih **Pilih / geser** dan seret bulatannya. Menyeret huruf hanya memindahkan label. [Panduan kisi dan koordinat]({{ '/tools/studio-tikz/panduan.html' | relative_url }}#kisi-dan-koordinat).

Gunakan **+ Tambah lembar** untuk membuka tab kosong dengan nomor terkecil yang tersedia, atau pilih beberapa berkas lewat **Buka file**. Setiap gambar mendapat tab sendiri. Di menu **Lembar**, pilih **Contoh Studio** untuk mencoba sebuah konstruksi atau **Contoh penggunaan Wildan** untuk membuka diagram soal. Setelah mencoba contoh, klik tab pribadi yang ingin dilanjutkan atau pilih **Lembar saya → Gambar saya** untuk kembali ke tab pribadi terakhir.

Di sebelah **Lembar**, menu **Tata letak** mengatur letak kanvas dan kode. Saya memilih **Berdampingan** saat ingin melihat kode di kanan sambil menggambar. Untuk diagram yang lebar, **Bertumpuk** memberi kanvas selebar halaman dan meletakkan kode di bawahnya. **Otomatis** mengikuti lebar layar. Browser mengingat tata letak dan pilihan bahasa Indonesia atau Inggris. Untuk memeriksa bagian kecil diagram, fokuskan kanvas lalu tekan **+** atau **−**, atau pilih persentase pembesaran. **Skala TikZ** mengatur ukuran gambar yang dicetak.

{% include studio-tikz-contoh.html %}

## Merapikan diagram yang padat

Saat garis memotong huruf $P$, geser dulu hurufnya. Jika ruangnya sempit, pilih titik $P$ lalu aktifkan **Latar label transparan**. Garis di bawah huruf masih terlihat dan warna teks tetap terbaca. Opsi ini juga tersedia untuk label bebas dan label sudut. Gunakan **Label** di bilah alat atas untuk menambahkan keterangan bebas.

Untuk mewarnai beberapa ruas sekaligus, aktifkan **Pilih / geser**, tahan **Ctrl** atau **⌘**, lalu klik ruas yang diinginkan. Panel **Objek** dapat mengatur warna dan menyembunyikan pilihan bersama. Isikan **Nama grup** lalu klik **Simpan grup** untuk memilih kembali kumpulan yang sama. Palet isian bangun memuat warna yang sama dengan palet garis tepinya. Pilih **Sudut** di samping **Label** pada bilah alat atas, lalu klik $A$, $B$, dan $C$ untuk menandai sudut di $B$. Saat besarnya $90^\circ$, busurnya menjadi tanda siku-siku. Geser salah satu titik sehingga besarnya berubah, dan busurnya muncul kembali. Ukuran tanda siku-siku bisa diatur tersendiri.

Di menu **Garis**, pilih **Garis sumbu**, lalu klik ruas $AB$ atau kedua ujungnya. Garis yang muncul tegak lurus $AB$ tepat di tengahnya. Untuk mentranslasi, merotasi, mencerminkan, mendilatasi, atau menginversi bangun utuh, pilih alatnya lalu klik bagian dalam bangun. **Objek asal** membantu memilih ketika beberapa objek bertumpuk. Pada refleksi, klik titik atau garis cerminnya. Pada **Transformasi → Inversi**, klik objek asal lalu keliling lingkaran acuan. Coba pilih lingkaran yang melalui pusat inversi sebagai objek asal untuk melihat bayangannya berupa garis. Jika yang dipilih segi lima, bayangannya mengikuti kelima sisinya dan bisa dipilih lagi untuk transformasi berikutnya.

Di [**Lembar → Contoh Studio → Contoh transformasi bangun**]({{ '/tools/studio-tikz/index.html' | relative_url }}#contoh/transformasi-bangun), coba geser $A$ pada segi lima hijau. Titik biru $A^{\prime}$ adalah bayangan refleksinya dan titik jingga $A^{\ast}$ adalah bayangan inversinya. Nama bayangan titik lainnya mengikuti pola yang sama sampai $E^{\prime}$ dan $E^{\ast}$. Untuk mengamati satu sisi lebih dekat, buka [animasi inversi segitiga]({{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/invert). Pada contoh itu, ujung $A$ dan $B$ berada pada keliling lingkaran acuan. Bayangan ruas $AB$ adalah setengah lingkaran dari $A$ ke $B$ melalui $M^{\ast}$, bayangan titik tengah $M$. Geser pusat inversi $O$ dan amati posisi $M^{\ast}$ pada busur. Untuk menamai titik lain $X^{\ast}$, klik titiknya lalu ketik `X*` di kolom **Nama**.

Untuk membatasi bagian gambar yang masuk ke modul, buka **Clip gambar** di dekat tombol pembesaran. Pilih dua sudut persegi panjang atau gunakan lingkaran, juring, maupun poligon yang sudah digambar. Label dan garis di luar batas juga terpotong pada hasil TikZ. [Coba panduan clip gambar]({{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/editor-clip).

## Pusat segitiga dan garis bagi sudut

Untuk menggambar bangun dengan **Poligon**, klik titik sudutnya secara berurutan. Klik $A$, $B$, dan $C$, lalu klik $A$ lagi atau tekan **Enter** untuk menutup segitiga. Untuk segiempat, tambahkan $D$ sebelum menutup bangun. Daerahnya bisa dipilih dan diberi warna. [Coba animasi alat Poligon]({{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/polygon).

Untuk menggambar lingkaran dalam $ABC$, pilih **Segitiga → Lingkaran dalam** lalu klik bagian dalam segitiga. Studio menggambar lingkaran yang menyinggung ketiga sisi dan menandai pusatnya sebagai $I$. Untuk membuat lingkaran singgung luar di hadapan $A$, pilih **Segitiga → Lingkaran singgung luar**, klik segitiganya, lalu klik $A$. Pusatnya diberi nama $I_A$. Pilih $B$ atau $C$ pada langkah terakhir untuk memperoleh $I_B$ atau $I_C$. <a href="{{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/excircle">Coba animasi lingkaran singgung luar.</a>

<figure>
  <img src="{{ '/assets/studio-tikz-lingkaran-dalam-dan-luar.svg' | relative_url }}" alt="Lingkaran biru berpusat di I menyinggung ketiga sisi ABC. Lingkaran hijau berpusat di I sub A menyinggung BC serta perpanjangan AB dan AC. Di B kedua garis bagi membentuk sudut siku-siku." width="600" height="330" loading="lazy" style="display:block;width:100%;max-width:600px;height:auto;margin:0 auto;">
  <figcaption>Di titik $B$, garis $BI$ membagi sudut dalam dan garis $BI_A$ membagi sudut luar. Untuk menggambar masing-masing garis, buka menu <strong>Garis</strong>, pilih <strong>Garis bagi sudut dalam</strong> atau <strong>Garis bagi sudut luar</strong>, lalu klik $A$, $B$, dan $C$, dengan $B$ sebagai titik kedua.</figcaption>
</figure>

Menu **Segitiga** juga menyediakan **Pusat lingkaran luar** untuk membuat $O$ dan **Titik tinggi** untuk membuat $H$, titik potong ketiga garis tinggi. Dengan **Lingkaran → Lingkaran lewat 3 titik**, klik $A$ dan $B$, lalu gerakkan kursor. Pratinjau lingkaran melewati kedua titik dan mengikuti kursor sampai kamu mengeklik posisi $C$ yang tidak segaris. <a href="{{ '/tools/studio-tikz/panduan.html' | relative_url }}#pusat-dan-lingkaran-segitiga">Lihat panduan pusat dan lingkaran segitiga.</a>

## Coba satu diagram

Pada segitiga $ABC$, saya ingin menempatkan $D$ pada $AB$ sehingga $AD=2\cdot DB$. Di menu **Titik**, pilih **Titik dari rumus vektor**, ketik `D = (A + 2B) / 3`, lalu tekan **Enter**. Sekarang geser $B$. $D$ akan ikut bergerak dan pembagian ruasnya tetap sama. Di panel **Kode TikZ**, pilih **Gambar lengkap** untuk melihat bagaimana $D$ dinyatakan menggunakan $A$ dan $B$, atau **Koordinat saja** untuk mengambil nilai koordinatnya.

Di contoh yang bisa diunduh, salah satu baris hasil ekspornya berbunyi seperti ini.

```latex
\coordinate[label={[text=PineGreen]below:$D$}] (D) at (${1/3}*(A) + {2/3}*(B)$);
```

Bagian `at` menyatakan $D$ sebagai sepertiga $A$ ditambah dua pertiga $B$. Bagian `label` menempatkan huruf $D$ berwarna hijau di bawah titik. Coba ganti `below` menjadi `above` di LaTeX untuk memindahkan hurufnya.

<figure>
  <img src="{{ '/assets/studio-tikz-demo.png' | relative_url }}" alt="Contoh segitiga ABC dengan D pada ruas AB, beserta cuplikan kode TikZ." width="800">
  <figcaption>Titik $D$ terletak dua pertiga jalan dari $A$ ke $B$.</figcaption>
</figure>

<details>
  <summary>Putar GIF pembuatan segitiga dan titik $D$</summary>
  <p><img src="{{ '/assets/studio-tikz-demo.gif' | relative_url }}" alt="Animasi pembuatan segitiga ABC dan titik D dari rumus vektor, disertai perubahan pada gambar dan kode TikZ." width="800" loading="lazy"></p>
</details>

<figure>
  <iframe src="{{ '/tools/studio-tikz/contoh-vektor.html' | relative_url }}" title="Diagram interaktif pembagian ruas AB dalam segitiga ABC" loading="lazy" width="800" height="365" style="display:block;width:100%;height:365px;border:0;"></iframe>
  <figcaption>Seret $A$, $B$, atau $C$ langsung di gambar. Saat $A$ atau $B$ berpindah, $D$ tetap berada dua pertiga jalan dari $A$ ke $B$. Menggeser $C$ mengubah arah ruas $CD$. <a href="{{ '/tools/studio-tikz/contoh-vektor.html' | relative_url }}">Buka diagram pembagian ruas di halaman tersendiri.</a></figcaption>
</figure>

<p><a href="{{ '/tools/studio-tikz/contoh-segitiga.stikz.json' | relative_url }}" download="contoh-segitiga.stikz.json">Unduh contoh segitiga</a>, lalu pilih <strong>Buka file</strong> di editor untuk menggeser titiknya sendiri.</p>

## Belajar lewat animasi alat

GIF di atas memperlihatkan satu diagram dari awal. Di dalam Studio, setiap alat memiliki animasi sendiri yang menunjukkan apa yang perlu diklik dan bagaimana hasilnya terbentuk. Saat membuat soal tentang segiempat siklis, misalnya, buka <a href="{{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/antiTriangle">animasi garis antiparalel</a> untuk melihat sisi mana yang dipilih lebih dulu. Untuk menggambar lingkaran yang melalui $P$ dan menyinggung dua lingkaran lain, buka <a href="{{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/circleConstraints">animasi lingkaran dari tiga syarat</a>.

<details>
  <summary>Lihat contoh animasi alat Garis antiparalel</summary>
  <p><img src="{{ '/assets/studio-tikz-antiparalel.gif' | relative_url }}" alt="Empat langkah memilih BC, menempatkan garis melalui D, lalu menemukan E pada AC dan lingkaran yang melalui B, C, D, dan E." width="800" loading="lazy"></p>
</details>

<figure>
  <iframe src="{{ '/tools/studio-tikz/latihan-antiparalel.html' | relative_url }}" title="Diagram interaktif garis antiparalel dalam segitiga ABC" loading="lazy" width="800" height="465" style="display:block;width:100%;height:465px;border:0;"></iframe>
  <figcaption>Geser $A$, $B$, atau $C$ untuk mengubah bentuk segitiga. Geser $D$ sepanjang $AB$ atau seret langsung ruas $DE$. Amati letak $E$ pada $AC$ ketika $DE$ tetap antiparalel terhadap $BC$. <a href="{{ '/tools/studio-tikz/latihan-antiparalel.html' | relative_url }}">Buka diagram antiparalel di halaman tersendiri.</a></figcaption>
</figure>

Di kanvas, klik **?** di sebelah nama alat yang sedang dipakai, lalu **Putar animasi**. Klik **Jeda** jika ingin melihat letak kursor lebih lama. Tombol langkah sebelumnya dan berikutnya membantumu mengamati satu klik, dan **Ulangi** mengembalikan animasi ke awal. Di bawah setiap animasi alat gambar, buka **Utak-atik contoh** untuk menggeser titik pada konstruksi yang baru diperagakan. Lewat **Panduan alat**, kamu juga bisa mencari 20 topik editor, misalnya <a href="{{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/editor-export">menyalin koordinat ke LaTeX</a>. Animasi alat dan panduan editor tersimpan di dalam HTML, jadi semuanya bisa diputar saat mengajar tanpa internet.

<p><a href="{{ '/tools/studio-tikz/panduan.html' | relative_url }}#katalog-animasi">Lihat katalog semua animasi</a> · <a href="{{ '/tools/studio-tikz/panduan.html' | relative_url }}">Baca panduan pengguna</a></p>

## Memakai hasilnya di dokumen LaTeX

Di panel **Kode TikZ**, bagian **Paket LaTeX** menampilkan preamble untuk gambar yang sedang dibuka. Klik **Salin preamble** dan tempel sebelum `\begin{document}`. Untuk modul baru, saya memakai kerangka berikut.

```latex
\documentclass{article}
\usepackage[dvipsnames]{xcolor}
\usepackage{tikz}

\begin{document}
% Tempel hasil Gambar lengkap di sini.
\end{document}
```

Opsi **`dvipsnames`** menyediakan nama warna seperti `PineGreen` dan `ForestGreen` di seluruh modul. Studio bisa langsung menulis `\draw[PineGreen] (A)--(B);` dengan preamble tersebut. Muat `xcolor` sebelum TikZ. Jika kelas atau templat sudah memuat `xcolor` tanpa opsi itu, tulis `\PassOptionsToPackage{dvipsnames}{xcolor}` sebelum `\documentclass` untuk mengaktifkan palet yang sama.

- **Gambar lengkap.** Klik **Salin TikZ**, lalu tempel hasilnya setelah teks soal. Studio menyertakan `center` dan `tikzpicture`. Bagian **Paket LaTeX** juga menampilkan `\usetikzlibrary{angles}` ketika kode memakai `\pic` untuk busur sudut, dan `\usetikzlibrary{calc}` ketika kode memakai perhitungan koordinat vektor.
- **Koordinat saja.** Klik **Salin koordinat**, lalu tempel di dalam `tikzpicture` milikmu. Kamu mendapatkan nama titik dan koordinat numerik, beserta opsi `label` pada titik berlabel. Setelahnya, kamu bisa menulis perintahmu sendiri, misalnya `\draw (A)--(B)--(C)--cycle;`.

Di beberapa diagram lama saya, label memakai `\contour{white}{...}` untuk memberi tepi putih pada huruf. Jika perintah itu dipakai dalam kode yang kamu sunting, tambahkan `\usepackage{contour}` di preamble.

## Diagram Asymptote dari AoPS

Kalau soal di AoPS menyertakan diagram dalam blok `[asy]`, buka **Tempel Asymptote**, tempel bloknya, lalu pilih **Konversi ke TikZ**. Untuk diagram yang bisa dibaca langsung oleh Studio, klik **Buka di lembar baru**. Gunakan **Pilih / geser** untuk menyeret titik ujung sebuah ruas. Kamu bisa langsung menyalin TikZ dari panel kode begitu posisi ruas sesuai keinginanmu. Lembar lain tetap terbuka. [Buka konverter Asymptote]({{ '/tools/studio-tikz/index.html' | relative_url }}#asymptote).

Kode Asymptote asli tetap tersedia di konverter. Untuk mengubah jumlah persegi pada contoh **Persegi bersarang**, misalnya, ubah `n = 25` menjadi `n = 5` lalu konversi lagi. Di lembar Studio, yang bisa digeser adalah titik-titik pada gambar yang sudah dihasilkan.

Konverter dapat membaca konstruksi seperti perpotongan garis dan lingkaran, fungsi bantu, isian transparan, dan pemotongan dengan `clip`.

Coba salah satu soal berikut dari **AoPS Contests**. Buka tautannya, lalu klik diagram di **postingan pertama**. Pada jendela **Asymptote code below**, pilih teks mulai dari `[asy]` sampai `[/asy]`, salin, lalu tempel di **Tempel Asymptote**.

- [AIME II 2023, soal 6](https://artofproblemsolving.com/community/c5h3016174p27101321#post27101321) — daerah berbentuk L dari tiga persegi satuan.
- [Canadian Open Mathematics Challenge 2017, soal A2](https://artofproblemsolving.com/community/c4h1722001p11140110#post11140110) — tiga lingkaran berpusat di titik sudut segitiga sama sisi, dengan juring yang diarsir.
- [Olimpiade Matematika Nasional Cile 2020, level 2 soal 2](https://artofproblemsolving.com/community/c6h2945846p26371900#post26371900) — kisi $4\times4$ titik untuk menyelidiki banyak persegi.

Jika kode memerlukan modul lain atau penggambaran 3D, buka **Konversi dari SVG hasil Asymptote**. Studio bisa mengubah gambar vektor hasil render di komputermu menjadi lintasan TikZ. [Lihat langkah konversi dan pilihan PDF]({{ '/tools/studio-tikz/panduan.html' | relative_url }}#menyalin-diagram-asymptote-dari-aops).

Untuk membawa diagram ke forum AoPS, buka opsi **Format AoPS** pada panel kode. Salin blok `[asy]…[/asy]` yang membungkus `tikzpicture` melalui `label(...)`. Teks di dalamnya tetap TikZ sehingga kamu bisa menyunting nama, posisi label, atau garis dengan cara yang sama.

## Kelebihan

- **Gambar dan kode bisa dipelajari bersama.** Saat menyusun modul, saya bisa memilih satu ruas dan melihat perintah TikZ yang menggambarnya. Saya bisa menyalin gambar lengkap dengan gaya yang biasa saya pakai, atau mengambil koordinat saja dan menulis sendiri garis serta labelnya.
- **Satu konstruksi bisa dicoba dalam beberapa posisi.** Geser titik sudut segitiga, lalu amati lingkaran dalam, garis bagi, atau bayangan inversinya. Animasi alat menunjukkan urutan klik. Di contoh interaktif, pembaca bisa menggeser titik dan melihat akibatnya.
- **Diagram bisa disesuaikan untuk dicetak.** Label LaTeX bisa digeser, daerah dapat diisi warna transparan, dan penanda sudut bisa diatur. Saat skala TikZ diubah, radius cetak titik tetap $1{,}5\,\mathrm{pt}$.
- **Kode dari diagram AoPS bisa dipakai lagi.** Saat Studio bisa membuka diagram Asymptote di kanvas, saya bisa memindahkan titik dan mengambil TikZ yang otomatis mengikuti gambarnya. Kalau hanya ingin mengganti satu perintah, saya juga bisa menyunting **Kode TikZ** langsung di konverter.
- **Beberapa gambar bisa dibuka dalam satu editor, juga saat offline.** Saya bisa memberi nama satu tab untuk tiap soal dan berpindah gambar selama kelas. Alat gambar, contoh interaktif, dan animasi panduan sudah tersedia dalam HTML yang diunduh.

## Keterbatasan

- **Penyimpanan otomatis berlaku di browser yang dipakai.** **Simpan lembar** mengunduh salinan gambar yang tampil sebagai satu file `.stikz.json`. **Hapus lembar** meminta konfirmasi sebelum menghapus tab terpilih. Jika tinggal satu lembar, gunakan **Kosongkan gambar** untuk memulai ulang di tab itu. File yang sudah diunduh bisa dibuka lagi lewat **Buka file** sebagai tab baru di samping gambar lain.
- **Cakupannya geometri olimpiade.** Studio belum menyediakan alat umum untuk memplot fungsi atau menggambar irisan kerucut dari persamaannya. Untuk menggambar parabola $y=x^2$, misalnya, saya masih menggunakan GeoGebra.
- **Impor GeoGebra mencakup sebagian objek 2D.** Pada file `.ggb`, Studio bisa membaca posisi titik dari koordinat tersimpan meskipun hubungan konstruksinya tidak ikut terbawa. Simpan gambar yang dibuat di Studio sebagai `.stikz.json` agar hubungan antarobjek dapat dibuka kembali.
- **Impor Asymptote hanya memulihkan sebagian hubungan antarobjek.** Gambar awal bisa tampak persis seperti sumbernya, tetapi beberapa titik bisa terlepas saat digeser. Misalnya, sebuah ekspor GeoGebra hanya mencatat pusat dan jari-jari lingkaran yang melalui $D,E,F,K$. Jika kamu memilih $D,E,K$ sebagai tiga titik penentu, lingkaran akan mengikuti ketiganya. Koordinat awal saja belum menjelaskan bagaimana $F$ harus bergerak agar tetap pada keliling. [Contoh pemilihan titik]({{ '/tools/studio-tikz/panduan.html' | relative_url }}#menyalin-diagram-asymptote-dari-aops).
- **Menempelkan kode Asymptote bisa menghasilkan pesan galat.** Jika blok terpotong, salin ulang mulai `[asy]` sampai `[/asy]`. Kode yang lengkap dan berjalan di AoPS pun bisa memakai perintah atau modul yang belum dikenali Studio. Jika pesan menyebut baris dan kolom, klik **Ke baris ini** untuk memeriksanya. Untuk fitur yang belum didukung, render dengan Asymptote di komputermu, lalu impor SVG atau sisipkan PDF di LaTeX. [Langkah konversi SVG dan PDF]({{ '/tools/studio-tikz/panduan.html' | relative_url }}#menyalin-diagram-asymptote-dari-aops).
- **Salinan offline perlu diperbarui manual.** Unduh HTML terbaru dari halaman proyek ini, lalu buka file `.stikz.json` yang sudah kamu simpan di editor baru.

### Komentar dan usulan fitur

Kalau ada konstruksi yang kamu butuhkan untuk soal atau modul, [tuliskan di kolom komentar](#comments). Saya juga ingin mendengar pengalamanmu memakai Studio TikZ. Kalau suatu gambar sulit dibuat atau hasil impor berubah saat titik digeser, contoh kecil atau potongan kode Asymptote akan membantu saya mencobanya.
