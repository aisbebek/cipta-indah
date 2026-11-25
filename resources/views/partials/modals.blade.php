
    <!-- Modal Buat Playlist Baru (Judul + Link Terhubung Riil & Otomatis) -->
    <div class="modal-overlay" id="newPlaylistModal">
        <div class="modal-box" style="max-width: 440px;">
            <h3 class="modal-title">
                <iconify-icon icon="solar:folder-with-files-bold-duotone" style="color: var(--accent-main); vertical-align: middle; margin-right: 6px;"></iconify-icon>
                <span>Buat Playlist Baru</span>
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 16px;">
                Cukup masukkan judul dan link lagu (YouTube / Spotify). Thumbnail dan lagu akan otomatis terhubung! 🎵
            </p>

            <div class="form-row">
                <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-title); display: block; margin-bottom: 6px;">Judul Playlist</label>
                <input type="text" id="modalPlNameInput" class="form-input" placeholder="Misal: Sunset & Chill, Lagu Favorit..." autocomplete="off">
            </div>

            <div class="form-row">
                <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-title); display: block; margin-bottom: 6px;">Link Musik (YouTube atau Spotify)</label>
                <input type="text" id="modalPlMusicUrlInput" class="form-input" placeholder="Tempel link YouTube atau Spotify (https://...)" oninput="handleAutoDetectPlaylistLink(this.value)" autocomplete="off">
            </div>

            <!-- Auto Thumbnail Card (Terdeteksi Otomatis dari Link) -->
            <div id="autoThumbnailPreviewWrap" class="auto-thumbnail-card" style="display: none;">
                <img id="autoPlCoverPreviewImg" src="" alt="Thumbnail Otomatis" class="auto-thumb-img">
                <div class="auto-thumb-meta">
                    <span id="autoDetectedSourceBadge" class="auto-thumb-badge youtube">
                        <iconify-icon icon="solar:check-circle-bold"></iconify-icon> Thumbnail Otomatis
                    </span>
                    <div id="autoDetectedTitleText" class="auto-thumb-title">Memuat info musik...</div>
                    <div class="auto-thumb-hint">✓ Sampul & lagu langsung terhubung ke playlist</div>
                </div>
            </div>

            <div class="modal-buttons" style="margin-top: 18px;">
                <button type="button" class="btn-cancel" onclick="closeNewPlaylistModal()">Batal</button>
                <button type="button" class="btn-save" onclick="createNewPlaylist()">Buat Playlist ✨</button>
            </div>
        </div>
    </div>

    <!-- Modal Tambah Lagu YouTube -->
    <div class="modal-overlay" id="addSongModal">
        <div class="modal-box">
            <h3 class="modal-title">
                <iconify-icon icon="lucide:youtube" style="color: #ef4444; vertical-align: middle; margin-right: 6px;"></iconify-icon>
                <span>Tambah Lagu YouTube</span>
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 16px;">
                Tempel link YouTube favoritmu untuk ditambahkan ke dalam playlist.
            </p>

            <div class="form-row">
                <label>Pilih Playlist Tujuan</label>
                <select id="modalTargetPlaylistSelect" class="form-input" style="padding: 11px 14px; cursor: pointer;">
                    <!-- Option playlist dinamis -->
                </select>
            </div>

            <div class="form-row">
                <label>Link YouTube</label>
                <input type="text" id="modalYtUrlInput" class="form-input" placeholder="https://youtu.be/... atau https://www.youtube.com/watch?v=..." autocomplete="off">
            </div>

            <div class="form-row">
                <label>Judul Lagu & Artis (Opsional)</label>
                <input type="text" id="modalYtTitleInput" class="form-input" placeholder="Misal: Wave to Earth - Seasons" autocomplete="off">
            </div>

            <div class="modal-buttons">
                <button type="button" class="btn-cancel" onclick="closeAddSongModal()">Batal</button>
                <button type="button" class="btn-save" onclick="addSongFromModal()">Tambahkan ✨</button>
            </div>
        </div>
    </div>

    <!-- Modal Upload Foto (Aesthetic Polaroid Studio) -->
    <div class="modal-overlay" id="photoModal">
        <div class="modal-box modal-polaroid-box">
            <h3 class="modal-title">
                <iconify-icon icon="solar:camera-bold-duotone" style="color: var(--accent-main); vertical-align: middle; margin-right: 6px;"></iconify-icon>
                <span>Abadikan Foto Kenangan</span>
            </h3>
            <p style="font-size: 0.82rem; color: var(--text-dim); margin-bottom: 12px;">
                Pilih fotomu dan lihat preview polaroid manisnya langsung di bawah ✨
            </p>

            <!-- Polaroid Live Preview Card -->
            <div class="polaroid-upload-frame" onclick="triggerPhotoFileInput()">
                <div class="polaroid-washi-tape"></div>
                <div class="polaroid-dropzone" id="polaroidDropzone">
                    <img id="polaroidLivePreview" src="" alt="Preview" style="display: none;">
                    <div class="polaroid-placeholder" id="polaroidPlaceholder">
                        <iconify-icon icon="solar:gallery-add-bold-duotone" class="polaroid-upload-icon"></iconify-icon>
                        <strong>Ketuk untuk Pilih Foto</strong>
                        <span>Format JPG, PNG, atau GIF</span>
                    </div>
                </div>
                <input type="file" id="modalFileInput" accept="image/*" style="display: none;" onchange="handlePhotoSelect(event)">
            </div>

            <div class="form-row">
                <label>Catatan / Cerita Singkat 💌</label>
                <input type="text" id="modalCaptionInput" class="form-input" placeholder="Tuliskan cerita manis tentang foto ini..." autocomplete="off" required>
            </div>

            <div class="form-row">
                <label>Tanggal Momen 📅</label>
                <input type="date" id="modalDateInput" class="form-input">
            </div>

            <div class="modal-buttons">
                <button type="button" class="btn-cancel" onclick="closePhotoModal()">Batal</button>
                <button type="button" class="btn-save" onclick="saveNewPhoto()">Simpan ke Kenangan 🌸</button>
            </div>
        </div>
    </div>

    <!-- Modal Fokus & Balik Foto Polaroid 3D (Interactive Tactile Item) -->
    <div class="modal-overlay polaroid-focus-overlay" id="polaroidFocusModal" onclick="handlePolaroidBackdropClick(event)">
        <div class="polaroid-focus-container">
            <!-- Hint Pengguna -->
            <div class="polaroid-focus-hint-badge" onclick="togglePolaroidFlip(event)">
                <iconify-icon icon="solar:restart-bold"></iconify-icon>
                <span>Ketuk foto untuk membalik & baca catatan di belakang 💌</span>
            </div>

            <button type="button" class="polaroid-focus-close-btn" onclick="closePolaroidFocus()" title="Tutup">
                <iconify-icon icon="solar:close-circle-bold-duotone"></iconify-icon>
            </button>

            <!-- 3D Flip Card Container -->
            <div class="polaroid-3d-scene" onclick="togglePolaroidFlip(event)">
                <div class="polaroid-3d-card" id="polaroid3dCard">
                    <!-- SISI DEPAN: FOTO POLAROID ASLI -->
                    <div class="polaroid-side polaroid-front">
                        <div class="polaroid-focus-tape"></div>
                        <div class="polaroid-front-img-wrap">
                            <img id="focusPolaroidImg" src="" alt="Polaroid Foto">
                        </div>
                        <div class="polaroid-front-meta">
                            <h3 id="focusPolaroidCaption" class="polaroid-front-title">Kenangan</h3>
                            <div class="polaroid-front-date-row">
                                <span id="focusPolaroidDate" class="polaroid-front-date">2026-11-25</span>
                                <span class="polaroid-flip-indicator">
                                    <iconify-icon icon="solar:restart-bold"></iconify-icon> Balik Foto ↺
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- SISI BELAKANG: CATATAN SURAT & CAP VINTAGE -->
                    <div class="polaroid-side polaroid-back">
                        <div class="polaroid-back-inner">
                            <div class="polaroid-stamp-box">
                                <span class="stamp-circle">
                                    <iconify-icon icon="solar:heart-bold"></iconify-icon>
                                </span>
                                <div class="stamp-meta">
                                    <strong>SANCTUARY ARCHIVE</strong>
                                    <span id="focusPolaroidBackDateStamp">2026-11-25</span>
                                </div>
                            </div>

                            <div class="polaroid-back-note-area">
                                <div class="note-label">
                                    <iconify-icon icon="solar:pen-new-square-bold-duotone"></iconify-icon>
                                    <span>Catatan di Balik Foto:</span>
                                </div>
                                <blockquote id="focusPolaroidBackNote" class="polaroid-back-quote">
                                    "Kenangan manis yang selalu hangat di hati..."
                                </blockquote>
                            </div>

                            <div class="polaroid-back-footer">
                                <p class="sweet-reminder">
                                    "Setiap momen indah tersimpan abadi di ruang santai ini." 🌸
                                </p>
                                <span class="polaroid-flip-indicator back-indicator">
                                    <iconify-icon icon="solar:restart-bold"></iconify-icon> Balik ke Depan ↻
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>