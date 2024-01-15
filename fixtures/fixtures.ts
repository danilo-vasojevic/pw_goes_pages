import { test as base } from '@playwright/test'
import { Page } from 'playwright'
import { ExtendedTestInfo } from '../utils/extended-test-info'
import { PageObject } from '../page-object/page-object'

type Fixtures = {
  info: ExtendedTestInfo
  pg: Page
  po: PageObject
}

export const test = base.extend<Fixtures>({
  info: async ({}, use, testInfo) => await use(new ExtendedTestInfo(testInfo)),
  pg: async ({ page }, use) => {
    await page.goto('/') // Before each test using `pg`
    await use(page)
    await page.close() // After each test using `pg`
  },
  po: async ({ page }, use) => {
    const pageObject = new PageObject(page)
    await use(pageObject)
    await page.close()
  },
})

export { expect } from '@playwright/test'
