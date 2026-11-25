            <!-- ================= TAB 2: DETAIL PLAYLIST (RUANG MUSIK LENGKAP) ================= -->
            <div class="tab-panel" id="tabMusic">
                <div class="music-room-grid">

                    <!-- Kolom Kiri: Playlist & Tambah Link YouTube -->
                    <div class="glass-card">
                        <div class="playlist-header-box">
                            <div class="playlist-title">
                                <iconify-icon icon="solar:playlist-minimalistic-bold-duotone"></iconify-icon>
                                <span>Daftar Lagu YouTube</span>
                            </div>
                            <span class="ribbon-tag" id="songCountTag" style="margin: 0;">5 Lagu</span>
                        </div>

                        <!-- Form Tambah Link YouTube -->
                        <div class="add-youtube-box">
                            <h4>
                                <iconify-icon icon="lucide:youtube"></iconify-icon>
                                <span>+ Tempel Link YouTube Baru</span>
                            </h4>
                            <div class="youtube-input-row">
                                <input type="text" id="ytUrlInput" class="youtube-input" placeholder="Tempel link YouTube (misal: https://youtu.be/...)" autocomplete="off">
                                <button type="button" class="youtube-add-btn" onclick="addNewYouTubeSong()">
                                    <span>Tambah</span>
                                </button>
                            </div>
                            <input type="text" id="ytCustomTitle" class="youtube-input" placeholder="Judul lagu & artis (opsional)" autocomplete="off">
                        </div>

                        <!-- Deretan Lagu Tersimpan -->
                        <ul class="song-list" id="songListElem">
                            <!-- Lagu YouTube terisi dinamis -->
                        </ul>
                    </div>

                    <!-- Kolom Kanan: Vinyl Showcase -->
                    <div class="glass-card vinyl-showcase-card">
                        <div class="vinyl-disc" id="vinylDisc">
                            <div class="vinyl-label">
                                <iconify-icon icon="solar:vinyl-bold-duotone"></iconify-icon>
                            </div>
                        </div>
                        <h3 class="showcase-title" id="showcaseTitle">Wave to Earth</h3>
                        <p class="showcase-artist" id="showcaseArtist">Pilih lagu dari daftar di sebelah</p>
                        <p class="showcase-quote">
                            "Musik adalah tempat singgah paling tenang saat dunia di luar sedang begitu ramai." ✨
                        </p>
                    </div>

                </div>
            </div>
