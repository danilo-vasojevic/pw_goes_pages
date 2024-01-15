import { test, expect } from '../fixtures/fixtures'

const startTime = Date.now()

test.describe('@samples', () => {
  test('time is passing', async ({ info }) => {
    info.attach('Start Time', new Date(startTime).toString())
    expect(Date.now()).toBeGreaterThan(startTime)
  })

  test('this one fails first time only', async ({ info }) => {
    await test.step('Skip test if browser is Firefox or WebKit', async () => {
      info.skipIf(info.testInfo.project.name === 'firefox', 'Do not run on Firefox')
      info.skipIf(info.testInfo.project.name === 'webkit', 'Do not run on WebKit')
    })
    if (!info.testInfo.retry) expect(true).toEqual(false)
  })
})
