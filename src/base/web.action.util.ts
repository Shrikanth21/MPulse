import { Locator, Page, expect } from '@playwright/test';
import { timeouts } from '../helper/timeouts-config';
import logger from '../helper/logger';

export class WebActions {

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Gets a locator for the specified element.
   * @param selector The selector for the element to get.
   * @returns The locator for the specified element.
   */
  public getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Gets a locator for the specified element inside an iframe.
   * @param selector The selector for the element to get inside the iframe.
   * @returns The locator for the specified element inside the iframe.
   */
  public getLocatorInsideIframe(selector: string): Locator {
    return this.page.frameLocator('iframe').locator(selector);
  }

  /**
   * Gets the currently active element on the page.
   * @returns The locator for the currently active element.
   */
  public async getActiveElement(): Promise<Locator> {
    const handle = await this.page.evaluateHandle(() => document.activeElement);
    return handle.asElement() ? this.page.locator(':focus') : this.page.locator('');
  }

  /**
   * Gets a locator for the specified element that is visible.
   * @param selector The selector for the element to get.
   * @param description Optional description for logging purposes.
   * @returns The locator for the specified element that is visible.
   */
  public getVisibleLocator(selector: string, description?: string): Locator {
    const locator = this.page.locator(selector).filter({ has: this.page.locator(':visible') });
    if (description) {
      console.log(`Locator created for: ${description} | Selector: ${selector}`);
    }
    return locator;
  }

  /**
   * Waits for the specified element to be visible.
   * @param locator The locator for the element to wait for.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Clicks on the specified element.
   * @param locator The locator for the element to click.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Clicks on the specified element with an offset.
   * @param locator The locator for the element to click.
   * @param elementDescription Description of the element for logging.
   * @param offset The offset position to click at.
   */
  public async offsetClick(locator: Locator, elementDescription: string, offset: { x: number; y: number }): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await locator.click({ position: offset });
      logger.info(`Successfully performed offset click on element: ${elementDescription} at x: ${offset.x}, y: ${offset.y}`);
    } catch (error) {
      logger.error(`Failed to perform offset click on element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  /**
   * Scrolls to the specified element and clicks it.
   * @param locator The locator for the element to scroll to and click.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Types text into the specified element.
   * @param locator The locator for the element to type into.
   * @param text The text to type into the element.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Clears the text in the specified element and types new text.
   * @param locator The locator for the element to clear and type into.
   * @param text The text to type into the element.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Waits for the specified element to be present and visible.
   * @param locator The locator for the element to wait for.
   * @param elementDescription Description of the element for logging.
   */
  public async scrollToElement(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      logger.info(`Successfully scrolled to element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to scroll to element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  /**
   * Double-clicks on the specified element.
   * @param locator The locator for the element to double-click.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * click on an element using the evaluate method.
   * @param locator The locator for the element to wait for.
   * @param elementDescription Description of the element for logging.
   */
  public async clickButtonOnMainFrame(selector: string, description: string): Promise<void> {
    try {
      const mainFrame = this.page.mainFrame();
      const button = mainFrame.locator(selector);
      await button.waitFor({ state: 'visible' });
      await button.scrollIntoViewIfNeeded();
      await button.click();
      logger.info(`Clicked on: ${description}`);
    } catch (error) {
      logger.error(`Failed to click on ${description}. Error: ${error}`);
      throw error;
    }
  }

  /**
   * Right-clicks on the specified element.
   * @param locator The locator for the element to right-click.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Uploads a file to the specified element.
   * @param locator The locator for the element to upload the file to.
   * @param filePath The path of the file to upload.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Drags an element to a target element.
   * @param sourceLocator The locator for the element to drag.
   * @param targetLocator The locator for the target element to drop onto.
   * @param sourceDescription Description of the source element for logging.
   * @param targetDescription Description of the target element for logging.
   */
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

  /**
   * Gets the text content of the specified element.
   * @param locator The locator for the element to get text from.
   * @param elementDescription Description of the element for logging.
   * @returns The text content of the specified element.
   */
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

  /**
   * Handles alert popups.
   * @param accept Whether to accept the alert.
   * @param promptText The text to enter into the prompt, if applicable.
   */
  public async handleAlertPopup(accept: boolean = true, promptText: string | null = null): Promise<void> {
    try {
      this.page.once('dialog', async (dialog) => {
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

  /**
   * Performs a keyboard shortcut using the Robot framework.
   */
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

  /**
 * Performs a keyboard action.
 * @param key The key to press.
 */
  public async performKeyboardAction(key: string): Promise<void> {
    try {
      await this.waitForDelay();
      await this.page.keyboard.press(key);
      logger.info(`Successfully performed keyboard action: ${key}`);
    } catch (error) {
      logger.error(`Failed to perform keyboard action: ${key} | Error: ${error}`);
      throw error;
    }
  }

  /**
   * Clicks on the specified element using the Actions API.
   * @param locator The locator for the element to click.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
  * Validates that the current URL of the page contains the expected substring.
  * Handles delayed SPA navigations by waiting until the URL updates.
  * @param expectedUrlPart The substring that should be present in the current URL.
  */
  public async validateCurrentUrl(expectedUrlPart: string): Promise<void> {
    try {
      await this.waitForDelay();
      await this.page.waitForFunction(
        (part) => window.location.href.includes(part),
        expectedUrlPart,
        { timeout: 15000 }
      );
      const currentUrl = this.page.url();
      logger.info(`Current URL contains expected part: "${expectedUrlPart}" | Full URL: ${currentUrl}`);
    } catch (error) {
      const currentUrl = this.page.url();
      logger.error(`Failed to validate current URL contains "${expectedUrlPart}" | Current URL: ${currentUrl} | Error: ${error}`);
      throw new Error(`Expected URL to contain "${expectedUrlPart}", but got "${currentUrl}"`);
    }
  }

  /**
   * Gets the CSS property value of the specified element.
   * @param locator The locator for the element to get the CSS property from.
   * @param property The CSS property to retrieve.
   * @param elementDescription Description of the element for logging.
   * @returns The value of the specified CSS property.
   */
  public async getCSSProperty(locator: Locator, property: string, elementDescription: string): Promise<string> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
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

  /**
   * Waits for a custom condition to be true within a timeout.
   * @param conditionFn The async function that returns a boolean.
   * @param options Options object with timeout and message.
   */
  public async waitFor(conditionFn: () => Promise<boolean>, options: { timeout: number; message: string }): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < options.timeout) {
      if (await conditionFn()) {
        logger.info(`Condition met: ${options.message}`);
        return;
      }
      await this.waitForCustomDelay(timeouts.small);
    }
    logger.error(`Timeout waiting for condition: ${options.message}`);
    throw new Error(`Timeout waiting for condition: ${options.message}`);
  }

  /**
   * Waits for a specified delay.
   */
  public async waitForDelay(): Promise<void> {
    await this.page.waitForTimeout(timeouts.small);
  }

  /**
   * Waits for a custom delay.
   * @param delayMs The delay in milliseconds.
   */
  public async waitForCustomDelay(delayMs: number): Promise<void> {
    await this.page.waitForTimeout(delayMs);
  }

  /**
   * Waits for the specified element to be visible.
   * @param locator The locator for the element to wait for.
   * @param elementDescription Description of the element for logging.
   */
  public async waitForElementToBeVisible(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
    } catch (error) {
      logger.error(`Failed to wait for element to be visible: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  /**
 * Waits for the specified element to be clickable.
 * @param locator The Playwright Locator for the element to wait for.
 * @param elementDescription Description of the element for logging.
 */
  public async waitForClickable(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible', timeout: timeouts.large });
      await this.page.waitForFunction(
        (el) => el && !el.hasAttribute('disabled'),
        await locator.elementHandle()
      );
      logger.info(`Element is clickable: ${elementDescription}`);
    } catch (error) {
      logger.error(`Element not clickable: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }


  /**
   * Waits for the specified element to be enabled.
   * @param locator The locator for the element to wait for.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Waits for the specified element to be disabled.
   * @param locator The locator for the element to wait for.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Waits for the specified element to be hidden.
   * @param locator The locator for the element to wait for.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Waits for the specified element to be present in the DOM.
   * @param locator The locator for the element to wait for.
   * @param elementDescription Description of the element for logging.
   */
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

  /**
   * Waits for the specified element to be present in the DOM.
   * @param locator The locator for the element to wait for.
   * @param elementDescription Description of the element for logging.
   */
  public async waitForElement(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await locator.isVisible({ timeout: timeouts.medium });
      logger.info(`Element is visible: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to wait for element to be visible: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  /**
   * Waits for a specific condition to be met.
   * @param conditionFn The function that returns a boolean indicating the condition.
   * @param timeout The maximum time to wait for the condition in milliseconds.
   * @param failureMessage Optional message to log if the condition is not met.
   */
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

  /**
   * Waits for new dropdown options to load.
   * @param locator The locator for the dropdown options.
   * @param timeout The maximum time to wait for the options to load in milliseconds.
   */
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

  /**
   * Checks if the specified element is visible.
   * @param locator The locator for the element to check.
   * @param elementDescription Description of the element for logging.
   * @returns A boolean indicating whether the element is visible.
   */
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

  /**
   * Asserts that the actual value is not equal to the expected value.
   * @param actualValue The actual value to check.
   * @param expectedValue The expected value to compare against.
   * @param errorMessage Optional error message for the assertion failure.
   */
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

  /**
   * Asserts that the actual value is equal to the expected value.
   * @param actualValue The actual value to check.
   * @param expectedValue The expected value to compare against.
   * @param errorMessage Optional error message for the assertion failure.
   */
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

  /**
   * Asserts that the condition is true.
   * @param condition The condition to check.
   * @param message The message to log if the assertion passes.
   */
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

  /**
   * Asserts that the condition is false.
   * @param condition The condition to check.
   * @param message The message to log if the assertion passes.
   */
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

  /**
   * Asserts that the actual value contains the expected substring.
   * @param actualValue The actual value to check.
   * @param expectedSubstring The expected substring to check for.
   */
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

  /**
 * Asserts that the given text starts with the expected text.
 * @param actualText The actual text string.
 * @param expectedText The text that the actual text should start with.
 * @param elementDescription A description of the element for logging purposes.
 */
  public async assertStartsWith(actualText: string, expectedText: string, elementDescription: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(
        actualText.startsWith(expectedText),
        `Expected ${elementDescription} text to start with "${expectedText}", but got "${actualText}"`
      ).toBeTruthy();
      logger.info(`Assertion passed: ${elementDescription} text starts with "${expectedText}".`);
    } catch (error) {
      logger.error(`Failed to assert startsWith for ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  /**
   * Asserts that the given text ends with the expected text.
   * @param actualText The actual text string.
   * @param expectedText The text that the actual text should end with.
   * @param elementDescription A description of the element for logging purposes.
   */
  public async assertEndsWith(actualText: string, expectedText: string, elementDescription: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(actualText.endsWith(expectedText),
        `Expected ${elementDescription} text to end with "${expectedText}", but got "${actualText}"`
      ).toBeTruthy();
      logger.info(`Assertion passed: ${elementDescription} text ends with "${expectedText}".`);
    } catch (error) {
      logger.error(`Failed to assert endsWith for ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  /**
   * Asserts that the actual value does not contain the unexpected substring.
   * @param actualValue The actual value to check.
   * @param unexpectedSubstring The unexpected substring to check for.
   */
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

  /**
   * Asserts that the value is defined.
   * @param value The value to check.
   * @param message The message to log if the assertion passes.
   */
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

  /**
   * Asserts that the actual value is strictly equal to the expected value using toBe().
   * @param actualValue The actual value to check.
   * @param expectedValue The expected value to compare against.
   * @param errorMessage Optional error message for the assertion failure.
   */
  public async assertToBe(actualValue: any, expectedValue: any, errorMessage?: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(actualValue, errorMessage).toBe(expectedValue);
      logger.info(`Assertion passed: Actual value "${actualValue}" is strictly equal to expected value "${expectedValue}"`);
    } catch (error) {
      logger.error(`Failed to assert toBe | Error: ${error}`);
      throw error;
    }
  }

  /**
 * Checks if a checkbox is checked based on the 'aria-checked' attribute.
 * @param locator The Playwright locator for the checkbox element.
 * @param elementDescription A description of the checkbox for logging.
 * @returns true if the checkbox is checked, false otherwise.
 */
  public async isCheckboxChecked(locator: Locator, elementDescription: string): Promise<boolean> {
    try {
      await this.waitForElement(locator, elementDescription);
      const ariaChecked = await locator.getAttribute('aria-checked');
      const isChecked = ariaChecked === 'true';
      logger.info(`Checkbox checked state for ${elementDescription}: ${isChecked}`);
      return isChecked;
    } catch (error) {
      logger.error(`Failed to check if checkbox is checked: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }
}
