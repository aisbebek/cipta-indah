/* ================= APP CORE, NAVIGATION & BUBBLE CANVAS ================= */
let currentUser = null;
let currentChapterIndex = 0;
let ytPlayer = null;
let isYtReady = false;
let isPlaying = false;
let userPlaylists = [];
let currentOpenPlaylistId = null;
let currentPlayingPlaylistId = null;
let currentPlayingSongIndex = 0;

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

function extractYouTubeId(url) {
    if (!url) return null;
    url = url.trim();
    if (url.length === 11 && !url.includes('/')) return url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function formatSeconds(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

        /* ================= PROFIL PENGGUNA & MULTI-LANGUAGE ================= */
        const DEFAULT_AVATARS = [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
        ];
        let selectedProfileAvatar = DEFAULT_AVATARS[0];
        let currentLanguage = "id";

        const TRANSLATIONS = {
            id: {
                tag: "ID",
                greeting: (name) => `Halo, ${name}! ✨`,
                editProfile: "Edit Profil",
                tabHome: "Beranda",
                tabMusic: "Detail Playlist",
                tabJourney: "The Journey",
                tabPhotos: "Galeri Polaroid",
                plTitle: "Koleksi Playlist Musik",
                plSub: "Geser ke samping untuk melihat semua playlist favoritmu 🎧",
                closePl: "← Tutup & Kembali ke Kolom Playlist",
                addSong: "+ Tambah Lagu YouTube",
                createPl: "+ Buat Playlist",
                logout: "Keluar",
                nowPlaying: "Memutar: "
            },
            en: {
                tag: "EN",
                greeting: (name) => `Hello, ${name}! ✨`,
                editProfile: "Edit Profile",
                tabHome: "Home",
                tabMusic: "Music Room",
                tabJourney: "The Journey",
                tabPhotos: "Polaroid Gallery",
                plTitle: "Music Playlist Collection",
                plSub: "Select a playlist to open its tracks 🎧",
                closePl: "← Close & Back to Playlists",
                addSong: "+ Add YouTube Song",
                createPl: "+ New Playlist",
                logout: "Logout",
                nowPlaying: "Playing: "
            },
            ja: {
                tag: "JA",
                greeting: (name) => `こんにちは、${name}さん！ ✨`,
                editProfile: "プロフィール編集",
                tabHome: "ホーム",
                tabMusic: "音楽ルーム",
                tabJourney: "物語 (Journey)",
                tabPhotos: "ポラロイド",
                plTitle: "プレイリストコレクション",
                plSub: "プレイリストを選択して曲を再生 🎧",
                closePl: "← 戻る",
                addSong: "+ YouTube追加",
                createPl: "+ プレイリスト作成",
                logout: "ログアウト",
                nowPlaying: "再生中: "
            },
            ko: {
                tag: "KO",
                greeting: (name) => `안녕하세요, ${name}님! ✨`,
                editProfile: "프로필 수정",
                tabHome: "홈",
                tabMusic: "뮤직룸",
                tabJourney: "더 저니",
                tabPhotos: "폴라로이드",
                plTitle: "플레이리스트 컬렉션",
                plSub: "플레이리스트를 선택하여 감상해보세요 🎧",
                closePl: "← 닫고 돌아가기",
                addSong: "+ 유튜브 추가",
                createPl: "+ 플레이리스트 추가",
                logout: "로그아웃",
                nowPlaying: "재생 중: "
            }
        };

        function getUserProfileKey() {
            return `hihi_profile_v2_${currentUser || 'default'}`;
        }

        function loadUserProfile() {
            const raw = localStorage.getItem(getUserProfileKey());
            const db = getUsersDB();
            const defaultData = (currentUser && db[currentUser]) ? db[currentUser] : { name: "Nisa", subtitle: "Sebuah ruang tenang dan hadiah apresiasi khusus untukmu 🌊" };

            let profile = {
                name: defaultData.name || "Nisa",
                bio: defaultData.subtitle || "Sebuah ruang tenang dan hadiah apresiasi khusus untukmu 🌊",
                avatar: DEFAULT_AVATARS[0],
                lang: "id"
            };

            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
                    profile = Object.assign(profile, parsed);
                } catch (e) {}
            }

            selectedProfileAvatar = profile.avatar;
            currentLanguage = profile.lang || "id";

            applyProfileToUI(profile);
            applyLanguage(currentLanguage);
        }

        function applyProfileToUI(profile) {
            const welcomeHeading = document.getElementById('welcomeHeading');
            const welcomeSubtitle = document.getElementById('welcomeSubtitle');
            const activeUserLabel = document.getElementById('activeUserLabel');
            const navAvatarImg = document.getElementById('navAvatarImg');
            const bannerAvatarImg = document.getElementById('bannerAvatarImg');
            const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.id;

            if (welcomeHeading) welcomeHeading.textContent = t.greeting(profile.name);
            if (welcomeSubtitle) welcomeSubtitle.textContent = profile.bio;
            if (activeUserLabel) activeUserLabel.textContent = `Ruang: ${profile.name}`;
            if (navAvatarImg) navAvatarImg.src = profile.avatar;
            if (bannerAvatarImg) bannerAvatarImg.src = profile.avatar;
        }

        function applyLanguage(lang) {
            currentLanguage = lang;
            const t = TRANSLATIONS[lang] || TRANSLATIONS.id;

            const tag = document.getElementById('currentLangTag');
            if (tag) tag.textContent = t.tag;

            const editProfileChipText = document.getElementById('editProfileChipText');
            if (editProfileChipText) editProfileChipText.textContent = t.editProfile;

            const logoutText = document.getElementById('logoutText');
            if (logoutText) logoutText.textContent = t.logout;

            // Nav tabs
            const tabHome = document.querySelector('.nav-tab-btn[data-tab="home"] span');
            const tabMusic = document.querySelector('.nav-tab-btn[data-tab="music"] span');
            const tabJourney = document.querySelector('.nav-tab-btn[data-tab="journey"] span');
            const tabPhotos = document.querySelector('.nav-tab-btn[data-tab="photos"] span');

            if (tabHome) tabHome.textContent = t.tabHome;
            if (tabMusic) tabMusic.textContent = t.tabMusic;
            if (tabJourney) tabJourney.textContent = t.tabJourney;
            if (tabPhotos) tabPhotos.textContent = t.tabPhotos;

            // Update greeting with profile name
            const raw = localStorage.getItem(getUserProfileKey());
            const profile = raw ? JSON.parse(raw) : { name: "Nisa" };
            const welcomeHeading = document.getElementById('welcomeHeading');
            if (welcomeHeading) welcomeHeading.textContent = t.greeting(profile.name || "Nisa");
        }

        function cycleLanguage() {
            const langs = ["id", "en", "ja", "ko"];
            const nextIdx = (langs.indexOf(currentLanguage) + 1) % langs.length;
            setLanguage(langs[nextIdx]);
        }

        function setLanguage(lang) {
            currentLanguage = lang;
            applyLanguage(lang);
            // Save to profile storage
            const raw = localStorage.getItem(getUserProfileKey());
            let p = raw ? JSON.parse(raw) : {};
            p.lang = lang;
            localStorage.setItem(getUserProfileKey(), JSON.stringify(p));
        }


        /* ================= LOAD USER DATA ================= */
        function loadUserData(uKey) {
            const db = getUsersDB();
            const user = db[uKey];
            if (!user) return;

            loginPortal.style.display = 'none';
            mainDashboard.style.display = 'flex';
            persistentBar.style.display = 'flex';

            const aul = document.getElementById('activeUserLabel');
            if (aul) aul.textContent = `Ruang: ${user.name}`;
            const wh = document.getElementById('welcomeHeading');
            if (wh) wh.textContent = `Halo, ${user.name}! ✨`;
            const ws = document.getElementById('welcomeSubtitle');
            if (ws) ws.textContent = user.subtitle;
            document.getElementById('letterBody').textContent = `"${user.letter}"`;
            const homeLetterSnippet = document.getElementById('homeLetterSnippet');
            if (homeLetterSnippet) homeLetterSnippet.textContent = `"${user.letter}"`;
            const footerUserName = document.getElementById('footerUserName');
            if (footerUserName) footerUserName.textContent = user.name;

            // Default ke Beranda
            switchTab('home');

            // Muat Koleksi Playlist
            loadUserPlaylists();

            // Muat The Journey
            currentChapterIndex = 0;
            renderJourney(user.journey || []);

            // Muat Foto
            renderPhotos();
        }

        /* ================= TAB NAVIGATION ================= */
        function switchTab(tabId) {
            if (tabId === 'music') {
                switchTab('home');
                const plSection = document.getElementById('homePlaylistSection');
                if (plSection) plSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }

            document.querySelectorAll('.nav-tab-btn').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
            });
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

            if (tabId === 'home') {
                const p = document.getElementById('tabHome');
                if (p) p.classList.add('active');
            } else if (tabId === 'journey') {
                const p = document.getElementById('tabJourney');
                if (p) p.classList.add('active');
            } else if (tabId === 'photos') {
                const p = document.getElementById('tabPhotos');
                if (p) p.classList.add('active');
            }
        }

        /* ================= MODE TERANG / GELAP ================= */
        function toggleLightDarkMode() {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('hihi_theme_pref', next);
            updateThemeBtnUI(next);
        }

        function updateThemeBtnUI(theme) {
            const icon = theme === 'dark' ? 'solar:sun-bold-duotone' : 'solar:moon-bold-duotone';
            const text = theme === 'dark' ? 'Mode Terang' : 'Mode Gelap';
            document.querySelectorAll('.themeToggleIcon').forEach(el => el.setAttribute('icon', icon));
            document.querySelectorAll('.themeToggleText').forEach(el => el.textContent = text);
        }

        function initSavedTheme() {
            const saved = localStorage.getItem('hihi_theme_pref') || 'light';
            document.documentElement.setAttribute('data-theme', saved);
            updateThemeBtnUI(saved);
        }


        /* ================= INTERACTIVE TRANSLUCENT BUBBLES BACKGROUND ================= */
        (function initInteractiveBubbles() {
            const canvas = document.getElementById('bubbleCanvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;

            window.addEventListener('resize', () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            });

            const bubbles = [];
            const burstParticles = [];
            const numBubbles = Math.min(24, Math.floor(width / 50));
            const bubbleColors = [
                { r: 56, g: 189, b: 248 },   // Soft Sky Blue
                { r: 96, g: 165, b: 250 },   // Ocean Blue
                { r: 192, g: 132, b: 252 },  // Pastel Lavender
                { r: 244, g: 114, b: 182 },  // Rose Pink
                { r: 45, g: 212, b: 191 }    // Ocean Aqua
            ];

            let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
            window.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });
            window.addEventListener('mouseleave', () => {
                mouse.x = -1000;
                mouse.y = -1000;
            });

            // Pop bubble on click or touch
            function triggerPopAt(cx, cy) {
                for (let i = bubbles.length - 1; i >= 0; i--) {
                    const b = bubbles[i];
                    const dist = Math.hypot(b.x - cx, b.y - cy);
                    if (dist < b.radius + 15) {
                        spawnBurst(b.x, b.y, b.color, b.radius);
                        bubbles.splice(i, 1);
                        setTimeout(spawnSingleBubble, 600);
                        break;
                    }
                }
            }

            window.addEventListener('click', (e) => {
                triggerPopAt(e.clientX, e.clientY);
            });
            window.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches.length > 0) {
                    triggerPopAt(e.touches[0].clientX, e.touches[0].clientY);
                }
            }, { passive: true });

            function createBubble(yOffset) {
                const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
                return {
                    x: Math.random() * width,
                    y: yOffset !== undefined ? yOffset : height + Math.random() * 50,
                    radius: Math.random() * 20 + 14,
                    color: color,
                    alpha: Math.random() * 0.18 + 0.14, // Transparan lembut (0.14 - 0.32)
                    speedY: Math.random() * 0.6 + 0.35,
                    wobbleSpeed: Math.random() * 0.02 + 0.01,
                    wobbleAngle: Math.random() * Math.PI * 2,
                    wobbleAmp: Math.random() * 0.6 + 0.3,
                    vx: 0,
                    vy: 0
                };
            }

            function spawnSingleBubble() {
                bubbles.push(createBubble(height + 20));
            }

            function spawnBurst(x, y, color, radius) {
                const count = Math.floor(Math.random() * 5 + 6);
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 2.5 + 1;
                    burstParticles.push({
                        x: x,
                        y: y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        radius: Math.random() * 2.5 + 1.5,
                        color: color,
                        alpha: 0.6,
                        life: 1.0
                    });
                }
            }

            // Inisialisasi awal tersebar di seluruh layar
            for (let i = 0; i < numBubbles; i++) {
                bubbles.push(createBubble(Math.random() * height));
            }

            function animate() {
                ctx.clearRect(0, 0, width, height);

                // Update & Render Bubbles
                for (let i = 0; i < bubbles.length; i++) {
                    const b = bubbles[i];

                    // Natural upward float + gentle wobble
                    b.wobbleAngle += b.wobbleSpeed;
                    b.y -= b.speedY;
                    b.x += Math.sin(b.wobbleAngle) * b.wobbleAmp + b.vx;

                    // Damping mouse repulsion
                    b.vx *= 0.94;
                    b.vy *= 0.94;
                    b.y += b.vy;

                    // Mouse interaction: gelembung lembut menghindar dari kursor (bisa dimain-mainkan!)
                    const distToMouse = Math.hypot(b.x - mouse.x, b.y - mouse.y);
                    if (distToMouse < 90) {
                        const force = (90 - distToMouse) / 90;
                        const angle = Math.atan2(b.y - mouse.y, b.x - mouse.x);
                        b.vx += Math.cos(angle) * force * 1.2;
                        b.vy += Math.sin(angle) * force * 1.2;
                    }

                    // Reset jika sudah lewat atas layar
                    if (b.y < -b.radius * 2) {
                        b.y = height + b.radius * 2;
                        b.x = Math.random() * width;
                        b.vx = 0;
                        b.vy = 0;
                    }

                    // Gambar Gelembung Transparan Lembut
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);

                    // Gradasi lembut transparan
                    const grad = ctx.createRadialGradient(
                        b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.1,
                        b.x, b.y, b.radius
                    );
                    grad.addColorStop(0, `rgba(255, 255, 255, ${b.alpha * 1.5})`);
                    grad.addColorStop(0.6, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha})`);
                    grad.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha * 0.4})`);

                    ctx.fillStyle = grad;
                    ctx.fill();

                    // Garis tepi halus tipis
                    ctx.lineWidth = 1.2;
                    ctx.strokeStyle = `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha * 1.2})`;
                    ctx.stroke();

                    // Efek Pantulan Cahaya (Crescent Highlight Glare) khas bubble sabun/air
                    ctx.beginPath();
                    ctx.arc(b.x - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.32, -Math.PI * 0.4, Math.PI * 0.1);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${b.alpha * 2.2})`;
                    ctx.lineWidth = 1.8;
                    ctx.stroke();

                    ctx.restore();
                }

                // Update & Render Burst Droplet Particles
                for (let i = burstParticles.length - 1; i >= 0; i--) {
                    const p = burstParticles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.035;
                    p.alpha = Math.max(0, p.life * 0.5);

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
                    ctx.fill();

                    if (p.life <= 0) {
                        burstParticles.splice(i, 1);
                    }
                }

                requestAnimationFrame(animate);
            }

            requestAnimationFrame(animate);
        })();

// Inisialisasi awal saat halaman dibuka
document.addEventListener('DOMContentLoaded', () => {
    initSavedTheme();
    checkExistingSession();
});
