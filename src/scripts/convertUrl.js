const root = document.getElementById('root');

function renderMessage(message) {
    root.innerHTML = `
        <div class="container">
            <div class="logo"></div>
        </div>
        <h2>url-swip-swap</h2>
        <p>Swaps between two URLs</p>
        <p><b>${message}</b></p>
        <h3>Instructions</h3>
        <ul>
            <li>Right-click this Extension.</li>
            <li>Click "Options".</li>
            <li>Set the two URLs you want to swap between.</li>
        </ul>
    `;
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0].url;
    chrome.storage.sync.get(['optionSets'], function ({ optionSets }) {
        const checkedSets = optionSets?.filter(({ checked }) => checked);

        if (!checkedSets || checkedSets?.length === 0) {
            renderMessage('No option sets enabled.');
            return;
        }

        const invalidSets = checkedSets.filter(
            ({ testUrl, devUrl }) => !testUrl || !devUrl
        );

        if (invalidSets.length > 0) {
            renderMessage('Please configure all enabled option sets.');
            return;
        }

        updateTabUrl(currentTab, checkedSets);
    });
});

const updateTabUrl = (currentTab, checkedSets) => {
    const swapUrl = (newUrl) => {
        chrome.tabs.update({ url: newUrl }).catch((error) => {
            renderMessage(`ERROR: ${error.message}.`);
        });
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
        renderMessage('ERROR: Not a convertible DK URL.');
    }
};
