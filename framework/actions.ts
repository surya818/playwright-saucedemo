import { Locator } from "@playwright/test";

export interface UIActions {
    clickOnElement(selector: string): Promise<void>;
    typeText(selector: string, text: string): Promise<void>;
    findElement(selector: string): Promise<Locator>;
  }