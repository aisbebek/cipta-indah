                <!-- SECTION KOLEKSI PLAYLIST (1 KARTU = 1 PLAYLIST) -->
                <section class="glass-card home-playlist-section" id="homePlaylistSection">
                    <div class="section-row-header">
                        <div class="section-title-wrap">
                            <div class="playlist-title">
                                <iconify-icon icon="solar:music-library-2-bold-duotone"></iconify-icon>
                                <span>Koleksi Playlist Musik</span>
                            </div>
                            <span class="sub-caption">Geser ke samping untuk melihat semua playlist favoritmu 🎧</span>
                        </div>
                        <div class="section-header-actions">
                            <span class="pl-count-counter" id="playlistCounterBadge">3 / 8 Playlist</span>
                            <div class="pl-slider-nav-btns">
                                <button type="button" class="pl-slider-btn" onclick="scrollPlaylistSlider(-1)" title="Geser ke kiri">
                                    <iconify-icon icon="solar:alt-arrow-left-bold"></iconify-icon>
                                </button>
                                <button type="button" class="pl-slider-btn" onclick="scrollPlaylistSlider(1)" title="Geser ke kanan">
                                    <iconify-icon icon="solar:alt-arrow-right-bold"></iconify-icon>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 1. TAMPILAN KOLOM-KOLOM PLAYLIST (SAAT TERTUTUP) -->
                    <div id="playlistColumnsContainer" class="playlist-columns-grid">
                        <!-- Kartu-kartu Playlist Dimuat di Sini Secara Dinamis -->
                    </div>

                    <!-- 2. TAMPILAN DERETAN MUSIK DALAM SATU PLAYLIST (SAAT DIBUKA) -->
                    <div id="playlistExpandedContainer" class="playlist-expanded-box" style="display: none;">
                        <div class="expanded-header-bar">
                            <button class="back-close-btn" onclick="closePlaylistDetail()" title="Tutup dan kembali ke daftar playlist">
                                <iconify-icon icon="solar:arrow-left-bold-duotone"></iconify-icon>
                                <span>← Tutup & Kembali ke Kolom Playlist</span>
                            </button>
                            <button class="add-song-to-pl-btn" onclick="openAddSongModal(currentOpenPlaylistId)">
                                <iconify-icon icon="solar:add-circle-bold-duotone"></iconify-icon>
                                <span>+ Tambah Lagu YouTube</span>
                            </button>
                        </div>

                        <!-- Banner Info Playlist yang Sedang Terbuka -->
                        <div class="active-playlist-banner">
                            <div class="active-pl-cover-box" id="activePlCoverBox">
                                <img id="activePlCoverImg" src="" alt="Cover Playlist" style="width: 100%; height: 100%; object-fit: cover; border-radius: 14px; display: none;">
                                <iconify-icon icon="solar:music-note-bold-duotone" id="activePlCoverIcon"></iconify-icon>
                            </div>
                            <div class="active-pl-text">
                                <span class="active-pl-badge" id="activePlBadge">5 LAGU</span>
                                <h3 class="active-pl-title" id="activePlTitle">Wave to Earth Specials</h3>
                                <p class="active-pl-desc" id="activePlDesc">Lagu-lagu santai bernuansa ombak & malam tenang 🌊</p>
                            </div>
                        </div>

                        <!-- Deretan Musik dalam Playlist ini -->
                        <ul class="playlist-track-list" id="expandedTrackList">
                            <!-- Lagu-lagu playlist terisi dinamis -->
                        </ul>

                        <div style="text-align: center; margin-top: 14px;">
                            <button class="action-pill-btn outline" onclick="closePlaylistDetail()" style="width: auto; padding: 8px 24px;">
                                <iconify-icon icon="solar:close-circle-bold-duotone"></iconify-icon>
                                <span>Tutup Daftar Musik ✕</span>
                            </button>
                        </div>
                    </div>
                </section>
