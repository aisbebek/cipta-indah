/**
 * ====================================================================
 * 🌊 DAFTAR TEMAN, TOKEN RAHASIA & ISI HADIAH (HIHI TIME)
 * ====================================================================
 * Di file ini, kamu bisa bebas menambah, mengedit, atau menghapus teman!
 *
 * CARA MENGUBAH / MENAMBAH TEMAN:
 * 1. 'username': kata kunci login (huruf kecil, tanpa spasi, misal: "nisa").
 * 2. 'token': kata sandi rahasia yang kamu berikan ke temanmu.
 * 3. 'name': nama panggilan yang akan ditampilkan di web.
 * 4. 'subtitle': kalimat pengantar di bawah nama mereka.
 * 5. 'letter': surat tulus yang bisa mereka baca saat kartu surat diklik.
 * 6. 'journey': cerita perjalanan (Chapter 1, 2, 3) yang bermakna.
 * 7. 'playlist': daftar lagu favorit mereka (Wave to Earth, dll).
 */

window.FRIENDS_DATA = {
    // ----------------------------------------------------
    // AKUN 1: Contoh Akun Teman Pertama
    // ----------------------------------------------------
    "Dhea": {
        token: "dhea2006",
        name: "Dhea",
        subtitle: "Sebuah ruang tenang dan hadiah apresiasi khusus untukmu 🌊",
        letter: "Selamat ulang tahun ya Nisa! Web ini dibuat bukan cuma buat ucapan biasa, tapi sebagai tempat tenang kapanpun kamu butuh rehat sejenak. Putar lagunya, simpan foto-foto bahagiamu, dan jangan lupa kalau kamu sudah berjuang luar biasa sampai hari ini. 🤍",
        journey: [
            { 
                title: "Chapter 1: Awal Perjalanan", 
                desc: "Mengingat kembali langkah-langkah kecil yang membawamu sampai sejauh ini. Bangga banget sama caramu terus belajar dan bertumbuh." 
            },
            { 
                title: "Chapter 2: Melewati Ombak Berat", 
                desc: "Terima kasih sudah tidak pernah menyerah meski kadang hari-hari terasa berat dan melelahkan. Kamu hebat lebih dari yang kamu kira." 
            },
            { 
                title: "Chapter 3: Self-Reward Hari Ini", 
                desc: "Hari ini giliranmu untuk beristirahat, memanjakan diri, dan menikmati hal-hal yang membuat hatimu hangat." 
            }
        ],
        playlist: [
            { title: "Seasons", artist: "Wave to Earth" },
            { title: "Love", artist: "Wave to Earth" },
            { title: "Bad", artist: "Wave to Earth" },
            { title: "Peach Eyes", artist: "Wave to Earth" },
            { title: "Light", artist: "Wave to Earth" }
        ]
    },

    // ----------------------------------------------------
    // AKUN 2: Contoh Akun Teman Kedua
    // ----------------------------------------------------
    "dimas": {
        token: "dimas-2026",
        name: "Dimas",
        subtitle: "Ruang santai, musik ombak, dan perjalanan pribadimu 🌿",
        letter: "Selamat bertambah usia bro! Semoga sehat dan sukses selalu. Website ini sengaja kubuat biar kamu punya tempat rehat sambil dengerin musik favorit.",
        journey: [
            { 
                title: "Chapter 1: The Beginning", 
                desc: "Langkah awal yang penuh mimpi dan keberanian untuk melangkah." 
            },
            { 
                title: "Chapter 2: Small Wins", 
                desc: "Kemenangan-kemenangan kecil yang membuktikan kamu terus berkembang." 
            },
            { 
                title: "Chapter 3: Keep Going", 
                desc: "Tetap melangkah ke depan dengan caramu sendiri. Nikmati setiap prosesnya!" 
            }
        ],
        playlist: [
            { title: "Seasons", artist: "Wave to Earth" },
            { title: "Sunny Days", artist: "Wave to Earth" },
            { title: "Nouvelle Vague", artist: "Wave to Earth" }
        ]
    },

    // ----------------------------------------------------
    // AKUN 3: Akun Default / Tes (Bisa kamu ganti nama & tokennya)
    // ----------------------------------------------------
    "teman": {
        token: "hihi-2026",
        name: "Teman Baik",
        subtitle: "Ruang santai, musik ombak tenang, dan self-reward 🌊",
        letter: "Selamat bertambah usia! Ini ruang spesial untukmu: dengarkan musik, tambahkan foto kenanganmu, dan ingat selalu bahwa kamu sangat berharga. 🤍",
        journey: [
            { 
                title: "Chapter 1: Langkah Pertama", 
                desc: "Setiap langkah kecil adalah awal dari perjalanan hebat yang sedang kamu ukir." 
            },
            { 
                title: "Chapter 2: Melewati Badai", 
                desc: "Terima kasih sudah bertahan dan selalu mencoba yang terbaik setiap harinya." 
            },
            { 
                title: "Chapter 3: Hari Kebaikanmu", 
                desc: "Hari ini giliranmu untuk memanjakan diri, bernafas lega, dan berbahagia sepenuhnya." 
            }
        ],
        playlist: [
            { title: "Seasons", artist: "Wave to Earth" },
            { title: "Love", artist: "Wave to Earth" },
            { title: "Bad", artist: "Wave to Earth" }
        ]
    }
};
