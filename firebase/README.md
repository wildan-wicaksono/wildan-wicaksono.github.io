# Komentar Google untuk blog

Kode komentar baru sudah tersedia. **Aktivasi membutuhkan proyek Firebase milik pemilik blog.** Konfigurasi awal `_data/native_comments.yml` sengaja memakai `enabled: false`, sehingga giscus dan seluruh komentar GitHub tetap berjalan selama penyiapan.

## Fitur

- Reaksi artikel: 👍 ❤️ 😄 🎉 😮 👏. Satu reaksi per akun, bisa diganti atau dibatalkan.
- Reaksi komentar/balasan: ❤️ 😄 🎉 😮 👏, ditambah upvote ▲ yang berdiri sendiri.
- Masuk Google dengan sesi tersimpan di browser. Pertama kali tetap perlu memilih akun/menyetujui login; login Chrome saja belum memberikan sesi ke blog.
- Edit/hapus komentar sendiri, tanda diedit, balasan tetap ada ketika komentar induk dihapus.
- Urutan terbaru, terlama, populer; balasan selalu kronologis; halaman berisi paling banyak 20 komentar.
- Moderator dapat menyembunyikan/menampilkan komentar. Identitas moderator ditentukan UID Firebase.
- Jeda 30 detik antar komentar, batas 4.000 karakter, teks dirender aman sebagai teks biasa.
- Tampilan ponsel dan tema blog terang/gelap. JavaScript dimuat ketika bagian komentar mendekati layar.
- Komentar GitHub lama dapat diimpor beserta penulis, tanggal, struktur, dan jumlah reaksi/upvote. Reaksi 😕 lama tetap 😕. Roket tidak ditampilkan sebagai pilihan baru.

## 1. Siapkan Firebase

Di [Firebase Console](https://console.firebase.google.com/):

1. Buat/pilih proyek, lalu daftarkan aplikasi Web. Salin `apiKey`, `authDomain`, `projectId`, dan `appId` ke `_data/native_comments.yml`. Konfigurasi Web ini bersifat publik; keamanan data ditentukan Authentication dan Rules.
2. Aktifkan **Authentication → Sign-in method → Google**. Tambahkan `wildan-wicaksono.github.io` di **Settings → Authorized domains**. Tambahkan `localhost` hanya untuk pengujian lokal bila diperlukan.
3. Buat **Cloud Firestore**, database `(default)`, mode Standard. Pilih lokasi dengan sengaja karena datanya akan tinggal di sana.
4. Buka **Cloud Shell** lewat ikon terminal di menu kanan Firebase Console. Cloud Shell memakai akun Google yang sedang masuk; klik **Authorize** jika diminta. Jalankan perintah berikut satu per satu:

```bash
gcloud config set project wildan-wicaksono-github
nvm install 22
nvm use 22
git clone --depth 1 https://github.com/wildan-wicaksono/wildan-wicaksono.github.io.git blog-comments-activation
cd blog-comments-activation/firebase
npm ci
npx firebase deploy --project wildan-wicaksono-github --only firestore:rules,firestore:indexes
```

Konfigurasi proyek sudah tersedia di repositori, sehingga tidak perlu `firebase init`. Cloud Shell menyediakan kredensial Google bawaan untuk CLI dan Admin SDK; jangan menjalankan `gcloud auth application-default login` di Cloud Shell. Lihat dokumentasi [Cloud Shell di Firebase](https://firebase.google.com/docs/cloud-shell) dan [ADC di lingkungan cloud](https://docs.cloud.google.com/docs/authentication/set-up-adc-cloud-dev-environment).

Untuk pengujian di komputer lokal, gunakan Node.js 22 dan Java 17 atau lebih baru, lalu jalankan dari direktori `firebase`:

```bash
npm ci
npm test
npm run build
npx firebase login
npx firebase deploy --project YOUR_FIREBASE_PROJECT_ID --only firestore:rules,firestore:indexes
```

Tunggu seluruh indeks selesai dibangun sebelum aktivasi. Rules dalam repositori membatasi kepemilikan komentar, moderasi, perubahan penghitung, dan jeda kirim di server. Jangan menggantinya dengan aturan terbuka.

Bundle `assets/js/comments/app.js` sudah dikomit agar GitHub Pages tidak membutuhkan Node saat membangun Jekyll. Jalankan `npm run build:comments` dari akar repositori setelah mengubah kode komentar, lalu komit hasilnya. Direktori `firebase` dikecualikan dari situs yang dipublikasikan.

## 2. Pindahkan komentar lama

Cadangan awal `migrations/github-discussions.json` berisi kedua Discussion yang ada: satu komentar dan satu balasan pada artikel *Menjalani Bagianku, Melepaskan Sisanya*. Cadangan HTML awal dipakai untuk validasi dan pengujian; impor produksi meminta ekspor GraphQL terbaru agar waktu edit dan jumlah upvote benar-benar terverifikasi.

Ikuti [panduan migrasi](docs/migration.md). Workflow **Export legacy comments** dapat menghasilkan snapshot terverifikasi dengan token bawaan GitHub Actions yang hanya memiliki akses baca, sehingga pemilik blog tidak perlu membuat token GitHub. Setelah snapshot hasil workflow diperiksa dan dikomit, Cloud Shell cukup memperbarui salinan repositori, memvalidasi snapshot, dan menjalankan impor.

Impor memakai Firebase Admin SDK melalui **Application Default Credentials**. Cloud Shell sudah menyediakannya. Untuk alternatif ekspor/impor pada komputer lokal, login `gh` atau token GitHub dengan akses baca Discussions dibutuhkan untuk ekspor; login Firebase CLI saja tidak menyediakan kredensial Admin SDK. Contoh pada komputer pemilik proyek dengan Google Cloud CLI:

```bash
gcloud auth application-default login
node scripts/export-discussions.mjs
node scripts/import-comments.mjs
```

Periksa cadangan dan checksum yang tercetak. **Perbarui `expectedSnapshotSHA256` di `_data/native_comments.yml` dengan checksum ekspor terbaru.** Tepat sebelum beralih, hentikan komentar baru pada Discussions lama sementara agar tidak ada komentar masuk di antara ekspor dan pergantian. Kemudian terapkan impor:

```bash
node scripts/import-comments.mjs --project YOUR_FIREBASE_PROJECT_ID --apply
```

Impor dan penanda selesai ditulis dalam satu transaksi. Menjalankan snapshot yang sama lagi tidak menimpa edit, moderasi, suara, atau reaksi baru. Snapshot yang berubah setelah impor selesai ditolak dan memerlukan rekonsiliasi tersendiri. Discussion GitHub tidak dihapus oleh skrip.

## 3. Aktifkan dan uji

Ubah `enabled: true` di `_data/native_comments.yml`, komit, lalu tunggu GitHub Pages selesai membangun. Komentar baru tampil hanya setelah konfigurasi, koneksi, checksum penanda migrasi, dan pembacaan awal berhasil. Bila inisialisasi gagal atau lebih dari 15 detik, situs kembali menampilkan giscus.

Periksa artikel lama: penulis dan balasannya, tanggal, 😕 artikel, 😄 komentar, dan satu upvote. Lalu uji masuk Google, komentar/balasan, edit/hapus sendiri, reaksi/upvote, tema, dan tampilan ponsel. Setelah sistem baru aktif, pertahankan Discussions sebagai arsip baca; tombol kirim giscus pada jalur cadangan tidak dapat mengirim bila Discussions dikunci.

Untuk lencana penulis dan moderasi, masuk dengan akun Google pemilik blog, salin UID dari **Firebase Authentication → Users**, lalu isi `ownerUid` di konfigurasi situs. Berikan hak moderator melalui lingkungan operator yang telah memiliki ADC:

```bash
node scripts/set-admin.mjs --project YOUR_FIREBASE_PROJECT_ID --uid YOUR_FIREBASE_UID
node scripts/set-admin.mjs --project YOUR_FIREBASE_PROJECT_ID --uid YOUR_FIREBASE_UID --apply
```

Perintah pertama hanya menampilkan rencana. Tambahkan `--remove --apply` untuk mencabut hak moderator. Masuk ulang untuk segera memperbarui kontrol. Nama tampilan dan email tidak digunakan untuk memberikan hak moderator.

## 4. Kepemilikan komentar GitHub lama (opsional)

Komentar impor tetap memakai identitas GitHub asli, bukan otomatis dianggap milik akun Google dengan nama yang sama. Agar penulis asli dapat mengedit/menghapusnya:

1. Aktifkan provider **GitHub** di Firebase Authentication dan ikuti petunjuk OAuth App/callback yang diberikan Firebase.
2. Simpan GitHub client secret hanya di pengaturan provider Firebase, jangan di repositori.
3. Ubah `githubLinkEnabled: true`, lalu komit konfigurasi.
4. Penulis masuk Google sekali, kemudian memilih **Hubungkan GitHub** dengan akun GitHub asli.

Aturan mengecek numeric GitHub ID dari token yang terverifikasi. Pembaca baru cukup memakai Google; GitHub hanya dibutuhkan untuk membuktikan kepemilikan komentar lama. Saat fitur penghubungan belum disiapkan, tombolnya tidak muncul.

## Pengujian dan biaya pembacaan

Jalankan `npm test` di direktori ini untuk Rules, operasi adapter, serta impor/transaksi migrasi di emulator lokal. `npm run import:comments` hanya memvalidasi snapshot tanpa koneksi database sampai diberi `--apply`.

Situs tidak memasang listener realtime. Komentar diambil per halaman dan balasan saat dibuka; tombol Segarkan mengambil data terbaru. Pengunjung yang masuk juga membaca catatan interaksi miliknya agar tombol reaksi/upvote menampilkan status yang tepat. Satu kunjungan dapat memakai beberapa pembacaan dokumen; satu komentar bukan selalu satu penulisan karena transaksi juga mencatat jeda kirim. Pantau penggunaan di Firebase Console setelah aktivasi.

Lihat [model data dan aturan akses](docs/data-model.md) untuk detail pemeliharaan. Kredensial Admin SDK, token GitHub, dan client secret tidak boleh dimasukkan ke file konfigurasi publik.
