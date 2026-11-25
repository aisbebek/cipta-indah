/* ================= PLAYLIST MANAGEMENT & TRACKS ================= */
        const MAX_PLAYLISTS = 8;

        function scrollPlaylistSlider(direction) {
            const container = document.getElementById('playlistColumnsContainer');
            if (!container) return;
            const scrollAmount = 360; // Geser ~2 kartu
            container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        }

        /* ================= PLAYLIST MANAGEMENT ================= */
        function getPlaylistsStorageKey() {
            return `hihi_playlists_v3_${currentUser || 'default'}`;
        }

        function getActivePlayingPlaylist() {
            if (!userPlaylists || userPlaylists.length === 0) return null;
            return userPlaylists.find(p => p.id === currentPlayingPlaylistId) || userPlaylists[0] || null;
        }

        function getCurrentPlayingSong() {
            const pl = getActivePlayingPlaylist();
            if (!pl || !pl.songs || pl.songs.length === 0) return null;
            return pl.songs[currentPlayingSongIndex] || pl.songs[0];
        }

        function getDefaultPlaylists() {
            const db = getUsersDB();
            const user = (currentUser && db[currentUser]) ? db[currentUser] : { name: "Nisa" };

            // Cek jika ada lagu legacy dari versi sebelumnya agar tidak hilang
            let legacySongs = [];
            try {
                const legacyRaw = localStorage.getItem(`hihi_yt_playlist_${currentUser || 'default'}`);
                if (legacyRaw) {
                    legacySongs = JSON.parse(legacyRaw);
                }
            } catch (e) {}

            const defaultWaveToEarth = [
                { id: "6Pt_JzS9r6U", title: "Seasons", artist: "Wave to Earth" },
                { id: "K397f26gN0w", title: "Bad", artist: "Wave to Earth" },
                { id: "x6rT650W2iI", title: "Love.", artist: "Wave to Earth" },
                { id: "X9tG7eXW_aE", title: "Peach Eyes", artist: "Wave to Earth" },
                { id: "Gk8Vz5dI_s0", title: "Light", artist: "Wave to Earth" }
            ];

            const defaultMemories = [
                { id: "6Pt_JzS9r6U", title: "Sunny Days", artist: "Wave to Earth" },
                { id: "K397f26gN0w", title: "Nouvelle Vague", artist: "Wave to Earth" },
                { id: "x6rT650W2iI", title: "Pink", artist: "Wave to Earth" }
            ];

            const customSongs = (legacySongs && legacySongs.length > 0) ? legacySongs : [
                { id: "LjOXfwtKuZM", title: "Can This Love Be Translated (OST)", artist: "YouTube Song" }
            ];

            return [
                {
                    id: "pl_w2e",
                    title: "Wave to Earth Specials",
                    desc: "Kumpulan lagu santai bernuansa ombak & malam tenang 🌊",
                    cover: "https://img.youtube.com/vi/6Pt_JzS9r6U/hqdefault.jpg",
                    songs: defaultWaveToEarth
                },
                {
                    id: "pl_memories",
                    title: `Ruang Spesial ${user.name} ✨`,
                    desc: "Kado musik & kenangan santai peneman membaca surat 💌",
                    cover: "https://img.youtube.com/vi/K397f26gN0w/hqdefault.jpg",
                    songs: defaultMemories
                },
                {
                    id: "pl_custom",
                    title: "Koleksi Favoritku",
                    desc: "Playlist bebas untuk tempel link lagu YouTube apa saja 🎧",
                    cover: "https://img.youtube.com/vi/LjOXfwtKuZM/hqdefault.jpg",
                    songs: customSongs
                }
            ];
        }

        function loadUserPlaylists() {
            const raw = localStorage.getItem(getPlaylistsStorageKey());
            if (raw) {
                try {
                    userPlaylists = JSON.parse(raw);
                    if (!Array.isArray(userPlaylists) || userPlaylists.length === 0) {
                        userPlaylists = getDefaultPlaylists();
                    }
                } catch (e) {
                    userPlaylists = getDefaultPlaylists();
                }
            } else {
                userPlaylists = getDefaultPlaylists();
                saveUserPlaylists();
            }

            if (!currentPlayingPlaylistId && userPlaylists.length > 0) {
                currentPlayingPlaylistId = userPlaylists[0].id;
                currentPlayingSongIndex = 0;
            }

            renderPlaylistColumns();
            populatePlaylistSelectOptions();
            renderSongList();

            const curSong = getCurrentPlayingSong();
            if (curSong) {
                updatePlayerBarInfo(curSong);
            }
        }

        function saveUserPlaylists() {
            localStorage.setItem(getPlaylistsStorageKey(), JSON.stringify(userPlaylists));
        }

        /* 1. RENDER TAMPILAN KOLOM-KOLOM PLAYLIST (SAAT TERTUTUP) */
        function renderPlaylistColumns() {
            const container = document.getElementById('playlistColumnsContainer');
            if (!container) return;
            container.innerHTML = '';

            // Perbarui counter badge di header (misal: 3 / 8 Playlist)
            const badge = document.getElementById('playlistCounterBadge');
            if (badge) {
                badge.textContent = `${userPlaylists.length} / ${MAX_PLAYLISTS} Playlist`;
            }

            userPlaylists.forEach(pl => {
                const isCurrentPlPlaying = (currentPlayingPlaylistId === pl.id);
                const card = document.createElement('div');
                card.className = `playlist-column-card ${isCurrentPlPlaying ? 'playing' : ''}`;
                
                // Cover thumbnail otomatis dari lagu pertama / link asli
                let coverSrc = pl.cover;
                if ((!coverSrc || coverSrc.includes('unsplash')) && pl.songs && pl.songs.length > 0) {
                    coverSrc = `https://img.youtube.com/vi/${pl.songs[0].id}/hqdefault.jpg`;
                }
                if (!coverSrc) {
                    coverSrc = 'https://img.youtube.com/vi/6Pt_JzS9r6U/hqdefault.jpg';
                }

                card.innerHTML = `
                    <div class="pl-card-cover-wrap" onclick="openPlaylistDetail('${pl.id}')">
                        <img src="${coverSrc}" class="pl-card-cover-img" alt="${escapeHtml(pl.title)}" onerror="this.onerror=null; this.src='https://img.youtube.com/vi/6Pt_JzS9r6U/hqdefault.jpg';">
                        <span class="pl-card-count-badge">${pl.songs.length} LAGU</span>
                        <button class="pl-card-play-overlay" onclick="quickPlayPlaylist('${pl.id}', event)" title="Putar Playlist Ini">
                            <iconify-icon icon="${isCurrentPlPlaying && isPlaying ? 'solar:pause-bold' : 'solar:play-bold'}"></iconify-icon>
                        </button>
                    </div>
                    <div class="pl-card-body" onclick="openPlaylistDetail('${pl.id}')">
                        <h4 class="pl-card-title" title="${escapeHtml(pl.title)}">${escapeHtml(pl.title)}</h4>
                        <p class="pl-card-desc">${escapeHtml(pl.desc || (pl.songs.length + ' lagu tersimpan'))}</p>
                    </div>
                `;
                container.appendChild(card);
            });

            // Card "+ Buat Playlist Baru" hanya muncul jika belum mencapai maksimal 8 playlist
            if (userPlaylists.length < MAX_PLAYLISTS) {
                const createCard = document.createElement('div');
                createCard.className = 'playlist-create-card';
                createCard.onclick = () => openNewPlaylistModal();
                createCard.innerHTML = `
                    <div class="create-card-content">
                        <div class="create-card-circle-icon">
                            <iconify-icon icon="solar:add-circle-bold-duotone"></iconify-icon>
                        </div>
                        <strong>+ Buat Playlist</strong>
                        <span>Tambah folder baru</span>
                    </div>
                `;
                container.appendChild(createCard);
            }
        }

        /* 2. BUKA DERETAN MUSIK DALAM SATU PLAYLIST (EXPAND VIEW) */
        function openPlaylistDetail(plId) {
            const pl = userPlaylists.find(p => p.id === plId);
            if (!pl) return;

            currentOpenPlaylistId = plId;

            const colsContainer = document.getElementById('playlistColumnsContainer');
            const expandedContainer = document.getElementById('playlistExpandedContainer');
            const newPlBtn = document.getElementById('headerNewPlBtn');

            // Sembunyikan tombol "+ Buat Playlist" saat melihat deretan lagu dalam playlist
            if (newPlBtn) newPlBtn.style.display = 'none';

            if (colsContainer) colsContainer.style.display = 'none';
            if (expandedContainer) {
                expandedContainer.style.display = 'flex';
                
                // Perbarui banner playlist yang sedang aktif dibuka
                const badge = document.getElementById('activePlBadge');
                const title = document.getElementById('activePlTitle');
                const desc = document.getElementById('activePlDesc');
                const coverImg = document.getElementById('activePlCoverImg');
                const coverIcon = document.getElementById('activePlCoverIcon');

                if (badge) badge.textContent = `${pl.songs.length} LAGU`;
                if (title) title.textContent = pl.title;
                if (desc) desc.textContent = pl.desc || 'Kumpulan lagu dalam playlist ini 🎧';

                if (coverImg) {
                    let coverSrc = pl.cover;
                    if ((!coverSrc || coverSrc.includes('unsplash')) && pl.songs && pl.songs.length > 0) {
                        coverSrc = `https://img.youtube.com/vi/${pl.songs[0].id}/hqdefault.jpg`;
                    }
                    if (coverSrc) {
                        coverImg.src = coverSrc;
                        coverImg.style.display = 'block';
                        if (coverIcon) coverIcon.style.display = 'none';
                    } else {
                        coverImg.style.display = 'none';
                        if (coverIcon) coverIcon.style.display = 'block';
                    }
                }

                renderExpandedTrackList(plId);

                // Scroll halus ke posisi playlist agar langsung terlihat
                const section = document.getElementById('homePlaylistSection') || document.querySelector('.home-playlist-section');
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }

        /* 3. TUTUP DAFTAR MUSIK & KEMBALI KE KOLOM-KOLOM PLAYLIST */
        function closePlaylistDetail() {
            currentOpenPlaylistId = null;

            const colsContainer = document.getElementById('playlistColumnsContainer');
            const expandedContainer = document.getElementById('playlistExpandedContainer');
            const newPlBtn = document.getElementById('headerNewPlBtn');

            // Tampilkan kembali tombol "+ Buat Playlist" saat kembali ke kartu-kartu playlist
            if (newPlBtn) newPlBtn.style.display = 'inline-flex';

            if (expandedContainer) expandedContainer.style.display = 'none';
            if (colsContainer) {
                colsContainer.style.display = 'flex';
                renderPlaylistColumns();
            }
        }

        /* RENDER LAGU DI DALAM PLAYLIST YANG SEDANG DIBUKA */
        function renderExpandedTrackList(plId) {
            const listElem = document.getElementById('expandedTrackList');
            if (!listElem) return;
            listElem.innerHTML = '';

            const pl = userPlaylists.find(p => p.id === plId);
            if (!pl || !pl.songs || pl.songs.length === 0) {
                listElem.innerHTML = `
                    <li style="text-align: center; color: var(--text-dim); padding: 32px 16px; background: var(--card-bg); border-radius: 14px; border: 1px dashed var(--card-border);">
                        <iconify-icon icon="solar:music-notes-bold-duotone" style="font-size: 36px; color: var(--accent-main); opacity: 0.7; margin-bottom: 8px; display: block;"></iconify-icon>
                        Belum ada lagu di playlist ini.<br>
                        Klik tombol <strong>"+ Tambah Lagu YouTube"</strong> di atas untuk menambahkan lagu! 🎵
                    </li>
                `;
                return;
            }

            pl.songs.forEach((song, idx) => {
                const isCurrent = (currentPlayingPlaylistId === plId && currentPlayingSongIndex === idx);
                const li = document.createElement('li');
                li.className = `track-row-item ${isCurrent ? 'playing' : ''}`;
                
                li.innerHTML = `
                    <div class="track-row-left" onclick="playSongInPlaylist('${plId}', ${idx})">
                        <span class="track-num">${idx + 1}</span>
                        <img src="https://img.youtube.com/vi/${song.id}/mqdefault.jpg" class="track-row-thumb" alt="${escapeHtml(song.title)}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80';">
                        <div class="track-meta">
                            <span class="track-title" title="${escapeHtml(song.title)}">${escapeHtml(song.title)}</span>
                            <span class="track-artist">${escapeHtml(song.artist || 'YouTube')}</span>
                        </div>
                    </div>
                    <div class="track-actions">
                        <button class="track-play-badge" onclick="playSongInPlaylist('${plId}', ${idx})" title="${isCurrent && isPlaying ? 'Jeda' : 'Putar'}">
                            <iconify-icon icon="${isCurrent && isPlaying ? 'solar:pause-bold' : 'solar:play-bold'}"></iconify-icon>
                        </button>
                        <div class="track-more-menu-wrap" id="trackMenuWrap_${plId}_${idx}">
                            <button type="button" class="track-more-btn" onclick="toggleTrackMenu('${plId}', ${idx}, event)" title="Opsi lagu lainnya">
                                <iconify-icon icon="solar:menu-dots-bold"></iconify-icon>
                            </button>
                            <div class="track-dropdown-menu" id="trackMenu_${plId}_${idx}">
                                <button type="button" class="track-menu-item" onclick="playSongInPlaylist('${plId}', ${idx}); closeAllTrackMenus();">
                                    <iconify-icon icon="solar:play-bold"></iconify-icon>
                                    <span>Putar Lagu</span>
                                </button>
                                <button type="button" class="track-menu-item" onclick="copySongUrl('${song.id}', event)">
                                    <iconify-icon icon="solar:copy-bold-duotone"></iconify-icon>
                                    <span>Salin Link YouTube</span>
                                </button>
                                <button type="button" class="track-menu-item danger" onclick="deleteSongFromPlaylist('${plId}', ${idx}, event)">
                                    <iconify-icon icon="solar:trash-bin-minimalistic-bold-duotone"></iconify-icon>
                                    <span>Hapus Lagu</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                listElem.appendChild(li);
            });
        }

        /* HELPER DROPDOWN MENU OPSI LAGU (KEBAB MENU) */
        function toggleTrackMenu(plId, idx, e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            const menuId = `trackMenu_${plId}_${idx}`;
            const wrapId = `trackMenuWrap_${plId}_${idx}`;
            const targetMenu = document.getElementById(menuId);
            const targetWrap = document.getElementById(wrapId);
            const isOpen = targetMenu && targetMenu.classList.contains('show');

            closeAllTrackMenus();

            if (targetMenu && !isOpen) {
                targetMenu.classList.add('show');
                if (targetWrap) targetWrap.classList.add('open');
            }
        }

        function closeAllTrackMenus() {
            document.querySelectorAll('.track-dropdown-menu.show').forEach(m => m.classList.remove('show'));
            document.querySelectorAll('.track-more-menu-wrap.open').forEach(w => w.classList.remove('open'));
        }

        window.addEventListener('click', () => {
            closeAllTrackMenus();
        });

        function copySongUrl(ytId, e) {
            if (e) e.stopPropagation();
            closeAllTrackMenus();
            const url = `https://www.youtube.com/watch?v=${ytId}`;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(() => {
                    alert("Link YouTube berhasil disalin! 🎵");
                }).catch(() => {
                    prompt("Salin link YouTube ini:", url);
                });
            } else {
                prompt("Salin link YouTube ini:", url);
            }
        }

        /* 4. PUTAR MUSIK DALAM PLAYLIST */
        function playSongInPlaylist(plId, songIdx) {
            const pl = userPlaylists.find(p => p.id === plId);
            if (!pl || !pl.songs || !pl.songs[songIdx]) return;

            if (currentPlayingPlaylistId === plId && currentPlayingSongIndex === songIdx && isYtReady && ytPlayer) {
                togglePlayPause();
                return;
            }

            currentPlayingPlaylistId = plId;
            currentPlayingSongIndex = songIdx;
            const song = pl.songs[songIdx];

            updatePlayerBarInfo(song);

            if (currentOpenPlaylistId === plId) {
                renderExpandedTrackList(plId);
            }
            renderPlaylistColumns();
            renderSongList();

            if (isYtReady && ytPlayer) {
                ytPlayer.loadVideoById(song.id);
                ytPlayer.playVideo();
            }
        }

        /* Quick play playlist from card */
        function quickPlayPlaylist(plId, e) {
            if (e) e.stopPropagation();
            const pl = userPlaylists.find(p => p.id === plId);
            if (!pl || !pl.songs || pl.songs.length === 0) {
                openPlaylistDetail(plId);
                return;
            }
            if (currentPlayingPlaylistId === plId && isPlaying) {
                togglePlayPause();
            } else {
                playSongInPlaylist(plId, 0);
            }
        }

        /* 5. HAPUS LAGU DENGAN AMAN (AUDIO YANG BERPUTAR TIDAK AKAN KESTOP) */
        function deleteSongFromPlaylist(plId, songIdx, e) {
            if (e) e.stopPropagation();
            if (!confirm("Hapus lagu ini dari playlist?")) return;

            const pl = userPlaylists.find(p => p.id === plId);
            if (!pl) return;

            const isThisPlaylistPlaying = (currentPlayingPlaylistId === plId);
            const isThisSongPlaying = isThisPlaylistPlaying && (currentPlayingSongIndex === songIdx);
            const wasAudioActive = isPlaying;

            // Hapus lagu dari array
            pl.songs.splice(songIdx, 1);
            saveUserPlaylists();

            if (isThisSongPlaying) {
                // Hanya jika lagu yang SEDANG BERPUTAR yang dihapus:
                if (pl.songs.length === 0) {
                    currentPlayingSongIndex = 0;
                    if (isYtReady && ytPlayer && ytPlayer.stopVideo) {
                        ytPlayer.stopVideo();
                    }
                    isPlaying = false;
                    updatePlayButtons(false);
                    const vinyl = document.getElementById('vinylDisc');
                    if (vinyl) vinyl.classList.remove('spinning');
                    document.getElementById('barTitle').textContent = 'Pilih lagu untuk memutar';
                    document.getElementById('barArtist').textContent = 'Playlist Kosong';
                    const bs = document.getElementById('bannerStatus');
                    if (bs) bs.textContent = 'Playlist kosong';
                } else {
                    if (currentPlayingSongIndex >= pl.songs.length) {
                        currentPlayingSongIndex = 0;
                    }
                    if (wasAudioActive) {
                        playSongInPlaylist(plId, currentPlayingSongIndex);
                    } else {
                        updatePlayerBarInfo(pl.songs[currentPlayingSongIndex]);
                    }
                }
            } else if (isThisPlaylistPlaying) {
                // Lagu lain di playlist yang sedang main yang dihapus:
                if (songIdx < currentPlayingSongIndex) {
                    currentPlayingSongIndex--;
                }
                // JANGAN SENTUH ytPlayer SAMA SEKALI! Lagu tetap berputar lancar tanpa henti!
            } else {
                // Lagu di playlist lain yang dihapus:
                // JANGAN SENTUH ytPlayer SAMA SEKALI!
            }

            // Perbarui UI
            if (currentOpenPlaylistId === plId) {
                renderExpandedTrackList(plId);
                const badge = document.getElementById('activePlBadge');
                if (badge) badge.textContent = `${pl.songs.length} LAGU`;
            }
            renderPlaylistColumns();
            renderSongList();
        }

        /* RENDER VERTICAL TRACKS IN TAB DETAIL PLAYLIST */
        function renderSongList() {
            const songListElem = document.getElementById('songListElem');
            if (!songListElem) return;
            songListElem.innerHTML = '';

            const pl = getActivePlayingPlaylist();
            const songCountTag = document.getElementById('songCountTag');
            if (songCountTag) {
                songCountTag.textContent = pl ? `${pl.title} (${pl.songs.length} Lagu)` : '0 Lagu';
            }

            if (!pl || !pl.songs || pl.songs.length === 0) {
                songListElem.innerHTML = `<li style="text-align: center; color: var(--text-dim); padding: 20px;">Belum ada lagu di playlist ini. Tempel link YouTube di atas! 🎵</li>`;
                return;
            }

            pl.songs.forEach((song, idx) => {
                const isCurrent = (currentPlayingPlaylistId === pl.id && idx === currentPlayingSongIndex);
                const li = document.createElement('li');
                li.className = `song-card ${isCurrent ? 'playing' : ''}`;
                li.innerHTML = `
                    <div class="song-left" onclick="playSongInPlaylist('${pl.id}', ${idx})">
                        <img src="https://img.youtube.com/vi/${song.id}/mqdefault.jpg" class="song-thumb" alt="Thumbnail" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80';">
                        <div class="song-details">
                            <span class="song-name">${escapeHtml(song.title)}</span>
                            <span class="song-artist">${escapeHtml(song.artist || 'YouTube')}</span>
                        </div>
                    </div>
                    <button class="song-delete-btn" onclick="deleteSongFromPlaylist('${pl.id}', ${idx}, event)" title="Hapus lagu ini">
                        <iconify-icon icon="solar:trash-bin-minimalistic-bold-duotone"></iconify-icon>
                    </button>
                `;
                songListElem.appendChild(li);
            });
        }

        /* ================= KONTROL TAMBAH PLAYLIST BARU (AUTO DETECT LINK & LAGU RIIL) ================= */
        let currentDetectedSong = null;

        function handleAutoDetectPlaylistLink(rawUrl) {
            const previewWrap = document.getElementById('autoThumbnailPreviewWrap');
            const previewImg = document.getElementById('autoPlCoverPreviewImg');
            const titleText = document.getElementById('autoDetectedTitleText');
            const sourceBadge = document.getElementById('autoDetectedSourceBadge');
            const nameInput = document.getElementById('modalPlNameInput');

            if (!rawUrl || !rawUrl.trim()) {
                if (previewWrap) previewWrap.style.display = 'none';
                currentDetectedSong = null;
                return;
            }

            const url = rawUrl.trim();
            const ytId = extractYouTubeId(url);

            if (ytId) {
                const thumbUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                currentDetectedSong = {
                    type: 'youtube',
                    id: ytId,
                    title: '',
                    artist: 'YouTube Music',
                    thumbnail: thumbUrl,
                    url: url
                };

                if (previewImg) previewImg.src = thumbUrl;
                if (sourceBadge) {
                    sourceBadge.className = 'auto-thumb-badge youtube';
                    sourceBadge.innerHTML = `<iconify-icon icon="solar:videocamera-record-bold"></iconify-icon> YouTube Terdeteksi`;
                }
                if (titleText) titleText.textContent = `ID: ${ytId} (Thumbnail otomatis)`;
                if (previewWrap) previewWrap.style.display = 'flex';

                // Coba ambil judul asli YouTube secara otomatis via oEmbed
                fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${ytId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.title) {
                            currentDetectedSong.title = data.title;
                            if (data.author_name) currentDetectedSong.artist = data.author_name;
                            if (titleText) titleText.textContent = data.title;
                            if (nameInput && !nameInput.value.trim()) {
                                nameInput.value = data.title;
                            }
                        }
                    })
                    .catch(() => {});
                return;
            }

            // Cek jika link Spotify
            if (url.includes('spotify.com')) {
                if (previewImg) previewImg.src = 'https://img.youtube.com/vi/6Pt_JzS9r6U/hqdefault.jpg';
                if (sourceBadge) {
                    sourceBadge.className = 'auto-thumb-badge spotify';
                    sourceBadge.innerHTML = `<iconify-icon icon="solar:music-note-bold"></iconify-icon> Spotify Terdeteksi`;
                }
                if (titleText) titleText.textContent = 'Memuat cover Spotify...';
                if (previewWrap) previewWrap.style.display = 'flex';

                fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.thumbnail_url) {
                            currentDetectedSong = {
                                type: 'spotify',
                                id: 'sp_' + Date.now(),
                                title: data.title || 'Spotify Track',
                                artist: 'Spotify',
                                thumbnail: data.thumbnail_url,
                                url: url
                            };
                            if (previewImg) previewImg.src = data.thumbnail_url;
                            if (titleText) titleText.textContent = data.title || 'Spotify Track';
                            if (nameInput && !nameInput.value.trim()) {
                                nameInput.value = data.title;
                            }
                        }
                    })
                    .catch(() => {
                        if (titleText) titleText.textContent = 'Link Spotify siap dihubungkan';
                    });
                return;
            }

            // Jika bukan format link yang valid
            if (previewWrap) previewWrap.style.display = 'none';
            currentDetectedSong = null;
        }

        /* 6. MODAL & KONTROL TAMBAH PLAYLIST BARU */
        function openNewPlaylistModal() {
            if (userPlaylists.length >= MAX_PLAYLISTS) {
                alert(`Maksimal ${MAX_PLAYLISTS} playlist telah tercapai!\nSilakan hapus salah satu playlist terlebih dahulu jika ingin membuat playlist baru.`);
                return;
            }
            const m = document.getElementById('newPlaylistModal');
            if (m) {
                const inp = document.getElementById('modalPlNameInput');
                const urlInp = document.getElementById('modalPlMusicUrlInput');
                const previewWrap = document.getElementById('autoThumbnailPreviewWrap');
                if (inp) inp.value = '';
                if (urlInp) urlInp.value = '';
                if (previewWrap) previewWrap.style.display = 'none';
                currentDetectedSong = null;
                m.classList.add('open');
                setTimeout(() => {
                    if (urlInp) urlInp.focus();
                }, 100);
            }
        }

        function closeNewPlaylistModal() {
            const m = document.getElementById('newPlaylistModal');
            if (m) m.classList.remove('open');
            const n = document.getElementById('modalPlNameInput');
            const u = document.getElementById('modalPlMusicUrlInput');
            const previewWrap = document.getElementById('autoThumbnailPreviewWrap');
            if (n) n.value = '';
            if (u) u.value = '';
            if (previewWrap) previewWrap.style.display = 'none';
            currentDetectedSong = null;
        }

        function createNewPlaylist() {
            if (userPlaylists.length >= MAX_PLAYLISTS) {
                alert(`Maksimal ${MAX_PLAYLISTS} playlist telah tercapai!`);
                return;
            }
            const n = document.getElementById('modalPlNameInput');
            const u = document.getElementById('modalPlMusicUrlInput');
            const name = n ? n.value.trim() : '';
            const urlVal = u ? u.value.trim() : '';

            if (!urlVal) {
                alert("Harap tempel link YouTube atau Spotify untuk membuat playlist!\nThumbnail dan lagu akan langsung terhubung secara otomatis 🎵");
                if (u) u.focus();
                return;
            }

            const ytId = extractYouTubeId(urlVal);
            const isSpotify = urlVal.includes('spotify.com');

            if (!ytId && !isSpotify) {
                alert("Link yang kamu masukkan belum valid!\nHarap tempel link YouTube (misal: https://youtu.be/...) atau link Spotify.");
                if (u) u.focus();
                return;
            }

            const plTitle = name || (currentDetectedSong && currentDetectedSong.title) || (ytId ? `YouTube Track (${ytId})` : "Playlist Baru");
            const autoCover = (currentDetectedSong && currentDetectedSong.thumbnail) 
                ? currentDetectedSong.thumbnail 
                : (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : `https://img.youtube.com/vi/6Pt_JzS9r6U/hqdefault.jpg`);

            const initialSong = {
                id: ytId || ('track_' + Date.now()),
                title: (currentDetectedSong && currentDetectedSong.title) ? currentDetectedSong.title : plTitle,
                artist: (currentDetectedSong && currentDetectedSong.artist) ? currentDetectedSong.artist : (isSpotify ? "Spotify Track" : "YouTube Song"),
                url: urlVal
            };

            const newPl = {
                id: 'pl_' + Date.now(),
                title: plTitle,
                desc: `${plTitle} • Terhubung Langsung 🎧`,
                cover: autoCover,
                songs: [initialSong]
            };

            userPlaylists.push(newPl);
            saveUserPlaylists();
            closeNewPlaylistModal();
            renderPlaylistColumns();
            populatePlaylistSelectOptions();

            // Langsung buka playlist baru dan putar lagunya (riil terhubung!)
            openPlaylistDetail(newPl.id);
            playSongInPlaylist(newPl.id, 0);
        }

        function populatePlaylistSelectOptions() {
            const sel = document.getElementById('modalTargetPlaylistSelect');
            if (!sel) return;
            sel.innerHTML = '';
            userPlaylists.forEach(pl => {
                const opt = document.createElement('option');
                opt.value = pl.id;
                opt.textContent = `${pl.title} (${pl.songs.length} lagu)`;
                sel.appendChild(opt);
            });
        }

        /* 7. MODAL & KONTROL TAMBAH LAGU YOUTUBE KE PLAYLIST */
        function openAddSongModal(presetPlId) {
            populatePlaylistSelectOptions();
            const sel = document.getElementById('modalTargetPlaylistSelect');
            if (sel) {
                if (presetPlId && userPlaylists.some(p => p.id === presetPlId)) {
                    sel.value = presetPlId;
                } else if (currentOpenPlaylistId && userPlaylists.some(p => p.id === currentOpenPlaylistId)) {
                    sel.value = currentOpenPlaylistId;
                } else if (currentPlayingPlaylistId && userPlaylists.some(p => p.id === currentPlayingPlaylistId)) {
                    sel.value = currentPlayingPlaylistId;
                }
            }
            const m = document.getElementById('addSongModal');
            if (m) {
                m.classList.add('open');
                setTimeout(() => {
                    const inp = document.getElementById('modalYtUrlInput');
                    if (inp) inp.focus();
                }, 100);
            }
        }

        function closeAddSongModal() {
            const m = document.getElementById('addSongModal');
            if (m) m.classList.remove('open');
            const u = document.getElementById('modalYtUrlInput');
            const t = document.getElementById('modalYtTitleInput');
            if (u) u.value = '';
            if (t) t.value = '';
        }

        function addSongFromModal() {
            const u = document.getElementById('modalYtUrlInput');
            const t = document.getElementById('modalYtTitleInput');
            const sel = document.getElementById('modalTargetPlaylistSelect');
            const targetPlId = sel ? sel.value : (currentOpenPlaylistId || (userPlaylists[0] ? userPlaylists[0].id : null));

            if (!targetPlId) {
                alert("Pilih atau buat playlist terlebih dahulu!");
                return;
            }

            const url = u ? u.value : '';
            const customTitle = t ? t.value : '';

            const ytId = extractYouTubeId(url);
            if (!ytId) {
                alert("Harap masukkan link YouTube yang valid!\nContoh: https://youtu.be/...");
                return;
            }

            const pl = userPlaylists.find(p => p.id === targetPlId);
            if (!pl) return;

            const title = (customTitle && customTitle.trim()) ? customTitle.trim() : `YouTube Track (${ytId})`;
            const newSong = {
                id: ytId,
                title: title,
                artist: "YouTube Song"
            };

            pl.songs.unshift(newSong);
            if (!pl.cover || pl.cover.includes('unsplash')) {
                pl.cover = `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;
            }

            saveUserPlaylists();
            closeAddSongModal();

            if (currentOpenPlaylistId === targetPlId) {
                renderExpandedTrackList(targetPlId);
                const badge = document.getElementById('activePlBadge');
                if (badge) badge.textContent = `${pl.songs.length} LAGU`;
            }
            renderPlaylistColumns();
            populatePlaylistSelectOptions();
            renderSongList();

            // Putar lagu baru yang baru saja ditambahkan
            playSongInPlaylist(targetPlId, 0);
        }

        function addNewYouTubeSong() {
            const urlInput = document.getElementById('ytUrlInput');
            const customTitle = document.getElementById('ytCustomTitle');
            const targetPlId = currentOpenPlaylistId || currentPlayingPlaylistId || (userPlaylists[0] ? userPlaylists[0].id : null);
            
            if (!urlInput || !urlInput.value.trim()) {
                alert("Masukkan link YouTube!");
                return;
            }
            const ytId = extractYouTubeId(urlInput.value);
            if (!ytId) {
                alert("Link YouTube tidak valid!");
                return;
            }
            const pl = userPlaylists.find(p => p.id === targetPlId);
            if (!pl) return;

            const title = (customTitle && customTitle.value.trim()) ? customTitle.value.trim() : `YouTube Track (${ytId})`;
            pl.songs.unshift({ id: ytId, title: title, artist: "YouTube Song" });
            if (!pl.cover || pl.cover.includes('unsplash')) {
                pl.cover = `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;
            }
            saveUserPlaylists();

            urlInput.value = '';
            if (customTitle) customTitle.value = '';

            renderPlaylistColumns();
            renderSongList();
            if (currentOpenPlaylistId === targetPlId) {
                renderExpandedTrackList(targetPlId);
            }
            playSongInPlaylist(targetPlId, 0);
        }

        function changeVolume(val) {
            if (isYtReady && ytPlayer) {
                ytPlayer.setVolume(val);
            }
        }

        let progressInterval = null;
        function startProgressTimer() {
            clearInterval(progressInterval);
            progressInterval = setInterval(() => {
                if (isYtReady && ytPlayer && isPlaying) {
                    const cur = ytPlayer.getCurrentTime() || 0;
                    const dur = ytPlayer.getDuration() || 0;
                    if (dur > 0) {
                        const pct = (cur / dur) * 100;
                        document.getElementById('progressBarFill').style.width = `${pct}%`;
                        document.getElementById('currentTimeText').textContent = formatSeconds(cur);
                        document.getElementById('durationText').textContent = formatSeconds(dur);
                    }
                }
            }, 1000);
        }

        function seekSong(e) {
            if (!isYtReady || !ytPlayer) return;
            const bar = document.getElementById('progressBarBg');
            const rect = bar.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            const dur = ytPlayer.getDuration() || 0;
            if (dur > 0) {
                ytPlayer.seekTo(dur * clickPos, true);
            }
        }