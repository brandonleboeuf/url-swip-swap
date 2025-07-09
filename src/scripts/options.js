// Constants and Templates
const URL_SET_TEMPLATE = (index, data = {}) => `
    <div class="label-wrapper">
        <h4>URL Pair ${index + 1}</h4>
        <div class="input-wrapper checkbox-wrapper">
            <input type="checkbox" id="checkbox${index}" ${data.checked ? 'checked' : ''}>
            <label for="checkbox${index}"></label>
        </div>
    </div>
    <button class="remove-button">Remove</button>
    <label for="topUrl${index}">Primary URL:</label>
    <input type="text" id="topUrl${index}" placeholder="e.g., production.myapp.com" value="${data.topUrl || ''}">
    <br>
    <label for="bottomUrl${index}">Alternative URL:</label>
    <input type="text" id="bottomUrl${index}" placeholder="e.g., localhost:3000" value="${data.bottomUrl || ''}">
`;

document.addEventListener('DOMContentLoaded', initializeOptionsPage);

function initializeOptionsPage() {
    const urlSetsContainer = document.getElementById('url-sets');
    const addSetButton = document.getElementById('add-set');
    
    // Initialize version display
    initializeVersionDisplay();
    
    // Set up event listeners
    addSetButton.addEventListener('click', () => addNewSet(urlSetsContainer));
    
    // Load saved options
    loadSavedOptions(urlSetsContainer);
}

function initializeVersionDisplay() {
    const versionElement = document.getElementById('version');
    fetch(chrome.runtime.getURL('manifest.json'))
        .then(response => response.json())
        .then(data => {
            versionElement.textContent = `Version: ${data.version}`;
        })
        .catch(error => console.error('Error fetching manifest.json:', error));
}

function createUrlSet(index, data = {}) {
    const setElement = document.createElement('div');
    setElement.className = 'url-set adding';
    setElement.dataset.index = index;
    setElement.innerHTML = URL_SET_TEMPLATE(index, data);

    // Add event listeners
    setupSetEventListeners(setElement);

    // Remove the adding class after animation completes
    setElement.addEventListener('animationend', () => {
        setElement.classList.remove('adding');
    });

    return setElement;
}

function setupSetEventListeners(setElement) {
    // Input change listeners
    setElement.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', saveOptions);
    });

    // Remove button listener
    setElement.querySelector('.remove-button').addEventListener('click', () => {
        setElement.classList.add('removing');
        setElement.addEventListener('transitionend', () => {
            setElement.remove();
            reindexSets();
            saveOptions();
        }, { once: true });
    });
}

function reindexSets() {
    const sets = document.querySelectorAll('.url-set');
    sets.forEach((set, index) => {
        set.dataset.index = index;
        updateSetIndexes(set, index);
    });
}

function updateSetIndexes(set, index) {
    // Update set title
    set.querySelector('h4').textContent = `SET ${index + 1}`;
    
    // Update input IDs and labels
    const elements = {
        checkbox: set.querySelector('input[type="checkbox"]'),
        topUrl: set.querySelector('input[type="text"]:nth-of-type(1)'),
        bottomUrl: set.querySelector('input[type="text"]:nth-of-type(2)')
    };
    
    elements.checkbox.id = `checkbox${index}`;
    elements.checkbox.nextElementSibling.setAttribute('for', `checkbox${index}`);
    elements.topUrl.id = `topUrl${index}`;
    elements.bottomUrl.id = `bottomUrl${index}`;
}

function addNewSet(container) {
    const currentSets = container.querySelectorAll('.url-set');
    const newSet = createUrlSet(currentSets.length);
    container.appendChild(newSet);
    saveOptions();
}

function saveOptions() {
    const optionSets = Array.from(document.querySelectorAll('.url-set')).map((set, index) => ({
        topUrl: document.getElementById(`topUrl${index}`).value.trim(),
        bottomUrl: document.getElementById(`bottomUrl${index}`).value.trim(),
        checked: document.getElementById(`checkbox${index}`).checked
    }));

    chrome.storage.sync.set({ optionSets });
}

function loadSavedOptions(container) {
    chrome.storage.sync.get(['optionSets'], function ({ optionSets }) {
        if (optionSets?.length > 0) {
            optionSets.forEach((setData, index) => {
                container.appendChild(createUrlSet(index, setData));
            });
        } else {
            // Create one empty set by default
            container.appendChild(createUrlSet(0));
        }
    });
}

