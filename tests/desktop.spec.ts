import { expect, test } from '@playwright/test'

const PAGES = ['/', '/blog/hi', '/blog/diariolx', '/notes/diariolx']

for (const path of PAGES) {
  test(`${path} loads`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test(`${path} has a link preview with an image`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/)
  })
}

test('switching to Portuguese translates the page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'PT' }).click()
  await expect(page.getByRole('heading', { name: 'Projetos' })).toBeVisible()
})

test('links that leave the site open in a new tab', async ({ page }) => {
  await page.goto('/')
  const external = page.locator('a[href^="http"]')
  const count = await external.count()
  expect(count).toBeGreaterThan(0)
  for (let i = 0; i < count; i++) {
    await expect(external.nth(i)).toHaveAttribute('target', '_blank')
  }
})

test('unknown pages show the 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: "This page doesn't exist" })).toBeVisible()
})

test('notes: clicking a decision shows why, under its group', async ({ page }) => {
  await page.goto('/notes/diariolx')
  await page.getByRole('button', { name: /JDBI/ }).click()
  const group = page.locator('.notes-decision-group', { has: page.getByRole('button', { name: /JDBI/ }) })
  await expect(group.locator('.notes-decision-panel')).toContainText('SQL')
})
