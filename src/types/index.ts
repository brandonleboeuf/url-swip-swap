export interface UrlSet {
  topUrl: string;
  bottomUrl: string;
  checked: boolean;
}

export interface ChromeStorageData {
  optionSets: UrlSet[];
}

export interface MessageData {
  title?: string;
  message: string;
}

export interface TabInfo {
  url: string;
  id?: number;
}

export interface UrlSwapResult {
  success: boolean;
  newUrl?: string;
  error?: string;
} 