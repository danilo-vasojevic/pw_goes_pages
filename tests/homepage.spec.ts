import { test, expect } from '@playwright/test'

const startTime = Date.now()

test.describe('@homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })

  test('time is passing', async () => {
    test.info().annotations.push({
      type: 'Start Time',
      description: new Date(startTime).toString(),
    })
    expect(Date.now()).toBeGreaterThan(startTime)
  })

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/)
  })

  test('logo looks okay', async ({ page }) => {
    await expect(page.getByAltText('Playwright logo')).toHaveScreenshot('logo.png')
  })

  test('get started link works', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click()
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
  })

  test('this one fails first time only', async ({ browserName }, testInfo) => {
    await test.step('Skip test if browser is Firefox or WebKit', async () => {
      test.skip(browserName === 'firefox', 'Do not run on Firefox')
      test.skip(browserName === 'webkit', 'Do not run on WebKit')
    })
    if (!testInfo.retry) expect(true).toEqual(false)
  })
})
