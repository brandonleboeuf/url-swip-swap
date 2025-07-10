interface StorageData {
  optionSets: Array<{
    topUrl: string;
    bottomUrl: string;
    checked: boolean;
  }>;
}

export const getStoredOptions = async (): Promise<StorageData> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['optionSets'], (result) => {
      resolve({
        optionSets: result.optionSets || []
      });
    });
  });
}; 