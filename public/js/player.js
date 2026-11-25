/* ================= YOUTUBE AUDIO ENGINE & CONTROLS ================= */
        /* ================= DYNAMIC SOUNDWAVE EQUALIZER ================= */
        function updateSoundwaveState(active) {
            const barSoundwave = document.getElementById('barSoundwave');
            const bannerSoundwave = document.getElementById('bannerSoundwave');
            if (barSoundwave) {
                barSoundwave.classList.toggle('active', active);
            }
            if (bannerSoundwave) {
                bannerSoundwave.classList.toggle('active', active);
            }
        }

        /* ================= YOUTUBE IFRAME PLAYER API ================= */
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = function() {
            ytPlayer = new YT.Player('hiddenYtPlayer', {
                height: '1',
                width: '1',
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    enablejsapi: 1,
                    origin: window.location.origin
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        function onPlayerReady(event) {
            isYtReady = true;
            ytPlayer.setVolume(80);
            const cur = getCurrentPlayingSong();
            if (cur) {
                updatePlayerBarInfo(cur);
            }
        }

        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
                isPlaying = true;
                updatePlayButtons(true);
                const vinyl = document.getElementById('vinylDisc');
                if (vinyl) vinyl.classList.add('spinning');
                startProgressTimer();
                updateSoundwaveState(true);
            } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                updateSoundwaveState(false);
                isPlaying = false;
                updatePlayButtons(false);
                const vinyl = document.getElementById('vinylDisc');
                if (vinyl) vinyl.classList.remove('spinning');
                if (event.data === YT.PlayerState.ENDED) {
                    nextSong();
                }
            }
        }

        function updatePlayButtons(playing) {
            const icon = playing ? 'solar:pause-bold' : 'solar:play-bold';
            const barPlayIcon = document.getElementById('barPlayIcon');
            if (barPlayIcon) barPlayIcon.setAttribute('icon', icon);

            // Update icon overlay di kartu playlist
            document.querySelectorAll('.pl-card-play-overlay iconify-icon').forEach(ic => {
                ic.setAttribute('icon', 'solar:play-bold');
            });
            if (playing && currentPlayingPlaylistId) {
                const activeCard = document.querySelector(`.playlist-column-card.playing .pl-card-play-overlay iconify-icon`);
                if (activeCard) activeCard.setAttribute('icon', 'solar:pause-bold');
            }

            // Update icon di daftar musik playlist (expanded)
            document.querySelectorAll('.track-row-item .track-play-badge iconify-icon').forEach(ic => {
                ic.setAttribute('icon', 'solar:play-bold');
            });
            if (playing) {
                const activeTrackBadge = document.querySelector('.track-row-item.playing .track-play-badge iconify-icon');
                if (activeTrackBadge) activeTrackBadge.setAttribute('icon', 'solar:pause-bold');
            }
        }

        function updatePlayerBarInfo(song) {
            if (!song) return;
            const barThumb = document.getElementById('barThumb');
            const barTitle = document.getElementById('barTitle');
            const barArtist = document.getElementById('barArtist');
            const showcaseTitle = document.getElementById('showcaseTitle');
            const showcaseArtist = document.getElementById('showcaseArtist');
            const bannerStatus = document.getElementById('bannerStatus');

            if (barThumb) {
                barThumb.src = `https://img.youtube.com/vi/${song.id}/mqdefault.jpg`;
                barThumb.onerror = function() {
                    this.onerror = null;
                    this.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80';
                };
            }
            if (barTitle) barTitle.textContent = song.title;
            if (barArtist) barArtist.textContent = song.artist || 'YouTube';
            if (showcaseTitle) showcaseTitle.textContent = song.title;
            if (showcaseArtist) showcaseArtist.textContent = song.artist || 'Wave to Earth';
            if (bannerStatus) bannerStatus.textContent = `Memutar: ${song.title}`;
        }

        function togglePlayPause() {
            if (!isYtReady || !ytPlayer) return;
            if (isPlaying) {
                ytPlayer.pauseVideo();
            } else {
                if (ytPlayer.getPlayerState() === -1 || ytPlayer.getPlayerState() === 5) {
                    if (currentPlayingPlaylistId) {
                        playSongInPlaylist(currentPlayingPlaylistId, currentPlayingSongIndex);
                    }
                } else {
                    ytPlayer.playVideo();
                }
            }
        }

        function nextSong() {
            const pl = getActivePlayingPlaylist();
            if (!pl || !pl.songs || pl.songs.length === 0) return;
            currentPlayingSongIndex = (currentPlayingSongIndex + 1) % pl.songs.length;
            playSongInPlaylist(pl.id, currentPlayingSongIndex);
        }

        function prevSong() {
            const pl = getActivePlayingPlaylist();
            if (!pl || !pl.songs || pl.songs.length === 0) return;
            currentPlayingSongIndex = (currentPlayingSongIndex - 1 + pl.songs.length) % pl.songs.length;
            playSongInPlaylist(pl.id, currentPlayingSongIndex);
        }