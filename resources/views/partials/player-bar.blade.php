    <!-- ================= 3. PERSISTENT BOTTOM MUSIC BAR ================= -->
    <div class="persistent-player-bar" id="persistentBar" style="display: none;">
        <div class="player-left">
            <img src="https://img.youtube.com/vi/6Pt_JzS9r6U/mqdefault.jpg" id="barThumb" class="player-thumb" alt="Thumbnail">
            <div class="player-info">
                <div style="display: flex; align-items: center; gap: 6px;">
                    <h4 id="barTitle">Seasons</h4>
                    <div class="soundwave-bars" id="barSoundwave">
                        <span class="eq-bar bar-1"></span>
                        <span class="eq-bar bar-2"></span>
                        <span class="eq-bar bar-3"></span>
                        <span class="eq-bar bar-4"></span>
                        <span class="eq-bar bar-5"></span>
                    </div>
                </div>
                <span id="barArtist">Wave to Earth</span>
            </div>
        </div>

        <div class="player-center">
            <div class="player-buttons">
                <button class="ctrl-btn" onclick="prevSong()" title="Lagu Sebelumnya">
                    <iconify-icon icon="solar:skip-previous-bold-duotone"></iconify-icon>
                </button>
                <button class="play-pause-circle" id="barPlayBtn" onclick="togglePlayPause()" title="Putar / Jeda">
                    <iconify-icon icon="solar:play-bold" id="barPlayIcon"></iconify-icon>
                </button>
                <button class="ctrl-btn" onclick="nextSong()" title="Lagu Berikutnya">
                    <iconify-icon icon="solar:skip-next-bold-duotone"></iconify-icon>
                </button>
            </div>

            <div class="progress-container">
                <span id="currentTimeText">0:00</span>
                <div class="progress-bar-bg" id="progressBarBg" onclick="seekSong(event)">
                    <div class="progress-bar-fill" id="progressBarFill"></div>
                </div>
                <span id="durationText">0:00</span>
            </div>
        </div>

        <div class="player-right">
            <iconify-icon icon="solar:volume-loud-bold-duotone" class="volume-icon"></iconify-icon>
            <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="80" oninput="changeVolume(this.value)">
            <button type="button" class="player-dismiss-btn" onclick="dismissPlayerBar()" title="Tutup Pemutar Musik">
                <iconify-icon icon="solar:close-circle-bold-duotone"></iconify-icon>
            </button>
        </div>
    </div>