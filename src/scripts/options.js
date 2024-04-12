document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('save');

    chrome.storage.sync.get(['optionSets'], function ({ optionSets }) {
        optionSets.forEach((optionSet, index) => {
            let testUrlInput = document.getElementById(`testUrl${index + 1}`);
            let devUrlInput = document.getElementById(`devUrl${index + 1}`);
            let optionCheckbox = document.getElementById(`option${index + 1}`);

            testUrlInput.value = optionSet.testUrl || '';
            devUrlInput.value = optionSet.devUrl || '';
            optionCheckbox.checked = optionSet.checked || false;
        });
    });

    saveButton.addEventListener('click', function () {
        const optionSets = [];

        // Iterate over each option set
        for (let index = 0; index < 3; index++) {
            const testUrlInput = document.getElementById(`testUrl${index + 1}`);
            const devUrlInput = document.getElementById(`devUrl${index + 1}`);
            const optionCheckbox = document.getElementById(`option${index + 1}`);

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
