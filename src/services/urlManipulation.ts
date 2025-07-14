import { TabInfo, UrlSet, UrlSwapResult } from '@/types';

export class UrlManipulationService {
  private static normalizeUrl(url: string): string {
    // If URL already has a protocol, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it's localhost, prefix with http://
    if (url.includes('localhost')) {
      return `http://${url}`;
    }
    
    // For all other URLs, prefix with https://
    return `https://${url}`;
  }

  static async getCurrentTab(): Promise<TabInfo> {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        resolve({
          url: currentTab.url || '',
          id: currentTab.id,
        });
      });
    });
  }

  static async updateTabUrl(newUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.tabs.update({ url: newUrl }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    });
  }

  static swapUrl(currentUrl: string, urlSets: UrlSet[]): UrlSwapResult {
    const checkedSets = urlSets.filter(({ checked }) => checked);

    if (checkedSets.length === 0) {
      return {
        success: false,
        error: 'No option sets enabled.',
      };
    }

    const invalidSets = checkedSets.filter(
      ({ topUrl, bottomUrl }) => !topUrl || !bottomUrl
    );

    if (invalidSets.length > 0) {
      return {
        success: false,
        error: 'Please configure all enabled option sets.',
      };
    }

    for (const { topUrl, bottomUrl } of checkedSets) {
      // Normalize URLs before comparison
      const normalizedTopUrl = this.normalizeUrl(topUrl);
      const normalizedBottomUrl = this.normalizeUrl(bottomUrl);
      const normalizedCurrentUrl = this.normalizeUrl(currentUrl);

      if (normalizedCurrentUrl.includes(normalizedTopUrl) || normalizedCurrentUrl.includes(normalizedBottomUrl)) {
        const isTopUrl = normalizedCurrentUrl.includes(normalizedTopUrl);
        const isLocalHost = (url: string) => url.includes('localhost');

        let newUrl: string;

        // Handle localhost URLs with special logic
        if (isLocalHost(topUrl) || isLocalHost(bottomUrl)) {
          const targetUrl = isTopUrl ? normalizedBottomUrl : normalizedTopUrl;
          const [_, params] = isTopUrl 
            ? normalizedCurrentUrl.split(normalizedBottomUrl) 
            : normalizedCurrentUrl.split(normalizedTopUrl);
          newUrl = targetUrl + (params || '');
        } else {
          // Regular URL replacement
          newUrl = normalizedCurrentUrl.replace(
            isTopUrl ? normalizedTopUrl : normalizedBottomUrl,
            isTopUrl ? normalizedBottomUrl : normalizedTopUrl
          );
        }

        return {
          success: true,
          newUrl,
        };
      }
    }

    return {
      success: false,
      error: 'No configuration set for this URL.',
    };
  }

  static async performUrlSwap(): Promise<UrlSwapResult> {
    try {
      const currentTab = await this.getCurrentTab();
      const { ChromeStorageService } = await import('./chromeStorage');
      const optionSets = await ChromeStorageService.getOptionSets();
      
      const result = this.swapUrl(currentTab.url, optionSets);
      
      if (result.success && result.newUrl) {
        await this.updateTabUrl(result.newUrl);
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
} 