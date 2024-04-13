chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0].url;
    chrome.storage.sync.get(['optionSets'], function ({ optionSets }) {
        const checkedSets = optionSets?.filter(({ checked }) => checked);

        if (!checkedSets || checkedSets?.length === 0) {
            return alert('No option sets enabled.');
        }

        const invalidSets = checkedSets.filter(
            ({ testUrl, devUrl }) => !testUrl || !devUrl
        );
        if (invalidSets.length > 0) {
            return alert('Please configure all enabled option sets.');
        }

        updateTabUrl(currentTab, checkedSets);
    });
});

const updateTabUrl = (currentTab, checkedSets) => {
    const swapUrl = (newUrl) => {
        chrome.tabs.update({ url: newUrl });
    };

    let invalidUrl = true;

    for (const { testUrl, devUrl } of checkedSets) {
        if (currentTab.includes(testUrl) || currentTab.includes(devUrl)) {
            invalidUrl = false;

            const isTest = currentTab.includes(testUrl);
            const newUrl = currentTab.replace(
                isTest ? testUrl : devUrl,
                isTest ? devUrl : testUrl
            );

            swapUrl(newUrl);
            break;
        }
    }

    if (invalidUrl) {
        alert('ERROR: Not a convertible DK URL.');
    }
};
