document.addEventListener('DOMContentLoaded', function () {
    const versionElement = document.getElementById('version');

    // Fetch the manifest.json file
    fetch(chrome.runtime.getURL('manifest.json'))
        .then((response) => response.json())
        .then((data) => {
            const version = data.version;
            versionElement.textContent = `Version: ${version}`;
        })
        .catch((error) => console.error('Error fetching manifest.json:', error));

    chrome.storage.sync.get(['optionSets'], function ({ optionSets }) {
        optionSets?.forEach(({ testUrl, devUrl, checked }, i) => {
            let testUrlInput = document.getElementById(`testUrl${i}`);
            let devUrlInput = document.getElementById(`devUrl${i}`);
            let checkbox = document.getElementById(`checkbox${i}`);

            testUrlInput.value = testUrl || '';
            devUrlInput.value = devUrl || '';
            checkbox.checked = checked || false;
        });
    });

    // Listen for changes in input fields
    document.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', function () {
            saveOptions();
        });
    });

    function saveOptions() {
        const optionSets = [];
        const inputCount = document.querySelectorAll('input[type="checkbox"]').length;

        for (let i = 0; i < inputCount; i++) {
            const testUrl = document.getElementById(`testUrl${i}`).value.trim();
            const devUrl = document.getElementById(`devUrl${i}`).value.trim();
            const checked = document.getElementById(`checkbox${i}`).checked;

            optionSets.push({ testUrl, devUrl, checked });
        }

        chrome.storage.sync.set({ optionSets });
    }

    // Automatically save options when the page loads
    saveOptions();
});
