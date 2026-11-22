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

Kalau sedang menyiapkan diagram untuk modul olimpiade, saya biasanya membuka GeoGebra, mencoba beberapa posisi titik sampai gambarnya enak dibaca, lalu melihat koordinatnya. Setelah itu saya pindah ke dokumen LaTeX dan mengetik TikZ secara manual. GeoGebra sebenarnya sudah menyediakan ekspor TikZ. Saya tetap sering menulis ulang kodenya karena punya kebiasaan sendiri dalam memberi nama titik, menempatkan label, memilih warna, dan menandai sudut.

Saya membuat **Studio TikZ** supaya bisa menggambar dan melihat kode yang akan masuk ke modul di layar yang sama. Saya juga ingin orang yang sedang belajar TikZ bisa mengenal gaya penulisan saya. Coba buat satu ruas AB, klik ruasnya, lalu perhatikan baris kode yang disorot. Ubah garisnya menjadi putus-putus dan lihat apa yang berubah. Menurut saya, percobaan kecil seperti ini lebih mudah diikuti daripada membaca seluruh kode sebuah diagram sekaligus.

<p><a class="btn btn--primary" href="{{ '/tools/studio-tikz/index.html' | relative_url }}">Buka Studio TikZ</a> <a class="btn" href="{{ '/tools/studio-tikz/index.html' | relative_url }}" download="Studio-TikZ.html">Unduh versi offline</a></p>

## Coba satu diagram

Pada segitiga ABC, saya ingin menempatkan D pada AB sehingga AD dua kali DB. Di menu **Titik dan garis**, pilih **Titik dari rumus vektor**, ketik `D = (A + 2B) / 3`, lalu tekan **Enter**. Sekarang geser B. D akan ikut bergerak dan pembagian ruasnya tetap sama. Di panel **Kode TikZ**, pilih **Gambar lengkap** untuk melihat bagaimana D dinyatakan menggunakan A dan B, atau **Koordinat saja** untuk mengambil nilai koordinatnya.

Di contoh yang bisa diunduh, salah satu baris hasil ekspornya berbunyi seperti ini.

```latex
\coordinate[label={[text=PineGreen]below:$D$}] (D) at (${1/3}*(A) + {2/3}*(B)$);
```

Bagian `at` menyatakan D sebagai sepertiga A ditambah dua pertiga B. Bagian `label` menempatkan huruf D berwarna hijau di bawah titik. Coba ganti `below` menjadi `above` di LaTeX untuk memindahkan hurufnya.

<figure>
  <img src="{{ '/assets/studio-tikz-demo.png' | relative_url }}" alt="Contoh segitiga ABC dengan D pada ruas AB, beserta cuplikan kode TikZ." width="800">
  <figcaption>Titik D terletak dua pertiga jalan dari A ke B.</figcaption>
</figure>

<details>
  <summary>Lihat langkahnya dalam animasi</summary>
  <p><img src="{{ '/assets/studio-tikz-demo.gif' | relative_url }}" alt="Animasi pembuatan segitiga ABC dan titik D dari rumus vektor, disertai perubahan pada gambar dan kode TikZ." width="800" loading="lazy"></p>
</details>

<p><a href="{{ '/tools/studio-tikz/contoh-segitiga.stikz.json' | relative_url }}" download="contoh-segitiga.stikz.json">Unduh contoh segitiga</a>, lalu pilih <strong>Buka file</strong> di editor untuk mencoba konstruksi yang sudah jadi. Untuk membuat gambar dari awal, ikuti <a href="{{ '/tools/studio-tikz/panduan.html' | relative_url }}">panduan pengguna</a>. Tombol <strong>?</strong> di sebelah nama setiap alat juga menampilkan ilustrasi, urutan klik, dan hasilnya.</p>

## Kelebihan

- **Kode bisa dipelajari sambil menggambar.** Saya bisa menelusuri hubungan antara objek di kanvas dan perintah TikZ-nya, lalu menyunting kode tersebut langsung di dokumen saya.
- **Konstruksi mengikuti titik acuannya.** Saat susunan gambar perlu dirapikan, titik tengah, garis singgung, dan bayangan inversi ikut diperbarui. Ini membantu saat saya ingin memeriksa beberapa konfigurasi untuk soal yang sama.
- **Tampilan siap disesuaikan untuk modul.** Label mendukung LaTeX. Ketebalan garis, pola putus-putus, penanda sudut, warna, dan opasitas bisa diatur per objek. Saat skala ekspor diubah, radius cetak titik tetap 1,5 pt.
- **Bisa dibawa mengajar.** Setelah satu file HTML diunduh, editor beserta seluruh panduan bergambarnya bisa dibuka tanpa koneksi internet.

## Keterbatasan

- **Belum ada daftar proyek di dalam editor.** Browser mengingat satu lembar aktif. Kamu tetap bisa menyimpan banyak gambar sebagai file terpisah. Klik **Simpan proyek**, beri nama yang mudah dikenali seperti `inversi.stikz.json` dan `menelaus.stikz.json`, lalu pilih **Buka file** saat ingin melanjutkan salah satunya. Kalau browser langsung mengunduh dengan nama bawaan, ubah nama file di folder unduhan.
- **Cakupannya geometri olimpiade.** Saat ini belum ada plot fungsi seperti `y = x²`, atau alat umum untuk parabola, elips, dan hiperbola. Untuk kebutuhan menggambar grafik, saya masih memilih GeoGebra. Fokus Studio TikZ adalah konstruksi dan penyajian diagram geometri.
- **Impor GeoGebra mendukung sebagian objek 2D.** Pada berkas `.ggb`, sebagian titik dibaca dari koordinat tersimpan. Hubungan konstruksi dari GeoGebra belum tentu ikut terbawa. Format `.stikz.json` menyimpan hubungan yang dibuat di Studio TikZ.
- **Salinan offline perlu diperbarui manual.** Untuk memakai versi yang lebih baru, buka kembali halaman proyek ini, unduh HTML terbaru, lalu buka file proyekmu di sana. Menyimpan gambar dan memperbarui aplikasi menggunakan dua file yang berbeda.

Kalau kamu mencoba Studio TikZ untuk bahan ajar atau soal olimpiade, saya ingin tahu bagian mana yang mudah diikuti dan bagian mana yang masih membingungkan. Contoh konstruksi atau potongan kode yang kamu pakai akan membantu saya memahami masukannya.
