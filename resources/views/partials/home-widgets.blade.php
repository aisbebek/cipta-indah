                <!-- SECTION DUA KOLOM DI BAWAH PLAYLIST (CATATAN & FOTO) -->
                <div class="home-bottom-grid">
                    <!-- Kolom Kiri: Catatan & Surat Spesial (The Journey Preview) -->
                    <div class="glass-card home-card-column">
                        <div class="column-card-header">
                            <div class="playlist-title">
                                <iconify-icon icon="solar:letter-bold-duotone"></iconify-icon>
                                <span>Surat & The Journey ✨</span>
                            </div>
                            <button class="view-more-link" onclick="switchTab('journey')">
                                <span>Lihat Selengkapnya</span>
                                <iconify-icon icon="solar:arrow-right-up-bold-duotone"></iconify-icon>
                            </button>
                        </div>

                        <!-- Kartu Kutipan Surat -->
                        <div class="home-letter-quote" id="homeLetterPreview">
                            <iconify-icon icon="solar:quote-up-bold-duotone" class="quote-watermark"></iconify-icon>
                            <p id="homeLetterSnippet">"Selamat ulang tahun ya! Web ini dibuat khusus untukmu sebagai tempat rehat..."</p>
                        </div>

                        <!-- Milestone Beads Preview -->
                        <div class="home-milestone-preview">
                            <div class="home-beads-row" id="homeBeadsRow">
                                <!-- 3 Mutiara Chapter -->
                            </div>
                            <div class="home-chapter-snippet" id="homeChapterSnippet">
                                <strong id="homeChapterTitle">Chapter 1: Awal Perjalanan</strong>
                                <p id="homeChapterDesc">Mengingat kembali langkah-langkah kecil yang membawamu sejauh ini...</p>
                            </div>
                        </div>
                    </div>

                    <!-- Kolom Kanan: Galeri Kenangan Polaroid (Preview) -->
                    <div class="glass-card home-card-column">
                        <div class="column-card-header">
                            <div class="playlist-title">
                                <iconify-icon icon="solar:camera-bold-duotone"></iconify-icon>
                                <span>Kenangan Polaroid 📸</span>
                            </div>
                            <button class="view-more-link" onclick="switchTab('photos')">
                                <span>Semua Foto</span>
                                <iconify-icon icon="solar:arrow-right-up-bold-duotone"></iconify-icon>
                            </button>
                        </div>

                        <p style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 8px;">
                            Beberapa potret momen tenang dan bahagia yang tersimpan:
                        </p>

                        <!-- Preview Foto Grid -->
                        <div class="home-polaroid-preview-row" id="homePolaroidPreviewRow">
                            <!-- 2-3 Foto polaroid preview -->
                        </div>

                        <button class="home-add-photo-btn" onclick="openPhotoModal()">
                            <iconify-icon icon="solar:camera-add-bold-duotone"></iconify-icon>
                            <span>+ Unggah Foto Kenangan Baru</span>
                        </button>
                    </div>
                </div>
