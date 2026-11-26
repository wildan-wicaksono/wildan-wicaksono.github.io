---
title: "Studio TikZ"
excerpt: "Editor geometri untuk menggambar di browser dan menyalin kode TikZ ke modul LaTeX. Bisa dipakai offline."
collection: portfolio
layout: single
permalink: /portfolio/studio-tikz/
comments: true
header:
  teaser: /assets/studio-tikz-demo.png
  teaser_alt: "Contoh diagram geometri yang dibuat di Studio TikZ"
---

{% include studio-tikz-language.html language="id" id="/portfolio/studio-tikz/" en="/tools/studio-tikz/en/project.html" %}

<p><a class="btn btn--primary" href="{{ '/tools/studio-tikz/index.html' | relative_url }}">Buka Studio TikZ</a> <a class="btn" href="#contoh-studio-tikz">Contoh dan kode LaTeX</a> <a class="btn" href="{{ '/tools/studio-tikz/index.html' | relative_url }}" download="Studio-TikZ.html">Unduh versi offline</a></p>

Oleh **Wildan Bagus Wicaksono** · [Homepage](https://wildan-wicaksono.github.io/)

Kalau sedang menyiapkan diagram untuk modul olimpiade, saya biasanya membuka GeoGebra, mencoba beberapa posisi titik sampai gambarnya enak dibaca, lalu melihat koordinatnya. Setelah itu saya pindah ke dokumen LaTeX dan mengetik TikZ secara manual. GeoGebra sebenarnya sudah menyediakan ekspor TikZ. Saya tetap sering menulis ulang kodenya karena punya kebiasaan sendiri dalam memberi nama titik, menempatkan label, memilih warna, dan menandai sudut.

Saya membuat **Studio TikZ** supaya bisa menggambar dan melihat kode yang akan masuk ke modul di layar yang sama. Saya juga ingin orang yang sedang belajar TikZ bisa mengenal gaya penulisan saya. Coba buat satu ruas $AB$, klik ruasnya, lalu perhatikan baris kode yang disorot. Ubah garisnya menjadi putus-putus dan lihat apa yang berubah. Menurut saya, percobaan kecil seperti ini lebih mudah diikuti daripada membaca seluruh kode sebuah diagram sekaligus.

Dengan alat **Titik**, klik ruang kosong untuk membuat titik bebas, atau klik ruas $AB$ untuk menempatkan $P$ tepat pada ruas itu. Aktifkan **Pilih / geser** dan tarik $P$ sepanjang $AB$. Saat $B$ dipindah, $P$ ikut bergerak bersama ruasnya. [Coba animasi alat Titik]({{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/point).

Di sebelah **Lembar**, menu **Tata letak** mengatur letak kanvas dan kode. Saya memilih **Berdampingan** saat ingin melihat kode di kanan sambil menggambar. Untuk diagram yang lebar, **Bertumpuk** memberi kanvas selebar halaman dan meletakkan kode di bawahnya. **Otomatis** mengikuti lebar layar. Browser mengingat tata letak dan pilihan bahasa Indonesia atau Inggris. Untuk memeriksa bagian kecil diagram, fokuskan kanvas lalu tekan **+** atau **−**, atau pilih persentase pembesaran. **Skala TikZ** mengatur ukuran gambar yang dicetak.

{% include studio-tikz-contoh.html %}

## Merapikan diagram yang padat

Saat garis memotong huruf $P$, geser dulu hurufnya. Jika ruangnya sempit, pilih titik $P$ lalu aktifkan **Latar label transparan**. Garis di bawah huruf masih terlihat dan warna teks tetap terbaca. Opsi ini juga tersedia untuk label bebas dan label sudut. Gunakan **Label** di bilah alat atas untuk menambahkan keterangan bebas.

Untuk mewarnai beberapa ruas sekaligus, aktifkan **Pilih / geser**, tahan **Ctrl** atau **⌘**, lalu klik ruas yang diinginkan. Panel **Objek** dapat mengatur warna dan menyembunyikan pilihan bersama. Isikan **Nama grup** lalu klik **Simpan grup** untuk memilih kembali kumpulan yang sama. Palet isian bangun memuat warna yang sama dengan palet garis tepinya. Dengan alat **Sudut**, klik $A$, $B$, dan $C$ untuk menandai sudut di $B$. Saat besarnya $90^\circ$, busurnya menjadi tanda siku-siku. Geser salah satu titik sehingga besarnya berubah, dan busurnya muncul kembali. Ukuran tanda siku-siku bisa diatur tersendiri.

Di menu **Garis**, pilih **Garis sumbu**, lalu klik ruas $AB$ atau kedua ujungnya. Garis yang muncul tegak lurus $AB$ tepat di tengahnya. Untuk mentranslasi, merotasi, mencerminkan, mendilatasi, atau menginversi bangun utuh, pilih alatnya lalu klik bagian dalam bangun. **Objek asal** membantu memilih ketika beberapa objek bertumpuk. Pada refleksi, klik titik atau garis cerminnya. Pada inversi, klik lingkaran acuan. Bayangan segi lima, misalnya, mengikuti bayangan kelima sisinya. Bayangan itu bisa dipilih lagi untuk transformasi berikutnya.

Di [**Lembar → Contoh transformasi bangun**]({{ '/tools/studio-tikz/index.html' | relative_url }}#contoh/transformasi-bangun), coba geser satu titik sudut atau pusat inversi. Untuk mengamati satu sisi lebih dekat, buka [animasi inversi segitiga]({{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/invert). Pada contoh itu, ujung $A$ dan $B$ berada pada keliling lingkaran acuan. Bayangan ruas $AB$ adalah setengah lingkaran melalui $A$, $B$, dan bayangan titik tengah $M$. Pada inversi baru, bayangan $M$ diberi nama $M^{*}$. Untuk menamai titik lain $X^{*}$, klik titiknya lalu ketik `X*` di kolom **Nama**.

Untuk membatasi bagian gambar yang masuk ke modul, buka **Clip gambar** di dekat tombol pembesaran. Pilih dua sudut persegi panjang atau gunakan lingkaran, juring, maupun poligon yang sudah digambar. Label dan garis di luar batas juga terpotong pada hasil TikZ. [Coba panduan clip gambar]({{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/editor-clip).

## Pusat segitiga dan garis bagi sudut

Untuk menggambar bangun dengan **Poligon**, klik titik sudutnya secara berurutan. Klik $A$, $B$, dan $C$, lalu klik $A$ lagi atau tekan **Enter** untuk menutup segitiga. Untuk segiempat, tambahkan $D$ sebelum menutup bangun. Daerahnya bisa dipilih dan diberi warna. [Coba animasi alat Poligon]({{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/polygon).

Untuk menggambar lingkaran dalam $ABC$, pilih **Segitiga → Lingkaran dalam** lalu klik bagian dalam segitiga. Studio menggambar lingkaran yang menyinggung ketiga sisi dan menandai pusatnya sebagai $I$. Untuk membuat lingkaran singgung luar di hadapan $A$, pilih **Segitiga → Lingkaran singgung luar**, klik segitiganya, lalu klik $A$. Pusatnya diberi nama $I_A$. Pilih $B$ atau $C$ pada langkah terakhir untuk memperoleh $I_B$ atau $I_C$. <a href="{{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/excircle">Coba animasi lingkaran singgung luar.</a>

<figure>
  <img src="{{ '/assets/studio-tikz-lingkaran-dalam-dan-luar.svg' | relative_url }}" alt="Lingkaran biru berpusat di I menyinggung ketiga sisi ABC. Lingkaran hijau berpusat di I sub A menyinggung BC serta perpanjangan AB dan AC. Di B kedua garis bagi membentuk sudut siku-siku." width="600" height="330" loading="lazy" style="display:block;width:100%;max-width:600px;height:auto;margin:0 auto;">
  <figcaption>Di titik $B$, garis $BI$ membagi sudut dalam dan garis $BI_A$ membagi sudut luar. Untuk menggambar masing-masing garis, pilih alat garis bagi yang sesuai lalu klik $A$, $B$, dan $C$, dengan $B$ sebagai titik kedua.</figcaption>
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

Kalau soal di AoPS menyertakan diagram dalam blok `[asy]`, salin bloknya, <a href="{{ '/tools/studio-tikz/index.html' | relative_url }}#asymptote">buka konverter Asymptote</a>, tempel kodenya, lalu pilih **Konversi ke TikZ**. Di editor, konverter ini juga bisa dibuka lewat **Tempel Asymptote** di sebelah **Buka file**. Misalnya, pada contoh **Persegi bersarang**, ubah `n = 25` menjadi `n = 5` dan konversi lagi untuk melihat pengaruh jumlah persegi. Periksa pratinjau, lalu salin TikZ dan preamble ke dokumenmu.

Untuk diagram olimpiade, konverter dapat membaca fungsi bantu untuk konstruksi, perpotongan garis dan lingkaran, warna dengan opasitas, serta pemotongan dengan `clip`. Pengujian mencakup contoh dari AMC/AIME, Math Jam dan WOOT, serta diagram dalam diskusi olimpiade nasional seperti Indonesia dan Australia. Bahan untuk dicoba tersedia di [transkrip USA(J)MO Math Jam 2019](https://artofproblemsolving.com/school/mathjams-transcripts?id=491), [lembar WOOT minggu ke-5](https://artofproblemsolving.com/texer/2021WOOTweek5HW), dan [arsip diskusi AoPS dari Project Numina](https://huggingface.co/datasets/project-numina/aops).

Jika kode memerlukan modul lain atau penggambaran 3D, buka **Konversi dari SVG hasil Asymptote**. Studio bisa mengubah gambar vektor hasil render di komputermu menjadi lintasan TikZ. [Lihat langkah konversi dan pilihan PDF]({{ '/tools/studio-tikz/panduan.html' | relative_url }}#menyalin-diagram-asymptote-dari-aops).

Untuk membawa diagram ke forum AoPS, buka opsi **Format AoPS** pada panel kode. Salin blok `[asy]…[/asy]` yang membungkus `tikzpicture` melalui `label(...)`. Teks di dalamnya tetap TikZ sehingga kamu bisa menyunting nama, posisi label, atau garis dengan cara yang sama.

## Kelebihan

- **Kode bisa dipelajari sambil menggambar.** Saya bisa menelusuri hubungan antara objek di kanvas dan perintah TikZ-nya, lalu menyunting kode tersebut langsung di dokumen saya.
- **Konstruksi mengikuti titik acuannya.** Saat susunan gambar perlu dirapikan, titik tengah, garis singgung, dan bayangan inversi ikut diperbarui. Ini membantu saat saya ingin memeriksa beberapa konfigurasi untuk soal yang sama. Pilih **Transformasi → Inversi** untuk mengikuti bayangan sebuah sisi, busur, atau bangun utuh.
- **Tampilan siap disesuaikan untuk modul.** Label mendukung LaTeX. Ketebalan garis, pola putus-putus, penanda sudut, warna, dan opasitas bisa diatur per objek. Saat skala ekspor diubah, radius cetak titik tetap $1{,}5\,\mathrm{pt}$.
- **Bisa dibawa mengajar.** Saya bisa menyimpan editor dan contoh diagram di laptop sebelum kelas, lalu membuka keduanya saat mengajar.

## Keterbatasan

- **Belum ada daftar proyek di dalam editor.** Browser mengingat satu lembar aktif. Kamu tetap bisa menyimpan banyak gambar sebagai file terpisah. Klik **Simpan proyek**, beri nama yang mudah dikenali seperti `inversi.stikz.json` dan `menelaus.stikz.json`, lalu pilih **Buka file** saat ingin melanjutkan salah satunya. Kalau browser langsung mengunduh dengan nama bawaan, ubah nama file di folder unduhan.
- **Cakupannya geometri olimpiade.** Saat ini belum ada plot fungsi seperti $y=x^2$, atau alat umum untuk parabola, elips, dan hiperbola. Untuk kebutuhan menggambar grafik, saya masih memilih GeoGebra. Fokus Studio TikZ adalah konstruksi dan penyajian diagram geometri.
- **Impor GeoGebra mendukung sebagian objek 2D.** Pada berkas `.ggb`, sebagian titik dibaca dari koordinat tersimpan. Hubungan konstruksi dari GeoGebra belum tentu ikut terbawa. Format `.stikz.json` menyimpan hubungan yang dibuat di Studio TikZ.
- **Salinan offline perlu diperbarui manual.** Untuk memakai versi yang lebih baru, buka kembali halaman proyek ini, unduh HTML terbaru, lalu buka file proyekmu di sana. Menyimpan gambar dan memperbarui aplikasi menggunakan dua file yang berbeda.

Kalau kamu mencoba Studio TikZ untuk bahan ajar atau soal olimpiade, saya ingin tahu bagian mana yang mudah diikuti dan bagian mana yang masih membingungkan. Contoh konstruksi atau potongan kode yang kamu pakai akan membantu saya memahami masukannya.
