import { test, expect } from '@playwright/test'

const startTime = Date.now()

test('time is passing', async ({ page }) => {
  test.info().annotations.push({
    type: 'Start Time',
    description: new Date(startTime).toString(),
  })
  await page.goto('/')
  const now = Date.now()
  expect(now).toBeGreaterThan(startTime)
})

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Playwright/)
})

test('get started link', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Get started' }).click()
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
})

test('this one is flaky', async ({ page, browserName }, testInfo) => {
  test.skip(browserName === 'firefox', 'Do not run on FF')
  test.skip(browserName === 'webkit', 'Do not run on WebKit')
  await page.goto('/')
  await page.getByRole('link', { name: 'Get started' }).click()
  if (!testInfo.retry) expect(true).toEqual(false)
})
