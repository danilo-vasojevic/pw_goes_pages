import { test, expect } from '../fixtures/fixtures'

test.describe('@homepage', () => {
  test('has title', async ({ pg }) => {
    await expect(pg).toHaveTitle(/Playwright/)
  })

  test('logo looks okay', async ({ pg }) => {
    await expect(pg.getByAltText('Playwright logo')).toHaveScreenshot('logo.png')
  })

  test('get started link works', async ({ pg }) => {
    await pg.getByRole('link', { name: 'Get started' }).click()
    await expect(pg.getByRole('heading', { name: 'Installation' })).toBeVisible()
  })
})
