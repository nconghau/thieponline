// App logic for ThiepOnline

document.addEventListener('DOMContentLoaded', () => {
    // Detect page by unique elements
    const isHomePage = document.getElementById('template-grid');
    const isEditorPage = document.getElementById('upload-trigger');
    const isViewerPage = document.getElementById('envelope') || document.getElementById('card-container');

    if (isHomePage) {
        if (typeof templates !== 'undefined') {
            renderTemplates('all');
            setupFilters();
        }
    } else if (isEditorPage) {
        initEditor();
    } else if (isViewerPage) {
        initViewer();
    }
});

// ==========================================
// HOMEPAGE LOGIC
// ==========================================

function renderTemplates(category) {
    const grid = document.getElementById('template-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = category === 'all' 
        ? templates 
        : templates.filter(t => t.category === category);

    filtered.forEach(t => {
        const card = document.createElement('div');
        card.className = 'group relative rounded-xl overflow-hidden cursor-pointer'; // Minimal wrapper
        card.innerHTML = `
            <div class="relative aspect-[9/16] overflow-hidden bg-gray-800 rounded-xl">
                <img src="${t.image}" alt="${t.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-700">
                <!-- Overlay Gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                
                <!-- Badge -->
                 <div class="absolute top-3 right-3 px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-bold text-white border border-white/20 uppercase tracking-wide">
                    VIP
                </div>

                <!-- Hover Action -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href="create.html?tpl=${t.id}" class="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition duration-300 shadow-lg hover:bg-rose-500">
                        Sử Dụng
                    </a>
                </div>
                
                <div class="absolute bottom-4 left-4 right-4">
                    <h3 class="font-bold text-white text-lg truncate">${t.title}</h3>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupFilters() {
    const buttons = document.querySelectorAll('#category-filters button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            buttons.forEach(b => {
                b.classList.remove('bg-primary', 'text-white');
                b.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-white/10');
            });
            btn.classList.remove('text-gray-400', 'hover:text-white', 'hover:bg-white/10');
            btn.classList.add('bg-primary', 'text-white');

            const cat = btn.getAttribute('data-cat');
            renderTemplates(cat);
        });
    });
}

// Cloudinary Config - Unsigned Preset for Security
const CLOUD_NAME = 'dkeupjars';
const UPLOAD_PRESET = 'thieponline_guest';

// Preview Audio Global
let previewAudio = new Audio();
let currentPreviewUrl = '';

// ==========================================
// EDITOR LOGIC (create.html)
// ==========================================

const urlParams = new URLSearchParams(window.location.search);
const tplId = urlParams.get('tpl');

let currentCardState = {
    templateId: tplId,
    image: '', 
    title: '',
    message: '',
    music: '',
    theme: 'bg-white',
    uploadedImageUrl: ''
};

if (window.location.pathname.includes('create.html')) {
    initEditor();
}

function initEditor() {
    if (!tplId) {
        alert('Không tìm thấy mẫu thiệp! Quay lại trang chủ.');
        window.location.href = 'index.html';
        return;
    }

    const template = templates.find(t => t.id === tplId);
    if (!template) {
        alert('Mẫu không tồn tại!');
        window.location.href = 'index.html';
        return;
    }

    // Initialize UI
    document.getElementById('card-image').src = template.image;
    document.getElementById('card-title').innerText = template.title;
    
    currentCardState.image = template.image;
    currentCardState.title = template.title;

    // Render Music Options with Preview
    renderMusicOptions();

    // Event Listeners
    setupInputs();
    setupImageUpload();
    setupColorPicker();
    setupMusicSearch();
    
    document.getElementById('btn-save').addEventListener('click', generateCard);
}

function renderMusicOptions(list = musicTracks) {
    const musicContainer = document.getElementById('music-list');
    if (!musicContainer) return;
    musicContainer.innerHTML = '';
    
    if (list.length === 0) {
        musicContainer.innerHTML = '<p class="text-gray-500 text-xs text-center py-4">Không tìm thấy bài hát nào.</p>';
        return;
    }

    list.forEach((track, index) => {
        const div = document.createElement('div');
        div.className = 'flex items-center gap-3 p-3 bg-[#2D2833] rounded-lg border border-white/10 hover:border-primary cursor-pointer transition music-option';
        
        // Play/Pause Button (stops propagation to avoid selecting when just previewing)
        const playBtnHtml = `
            <button class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-primary transition mr-2 play-preview-btn" data-url="${track.url}">
                <i class="fas fa-play text-xs"></i>
            </button>
        `;
        
        div.innerHTML = `
            ${playBtnHtml}
            <div class="flex-1 overflow-hidden">
                <span class="text-sm font-medium text-gray-300 block truncate">${track.name}</span>
            </div>
            <i class="fas fa-check-circle text-primary opacity-0 check-icon"></i>
        `;
        
        // Click on row selects the music
        div.onclick = (e) => {
            if (e.target.closest('.play-preview-btn')) return; // Ignore if clicking play button
            selectMusic(div, track.url);
        };
        
        // Mark as selected if matches current state
        if (currentCardState.music === track.url) {
             div.classList.remove('bg-[#2D2833]', 'border-white/10');
             div.classList.add('border-primary', 'bg-white/10');
             div.querySelector('.check-icon').classList.remove('opacity-0');
        }

        musicContainer.appendChild(div);
    });

    // Attach listeners to play buttons
    document.querySelectorAll('.play-preview-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePreview(btn, btn.getAttribute('data-url'));
        });
    });
}

function setupMusicSearch() {
    const input = document.getElementById('music-search');
    const btn = document.getElementById('btn-search-music');
    
    if (!input || !btn) return;

    const performSearch = async () => {
        const query = input.value.trim();
        if (!query) {
            renderMusicOptions(musicTracks); // Reset to default
            return;
        }

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        // input.disabled = true; // Don't disable input for auto-search UX

        try {
            const results = await searchMusicFromItunes(query);
            renderMusicOptions(results);
        } catch (e) {
            console.error(e);
            // alert('Lỗi tìm kiếm: ' + e.message); // Suppress alert for auto-search
        } finally {
            btn.innerHTML = '<i class="fas fa-search"></i>';
            // input.disabled = false;
            // input.focus();
        }
    };

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedSearch = debounce(performSearch, 500);

    btn.addEventListener('click', performSearch);
    input.addEventListener('input', debouncedSearch); // Auto-search on typing
}

async function searchMusicFromItunes(term) {
    // iTunes Search API
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=VN&media=music&limit=10`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    
    const data = await res.json();
    return data.results.map(item => ({
        name: `${item.trackName} - ${item.artistName}`,
        url: item.previewUrl
    }));
}

function togglePreview(btn, url) {
    const icon = btn.querySelector('i');
    
    // Stop any current playback if distinct
    if (currentPreviewUrl && currentPreviewUrl !== url) {
        previewAudio.pause();
        previewAudio.currentTime = 0;
        // Reset all icons
        document.querySelectorAll('.play-preview-btn i').forEach(i => i.className = 'fas fa-play text-xs');
    }

    if (previewAudio.paused || currentPreviewUrl !== url) {
        previewAudio.src = url;
        currentPreviewUrl = url;
        previewAudio.play().catch(e => {
            if (e.name !== 'AbortError') {
                console.error("Preview blocked", e);
            }
        });
        if (icon) icon.className = 'fas fa-pause text-xs';
    } else {
        previewAudio.pause();
        if (icon) icon.className = 'fas fa-play text-xs';
    }
}

function selectMusic(element, url) {
    // UI update
    document.querySelectorAll('.music-option').forEach(el => {
        el.classList.remove('border-primary', 'bg-white/10');
        el.classList.add('bg-[#2D2833]', 'border-white/10');
        el.querySelector('.check-icon').classList.add('opacity-0');
    });
    element.classList.remove('bg-[#2D2833]', 'border-white/10');
    element.classList.add('border-primary', 'bg-white/10');
    element.querySelector('.check-icon').classList.remove('opacity-0');

    currentCardState.music = url;
}

function setupInputs() {
    const titleInput = document.getElementById('input-title');
    const msgInput = document.getElementById('input-message');
    const cardTitle = document.getElementById('card-title');
    const cardMsg = document.getElementById('card-message');

    // Defaults
    titleInput.value = currentCardState.title;
    cardMsg.innerText = "Nhập lời chúc của bạn...";

    titleInput.addEventListener('input', (e) => {
        cardTitle.innerText = e.target.value || 'Tiêu đề';
        currentCardState.title = e.target.value;
    });

    msgInput.addEventListener('input', (e) => {
        cardMsg.innerText = e.target.value || '';
        currentCardState.message = e.target.value;
    });
}

function setupImageUpload() {
    // The input is triggered by the label now, so we only need to listen for change
    const input = document.getElementById('image-input');
    const cardImage = document.getElementById('card-image');
    // Using the label or container for status updates
    const triggerLabel = document.getElementById('upload-trigger-label');
    const statusText = triggerLabel ? triggerLabel.querySelector('span') : null;
    const icon = triggerLabel ? triggerLabel.querySelector('i') : null;

    if (!input) return;

    // No need for click listener anymore


    input.addEventListener('change', async (e) => {
        console.log("File input changed");
        const file = e.target.files[0];
        const saveBtn = document.getElementById('btn-save');

        if (file) {
            console.log("File selected:", file.name, "Size:", file.size);
            
            if (file.size > 5 * 1024 * 1024) {
                alert('File quá lớn! Vui lòng chọn ảnh < 5MB');
                return;
            }

            // 1. Show immediate local preview
            const reader = new FileReader();
            reader.onload = (e) => {
                if (cardImage) cardImage.src = e.target.result;
            };
            reader.readAsDataURL(file);

            // 2. Upload to Cloudinary
            try {
                // UI Loading state
                statusText.innerText = "Đang tải lên 0%...";
                icon.className = "fas fa-spinner fa-spin text-3xl text-primary mb-3 transition";
                if (saveBtn) {
                    saveBtn.disabled = true;
                    saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    saveBtn.querySelector('span').innerText = 'Đang tải ảnh...';
                }
                
                const uploadedUrl = await uploadImageToCloudinary(file);
                console.log("Upload success:", uploadedUrl);
                
                if (uploadedUrl) {
                    currentCardState.uploadedImageUrl = uploadedUrl;
                    currentCardState.image = uploadedUrl; 
                    
                    statusText.innerText = "Tải ảnh thành công!";
                    icon.className = "fas fa-check-circle text-3xl text-green-500 mb-3 transition";
                }
            } catch (error) {
                console.error("Upload failed details:", error);
                statusText.innerText = "Lỗi tải ảnh. Thử lại?";
                icon.className = "fas fa-exclamation-triangle text-3xl text-red-500 mb-3 transition";
                alert('Lỗi tải ảnh: ' + (error.message || error));
            } finally {
                if (saveBtn) {
                    saveBtn.disabled = false;
                    saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    saveBtn.querySelector('span').innerText = 'Hoàn Tất';
                }
            }
        }
    });
}

async function uploadImageToCloudinary(file) {
    console.log("Uploading image to Cloudinary...");
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        throw error;
    }
}


function setupColorPicker() {
    const btns = document.querySelectorAll('.color-btn');
    const container = document.getElementById('preview-container');
    
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const colorClass = btn.getAttribute('data-color');
            if (container) container.className = `flex-1 relative flex items-center justify-center p-4 lg:p-10 overflow-hidden ${colorClass}`;
            currentCardState.theme = colorClass;
        });
    });
}

function generateCard() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('hidden');
        loading.classList.add('flex');
    }

    // Stop preview audio if playing
    if (previewAudio) {
        previewAudio.pause();
    }

    // Simulate processing
    setTimeout(() => {
        // Use the Cloudinary URL if uploaded, otherwise local template image
        const finalImage = currentCardState.uploadedImageUrl || currentCardState.image;

        const params = new URLSearchParams({
            id: currentCardState.templateId,
            title: currentCardState.title,
            msg: currentCardState.message,
            music: currentCardState.music,
            theme: currentCardState.theme,
            img: finalImage // Passing URL now!
        });

        window.location.href = `view.html?${params.toString()}`;
    }, 1500);
}


// ==========================================
// VIEWER LOGIC (view.html)
// ==========================================

function initViewer() {
    const params = new URLSearchParams(window.location.search);
    
    // Extract Data
    const title = params.get('title') || 'Chúc Mừng';
    const message = params.get('msg') || 'Lời chúc tốt đẹp nhất!';
    const musicUrl = params.get('music');
    const theme = params.get('theme') || 'bg-gray-900';
    let imgSrc = params.get('img');
    const imgId = params.get('imgId');

    // Handle LocalStorage Image (for Demo)
    if (imgId) {
        const storedImg = localStorage.getItem('card_img_' + imgId);
        if (storedImg) {
            imgSrc = storedImg;
        }
    }
    // Fallback if no image
    if (!imgSrc) {
        imgSrc = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop';
    }

    // Update UI
    const titleEl = document.getElementById('view-title');
    const msgEl = document.getElementById('view-message');
    const imgEl = document.getElementById('view-image');

    if (titleEl) titleEl.innerText = title;
    if (msgEl) msgEl.innerText = message;
    if (imgEl) imgEl.src = imgSrc;
    
    // Update Theme Background
    const bgContainer = document.querySelector('body');
    if (theme.includes('pink') && bgContainer) bgContainer.style.backgroundColor = '#FDF2F8';
    if (theme.includes('blue') && bgContainer) bgContainer.style.backgroundColor = '#EFF6FF';
    if (theme.includes('yellow') && bgContainer) bgContainer.style.backgroundColor = '#FEFCE8';
    
    // Music Setup
    const audio = document.getElementById('bg-music');
    if (musicUrl && audio) {
        audio.src = musicUrl;
    }

    // Interaction Start
    const envelope = document.getElementById('envelope');
    const cardContainer = document.getElementById('card-container');
    
    if (envelope && cardContainer) {
        envelope.addEventListener('click', () => {
            // Animation
            envelope.style.opacity = '0';
            setTimeout(() => envelope.remove(), 1000); // Remove after fade

            cardContainer.classList.remove('opacity-0', 'scale-95');
            
            // Play Music
            if (musicUrl && audio) {
                audio.play().catch(e => console.log("Autoplay blocked:", e));
            }

            // Confetti Effect
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#FF6F61', '#F7CAC9', '#FFD700']
                });
            }
        });
    }

    // Music Toggle
    const musicBtn = document.getElementById('music-toggle');
    if (musicBtn && audio) {
        let isPlaying = true;
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                audio.play();
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    // Share Logic
    setupSharing();
}

let cachedShortUrl = null;

async function getShortUrl() {
    if (cachedShortUrl) return cachedShortUrl;
    const longUrl = window.location.href;
    
    // 1. Try da.gd (Ad-free, CORS supported)
    try {
        const response = await fetch(`https://da.gd/s?url=${encodeURIComponent(longUrl)}`);
        if (response.ok) {
            const text = await response.text();
            if (text && text.startsWith('http')) {
                cachedShortUrl = text.trim();
                return cachedShortUrl;
            }
        }
    } catch (e) {
        console.warn("da.gd failed, falling back to TinyURL", e);
    }

    // 2. Fallback to TinyURL
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        if (response.ok) {
            cachedShortUrl = await response.text();
            return cachedShortUrl;
        }
    } catch (e) {
        console.error("Shortener failed", e);
    }
    return longUrl; // Final Fallback
}

function setupSharing() {
    const btnShare = document.getElementById('btn-share');
    const modal = document.getElementById('share-modal');
    if (!btnShare || !modal) return;

    btnShare.addEventListener('click', async () => {
        // Show loading state
        const originalContent = btnShare.innerHTML;
        btnShare.disabled = true;
        // Keep dimensions if possible, or just icon
        btnShare.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        const url = await getShortUrl();
        
        // Update Zalo
        const zaloBtn = document.getElementById('share-zalo');
        if (zaloBtn) zaloBtn.href = `https://zalo.me/share?url=${encodeURIComponent(url)}`;
        
        // Update Messenger (Mobile Protocol)
        const fbBtn = document.getElementById('share-fb');
        if (fbBtn) fbBtn.href = `fb-messenger://share/?link=${encodeURIComponent(url)}`;

        // Update Copy Button
        const copyBtn = document.getElementById('share-copy');
        if (copyBtn) {
            // Remove old listeners to be safe (cloning node is a trick)
            const newCopyBtn = copyBtn.cloneNode(true);
            copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);
            
            newCopyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(url).then(() => {
                    alert('Đã sao chép liên kết ngắn: ' + url);
                });
            });
        }

        // Restore button and show modal
        btnShare.innerHTML = originalContent;
        btnShare.disabled = false;
        modal.classList.remove('hidden');
    });
}
