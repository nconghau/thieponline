import { test, expect } from '@playwright/test';

test.describe('ThiepOnline Smoke Tests', () => {
  test('Homepage: renders 31 templates, search bar, category filtering, and accessible links', async ({ page }) => {
    await page.goto('/index.html');

    // Title & favicon check
    await expect(page).toHaveTitle(/ThiepOnline/);
    const favicon = await page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href', 'favicon.svg');

    // Template grid check (31 total templates)
    const cards = page.locator('#template-grid a');
    await expect(cards).toHaveCount(31);
    await expect(page.locator('#template-count')).toHaveText('Hiển thị 31 mẫu');

    // Verify first card is an accessible link with aria-label
    const firstCard = cards.first();
    await expect(firstCard).toHaveAttribute('href', /create\.html\?tpl=/);
    await expect(firstCard).toHaveAttribute('aria-label', /Sử dụng mẫu/);

    // Search bar functionality
    const searchInput = page.locator('#template-search');
    await searchInput.fill('sinh nhật');
    await expect(page.locator('#template-grid a')).toHaveCount(5);
    await expect(page.locator('#template-count')).toHaveText('Hiển thị 5 mẫu');

    await searchInput.fill(''); // Clear search

    // Category filtering
    const weddingFilter = page.locator('button[data-cat="wedding"]');
    await weddingFilter.click();
    await expect(page.locator('#template-grid a')).toHaveCount(6);

    const birthdayFilter = page.locator('button[data-cat="birthday"]');
    await birthdayFilter.click();
    await expect(page.locator('#template-grid a')).toHaveCount(5);

    const allFilter = page.locator('button[data-cat="all"]');
    await allFilter.click();
    await expect(page.locator('#template-grid a')).toHaveCount(31);

    // Ensure no fake "Xem thêm" button
    const fakeButton = page.locator('text=Xem Thêm Mẫu Thiệp');
    await expect(fakeButton).toHaveCount(0);
  });

  test('Editor: inputs, counters, font, theme, layout selection, validation, and publishing', async ({ page }) => {
    await page.goto('/create.html?tpl=tpl-wed-01');

    // Initial state
    const titleInput = page.locator('#input-title');
    const msgInput = page.locator('#input-message');
    const cardTitle = page.locator('#card-title');
    const cardMsg = page.locator('#card-message');

    await expect(titleInput).toHaveValue('Thanh Xuân Của Ta');
    await expect(cardTitle).toHaveText('Thanh Xuân Của Ta');

    // Counters update on typing
    await titleInput.fill('Thiệp Cưới Hậu & Nga');
    await expect(cardTitle).toHaveText('Thiệp Cưới Hậu & Nga');
    await expect(page.locator('#title-counter')).toHaveText('20/80');

    await msgInput.fill('Trân trọng kính mời bạn đến chung vui cùng gia đình chúng mình!');
    await expect(cardMsg).toHaveText('Trân trọng kính mời bạn đến chung vui cùng gia đình chúng mình!');
    await expect(page.locator('#message-counter')).toContainText('/600');

    // Font selection
    const fontBadge = page.locator('#current-font-name');
    await expect(fontBadge).toHaveText('Dancing Script');
    const pacificoBtn = page.locator('button[aria-label="Chọn phông Pacifico"]');
    await pacificoBtn.click();
    await expect(fontBadge).toHaveText('Pacifico');

    // Layout selection: Test Overlay, Polaroid, Letter, Split
    const layoutBadge = page.locator('#current-layout-name');
    await expect(layoutBadge).toHaveText('Tiêu chuẩn');

    const overlayBtn = page.locator('button[data-layout="overlay"]');
    await overlayBtn.click();
    await expect(layoutBadge).toHaveText('Tràn viền');

    const polaroidBtn = page.locator('button[data-layout="polaroid"]');
    await polaroidBtn.click();
    await expect(layoutBadge).toHaveText('Polaroid');

    const letterBtn = page.locator('button[data-layout="letter"]');
    await letterBtn.click();
    await expect(layoutBadge).toHaveText('Thư tay');

    // Theme selection: Yellow theme
    const yellowBtn = page.locator('button[data-color="yellow"]');
    await yellowBtn.click();
    const cardPreview = page.locator('#card-preview');
    await expect(cardPreview).toHaveCSS('background-color', 'rgb(254, 252, 232)'); // #FEFCE8

    // Music selection: "Không dùng nhạc"
    const noMusicBtn = page.locator('button:has-text("Không dùng nhạc")');
    await noMusicBtn.click();
    await expect(noMusicBtn).toHaveClass(/border-primary/);

    // Test validation: Empty title shows error dialog
    await titleInput.fill('');
    await page.locator('#btn-save').click();
    const dialog = page.locator('#custom-dialog');
    await expect(dialog).toBeVisible();
    await expect(page.locator('#dialog-message')).toContainText('Vui lòng nhập tiêu đề');
    await page.locator('#dialog-actions button').click(); // Dismiss dialog
    await expect(dialog).toBeHidden();

    // Fill valid data, select Polaroid layout and publish
    await titleInput.fill('Thiệp Cưới Hậu & Nga');
    await polaroidBtn.click();
    await page.locator('#btn-save').click();

    // Verify redirection to view.html with card hash
    await page.waitForURL(/view\.html#card=/);
    expect(page.url()).toContain('view.html#card=');
  });

  test('Viewer: open envelope, view content, snapshot, and share modal with QR code', async ({ page }) => {
    // Generate card URL directly using editor flow with Overlay layout
    await page.goto('/create.html?tpl=tpl-wed-01');
    await page.locator('#input-title').fill('Mừng Sinh Nhật Bạn Thân');
    await page.locator('#input-message').fill('Chúc bạn tuổi mới vạn sự như ý, luôn tươi cười rạng rỡ!');
    await page.locator('button[data-layout="overlay"]').click();
    await page.locator('button[data-color="pink"]').click();
    await page.locator('#btn-save').click();
    await page.waitForURL(/view\.html#card=/);

    // 1. Envelope / Start screen
    const envelope = page.locator('#envelope');
    await expect(envelope).toBeVisible();
    await expect(page.locator('text=Mở Thiệp Ngay')).toBeVisible();

    // Click envelope to open
    await envelope.click();
    await expect(envelope).toBeHidden({ timeout: 3000 });

    // 2. Card Content & Title
    const viewTitle = page.locator('#view-title');
    const viewMsg = page.locator('#view-message');
    await expect(viewTitle).toHaveText('Mừng Sinh Nhật Bạn Thân');
    await expect(viewMsg).toContainText('Chúc bạn tuổi mới vạn sự như ý');

    // 3. Document title
    await expect(page).toHaveTitle(/Mừng Sinh Nhật Bạn Thân - ThiepOnline/);

    // 4. Share button opens modal with QR code
    const shareBtn = page.locator('#btn-share');
    await shareBtn.click();
    const shareModal = page.locator('#share-modal');
    await expect(shareModal).toBeVisible();
    await expect(page.locator('#share-fb')).toBeVisible();
    await expect(page.locator('#share-zalo')).toBeVisible();
    await expect(page.locator('#share-copy')).toBeVisible();

    // QR code check
    const qrImg = page.locator('#share-qr-img');
    await expect(qrImg).toBeVisible();
    await expect(qrImg).toHaveAttribute('src', /api\.qrserver\.com/);

    // Close share modal
    await page.locator('#share-modal button:has-text("Đóng")').click();
    await expect(shareModal).toBeHidden();

    // 5. Create new button prompts confirm
    const createBtn = page.locator('#btn-create');
    await createBtn.click();
    const dialog = page.locator('#custom-dialog');
    await expect(dialog).toBeVisible();
    await expect(page.locator('#dialog-message')).toContainText('tạo một tấm thiệp mới không');
    // Cancel
    await page.locator('#dialog-actions button:has-text("Bỏ qua")').click();
    await expect(dialog).toBeHidden();

    // 6. Snapshot button triggers PNG download without error
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#btn-snapshot').click()
    ]);
    expect(download.suggestedFilename()).toMatch(/^thiep-online-.*\.png$/);
  });

  test('404 Page: friendly error display and navigation back to home', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page).toHaveTitle(/404 - Không Tìm Thấy Trang/);
    await expect(page.locator('h1')).toHaveText('Không Tìm Thấy Trang');
    const homeBtn = page.locator('a:has-text("Về Trang Chủ")');
    await expect(homeBtn).toHaveAttribute('href', 'index.html');
  });
});
