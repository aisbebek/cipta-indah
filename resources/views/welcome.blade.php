<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HiHi Time — A Personal Sanctuary</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    
    <!-- Iconify Web Component -->
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    
    <!-- Data Teman & Kata Sandi -->
    <script src="{{ asset('friends.js') }}?v={{ time() }}"></script>

    <!-- Modular CSS Stylesheets -->
    <link rel="stylesheet" href="{{ asset('css/theme.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('css/auth.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('css/navbar.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('css/banner.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('css/playlist.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('css/journey.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('css/polaroid.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('css/player.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('css/modals.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('css/responsive.css') }}?v={{ time() }}">
</head>
<body>
    <!-- Interactive Translucent Bubbles Canvas -->
    <canvas id="bubbleCanvas" class="bubble-canvas"></canvas>

    <!-- Hidden YouTube Audio Player -->
    <div id="hiddenYtPlayer" style="display: none; position: absolute; left: -9999px;"></div>

    <!-- 1. GERBANG LOGIN (MODULAR) -->
    @include('partials.auth-portal')

    <!-- 2. DASHBOARD SANCTUARY (MODULAR) -->
    <div class="dashboard-container page-container" id="mainDashboard" style="display: none;">
        @include('partials.navbar')

        <!-- TAB 1: BERANDA -->
        <div class="tab-panel active" id="tabHome">
            @include('partials.playlist-section')
            @include('partials.home-widgets')
        </div>

        <!-- TAB 2: DETAIL PLAYLIST (RUANG MUSIK LENGKAP) -->
        @include('partials.music-detail-tab')

        <!-- TAB 3: THE JOURNEY -->
        @include('partials.journey-section')

        <!-- TAB 4: GALERI POLAROID -->
        @include('partials.polaroid-section')

        <!-- SANCTUARY FOOTER -->
        @include('partials.footer')
    </div>

    <!-- 3. PERSISTENT FLOATING BOTTOM PLAYER & MODALS (MODULAR) -->
    @include('partials.player-bar')
    @include('partials.modals')

    <!-- Modular JavaScript Scripts -->
    <script src="{{ asset('js/app.js') }}?v={{ time() }}"></script>
    <script src="{{ asset('js/auth.js') }}?v={{ time() }}"></script>
    <script src="{{ asset('js/player.js') }}?v={{ time() }}"></script>
    <script src="{{ asset('js/playlist.js') }}?v={{ time() }}"></script>
    <script src="{{ asset('js/journey.js') }}?v={{ time() }}"></script>
    <script src="{{ asset('js/photos.js') }}?v={{ time() }}"></script>
</body>
</html>
