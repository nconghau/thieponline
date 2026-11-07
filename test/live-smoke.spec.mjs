import { test, expect } from '@playwright/test';

test.describe('Live Production Smoke Tests (thieponline.surge.sh)', () => {
  test('Live Homepage: Title, templates, and styling', async ({ page }) => {
    await page.goto('https://thieponline.surge.sh/');

    // Title verification
    await expect(page).toHaveTitle('ThiepOnline - Tạo Thiệp Online & Chia Sẻ Miễn Phí');

    // Template grid check
    const cards = page.locator('#template-grid a');
    await expect(cards).toHaveCount(31);

    // Verify filter works
    await page.locator('button[data-cat="wedding"]').click();
    await expect(page.locator('#template-grid a')).toHaveCount(6);
  });

  test('Live Editor: Loads template, controls, and counters', async ({ page }) => {
    await page.goto('https://thieponline.surge.sh/create.html?tpl=tpl-wed-01');

    await expect(page).toHaveTitle('Thiết Kế Thiệp - ThiepOnline');
    await expect(page.locator('#input-title')).toHaveValue('Thanh Xuân Của Ta');
    await expect(page.locator('#card-title')).toHaveText('Thanh Xuân Của Ta');

    // Type new title
    await page.locator('#input-title').fill('Thiệp Mừng Trăm Năm Hạnh Phúc');
    await expect(page.locator('#card-title')).toHaveText('Thiệp Mừng Trăm Năm Hạnh Phúc');
    await expect(page.locator('#title-counter')).toHaveText('29/80');

    // Color theme button works
    await page.locator('button[data-color="yellow"]').click();
    await expect(page.locator('#card-preview')).toHaveCSS('background-color', 'rgb(254, 252, 232)');
  });

  test('Live 404 Page: Routing on invalid path', async ({ page }) => {
    const res = await page.goto('https://thieponline.surge.sh/trang-khong-ton-tai-xyz');
    await expect(page.locator('h1')).toHaveText('Không Tìm Thấy Trang');
  });

  test('Live Flow: Layout switching, card creation, and viewer envelope flow', async ({ page }) => {
    await page.goto('https://thieponline.surge.sh/create.html?tpl=tpl-wed-01');
    await page.locator('#input-title').fill('Thiệp Mừng Kỷ Niệm 10 Năm');
    await page.locator('#input-message').fill('Chúc mừng chặng đường 10 năm hạnh phúc vẹn tròn!');

    // Switch layout to Polaroid
    const polaroidBtn = page.locator('button[data-layout="polaroid"]');
    await polaroidBtn.click();
    await expect(page.locator('#current-layout-name')).toHaveText('Polaroid');

    // Click finish
    await page.locator('#btn-save').click();
    await page.waitForURL(/view\.html#card=/);

    // Open envelope
    const envelope = page.locator('#envelope');
    await expect(envelope).toBeVisible();
    await envelope.click();
    await expect(envelope).toBeHidden({ timeout: 4000 });

    // Verify title in viewer
    await expect(page.locator('#view-title')).toHaveText('Thiệp Mừng Kỷ Niệm 10 Năm');
  });
});
