/* ================= MULTI-USER AUTHENTICATION ================= */
const multiLoginForm = document.getElementById('multiLoginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const errorAlert = document.getElementById('errorAlert');
const logoutBtn = document.getElementById('logoutBtn');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const eyeIcon = document.getElementById('eyeIcon');

if (togglePasswordBtn && passwordInput && eyeIcon) {
    togglePasswordBtn.addEventListener('click', () => {
        const isPass = passwordInput.type === 'password';
        passwordInput.type = isPass ? 'text' : 'password';
        eyeIcon.setAttribute('icon', isPass ? 'solar:eye-bold-duotone' : 'solar:eye-closed-bold-duotone');
    });
}

        function getUsersDB() {
            if (window.FRIENDS_DATA && Object.keys(window.FRIENDS_DATA).length > 0) {
                return window.FRIENDS_DATA;
            }
            return {
                "nisa": {
                    token: "nisa-123",
                    name: "Nisa",
                    subtitle: "Sebuah ruang tenang dan hadiah apresiasi khusus untukmu 🌊",
                    letter: "Selamat ulang tahun ya Nisa! Web ini dibuat bukan cuma buat ucapan biasa, tapi sebagai tempat tenang kapanpun kamu butuh rehat sejenak. Putar lagunya, simpan foto-foto bahagiamu, dan jangan lupa kalau kamu sudah berjuang luar biasa sampai hari ini. 🤍",
                    journey: [
                        { title: "Chapter 1: Awal Perjalanan", desc: "Mengingat kembali langkah-langkah kecil yang membawamu sampai sejauh ini. Bangga banget sama caramu terus belajar dan bertumbuh." },
                        { title: "Chapter 2: Melewati Ombak Berat", desc: "Terima kasih sudah tidak pernah menyerah meski kadang hari-hari terasa berat dan melelahkan. Kamu hebat lebih dari yang kamu kira." },
                        { title: "Chapter 3: Self-Reward Hari Ini", desc: "Hari ini giliranmu untuk beristirahat, memanjakan diri, dan menikmati hal-hal yang membuat hatimu hangat." }
                    ],
                    playlist: [
                        { title: "Seasons", artist: "Wave to Earth" },
                        { title: "Love", artist: "Wave to Earth" },
                        { title: "Bad", artist: "Wave to Earth" },
                        { title: "Peach Eyes", artist: "Wave to Earth" },
                        { title: "Light", artist: "Wave to Earth" }
                    ]
                },
                "dimas": {
                    token: "dimas-2026",
                    name: "Dimas",
                    subtitle: "Ruang santai, musik ombak, dan perjalanan pribadimu 🌿",
                    letter: "Selamat bertambah usia bro! Semoga sehat dan sukses selalu. Website ini sengaja kubuat biar kamu punya tempat rehat sambil dengerin musik favorit.",
                    journey: [
                        { title: "Chapter 1: The Beginning", desc: "Langkah awal yang penuh mimpi dan keberanian untuk melangkah." },
                        { title: "Chapter 2: Small Wins", desc: "Kemenangan-kemenangan kecil yang membuktikan kamu terus berkembang." },
                        { title: "Chapter 3: Keep Going", desc: "Tetap melangkah ke depan dengan caramu sendiri. Nikmati setiap prosesnya!" }
                    ],
                    playlist: [
                        { title: "Seasons", artist: "Wave to Earth" },
                        { title: "Sunny Days", artist: "Wave to Earth" },
                        { title: "Nouvelle Vague", artist: "Wave to Earth" }
                    ]
                },
                "teman": {
                    token: "hihi-2026",
                    name: "Teman Baik",
                    subtitle: "Ruang santai, musik ombak tenang, dan self-reward 🌊",
                    letter: "Selamat bertambah usia! Ini ruang spesial untukmu: dengarkan musik, tambahkan foto kenanganmu, dan ingat selalu bahwa kamu sangat berharga. 🤍",
                    journey: [
                        { title: "Chapter 1: Langkah Pertama", desc: "Setiap langkah kecil adalah awal dari perjalanan hebat yang sedang kamu ukir." },
                        { title: "Chapter 2: Melewati Badai", desc: "Terima kasih sudah bertahan dan selalu mencoba yang terbaik setiap harinya." },
                        { title: "Chapter 3: Hari Kebaikanmu", desc: "Hari ini giliranmu untuk memanjakan diri, bernafas lega, dan berbahagia sepenuhnya." }
                    ],
                    playlist: [
                        { title: "Seasons", artist: "Wave to Earth" },
                        { title: "Love", artist: "Wave to Earth" },
                        { title: "Bad", artist: "Wave to Earth" }
                    ]
                }
            };
        }

        /* ================= AUTHENTICATION ================= */

        multiLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const u = usernameInput.value.trim().toLowerCase();
            const p = passwordInput.value.trim();
            const db = getUsersDB();

            // Cocokkan username secara fleksibel (case-insensitive)
            const matchedKey = Object.keys(db).find(k => k.toLowerCase() === u);
            const userObj = matchedKey ? db[matchedKey] : null;

            // Fleksibel: dukung 'token', 'password', maupun 'sandi'
            const validSecret = userObj ? (userObj.token || userObj.password || userObj.sandi) : null;

            if (userObj && validSecret && String(validSecret).trim() === p) {
                currentUser = matchedKey;
                sessionStorage.setItem('hihi_auth_user', matchedKey);
                errorAlert.classList.remove('visible');
                loadUserData(matchedKey);
            } else {
                errorAlert.classList.add('visible');
            }
        });

        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('hihi_auth_user');
            currentUser = null;
            if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
            loginPortal.style.display = 'flex';
            mainDashboard.style.display = 'none';
            persistentBar.style.display = 'none';
            usernameInput.value = '';
            passwordInput.value = '';
        });

        function checkExistingSession() {
            const saved = sessionStorage.getItem('hihi_auth_user');
            const db = getUsersDB();
            const matchedKey = saved ? Object.keys(db).find(k => k.toLowerCase() === saved.toLowerCase()) : null;
            if (matchedKey && db[matchedKey]) {
                currentUser = matchedKey;
                loadUserData(matchedKey);
            } else {
                loginPortal.style.display = 'flex';
                mainDashboard.style.display = 'none';
                persistentBar.style.display = 'none';
            }
        }