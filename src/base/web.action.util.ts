import { Locator, Page, expect } from '@playwright/test';
import logger from '../helper/loggs/logger';
import { timeouts } from '../helper/timeouts-config';

export class WebActions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async waitForDelay(): Promise<void> {
    await this.page.waitForTimeout(timeouts.medium);
  }

  public async waitForElement(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible', timeout: timeouts.large });
      logger.info(`Element is visible: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to wait for element to be visible: ${elementDescription} | Error: ${error}`);
      throw error;
    }
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

  public getLocator(selector: string): Locator {
    return this.page.locator(selector);
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
      await this.waitForDelay();
      await locator.clear();
      await this.waitForDelay();
      await locator.fill(text);
      logger.info(`Successfully cleared and typed text into element: ${elementDescription} | Text: ${text}`);
    } catch (error) {
      logger.error(`Failed to clear and type text into element: ${elementDescription} | Text: ${text} | Error: ${error}`);
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

  public async selectDropdownOptionByValue(locator: Locator, value: string, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await locator.selectOption({ value });
      logger.info(`Successfully selected dropdown option by value: ${value} for element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to select dropdown option by value: ${value} for element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async selectDropdownOptionByText(locator: Locator, text: string, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
      await this.waitForDelay();
      await locator.selectOption({ label: text });
      logger.info(`Successfully selected dropdown option by text: ${text} for element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to select dropdown option by text: ${text} for element: ${elementDescription} | Error: ${error}`);
      throw error;
    }
  }

  public async waitForElementToBeVisible(locator: Locator, elementDescription: string): Promise<void> {
    try {
      await this.waitForElement(locator, elementDescription);
    } catch (error) {
      logger.error(`Failed to wait for element to be visible: ${elementDescription} | Error: ${error}`);
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

  public async isVisible(locator: Locator, elementDescription: string): Promise<boolean> {
    try {
      const isVisible = await locator.isVisible();
      logger.info(`Element visibility check for: ${elementDescription} | Is Visible: ${isVisible}`);
      return isVisible;
    } catch (error) {
      logger.error(`Failed to check visibility for element: ${elementDescription} | Error: ${error}`);
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

  public async waitForCustomDelay(delayMs: number): Promise<void> {
    await this.page.waitForTimeout(delayMs);
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

  public async assertNotEqual(actualValue: string, expectedValue: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(actualValue).not.toEqual(expectedValue);
      logger.info(`Assertion passed: Actual value "${actualValue}" is not equal to expected value "${expectedValue}"`);
    } catch (error) {
      logger.error(`Failed to assert not equal | Error: ${error}`);
      throw error;
    }
  }

  public async assertEqual(actualValue: string, expectedValue: string): Promise<void> {
    try {
      await this.waitForDelay();
      await expect(actualValue).toEqual(expectedValue);
      logger.info(`Assertion passed: Actual value "${actualValue}" is equal to expected value "${expectedValue}"`);
    } catch (error) {
      logger.error(`Failed to assert equal | Error: ${error}`);
      throw error;
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
}
