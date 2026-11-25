/* ================= THE JOURNEY CHAPTERS ================= */
        /* ================= THE JOURNEY ================= */
        function renderJourney(chapters) {
            // Full Journey page beads
            const beadsChain = document.getElementById('beadsChain');
            if (beadsChain) {
                beadsChain.innerHTML = '';
                chapters.forEach((ch, idx) => {
                    const bead = document.createElement('div');
                    bead.className = `bead-item ${idx <= currentChapterIndex ? 'active' : ''}`;
                    bead.textContent = idx + 1;
                    bead.onclick = () => selectChapter(idx);
                    beadsChain.appendChild(bead);
                });
            }

            // Home preview beads
            const homeBeadsRow = document.getElementById('homeBeadsRow');
            if (homeBeadsRow) {
                homeBeadsRow.innerHTML = '';
                chapters.forEach((ch, idx) => {
                    const bead = document.createElement('div');
                    bead.className = `home-bead-item ${idx === currentChapterIndex ? 'active' : ''}`;
                    bead.textContent = idx + 1;
                    bead.onclick = () => selectChapter(idx);
                    homeBeadsRow.appendChild(bead);
                });
            }

            updateJourneyUI();
        }

        function selectChapter(idx) {
            currentChapterIndex = idx;
            updateJourneyUI();
        }

        function updateJourneyUI() {
            const db = getUsersDB();
            if (!currentUser || !db[currentUser]) return;
            const journeyList = db[currentUser].journey || [];
            if (journeyList.length === 0) return;

            const chapter = journeyList[currentChapterIndex] || journeyList[0];

            // Tab Journey UI
            const chapterTitle = document.getElementById('chapterTitle');
            const chapterDesc = document.getElementById('chapterDesc');
            const chapterCounter = document.getElementById('chapterCounter');
            if (chapterTitle) chapterTitle.textContent = chapter.title;
            if (chapterDesc) chapterDesc.textContent = chapter.desc;
            if (chapterCounter) chapterCounter.textContent = `Chapter ${currentChapterIndex + 1}/${journeyList.length}`;

            // Beranda Journey Preview UI
            const homeChapterTitle = document.getElementById('homeChapterTitle');
            const homeChapterDesc = document.getElementById('homeChapterDesc');
            if (homeChapterTitle) homeChapterTitle.textContent = chapter.title;
            if (homeChapterDesc) homeChapterDesc.textContent = chapter.desc;

            document.querySelectorAll('.bead-item').forEach((b, i) => {
                b.classList.toggle('active', i <= currentChapterIndex);
            });
            document.querySelectorAll('.home-bead-item').forEach((b, i) => {
                b.classList.toggle('active', i === currentChapterIndex);
            });
        }
