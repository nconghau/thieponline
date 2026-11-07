// App logic for ThiepOnline

const CustomDialog = {
    el: null,
    backdrop: null,
    panel: null,
    title: null,
    message: null,
    actions: null,
    icon: null,
    
    init() {
        this.el = document.getElementById('custom-dialog');
        if (!this.el) {
            const wrapper = document.createElement('div');
            wrapper.id = 'custom-dialog';
            wrapper.className = 'fixed inset-0 z-[100] hidden items-center justify-center';
            wrapper.innerHTML = `
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity opacity-0 duration-300" id="dialog-backdrop"></div>
                <div class="relative bg-[#2D2833] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full mx-4 transform scale-95 opacity-0 transition-all duration-300 z-10" id="dialog-panel">
                    <div class="text-center">
                        <div id="dialog-icon-container" class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6 ring-1 ring-primary/30">
                            <i id="dialog-icon" class="fas fa-info text-2xl text-primary"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3 tracking-tight" id="dialog-title">Thông báo</h3>
                        <p class="text-gray-400 mb-8 leading-relaxed font-light" id="dialog-message">Nội dung thông báo...</p>
                        <div class="flex flex-col sm:flex-row gap-3 justify-center" id="dialog-actions"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(wrapper);
            this.el = wrapper;
        }
        this.backdrop = document.getElementById('dialog-backdrop');
        this.panel = document.getElementById('dialog-panel');
        this.title = document.getElementById('dialog-title');
        this.message = document.getElementById('dialog-message');
        this.actions = document.getElementById('dialog-actions');
        this.icon = document.getElementById('dialog-icon');
        this.iconContainer = document.getElementById('dialog-icon-container'); 
    },

    show(msg, titleText = 'Thông Báo', type = 'alert', iconClass = 'fas fa-info') {
        return new Promise((resolve) => {
            if (!this.el) this.init();
            
            // Content
            this.title.innerText = titleText;
            this.message.innerText = msg;
            this.icon.className = iconClass + ' text-2xl'; // Base size
            
            // Adjust colors based on type
            if (type === 'error') {
                 this.icon.classList.remove('text-primary');
                 this.icon.classList.add('text-red-500');
                 this.iconContainer.classList.remove('bg-primary/10', 'ring-primary/30');
                 this.iconContainer.classList.add('bg-red-500/10', 'ring-red-500/30');
            } else {
                 this.icon.classList.add('text-primary');
                 this.icon.classList.remove('text-red-500');
                 this.iconContainer.classList.add('bg-primary/10', 'ring-primary/30');
                 this.iconContainer.classList.remove('bg-red-500/10', 'ring-red-500/30');
            }

            // Actions
            this.actions.innerHTML = '';
            
            if (type === 'confirm') {
                const btnCancel = document.createElement('button');
                btnCancel.className = 'w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition font-medium';
                btnCancel.innerText = 'Bỏ qua';
                btnCancel.onclick = () => {
                    this.close();
                    resolve(false);
                };
                
                const btnOk = document.createElement('button');
                btnOk.className = 'w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-rose-600 transition shadow-lg shadow-primary/20';
                btnOk.innerText = 'Đồng ý';
                btnOk.onclick = () => {
                    this.close();
                    resolve(true);
                };
                
                this.actions.appendChild(btnCancel);
                this.actions.appendChild(btnOk);
            } else {
                 const btnOk = document.createElement('button');
                btnOk.className = 'w-full sm:w-auto px-6 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-rose-600 transition shadow-lg shadow-primary/20';
                btnOk.innerText = 'Đã hiểu';
                btnOk.onclick = () => {
                    this.close();
                    resolve(true);
                };
                this.actions.appendChild(btnOk);
            }

            // Show
            this.el.classList.remove('hidden');
            this.el.classList.add('flex');
            
            // Animation Trigger
            // Small delay to ensure display:flex is applied before opacity transition
            setTimeout(() => {
                this.backdrop.classList.remove('opacity-0');
                this.panel.classList.remove('opacity-0', 'scale-95');
                this.panel.classList.add('scale-100');
            }, 10);
        });
    },

    close() {
        this.backdrop.classList.add('opacity-0');
        this.panel.classList.add('opacity-0', 'scale-95');
        this.panel.classList.remove('scale-100');
        
        setTimeout(() => {
             this.el.classList.add('hidden');
             this.el.classList.remove('flex');
        }, 300);
    },

    alert(msg, title = 'Thông Báo') {
        return this.show(msg, title, 'alert', 'fas fa-info-circle');
    },

    confirm(msg, title = 'Xác Nhận') {
        return this.show(msg, title, 'confirm', 'fas fa-question-circle');
    },

    error(msg, title = 'Úi! Đã có lỗi') {
        return this.show(msg, title, 'error', 'fas fa-exclamation-triangle');
    }
};

const MusicController = {
    unlockAndPlay: function() {
        const audio = document.getElementById('bg-music');
        if (audio && audio.src) {
            audio.play().catch(e => {
                // Silently fail if interaction is not allowed yet or other issues
                // console.warn("Audio unlock attempt:", e);
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Detect page by unique elements
    const isHomePage = document.getElementById('template-grid');
    const isEditorPage = document.getElementById('card-preview') || document.getElementById('image-input');
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

const FONT_OPTIONS = [
    { name: 'Dancing Script', family: '"Dancing Script", cursive', class: 'font-hand' },
    { name: 'Pacifico', family: '"Pacifico", cursive', class: 'font-[Pacifico]' },
    { name: 'Great Vibes', family: '"Great Vibes", cursive', class: 'font-["Great_Vibes"]' },
    { name: 'Patrick Hand', family: '"Patrick Hand", cursive', class: 'font-["Patrick_Hand"]' },
    { name: 'Lora', family: '"Lora", serif', class: 'font-serif' },
    { name: 'Playfair', family: '"Playfair Display", serif', class: 'font-["Playfair_Display"]' },
    { name: 'Merriweather', family: '"Merriweather", serif', class: 'font-["Merriweather"]' },
    { name: 'Be Vietnam Pro', family: '"Be Vietnam Pro", sans-serif', class: 'font-sans' },
    { name: 'Montserrat', family: '"Montserrat", sans-serif', class: 'font-["Montserrat"]' },
    { name: 'Nunito', family: '"Nunito", sans-serif', class: 'font-["Nunito"]' },
];

// ==========================================
// HOMEPAGE LOGIC
// ==========================================

const CATEGORY_NAMES = {
    wedding: 'Thiệp cưới',
    birthday: 'Sinh nhật',
    graduation: 'Tốt nghiệp',
    event: 'Sự kiện',
    anniversary: 'Kỷ niệm',
    wishes: 'Lời chúc & Lễ',
    other: 'Khác'
};

const LAYOUT_NAMES = {
    split: 'Tiêu chuẩn',
    overlay: 'Tràn viền',
    polaroid: 'Polaroid',
    letter: 'Thư tay'
};

let currentCategory = 'all';
let currentSearchQuery = '';

function renderTemplates(category = currentCategory, searchQuery = currentSearchQuery) {
    const grid = document.getElementById('template-grid');
    const countEl = document.getElementById('template-count');
    if (!grid) return;
    grid.innerHTML = '';

    currentCategory = category;
    currentSearchQuery = (searchQuery || '').trim().toLowerCase();

    let filtered = category === 'all' 
        ? templates 
        : templates.filter(t => t.category === category);

    if (currentSearchQuery) {
        filtered = filtered.filter(t => {
            const titleMatch = t.title.toLowerCase().includes(currentSearchQuery);
            const tagMatch = t.tags && t.tags.some(tag => tag.toLowerCase().includes(currentSearchQuery));
            const catMatch = CATEGORY_NAMES[t.category] && CATEGORY_NAMES[t.category].toLowerCase().includes(currentSearchQuery);
            return titleMatch || tagMatch || catMatch;
        });
    }

    if (countEl) {
        countEl.innerText = filtered.length > 0 
            ? `Hiển thị ${filtered.length} mẫu` 
            : '0 mẫu phù hợp';
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-2 lg:col-span-4 py-16 text-center">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-gray-400">
                    <i class="fas fa-search"></i>
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Không tìm thấy mẫu phù hợp</h3>
                <p class="text-sm text-gray-400 mb-6">Hãy thử tìm với từ khóa khác như "cưới", "sinh nhật", "tết", hoặc chọn danh mục "Tất cả".</p>
                <button type="button" id="btn-reset-search" class="px-6 py-2.5 rounded-full bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-white transition text-xs font-semibold">
                    Xem Tất Cả Mẫu
                </button>
            </div>
        `;
        const resetBtn = document.getElementById('btn-reset-search');
        if (resetBtn) {
            resetBtn.onclick = () => resetTemplateFilters();
        }
        return;
    }

    filtered.forEach(t => {
        const card = document.createElement('a');
        card.href = `create.html?tpl=${encodeURIComponent(t.id)}`;
        card.className = 'group relative block rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#18151D]';
        card.setAttribute('aria-label', `Sử dụng mẫu ${t.title}`);
        
        const catName = CATEGORY_NAMES[t.category] || 'Mẫu đẹp';
        const layoutName = LAYOUT_NAMES[t.layout] || 'Tiêu chuẩn';

        card.innerHTML = `
            <div class="relative aspect-[9/16] overflow-hidden bg-gray-800 rounded-xl">
                <img src="${t.image}" alt="${t.title}" loading="lazy" decoding="async" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-700">
                <!-- Overlay Gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90"></div>
                
                <!-- Badges -->
                <div class="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
                    <span class="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-medium text-white/90">
                        ${catName}
                    </span>
                    <span class="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[9px] uppercase tracking-wider font-bold text-primary">
                        ${layoutName}
                    </span>
                </div>

                <!-- Hover Action -->
                <div class="absolute inset-0 bg-black/20 opacity-100 md:bg-black/40 md:opacity-0 md:group-hover:opacity-100 md:group-focus:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span class="bg-primary text-white px-4 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm md:translate-y-4 md:group-hover:translate-y-0 md:group-focus:translate-y-0 transition duration-300 shadow-lg">
                        Sử Dụng
                    </span>
                </div>
                
                <div class="absolute bottom-4 left-4 right-4 z-10">
                    <h3 class="font-bold text-white text-base sm:text-lg truncate">${t.title}</h3>
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
            renderTemplates(cat, currentSearchQuery);
        });
    });

    const searchInput = document.getElementById('template-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderTemplates(currentCategory, e.target.value);
        });
    }
}

function resetTemplateFilters() {
    const searchInput = document.getElementById('template-search');
    if (searchInput) searchInput.value = '';
    const allBtn = document.querySelector('#category-filters button[data-cat="all"]');
    if (allBtn) allBtn.click();
    else renderTemplates('all', '');
}

// Cloudinary Config - Unsigned Preset for Security
const CLOUD_NAME = 'dkeupjars';
const UPLOAD_PRESET = 'thieponline_guest';

// Preview Audio Global
let previewAudio = new Audio();
let currentPreviewUrl = '';

// ==========================================
// CARD THEMES & LAYOUTS ENGINE
// ==========================================

const CARD_THEMES = {
    pink: {
        id: 'pink',
        name: 'Hồng Lãng Mạn',
        cardBg: '#FFF1F2',
        cardBorder: '#FECDD3',
        titleColor: '#9F1239',
        messageColor: '#881337',
        ambientBg: '#2A1725'
    },
    blue: {
        id: 'blue',
        name: 'Xanh Thanh Lịch',
        cardBg: '#F0F9FF',
        cardBorder: '#BAE6FD',
        titleColor: '#0369A1',
        messageColor: '#0C4A6E',
        ambientBg: '#131B2E'
    },
    yellow: {
        id: 'yellow',
        name: 'Vàng Ấm Áp',
        cardBg: '#FEFCE8',
        cardBorder: '#FEF08A',
        titleColor: '#A16207',
        messageColor: '#713F12',
        ambientBg: '#241F18'
    },
    dark: {
        id: 'dark',
        name: 'Đen Sang Trọng',
        cardBg: '#1F1B24',
        cardBorder: '#383244',
        titleColor: '#FBBF24',
        messageColor: '#F3F4F6',
        ambientBg: '#0F0D11'
    }
};

const CARD_LAYOUTS = {
    split: {
        id: 'split',
        name: 'Tiêu chuẩn',
        icon: 'fas fa-columns'
    },
    overlay: {
        id: 'overlay',
        name: 'Tràn viền',
        icon: 'fas fa-expand'
    },
    polaroid: {
        id: 'polaroid',
        name: 'Polaroid',
        icon: 'fas fa-camera-retro'
    },
    letter: {
        id: 'letter',
        name: 'Thư tay',
        icon: 'fas fa-envelope-open-text'
    }
};

function normalizeTheme(theme) {
    if (!theme) return 'pink';
    const t = String(theme).toLowerCase();
    if (t.includes('blue')) return 'blue';
    if (t.includes('yellow')) return 'yellow';
    if (t.includes('dark') || t.includes('1f1b24') || t.includes('gray')) return 'dark';
    return 'pink';
}

function normalizeLayout(layout) {
    if (!layout) return 'split';
    const l = String(layout).toLowerCase();
    if (l.includes('over') || l.includes('full') || l.includes('cinema')) return 'overlay';
    if (l.includes('pola') || l.includes('film') || l.includes('vintage')) return 'polaroid';
    if (l.includes('let') || l.includes('thu') || l.includes('mail')) return 'letter';
    return 'split';
}

function applyCardLayout(layoutKey, mode = 'editor') {
    const key = normalizeLayout(layoutKey);
    const prefix = mode === 'editor' ? 'card' : 'view';

    const card = document.getElementById(mode === 'editor' ? 'card-preview' : 'view-card');
    const imgWrapper = document.getElementById(`${prefix}-image-wrapper`);
    const img = document.getElementById(`${prefix}-image`);
    const imgGradient = document.getElementById(`${prefix}-image-gradient`);
    const content = document.getElementById(`${prefix}-content-layer`);

    if (!card || !imgWrapper || !content) return;

    // Reset layout classes
    card.classList.remove('p-0', 'p-3', 'sm:p-4', 'sm:p-5', 'pb-6', 'pb-8', 'pb-12', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-sm');
    imgWrapper.classList.remove('h-3/5', 'h-[60%]', 'h-[62%]', 'sm:h-[65%]', 'w-full', 'aspect-square', 'w-20', 'h-20', 'sm:w-28', 'sm:h-28', 'rounded-full', 'ring-4', 'ring-primary/40', 'mx-auto', 'mb-2', 'mb-3', 'flex-none', 'absolute', 'inset-0', 'z-0');
    content.classList.remove('h-2/5', 'h-[40%]', 'h-[38%]', 'sm:h-[35%]', 'absolute', 'inset-x-0', 'bottom-0', 'z-10', 'backdrop-blur-[2px]', 'bg-gradient-to-t', 'from-black/90', 'via-black/50', 'to-transparent', 'flex-1', 'border-t', 'border-current/15', 'p-4', 'sm:p-6', 'p-5', 'sm:p-7', 'px-2', 'pt-1', 'pt-2');

    if (key === 'split') {
        card.classList.add(mode === 'editor' ? 'rounded-lg' : 'rounded-sm', 'flex', 'flex-col', 'p-0', 'overflow-hidden');
        imgWrapper.classList.add(mode === 'editor' ? 'h-3/5' : 'h-[62%]', 'w-full', 'relative', 'overflow-hidden', 'rounded-none');
        if (img) img.className = 'w-full h-full object-cover transition duration-700 rounded-none';
        if (imgGradient) {
            imgGradient.className = 'absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent block';
        }
        content.classList.add(mode === 'editor' ? 'h-2/5' : 'h-[38%]', 'w-full', 'p-4', 'sm:p-6', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-center', 'relative');
    } else if (key === 'overlay') {
        card.classList.add('rounded-xl', 'relative', 'overflow-hidden', 'p-0');
        imgWrapper.classList.add('absolute', 'inset-0', 'w-full', 'h-full', 'z-0', 'overflow-hidden');
        if (img) img.className = 'w-full h-full object-cover transition duration-700 rounded-none';
        if (imgGradient) {
            imgGradient.className = 'absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10 block z-[1]';
        }
        content.classList.add('absolute', 'inset-x-0', 'bottom-0', 'z-10', 'p-5', 'sm:p-7', 'flex', 'flex-col', 'items-center', 'justify-end', 'text-center', 'bg-gradient-to-t', 'from-black/90', 'via-black/50', 'to-transparent', 'backdrop-blur-[1px]');
    } else if (key === 'polaroid') {
        card.classList.add('rounded-sm', 'flex', 'flex-col', 'p-3', 'sm:p-4', mode === 'editor' ? 'pb-6' : 'pb-8', 'overflow-hidden');
        imgWrapper.classList.add('relative', 'w-full', 'aspect-square', 'overflow-hidden', 'shadow-inner', 'rounded-sm', 'mb-2', 'flex-none');
        if (img) img.className = 'w-full h-full object-cover filter contrast-[1.05] brightness-[1.02] transition duration-700 rounded-none';
        if (imgGradient) {
            imgGradient.className = 'hidden';
        }
        content.classList.add('relative', 'w-full', 'flex-1', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-center', 'px-2', 'pt-1');
    } else if (key === 'letter') {
        card.classList.add('rounded-2xl', 'flex', 'flex-col', 'items-center', 'p-5', 'sm:p-7', 'overflow-hidden');
        imgWrapper.classList.add('relative', 'w-20', 'h-20', 'sm:w-28', 'sm:h-28', 'rounded-full', 'overflow-hidden', 'shadow-lg', 'ring-4', 'ring-primary/40', 'mx-auto', 'mb-2', 'flex-none');
        if (img) img.className = 'w-full h-full object-cover transition duration-700 rounded-full';
        if (imgGradient) {
            imgGradient.className = 'hidden';
        }
        content.classList.add('relative', 'w-full', 'flex-1', 'flex', 'flex-col', 'items-center', 'justify-center', 'text-center', 'px-2', 'pt-2', 'border-t', 'border-current/15');
    }
}

function applyTheme(themeKey, mode = 'editor') {
    const key = normalizeTheme(themeKey);
    const theme = CARD_THEMES[key] || CARD_THEMES.pink;
    const currentLayout = normalizeLayout(mode === 'editor' ? currentCardState.layout : (window.__currentViewerLayout || 'split'));

    const previewContainer = document.getElementById('preview-container');
    const body = document.querySelector('body');
    const card = document.getElementById(mode === 'editor' ? 'card-preview' : 'view-card');
    const contentLayer = document.getElementById(mode === 'editor' ? 'card-content-layer' : 'view-content-layer');
    const title = document.getElementById(mode === 'editor' ? 'card-title' : 'view-title');
    const msg = document.getElementById(mode === 'editor' ? 'card-message' : 'view-message');

    if (mode === 'editor' && previewContainer) {
        previewContainer.style.backgroundColor = theme.ambientBg;
    }
    if (mode === 'viewer' && body) {
        body.style.backgroundColor = theme.ambientBg;
    }

    if (card) {
        card.style.borderColor = theme.cardBorder;
        card.style.backgroundColor = currentLayout === 'polaroid' ? '#FFFFFF' : theme.cardBg;
    }

    if (contentLayer) {
        contentLayer.style.backgroundColor = (currentLayout === 'overlay') 
            ? 'transparent' 
            : (currentLayout === 'polaroid' ? '#FFFFFF' : theme.cardBg);
    }

    if (title) {
        title.style.color = currentLayout === 'overlay' ? '#FFFFFF' : theme.titleColor;
    }
    if (msg) {
        msg.style.color = currentLayout === 'overlay' ? 'rgba(255, 255, 255, 0.92)' : theme.messageColor;
    }
}

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
    theme: 'pink',
    font: 'Dancing Script',
    layout: 'split',
    uploadedImageUrl: ''
};

const DRAFT_PREFIX = 'thieponline_draft_';
let isEditorDirty = false;
let isPublishing = false;

function getDraftKey() {
    return tplId ? DRAFT_PREFIX + tplId : null;
}

function loadDraft() {
    const key = getDraftKey();
    if (!key) return;

    try {
        const draft = JSON.parse(localStorage.getItem(key));
        if (draft && draft.templateId === tplId) {
            currentCardState = { ...currentCardState, ...draft };
        }
    } catch (error) {
        console.warn('Cannot restore draft', error);
    }
}

function saveDraft() {
    const key = getDraftKey();
    if (!key) return;

    try {
        localStorage.setItem(key, JSON.stringify(currentCardState));
        isEditorDirty = true;
    } catch (error) {
        console.warn('Cannot save draft', error);
    }
}

function initEditor() {
    if (!tplId) {
        CustomDialog.error('Không tìm thấy mẫu thiệp! Quay lại trang chủ.').then(() => {
            window.location.href = 'index.html';
        });
        return;
    }

    const template = templates.find(t => t.id === tplId);
    if (!template) {
        CustomDialog.error('Mẫu không tồn tại!').then(() => {
            window.location.href = 'index.html';
        });
        return;
    }

    currentCardState.image = template.image;
    currentCardState.title = template.title;
    currentCardState.theme = template.theme || currentCardState.theme;
    currentCardState.layout = template.layout || currentCardState.layout;
    loadDraft();

    // Initialize UI
    document.getElementById('card-image').src = currentCardState.uploadedImageUrl || currentCardState.image;
    document.getElementById('card-title').innerText = currentCardState.title;

    // Render Music Options with Preview
    renderMusicOptions();

    // Event Listeners
    setupInputs();
    setupFontSelector();
    setupImageUpload(template);
    setupColorPicker();
    setupLayoutSelector();
    setupMusicSearch();
    applyCardLayout(currentCardState.layout, 'editor');
    applyTheme(currentCardState.theme, 'editor');
    
    document.getElementById('btn-save').addEventListener('click', generateCard);

    window.addEventListener('beforeunload', (event) => {
        if (!isEditorDirty || isPublishing) return;
        event.preventDefault();
        event.returnValue = '';
    });
}

function renderMusicOptions(list = musicTracks) {
    const musicContainer = document.getElementById('music-list');
    if (!musicContainer) return;
    musicContainer.innerHTML = '';

    const noMusic = document.createElement('button');
    noMusic.type = 'button';
    noMusic.className = 'w-full flex items-center gap-3 p-3 bg-[#2D2833] rounded-lg border border-white/10 hover:border-primary cursor-pointer transition music-option text-left';
    noMusic.innerHTML = `
        <span class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 mr-2"><i class="fas fa-volume-mute text-xs"></i></span>
        <span class="flex-1 text-sm font-medium text-gray-300">Không dùng nhạc</span>
        <i class="fas fa-check-circle text-primary opacity-0 check-icon"></i>
    `;
    noMusic.addEventListener('click', () => selectMusic(noMusic, ''));
    if (!currentCardState.music) {
        noMusic.classList.remove('bg-[#2D2833]', 'border-white/10');
        noMusic.classList.add('border-primary', 'bg-white/10');
        noMusic.querySelector('.check-icon').classList.remove('opacity-0');
    }
    musicContainer.appendChild(noMusic);
    
    if (list.length === 0) {
        musicContainer.insertAdjacentHTML('beforeend', '<p class="text-gray-500 text-xs text-center py-4">Không tìm thấy bài hát nào.</p>');
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

    const status = document.getElementById('music-status');
    let searchController = null;

    const setStatus = (message = '', isError = false) => {
        if (!status) return;
        status.textContent = message;
        status.classList.toggle('hidden', !message);
        status.classList.toggle('text-red-400', isError);
        status.classList.toggle('text-gray-400', !isError);
    };

    const performSearch = async () => {
        const query = input.value.trim();
        if (!query) {
            if (searchController) searchController.abort();
            renderMusicOptions(musicTracks); // Reset to default
            setStatus();
            return;
        }

        if (searchController) searchController.abort();
        searchController = new AbortController();
        const activeController = searchController;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        setStatus('Đang tìm nhạc...');

        try {
            const results = await searchMusicFromItunes(query, activeController.signal);
            renderMusicOptions(results);
            setStatus(results.length ? `${results.length} kết quả` : 'Không tìm thấy bài hát phù hợp.');
        } catch (e) {
            if (e.name === 'AbortError') return;
            console.error(e);
            setStatus('Không thể tìm nhạc. Vui lòng kiểm tra kết nối và thử lại.', true);
        } finally {
            if (!activeController.signal.aborted) btn.innerHTML = '<i class="fas fa-search"></i>';
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

async function searchMusicFromItunes(term, signal) {
    // iTunes Search API
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=VN&media=music&limit=10`;
    const res = await fetch(url, { signal });
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
    saveDraft();
}

function setupInputs() {
    const titleInput = document.getElementById('input-title');
    const msgInput = document.getElementById('input-message');
    const cardTitle = document.getElementById('card-title');
    const cardMsg = document.getElementById('card-message');

    const titleCounter = document.getElementById('title-counter');
    const messageCounter = document.getElementById('message-counter');
    const updateCounters = () => {
        if (titleCounter) titleCounter.textContent = `${titleInput.value.length}/80`;
        if (messageCounter) messageCounter.textContent = `${msgInput.value.length}/600`;
    };

    // Defaults / restored draft
    titleInput.value = currentCardState.title;
    msgInput.value = currentCardState.message;
    cardMsg.innerText = currentCardState.message || "Nhập lời chúc của bạn...";
    updateCounters();

    titleInput.addEventListener('input', (e) => {
        cardTitle.innerText = e.target.value || 'Tiêu đề';
        currentCardState.title = e.target.value;
        updateCounters();
        saveDraft();
    });

    msgInput.addEventListener('input', (e) => {
        cardMsg.innerText = e.target.value || '';
        currentCardState.message = e.target.value;
        updateCounters();
        saveDraft();
    });
}

function setupFontSelector() {
    const container = document.getElementById('font-selector');
    const fontLabel = document.getElementById('current-font-name');
    if (!container) return;
    
    container.innerHTML = '';
    const cardMsg = document.getElementById('card-message');
    const initialFont = FONT_OPTIONS.find(font => font.name === currentCardState.font) || FONT_OPTIONS[0];
    if (cardMsg) cardMsg.style.fontFamily = initialFont.family;
    if (fontLabel) fontLabel.innerText = initialFont.name;

    FONT_OPTIONS.forEach(font => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerText = 'Aa';
        btn.style.fontFamily = font.family;
        btn.className = 'w-full aspect-square rounded-lg border border-white/10 bg-[#2D2833] text-white hover:bg-white/10 hover:border-primary transition flex items-center justify-center text-xl font-field-btn focus:outline-none focus:ring-2 focus:ring-primary';
        btn.title = font.name;
        btn.setAttribute('aria-label', `Chọn phông ${font.name}`);
        btn.setAttribute('aria-pressed', font.name === currentCardState.font ? 'true' : 'false');
        
        if (font.name === currentCardState.font) {
            btn.classList.add('border-primary', 'bg-white/10');
        }

        btn.addEventListener('click', () => {
             document.querySelectorAll('.font-field-btn').forEach(b => {
                 b.classList.remove('border-primary', 'bg-white/10');
                 b.classList.add('border-white/10', 'bg-[#2D2833]');
                 b.setAttribute('aria-pressed', 'false');
             });
             btn.classList.remove('border-white/10', 'bg-[#2D2833]');
             btn.classList.add('border-primary', 'bg-white/10');
             btn.setAttribute('aria-pressed', 'true');

             currentCardState.font = font.name;
             if (fontLabel) fontLabel.innerText = font.name;
             saveDraft();

             if (cardMsg) {
                 cardMsg.style.fontFamily = font.family;
             }
        });

        container.appendChild(btn);
    });
}

function setupImageUpload(template) {
    const input = document.getElementById('image-input');
    const cardImage = document.getElementById('card-image');
    const triggerLabel = document.getElementById('upload-trigger-label');
    const statusText = triggerLabel ? triggerLabel.querySelector('span') : null;
    const icon = triggerLabel ? triggerLabel.querySelector('i') : null;
    const resetBtn = document.getElementById('btn-reset-image');

    const updateResetButtonVisibility = () => {
        if (!resetBtn) return;
        if (currentCardState.uploadedImageUrl) {
            resetBtn.classList.remove('hidden');
            resetBtn.classList.add('flex');
        } else {
            resetBtn.classList.add('hidden');
            resetBtn.classList.remove('flex');
        }
    };

    updateResetButtonVisibility();

    if (resetBtn && template) {
        resetBtn.addEventListener('click', () => {
            currentCardState.uploadedImageUrl = '';
            currentCardState.image = template.image;
            if (cardImage) cardImage.src = template.image;
            if (input) input.value = '';
            if (statusText) statusText.innerText = 'Tải ảnh lên (Max 5MB)';
            if (icon) icon.className = 'fas fa-image text-2xl sm:text-3xl text-gray-500 group-hover:text-primary mb-2 transition';
            updateResetButtonVisibility();
            saveDraft();
        });
    }

    if (!input) return;

    input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const saveBtn = document.getElementById('btn-save');

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                CustomDialog.error('Định dạng ảnh chưa được hỗ trợ. Vui lòng chọn JPG, PNG hoặc WebP.');
                input.value = '';
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                CustomDialog.error('Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn 5MB.');
                input.value = '';
                return;
            }

            // 1. Show immediate local preview
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (cardImage) cardImage.src = ev.target.result;
            };
            reader.readAsDataURL(file);

            // 2. Upload to Cloudinary
            try {
                if (statusText) statusText.innerText = "Đang tải ảnh...";
                if (icon) icon.className = "fas fa-spinner fa-spin text-2xl sm:text-3xl text-primary mb-2 transition";
                if (saveBtn) {
                    saveBtn.disabled = true;
                    saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    saveBtn.querySelector('span').innerText = 'Đang tải ảnh...';
                }
                
                const uploadedUrl = await uploadImageToCloudinary(file);
                
                if (uploadedUrl) {
                    currentCardState.uploadedImageUrl = uploadedUrl;
                    currentCardState.image = uploadedUrl; 
                    saveDraft();
                    updateResetButtonVisibility();
                    
                    if (statusText) statusText.innerText = "Tải ảnh thành công!";
                    if (icon) icon.className = "fas fa-check-circle text-2xl sm:text-3xl text-green-500 mb-2 transition";
                }
            } catch (error) {
                console.error("Upload failed details:", error);
                if (statusText) statusText.innerText = "Lỗi tải ảnh. Thử lại?";
                if (icon) icon.className = "fas fa-exclamation-triangle text-2xl sm:text-3xl text-red-500 mb-2 transition";
                CustomDialog.error('Không thể tải ảnh lên dịch vụ lưu trữ. Vui lòng kiểm tra kết nối mạng và thử lại.');
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
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) throw new Error('Upload failed');

    const data = await response.json();
    return data.secure_url;
}

function setupColorPicker() {
    const btns = document.querySelectorAll('.color-btn');
    applyTheme(currentCardState.theme, 'editor');

    btns.forEach(btn => {
        const themeKey = normalizeTheme(btn.getAttribute('data-color'));
        if (themeKey === normalizeTheme(currentCardState.theme)) {
            btn.classList.remove('ring-transparent');
            btn.classList.add('ring-primary');
        }

        btn.addEventListener('click', () => {
            const chosenKey = normalizeTheme(btn.getAttribute('data-color'));
            currentCardState.theme = chosenKey;
            applyTheme(chosenKey, 'editor');

            btns.forEach(item => {
                item.classList.remove('ring-primary');
                item.classList.add('ring-transparent');
            });
            btn.classList.remove('ring-transparent');
            btn.classList.add('ring-primary');
            saveDraft();
        });
    });
}

function setupLayoutSelector() {
    const container = document.getElementById('layout-selector');
    const layoutLabel = document.getElementById('current-layout-name');
    if (!container) return;

    const currentKey = normalizeLayout(currentCardState.layout);
    if (layoutLabel) {
        layoutLabel.innerText = CARD_LAYOUTS[currentKey]?.name || 'Tiêu chuẩn';
    }

    const buttons = container.querySelectorAll('.layout-btn');
    buttons.forEach(btn => {
        const layoutId = btn.getAttribute('data-layout');
        if (layoutId === currentKey) {
            btn.classList.add('border-primary', 'bg-white/10', 'text-white');
            btn.classList.remove('border-white/10', 'bg-[#2D2833]', 'text-gray-300');
        } else {
            btn.classList.remove('border-primary', 'bg-white/10', 'text-white');
            btn.classList.add('border-white/10', 'bg-[#2D2833]', 'text-gray-300');
        }

        btn.onclick = () => {
            currentCardState.layout = layoutId;
            if (layoutLabel) {
                layoutLabel.innerText = CARD_LAYOUTS[layoutId]?.name || 'Tiêu chuẩn';
            }
            buttons.forEach(b => {
                b.classList.remove('border-primary', 'bg-white/10', 'text-white');
                b.classList.add('border-white/10', 'bg-[#2D2833]', 'text-gray-300');
            });
            btn.classList.add('border-primary', 'bg-white/10', 'text-white');
            btn.classList.remove('border-white/10', 'bg-[#2D2833]', 'text-gray-300');

            applyCardLayout(layoutId, 'editor');
            applyTheme(currentCardState.theme, 'editor');
            saveDraft();
        };
    });
}

function encodeCardData(state) {
    const compactState = {
        t: state.title.trim(),
        m: state.message.trim(),
        a: state.music,
        h: state.theme,
        f: state.font,
        l: state.layout || 'split',
        i: state.uploadedImageUrl || state.image
    };
    const bytes = new TextEncoder().encode(JSON.stringify(compactState));
    let binary = '';
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeCardData(value) {
    try {
        const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((value.length + 3) % 4);
        const binary = atob(padded);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes));
    } catch (error) {
        console.warn('Invalid card data', error);
        return null;
    }
}

function generateCard() {
    const titleInput = document.getElementById('input-title');
    const msgInput = document.getElementById('input-message');
    if (titleInput) currentCardState.title = titleInput.value.trim();
    if (msgInput) currentCardState.message = msgInput.value.trim();

    if (!currentCardState.title) {
        CustomDialog.error('Vui lòng nhập tiêu đề cho tấm thiệp.');
        if (titleInput) titleInput.focus();
        return;
    }
    if (!currentCardState.message) {
        CustomDialog.error('Vui lòng nhập lời chúc trước khi hoàn tất.');
        if (msgInput) msgInput.focus();
        return;
    }

    isPublishing = true;
    const draftKey = getDraftKey();
    if (draftKey) {
        try { localStorage.removeItem(draftKey); } catch (_) {}
    }

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
        const encoded = encodeCardData(currentCardState);
        window.location.href = `view.html#card=${encoded}`;
    }, 500);
}


// ==========================================
// VIEWER LOGIC (view.html)
// ==========================================

function initViewer() {
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const rawCard = hashParams.get('card') || params.get('card');
    const cardData = rawCard ? decodeCardData(rawCard) : null;
    
    // Extract Data
    const title = cardData?.t || params.get('title') || 'Chúc Mừng';
    const message = cardData?.m || params.get('msg') || 'Lời chúc tốt đẹp nhất!';
    const musicUrl = cardData?.a || params.get('music');
    const theme = cardData?.h || params.get('theme') || 'bg-gray-900';
    const fontName = cardData?.f || params.get('font') || 'Dancing Script';
    let imgSrc = cardData?.i || params.get('img');
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
    if (msgEl) {
        msgEl.innerText = message;
        // Apply Font
        const fontObj = FONT_OPTIONS.find(f => f.name === fontName) || FONT_OPTIONS[0];
        msgEl.style.fontFamily = fontObj.family;
    }
    if (imgEl) imgEl.src = imgSrc;

    document.title = `${title} - ThiepOnline`;
    const ogTitle = document.getElementById('og-title');
    const ogDescription = document.getElementById('og-description');
    if (ogTitle) ogTitle.content = `${title} - ThiepOnline`;
    if (ogDescription) ogDescription.content = message.slice(0, 160);
    
    // Update Layout and Theme on Card & Background
    const layout = cardData?.l || params.get('layout') || 'split';
    window.__currentViewerLayout = layout;
    applyCardLayout(layout, 'viewer');
    applyTheme(theme, 'viewer');
    
    // Music Setup
    const audio = document.getElementById('bg-music');
    if (musicUrl && audio) {
        audio.src = musicUrl;
    }

    // Interaction Start
    const envelope = document.getElementById('envelope');
    const cardContainer = document.getElementById('card-container');
    
    if (envelope && cardContainer) {
        let opened = false;
        const openEnvelope = () => {
            if (opened) return;
            opened = true;
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
        };
        envelope.addEventListener('click', openEnvelope, { once: true });
        envelope.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openEnvelope();
            }
        });
    }

    // Music Toggle
    const musicBtn = document.getElementById('music-toggle');
    if (musicBtn && audio) {
        let isPlaying = false;
        if (!musicUrl) {
            musicBtn.classList.add('hidden');
        }
        musicBtn.addEventListener('click', () => {
            if (!audio.paused) {
                audio.pause();
                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                musicBtn.setAttribute('aria-label', 'Bật nhạc nền');
                isPlaying = false;
            } else {
                audio.play().then(() => {
                    musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                    musicBtn.setAttribute('aria-label', 'Tắt nhạc nền');
                    isPlaying = true;
                }).catch(() => CustomDialog.error('Trình duyệt không thể phát bài nhạc này.'));
            }
        });
        audio.addEventListener('play', () => {
            isPlaying = true;
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            musicBtn.setAttribute('aria-label', 'Tắt nhạc nền');
        });
        audio.addEventListener('pause', () => {
            isPlaying = false;
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            musicBtn.setAttribute('aria-label', 'Bật nhạc nền');
        });
    }

    // Share Logic
    setupSharing();

    // Create Logic (Confirm)
    const btnCreate = document.getElementById('btn-create');
    if (btnCreate) {
        btnCreate.addEventListener('click', async () => {
            const confirmed = await CustomDialog.confirm('Bạn có muốn tạo một tấm thiệp mới không?');
            if (confirmed) {
                window.location.href = 'index.html';
            }
        });
    }

    // Snapshot Logic
    setupSnapshot();
}

function setupSnapshot() {
    const btn = document.getElementById('btn-snapshot');
    const card = document.getElementById('view-card');

    if (!btn || !card) return;

    btn.addEventListener('click', async () => {
        // UI Loading
        const originalContent = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        // Prepare for capture: Remove clipping constraints
        const title = document.getElementById('view-title');
        const msgContainer = document.querySelector('#view-message').parentElement;
        
        const originalTitleClass = title ? title.className : '';
        const originalMsgStyle = msgContainer ? msgContainer.style.overflow : '';

        const originalAnimation = card.style.animation;
        card.style.animation = 'none';

        try {
            // Wait for fonts
            await document.fonts.ready;

            if (title) {
                // Remove clamping and add padding for descenders
                title.classList.remove('line-clamp-2');
                title.style.overflow = 'visible';
                title.style.paddingBottom = '4px'; 
            }
            if (msgContainer) {
                // Ensure message scrollbar doesn't show
                msgContainer.style.overflow = 'visible'; 
            }

            // Check if html2canvas is loaded
            if (typeof html2canvas === 'undefined') {
                throw new Error('Thư viện tạo ảnh chưa sẵn sàng');
            }

            const canvas = await html2canvas(card, {
                useCORS: true,
                scale: 2, // 2x resolution is crisp and memory-safe across mobile devices
                backgroundColor: null,
                logging: false,
                allowTaint: false,
                onclone: (clonedDoc) => {
                    const clonedCard = clonedDoc.getElementById('view-card');
                    if (clonedCard) clonedCard.style.animation = 'none';
                }
            });

            // Trigger Download
            const link = document.createElement('a');
            link.download = `thiep-online-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Success feedback
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
            }, 2000);

        } catch (e) {
            console.error("Snapshot failed:", e);
            CustomDialog.error('Không thể xuất ảnh: ' + (e.message || 'Lỗi xử lý'));
            btn.innerHTML = originalContent;
            btn.disabled = false;
        } finally {
            card.style.animation = originalAnimation;
            // Restore styles
            if (title) {
                title.className = originalTitleClass;
                title.style.overflow = '';
                title.style.paddingBottom = '';
            }
            if (msgContainer) {
                msgContainer.style.overflow = originalMsgStyle;
            }
        }
    });
}

async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand('copy');
    textArea.remove();
    if (!copied) throw new Error('Copy failed');
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
        
        const url = window.location.href;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile && navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    text: 'Mình gửi bạn một tấm thiệp đặc biệt 💌',
                    url
                });
                btnShare.innerHTML = originalContent;
                btnShare.disabled = false;
                return;
            } catch (error) {
                if (error.name !== 'AbortError') console.warn('Native share failed', error);
            }
        }
        
        // Update Zalo
        const zaloBtn = document.getElementById('share-zalo');
        if (zaloBtn) {
            zaloBtn.href = `https://zalo.me/share?url=${encodeURIComponent(url)}`;
        }
        
        // Update Facebook Share
        const fbBtn = document.getElementById('share-fb');
        if (fbBtn) {
            fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        }

        // Update Copy Button
        const copyBtn = document.getElementById('share-copy');
        if (copyBtn) {
            // Remove old listeners to be safe (cloning node is a trick)
            const newCopyBtn = copyBtn.cloneNode(true);
            copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);
            
            newCopyBtn.addEventListener('click', async () => {
                try {
                    await copyText(url);
                    modal.classList.add('hidden');
                    await CustomDialog.alert('Đã sao chép liên kết thiệp. Bạn có thể gửi ngay cho người nhận.', 'Sao chép thành công');
                } catch (error) {
                    CustomDialog.error('Không thể sao chép tự động. Vui lòng sao chép liên kết trên thanh địa chỉ.');
                }
            });
        }

        // Update QR Code
        const qrImg = document.getElementById('share-qr-img');
        if (qrImg) {
            qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}`;
            qrImg.alt = `Mã QR mở thiệp: ${document.title}`;
        }

        // Restore button and show modal
        btnShare.innerHTML = originalContent;
        btnShare.disabled = false;
        modal.classList.remove('hidden');
    });
}
