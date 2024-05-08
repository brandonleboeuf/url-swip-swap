document.addEventListener('DOMContentLoaded', function () {
    // Set version number on Options page
    const versionElement = document.getElementById('version');
    fetch(chrome.runtime.getURL('manifest.json'))
        .then((response) => response.json())
        .then((data) => {
            const version = data.version;
            versionElement.textContent = `Version: ${version}`;
        })
        .catch((error) => console.error('Error fetching manifest.json:', error));

    // Set up input fields with saved values
    chrome.storage.sync.get(['optionSets'], function ({ optionSets }) {
        optionSets?.forEach(({ topUrl, bottomUrl, checked }, i) => {
            let topUrlInput = document.getElementById(`topUrl${i}`);
            let bottomUrlInput = document.getElementById(`bottomUrl${i}`);
            let checkbox = document.getElementById(`checkbox${i}`);

            topUrlInput.value = topUrl || '';
            bottomUrlInput.value = bottomUrl || '';
            checkbox.checked = checked || false;
        });
    });

    // Listen for changes in input fields
    document.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', function () {
            saveOptions();
        });
    });

    // Listen for changes in checkboxes and save options on any changes
    function saveOptions() {
        const optionSets = [];
        const inputCount = document.querySelectorAll('input[type="checkbox"]').length;

        for (let i = 0; i < inputCount; i++) {
            const topUrl = document.getElementById(`topUrl${i}`).value.trim();
            const bottomUrl = document.getElementById(`bottomUrl${i}`).value.trim();
            const checked = document.getElementById(`checkbox${i}`).checked;

            optionSets.push({ topUrl, bottomUrl, checked });
        }

        chrome.storage.sync.set({ optionSets });
    }
});
