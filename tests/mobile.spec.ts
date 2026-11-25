import { expect, test } from '@playwright/test'

const PAGES = ['/', '/blog/hi', '/blog/diariolx', '/notes/diariolx']

for (const path of PAGES) {
  test(`${path} doesn't scroll sideways on a phone`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
