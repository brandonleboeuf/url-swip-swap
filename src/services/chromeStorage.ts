import { UrlSet } from '@/types';

export class ChromeStorageService {
  static async getOptionSets(): Promise<UrlSet[]> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['optionSets'], (result: { [key: string]: any }) => {
        resolve((result.optionSets as UrlSet[]) || []);
      });
    });
  }

  static async setOptionSets(optionSets: UrlSet[]): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ optionSets }, () => {
        resolve();
      });
    });
  }

  static async addOptionSet(optionSet: UrlSet): Promise<void> {
    const currentSets = await this.getOptionSets();
    const newSets = [...currentSets, optionSet];
    await this.setOptionSets(newSets);
  }

  static async updateOptionSet(index: number, optionSet: UrlSet): Promise<void> {
    const currentSets = await this.getOptionSets();
    if (index >= 0 && index < currentSets.length) {
      currentSets[index] = optionSet;
      await this.setOptionSets(currentSets);
    }
  }

  static async removeOptionSet(index: number): Promise<void> {
    const currentSets = await this.getOptionSets();
    if (index >= 0 && index < currentSets.length) {
      currentSets.splice(index, 1);
      await this.setOptionSets(currentSets);
    }
  }

  static async toggleOptionSet(index: number, checked: boolean): Promise<void> {
    const currentSets = await this.getOptionSets();
    if (index >= 0 && index < currentSets.length) {
      currentSets[index].checked = checked;
      await this.setOptionSets(currentSets);
    }
  }
} 