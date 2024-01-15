import { Locator } from '@playwright/test'

export type LocatorOptions = {
    has?: Locator
    hasNot?: Locator
    hasNotText?: string | RegExp
    hasText?: string | RegExp
}
