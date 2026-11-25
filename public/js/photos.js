/* ================= POLAROID PHOTO MEMORIES ================= */
        /* ================= POLAROID PHOTO UPLOAD LIVE PREVIEW ================= */
        function triggerPhotoFileInput() {
            const inp = document.getElementById('modalFileInput');
            if (inp) inp.click();
        }

        function handlePhotoSelect(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const liveImg = document.getElementById('polaroidLivePreview');
                const placeholder = document.getElementById('polaroidPlaceholder');
                if (liveImg && placeholder) {
                    liveImg.src = e.target.result;
                    liveImg.style.display = 'block';
                    placeholder.style.display = 'none';
                }
            };
            reader.readAsDataURL(file);
        }


        /* ================= PHOTO MEMORIES (POLAROID) ================= */
        const photoModal = document.getElementById('photoModal');
        const modalFileInput = document.getElementById('modalFileInput');
        const modalCaptionInput = document.getElementById('modalCaptionInput');
        const modalDateInput = document.getElementById('modalDateInput');
        const polaroidGrid = document.getElementById('polaroidGrid');

        function openPhotoModal() {
            photoModal.classList.add('open');
            modalDateInput.valueAsDate = new Date();
        }

                function closePhotoModal() {
            photoModal.classList.remove('open');
            modalFileInput.value = '';
            modalCaptionInput.value = '';
            const liveImg = document.getElementById('polaroidLivePreview');
            const placeholder = document.getElementById('polaroidPlaceholder');
            if (liveImg) { liveImg.src = ''; liveImg.style.display = 'none'; }
            if (placeholder) { placeholder.style.display = 'flex'; }
        }

        function getPhotosKey() {
            return `hihi_photos_${currentUser || 'default'}`;
        }

        function getStoredPhotos() {
            const raw = localStorage.getItem(getPhotosKey());
            if (raw) return JSON.parse(raw);
            return [
                {
                    id: 1,
                    dataUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
                    caption: "Deburan ombak di kala senja 🌊",
                    date: "Kenangan Pertama"
                },
                {
                    id: 2,
                    dataUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80",
                    caption: "Cahaya matahari & hari yang tenang 🌿",
                    date: "Momen Bahagia"
                }
            ];
        }

        function renderHomePhotosPreview() {
            const container = document.getElementById('homePolaroidPreviewRow');
            if (!container) return;
            container.innerHTML = '';

            const photos = getStoredPhotos();
            if (photos.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; color: var(--text-dim); font-size: 0.82rem; padding: 18px 0; width: 100%;">
                        <iconify-icon icon="solar:gallery-minimalistic-bold-duotone" style="font-size: 28px; opacity: 0.5; margin-bottom: 4px; display: block;"></iconify-icon>
                        Belum ada foto kenangan. Yuk abadikan momen bahagiamu! ✨
                    </div>
                `;
                return;
            }

            const recent = photos.slice(-3);
            recent.forEach((item, idx) => {
                const div = document.createElement('div');
                div.className = 'home-polaroid-item';
                div.onclick = () => switchTab('photos');
                div.innerHTML = `
                    <div class="home-polaroid-tape"></div>
                    <img src="${item.dataUrl}" class="home-polaroid-img" alt="Foto">
                    <div class="home-polaroid-caption">${escapeHtml(item.caption || 'Kenangan')}</div>
                `;
                container.appendChild(div);
            });
        }

        function renderPhotos() {
            renderHomePhotosPreview();

            if (!polaroidGrid) return;
            const photos = getStoredPhotos();
            polaroidGrid.innerHTML = '';

            if (photos.length === 0) {
                polaroidGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-dim);">
                        <iconify-icon icon="solar:camera-minimalistic-bold-duotone" style="font-size: 38px; color: var(--accent-main); margin-bottom: 8px;"></iconify-icon>
                        <p>Belum ada foto kenangan. Klik tombol <strong>"+ Tambah Foto"</strong> di atas!</p>
                    </div>
                `;
                return;
            }

            photos.forEach(item => {
                const card = document.createElement('div');
                card.className = 'polaroid-card';
                card.onclick = () => openPolaroidFocus(item);
                card.innerHTML = `
                    <div class="polaroid-tape"></div>
                    <button class="polaroid-delete-btn" onclick="event.stopPropagation(); deletePhoto(${item.id})" title="Hapus foto ini">
                        <iconify-icon icon="solar:trash-bin-trash-bold"></iconify-icon>
                    </button>
                    <div class="polaroid-img-wrapper">
                        <img src="${item.dataUrl}" alt="${escapeHtml(item.caption)}">
                    </div>
                    <div class="polaroid-caption">${escapeHtml(item.caption)}</div>
                    <div class="polaroid-date">${escapeHtml(item.date)}</div>
                `;
                polaroidGrid.appendChild(card);
            });
        }

        /* ================= 3D POLAROID FOCUS & FLIP LOGIC ================= */
        const polaroidFocusModal = document.getElementById('polaroidFocusModal');
        const polaroid3dCard = document.getElementById('polaroid3dCard');
        const focusPolaroidImg = document.getElementById('focusPolaroidImg');
        const focusPolaroidCaption = document.getElementById('focusPolaroidCaption');
        const focusPolaroidDate = document.getElementById('focusPolaroidDate');
        const focusPolaroidBackDateStamp = document.getElementById('focusPolaroidBackDateStamp');
        const focusPolaroidBackNote = document.getElementById('focusPolaroidBackNote');

        function openPolaroidFocus(item) {
            if (!item || !polaroidFocusModal) return;

            if (focusPolaroidImg) focusPolaroidImg.src = item.dataUrl || '';
            if (focusPolaroidCaption) focusPolaroidCaption.textContent = item.caption || 'Kenangan Manis';
            if (focusPolaroidDate) focusPolaroidDate.textContent = item.date || 'Momen Indah';
            if (focusPolaroidBackDateStamp) focusPolaroidBackDateStamp.textContent = item.date || 'ARCHIVE';
            if (focusPolaroidBackNote) {
                focusPolaroidBackNote.textContent = `"${item.caption || 'Kenangan manis yang selalu hangat di hati...'}"`;
            }

            if (polaroid3dCard) {
                polaroid3dCard.classList.remove('flipped');
            }

            polaroidFocusModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closePolaroidFocus() {
            if (!polaroidFocusModal) return;
            polaroidFocusModal.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (polaroid3dCard) polaroid3dCard.classList.remove('flipped');
            }, 300);
        }

        function togglePolaroidFlip(e) {
            if (e) e.stopPropagation();
            if (!polaroid3dCard) return;
            polaroid3dCard.classList.toggle('flipped');
        }

        function handlePolaroidBackdropClick(e) {
            if (e.target === polaroidFocusModal) {
                closePolaroidFocus();
            }
        }

        // Global key listener for Escape to close focus modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && polaroidFocusModal && polaroidFocusModal.classList.contains('open')) {
                closePolaroidFocus();
            }
        });

        function saveNewPhoto() {
            const file = modalFileInput.files[0];
            const caption = modalCaptionInput.value.trim();
            const date = modalDateInput.value || "Momen Bahagia";

            if (!file) {
                alert("Pilih file foto terlebih dahulu!");
                return;
            }
            if (!caption) {
                alert("Tulis catatan singkat untuk foto ini!");
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const newPhoto = {
                    id: Date.now(),
                    dataUrl: e.target.result,
                    caption: caption,
                    date: date
                };
                const photos = getStoredPhotos();
                photos.unshift(newPhoto);
                localStorage.setItem(getPhotosKey(), JSON.stringify(photos));
                closePhotoModal();
                renderPhotos();
            };
            reader.readAsDataURL(file);
        }

        window.deletePhoto = function(id) {
            if (confirm("Hapus foto kenangan ini?")) {
                let photos = getStoredPhotos();
                photos = photos.filter(p => p.id !== id);
                localStorage.setItem(getPhotosKey(), JSON.stringify(photos));
                renderPhotos();
            }
        };

        function escapeHtml(str) {
            return String(str).replace(/[&<>'"]/g, 
                tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
            );
        }
