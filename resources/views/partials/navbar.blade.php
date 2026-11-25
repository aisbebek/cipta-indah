<!-- Navigation Header -->
<header>
    <!-- Kiri: Brand Logo & Ruang User -->
    <div class="header-brand-wrap">
        <div class="brand-symbol">
            <iconify-icon icon="solar:headphones-round-bold-duotone"></iconify-icon>
        </div>
        <div class="brand-text">
            <h2>HiHi Time</h2>
            <span id="activeUserLabel">Special Gift</span>
        </div>
    </div>

    <!-- Tengah: 3 Tab Navigasi Bersih -->
    <div class="nav-tabs">
        <button class="nav-tab-btn active" data-tab="home" onclick="switchTab('home')">
            <iconify-icon icon="solar:home-smile-bold-duotone"></iconify-icon>
            <span>Beranda</span>
        </button>
        <button class="nav-tab-btn" data-tab="journey" onclick="switchTab('journey')">
            <iconify-icon icon="solar:stars-minimalistic-bold-duotone"></iconify-icon>
            <span>The Journey</span>
        </button>
        <button class="nav-tab-btn" data-tab="photos" onclick="switchTab('photos')">
            <iconify-icon icon="solar:gallery-minimalistic-bold-duotone"></iconify-icon>
            <span>Galeri Polaroid</span>
        </button>
    </div>

    <!-- Kanan: Tombol Pengaturan dalam 1 Baris Horizontal -->
    <div class="header-actions-wrap">
        <!-- Pilihan Bahasa -->
        <button class="nav-icon-pill" onclick="cycleLanguage()" title="Ganti Bahasa / Switch Language">
            <iconify-icon icon="solar:global-bold-duotone"></iconify-icon>
            <span id="currentLangTag">ID</span>
        </button>
        <!-- Toggle Bersih: Terang / Gelap -->
        <button class="theme-toggle-btn" onclick="toggleLightDarkMode()" title="Ubah Mode Gelap / Terang">
            <iconify-icon icon="solar:moon-bold-duotone" id="themeToggleIcon" class="themeToggleIcon"></iconify-icon>
            <span id="themeToggleText" class="themeToggleText">Mode Gelap</span>
        </button>
        <!-- Tombol Keluar -->
        <button class="logout-btn" id="logoutBtn" title="Kunci kembali">
            <iconify-icon icon="solar:logout-2-bold-duotone"></iconify-icon>
            <span id="logoutText">Keluar</span>
        </button>
    </div>
</header>
