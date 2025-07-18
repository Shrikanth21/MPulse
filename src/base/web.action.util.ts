import { Locator, Page, expect } from '@playwright/test';
import { timeouts } from '../helper/timeouts-config';
import logger from '../helper/loggs/logger';

export class WebActions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  public getLocatorInsideIframe(selector: string): Locator {
    return this.page.frameLocator('iframe').locator(selector);
  }

  public async getActiveElement(): Promise<Locator> {
    const handle = await this.page.evaluateHandle(() => document.activeElement);
    return handle.asElement() ? this.page.locator(':focus') : this.page.locator('');
  }

  public getVisibleLocator(selector: string, description?: string): Locator {
    const locator = this.page.locator(selector).filter({ has: this.page.locator(':visible') });
    if (description) {
      console.log(`Locator created for: ${description} | Selector: ${selector}`);
    }
    return locator;
  }

  public async hoverOverElement(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await locator.hover();
      logger.info(`Successfully hovered over element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to hover over element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async click(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await locator.click();
      logger.info(`Successfully clicked on element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to click on element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async scrollToAndClick(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await locator.scrollIntoViewIfNeeded();
      await this.waitForDelay();
      await locator.click();
      logger.info(`Successfully scrolled to and clicked on element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to scroll to and click on element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async typeText(locator: Locator, text: string, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await locator.fill(text);
      logger.info(`Successfully typed text into element: ${elementDescription} | Text: ${text}`);
    } catch (error) {
      logger.error(`Failed to type text into element: ${elementDescription} | Text: ${text} | Error: ${error}`);
      throw error;
    }
  }

  public async clearAndTypeText(locator: Locator, text: string, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await locator.clear();
      await this.waitForDelay();
      await locator.fill(text);
      logger.info(`Successfully cleared and typed text into element: ${elementDescription} | Text: ${text}`);
    } catch (error) {
      logger.error(`Failed to clear and type text into element: ${elementDescription} | Text: ${text} | Error: ${error}`);
      throw error;
    }
  }

  public async scrollToElement(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await locator.scrollIntoViewIfNeeded();
      logger.info(`Successfully scrolled to element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to scroll to element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async doubleClick(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await locator.dblclick();
      logger.info(`Successfully double-clicked on element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to double-click on element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async mouseHoverAndClick(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await locator.hover();
      await this.waitForDelay();
      await locator.click();
      logger.info(`Successfully hovered and clicked on element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to hover and click on element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async uploadFile(locator: Locator, filePath: string, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await locator.setInputFiles(filePath);
      logger.info(`Successfully uploaded file to element: ${elementDescription} | File Path: ${filePath}`);
    } catch (error) {
      logger.error(`Failed to upload file to element: ${elementDescription} | File Path: ${filePath} | Error: ${error}`);
      throw error;
    }
  }

  public async dragAndDrop(sourceLocator: Locator, targetLocator: Locator, sourceDescription: string, targetDescription: string): Promise<void> {
    try {
      await this.waitForElement(sourceLocator, sourceDescription);
      await this.waitForElement(targetLocator, targetDescription);
      await this.waitForDelay();
      await sourceLocator.dragTo(targetLocator);
      logger.info(`Successfully dragged element: ${sourceDescription} and dropped it on: ${targetDescription}`);
    } catch (error) {
      logger.error(`Failed to drag element: ${sourceDescription} and drop it on: ${targetDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async getText(locator: Locator, elementDescription: string): Promise<string> {
    try {
      await this.waitForElement(locator, elementDescription);
      const text = await locator.textContent();
      logger.info(`Successfully retrieved text from element: ${elementDescription} | Text: ${text}`);
      return text || '';
    } catch (error) {
      logger.error(`Failed to get text from element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async handleAlertPopup(accept: boolean = true, promptText: string | null = null): Promise<void> {
    try {
      this.page.on('dialog', async (dialog) => {
        logger.info(`Alert popup detected with message: ${dialog.message()}`);
        if (promptText !== null) {
          await dialog.accept(promptText);
          logger.info(`Prompt text entered: ${promptText}`);
        } else if (accept) {
          await dialog.accept();
          logger.info('Alert popup accepted.');
        } else {
          await dialog.dismiss();
          logger.info('Alert popup dismissed.');
        }
      });
    } catch (error) {
      logger.error(`Failed to handle alert popup | Error: ${error}`);
      throw error;
    }
  }

  public async performKeyboardShortcutWithRobot(): Promise<void> {
    try {
      await this.page.keyboard.down('Control');
      await this.page.keyboard.press('-');
      await this.page.keyboard.up('-');
      await this.page.keyboard.up('Control');
      logger.info('Successfully performed keyboard shortcut: Control + -');
    } catch (error) {
      logger.error('Failed to perform keyboard shortcut: Control + - | Error: ' + error);
      throw error;
    }
  }

  public async performKeyboardAction(key: string, elementDescription?: string): Promise<void> {
    try {
      await this.waitForDelay();
      await this.page.keyboard.press(key);
      logger.info(`Successfully performed keyboard action: ${key}${elementDescription ? ` on ${elementDescription}` : ''}`);
    } catch (error) {
      logger.error(`Failed to perform keyboard action: ${key}${elementDescription ? ` on ${elementDescription}` : ''} | Error: ${error}`);
      throw error;
    }
  }

  public async clickUsingActions(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await locator.dispatchEvent('pointerover');
      await locator.dispatchEvent('pointerdown');
      await locator.dispatchEvent('pointerup');
      logger.info(`Successfully clicked (using actions) on element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to click (using actions) on element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async validateCurrentUrl(expectedUrl: string): Promise<void> {
    try {
      await this.waitForDelay();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(3000);
      await this.page.waitForURL(expectedUrl, { waitUntil: 'load', timeout: 20000 });
      logger.info(`Successfully validated current URL: ${expectedUrl}`);
    } catch (error) {
      logger.error(`Failed to validate current URL: ${expectedUrl} | Error: ${error}`);
      throw error;
    }
  }

  public async getCSSProperty(locator: Locator, property: string, elementDescription: string): Promise<string> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.page.waitForTimeout(timeouts.small);
      const value = await locator.evaluate((el, prop) => {
        return window.getComputedStyle(el).getPropertyValue(prop);
      }, property);
      logger.info(`Successfully retrieved CSS property "${property}" from element: ${elementDescription} | Value: ${value}`);
      return value.trim();
    } catch (error) {
      logger.error(`Failed to get CSS property "${property}" from element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async waitForDelay(): Promise<void> {
    await this.page.waitForTimeout(timeouts.small);
  }

  public async waitForCustomDelay(delayMs: number): Promise<void> {
    await this.page.waitForTimeout(delayMs);
  }

  public async waitForElementToBeVisible(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
    } catch (error) {
      logger.error(`Failed to wait for element to be visible: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async waitForElementToBeEnabled(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await expect(locator, `Element not enabled: ${elementDescription}`).toBeEnabled();
      logger.info(`Element is enabled: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to wait for element to be clickable: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async waitForElementToBeDisabled(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await expect(locator, `Element is unexpectedly enabled: ${elementDescription}`).toBeDisabled();
      logger.info(`Element is disabled as expected: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to verify element is disabled: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async waitForElementToBeHidden(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(locator, `Element still visible: ${elementDescription}`).toBeHidden();
      logger.info(`Element is hidden: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to wait for element to be hidden: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async waitToBeVisible(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(locator, `Element not visible: ${elementDescription}`).toBeVisible();
      logger.info(`Element is visible: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to wait for element to be visible: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async waitForElement(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await locator.isVisible({ timeout: timeouts.medium });
      logger.info(`Element is visible: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to wait for element to be visible: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async waitForCondition(conditionFn: () => Promise<boolean>, timeout: number, failureMessage: string = 'Condition not met'): Promise<void> {
    const start = Date.now();
    try {
      while (Date.now() - start < timeouts.medium) {
        if (await conditionFn()) return;
        await this.waitForCustomDelay(timeouts.small);
      }
      logger.error(`${failureMessage} after ${timeouts.medium}ms`);
      throw new Error(`${failureMessage} after ${timeouts.medium}ms`);
    } catch (error) {
      logger.error(`Error while waiting for condition: ${failureMessage} | Error: ${error}`);
      throw error;
    }
  }

  public async waitForNewDropdownOptionsToLoad(locator: Locator, timeout: number): Promise<void> {
    try {
      const startTime = Date.now();
      while (Date.now() - startTime < timeout) {
        const count = await locator.count();
        for (let i = 0; i < count; i++) {
          const title = await locator.nth(i).getAttribute('title');
          if (title && title.trim().length > 0) {
            logger.info('Dropdown options loaded successfully.');
            return;
          }
        }
        await this.waitForCustomDelay(timeouts.small);
      }
      logger.error(`Dropdown options did not load within ${timeout}ms`);
      throw new Error(`Dropdown options did not load within ${timeout}ms`);
    } catch (error) {
      logger.error(`Failed to wait for dropdown options to load | Error: ${error}`);
      throw error;
    }
  }

  public async isVisible(locator: Locator, elementDescription: string): Promise<boolean> {
    try {
      const isVisible = await locator.isVisible();
      logger.info(`Element visibility check for: ${elementDescription} | Is Visible: ${isVisible}`);
      return isVisible;
    } catch (error: any) {
      logger.error(`Failed to check visibility for element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async assertNotEqual(actualValue: string, expectedValue: string, errorMessage: string): Promise<void> {
    try {
      await this.waitForDelay();
      expect(actualValue, errorMessage).not.toEqual(expectedValue);
      logger.info(`Assertion passed: Actual value "${actualValue}" is not equal to expected value "${expectedValue}"`);
    } catch (error) {
      logger.error(`Failed to assert not equal | Error: ${error}`);
      throw error;
    }
  }

  public async assertEqual(actualValue: string, expectedValue: string, errorMessage?: string): Promise<void> {
    try {
      await this.waitForDelay();
      expect(actualValue, errorMessage).toEqual(expectedValue);
      logger.info(`Assertion passed: Actual value "${actualValue}" is equal to expected value "${expectedValue}"`);
    } catch (error) {
      logger.error(`Failed to assert equal | Error: ${error}`);
      throw error;
    }
  }

  public async assertForStartWithTrue(condition: boolean, message: string): Promise<void> {
    if (condition) {
      console.info(`Assertion passed: ${message}`);
    } else {
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  public async assertTrue(condition: boolean, message: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(condition, message).toBeTruthy();
      logger.info(`Assertion passed: Condition is true. ${message}`);
    } catch (error) {
      logger.error(`Failed to assert true | Error: ${error}`);
      throw error;
    }
  }

  public async assertFalse(condition: boolean, message: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(condition, message).toBeFalsy();
      logger.info(`Assertion passed: Condition is false. ${message}`);
    } catch (error) {
      logger.error(`Failed to assert false | Error: ${error}`);
      throw error;
    }
  }

  public async assertContains(actualValue: string, expectedSubstring: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(actualValue).toContain(expectedSubstring);
      logger.info(`Assertion passed: "${actualValue}" contains "${expectedSubstring}"`);
    } catch (error) {
      logger.error(`Failed to assert contains | Error: ${error}`);
      throw error;
    }
  }

  public async assertNotContain(actualValue: string, unexpectedSubstring: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(actualValue).not.toContain(unexpectedSubstring);
      logger.info(`Assertion passed: "${actualValue}" does not contain "${unexpectedSubstring}"`);
    } catch (error) {
      logger.error(`Failed to assert not contain | Error: ${error}`);
      throw error;
    }
  }

  public async assertDefined(value: any, message: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(value, message).toBeDefined();
      logger.info(`Assertion passed: Value is defined. ${message}`);
    } catch (error) {
      logger.error(`Failed to assert defined | Error: ${error}`);
      throw error;
    }
  }

  public async isCheckboxChecked(locator: Locator, elementDescription: string): Promise<boolean> {
    try {
      await this.waitForElement(locator, elementDescription);
      const ariaChecked = await locator.getAttribute('aria-checked');
      const isChecked = ariaChecked === 'false';
      logger.info(`Checkbox checked state for ${elementDescription}: ${isChecked}`);
      return isChecked;
    } catch (error) {
      logger.error(`Failed to check if checkbox is checked: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }
}
