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

<p><a class="btn btn--primary" href="{{ '/tools/studio-tikz/index.html' | relative_url }}">Buka Studio TikZ</a> <a class="btn" href="#contoh-studio-tikz">Contoh dan kode LaTeX</a> <a class="btn" href="{{ '/tools/studio-tikz/index.html' | relative_url }}" download="Studio-TikZ.html">Unduh versi offline</a></p>

Kalau sedang menyiapkan diagram untuk modul olimpiade, saya biasanya membuka GeoGebra, mencoba beberapa posisi titik sampai gambarnya enak dibaca, lalu melihat koordinatnya. Setelah itu saya pindah ke dokumen LaTeX dan mengetik TikZ secara manual. GeoGebra sebenarnya sudah menyediakan ekspor TikZ. Saya tetap sering menulis ulang kodenya karena punya kebiasaan sendiri dalam memberi nama titik, menempatkan label, memilih warna, dan menandai sudut.

Saya membuat **Studio TikZ** supaya bisa menggambar dan melihat kode yang akan masuk ke modul di layar yang sama. Saya juga ingin orang yang sedang belajar TikZ bisa mengenal gaya penulisan saya. Coba buat satu ruas $AB$, klik ruasnya, lalu perhatikan baris kode yang disorot. Ubah garisnya menjadi putus-putus dan lihat apa yang berubah. Menurut saya, percobaan kecil seperti ini lebih mudah diikuti daripada membaca seluruh kode sebuah diagram sekaligus.

{% include studio-tikz-contoh.html %}

## Coba satu diagram

Pada segitiga $ABC$, saya ingin menempatkan $D$ pada $AB$ sehingga $AD=2\cdot DB$. Di menu **Titik dan garis**, pilih **Titik dari rumus vektor**, ketik `D = (A + 2B) / 3`, lalu tekan **Enter**. Sekarang geser $B$. $D$ akan ikut bergerak dan pembagian ruasnya tetap sama. Di panel **Kode TikZ**, pilih **Gambar lengkap** untuk melihat bagaimana $D$ dinyatakan menggunakan $A$ dan $B$, atau **Koordinat saja** untuk mengambil nilai koordinatnya.

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

Di kanvas, klik **?** di sebelah nama alat yang sedang dipakai, lalu **Putar animasi**. Klik **Jeda** jika ingin melihat letak kursor lebih lama. Tombol langkah sebelumnya dan berikutnya membantumu mengamati satu klik, dan **Ulangi** mengembalikan animasi ke awal. Di bawah setiap animasi alat gambar, buka **Utak-atik contoh** untuk menggeser titik pada konstruksi yang baru diperagakan. Lewat **Panduan alat**, kamu juga bisa mencari 19 topik editor, misalnya <a href="{{ '/tools/studio-tikz/index.html' | relative_url }}#panduan/editor-export">menyalin koordinat ke LaTeX</a>. Seluruh 44 animasi alat dan 19 animasi editor tersimpan di dalam HTML, jadi semuanya bisa diputar saat mengajar tanpa internet.

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

## Kelebihan

- **Kode bisa dipelajari sambil menggambar.** Saya bisa menelusuri hubungan antara objek di kanvas dan perintah TikZ-nya, lalu menyunting kode tersebut langsung di dokumen saya.
- **Konstruksi mengikuti titik acuannya.** Saat susunan gambar perlu dirapikan, titik tengah, garis singgung, dan bayangan inversi ikut diperbarui. Ini membantu saat saya ingin memeriksa beberapa konfigurasi untuk soal yang sama.
- **Tampilan siap disesuaikan untuk modul.** Label mendukung LaTeX. Ketebalan garis, pola putus-putus, penanda sudut, warna, dan opasitas bisa diatur per objek. Saat skala ekspor diubah, radius cetak titik tetap $1{,}5\,\mathrm{pt}$.
- **Bisa dibawa mengajar.** Saya bisa menyimpan editor dan contoh diagram di laptop sebelum kelas, lalu membuka keduanya saat mengajar.

## Keterbatasan

- **Belum ada daftar proyek di dalam editor.** Browser mengingat satu lembar aktif. Kamu tetap bisa menyimpan banyak gambar sebagai file terpisah. Klik **Simpan proyek**, beri nama yang mudah dikenali seperti `inversi.stikz.json` dan `menelaus.stikz.json`, lalu pilih **Buka file** saat ingin melanjutkan salah satunya. Kalau browser langsung mengunduh dengan nama bawaan, ubah nama file di folder unduhan.
- **Cakupannya geometri olimpiade.** Saat ini belum ada plot fungsi seperti $y=x^2$, atau alat umum untuk parabola, elips, dan hiperbola. Untuk kebutuhan menggambar grafik, saya masih memilih GeoGebra. Fokus Studio TikZ adalah konstruksi dan penyajian diagram geometri.
- **Impor GeoGebra mendukung sebagian objek 2D.** Pada berkas `.ggb`, sebagian titik dibaca dari koordinat tersimpan. Hubungan konstruksi dari GeoGebra belum tentu ikut terbawa. Format `.stikz.json` menyimpan hubungan yang dibuat di Studio TikZ.
- **Salinan offline perlu diperbarui manual.** Untuk memakai versi yang lebih baru, buka kembali halaman proyek ini, unduh HTML terbaru, lalu buka file proyekmu di sana. Menyimpan gambar dan memperbarui aplikasi menggunakan dua file yang berbeda.

Kalau kamu mencoba Studio TikZ untuk bahan ajar atau soal olimpiade, saya ingin tahu bagian mana yang mudah diikuti dan bagian mana yang masih membingungkan. Contoh konstruksi atau potongan kode yang kamu pakai akan membantu saya memahami masukannya.
