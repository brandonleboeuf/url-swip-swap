document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('save');

    chrome.storage.sync.get(['optionSets'], function ({ optionSets }) {
        optionSets.forEach((optionSet, i) => {
            let testUrlInput = document.getElementById(`testUrl${i}`);
            let devUrlInput = document.getElementById(`devUrl${i}`);
            let optionCheckbox = document.getElementById(`option${i}`);

            testUrlInput.value = optionSet.testUrl || '';
            devUrlInput.value = optionSet.devUrl || '';
            optionCheckbox.checked = optionSet.checked || false;
        });
    });

    saveButton.addEventListener('click', function () {
        const optionSets = [];

        // Iterate over each option set
        for (let i = 0; i < 3; i++) {
            const testUrlInput = document.getElementById(`testUrl${i}`);
            const devUrlInput = document.getElementById(`devUrl${i}`);
            const optionCheckbox = document.getElementById(`option${i}`);

            const testUrl = testUrlInput.value.trim();
            const devUrl = devUrlInput.value.trim();
            const checked = optionCheckbox.checked;

            // Add the current option set to the array
            optionSets.push({ testUrl, devUrl, checked });
        }

        chrome.storage.sync.set({ optionSets }, function () {
            alert('Settings saved.');
        });
    });
});
