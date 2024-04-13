document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('save');

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

    saveButton.addEventListener('click', function () {
        const optionSets = [];
        const inputCount = document.querySelectorAll('input[type="checkbox"]').length;

        for (let i = 0; i < inputCount; i++) {
            const testUrl = document.getElementById(`testUrl${i}`).value.trim();
            const devUrl = document.getElementById(`devUrl${i}`).value.trim();
            const checked = document.getElementById(`checkbox${i}`).checked;

            optionSets.push({ testUrl, devUrl, checked });
        }

        chrome.storage.sync.set({ optionSets }, function () {
            alert('Settings saved.');
        });
    });
});
