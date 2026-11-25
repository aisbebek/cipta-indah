        <!-- ================= 1. GERBANG LOGIN BERSIH ================= -->
        <section id="loginPortal" style="position: relative;">
            <div style="position: absolute; top: 16px; right: 20px; z-index: 50;">
                <button class="theme-toggle-btn" onclick="toggleLightDarkMode()" title="Ubah Mode Gelap / Terang">
                    <iconify-icon icon="solar:moon-bold-duotone" class="themeToggleIcon"></iconify-icon>
                    <span class="themeToggleText">Mode Gelap</span>
                </button>
            </div>
            <div class="login-box">
                <div class="ocean-badge">
                    <iconify-icon icon="solar:lock-keyhole-minimalistic-bold-duotone"></iconify-icon>
                </div>
                <div class="ribbon-tag">
                    <iconify-icon icon="solar:sparkles-bold-duotone"></iconify-icon>
                    <span>Special Sanctuary</span>
                </div>
                <h2 class="login-title">HiHi Time</h2>
                <p class="login-desc">Masukkan nama panggilan dan token rahasiamu untuk membuka ruang musik & hadiah pribadimu.</p>

                <form id="multiLoginForm">
                    <div class="input-group">
                        <iconify-icon icon="solar:user-bold-duotone" class="input-icon"></iconify-icon>
                        <input type="text" id="usernameInput" class="form-input" placeholder="Nama / Username..." autocomplete="off" required>
                    </div>

                    <div class="input-group">
                        <iconify-icon icon="solar:key-square-bold-duotone" class="input-icon"></iconify-icon>
                        <input type="password" id="passwordInput" class="form-input" placeholder="Token Rahasia..." autocomplete="off" required>
                        <button type="button" class="toggle-btn" id="togglePasswordBtn" title="Lihat/Sembunyikan">
                            <iconify-icon icon="solar:eye-closed-bold-duotone" id="eyeIcon"></iconify-icon>
                        </button>
                    </div>

                    <button type="submit" class="login-submit-btn">
                        <iconify-icon icon="solar:lock-keyhole-minimalistic-bold-duotone"></iconify-icon>
                        <span>Buka Ruangan ✨</span>
                    </button>
                </form>

                <div class="error-alert" id="errorAlert">
                    <iconify-icon icon="solar:danger-triangle-bold-duotone" style="font-size: 18px;"></iconify-icon>
                    <span>Nama atau token rahasia belum cocok!</span>
                </div>
            </div>
        </section>
