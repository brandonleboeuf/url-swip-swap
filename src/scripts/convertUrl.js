const root = document.getElementById('root');
const messageEl = document.getElementById('message');
const titleEl = document.getElementById('title')

// Opens options page when the button is clicked
document.querySelector('#go-to-options').addEventListener('click', function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

function renderMessage({ title, message }) {
  title && (titleEl.textContent = title);
  message && (messageEl.innerHTML = message);
}

// Get the current tab URL and the enabled option sets. If it is a valid URL set, swap the URL.
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0].url;
    chrome.storage.sync.get(['optionSets'], function ({ optionSets }) {
        const checkedSets = optionSets?.filter(({ checked }) => checked);

        if (!checkedSets || checkedSets?.length === 0) {
          renderMessage({ message: 'No option sets enabled.' });
          return;
        }

        const invalidSets = checkedSets.filter(
            ({ topUrl, bottomUrl }) => !topUrl || !bottomUrl
        );

        if (invalidSets.length > 0) {
          renderMessage({ message: 'Please configure all enabled option sets.' });
          return;
        }


        updateTabUrl(currentTab, checkedSets);
    });
});

// Update the current tab URL
const updateTabUrl = (currentTab, checkedSets) => {
    const swapUrl = (newUrl) => {
        chrome.tabs.update(null, { url: newUrl }).catch((error) => {
          renderMessage({ title: 'Error:', message: `ERROR: ${error.message}.` });
        });
    };

  let invalidUrl = true;

  for (const { topUrl, bottomUrl } of checkedSets) {
    if (currentTab.includes(topUrl) || currentTab.includes(bottomUrl)) {
      invalidUrl = false;

      const isTopUrl = currentTab.includes(topUrl);
      const isLocalHost = (url) => url.includes('localhost');

      // It this is using localhost, use split to completely replace the first part of the url, preserving the remainder of the path and the params
      if (isLocalHost(topUrl) || isLocalHost(bottomUrl)) {
        const targetUrl = isTopUrl ? topUrl : bottomUrl;
        const [_, params] = isTopUrl ? currentTab.split(bottomUrl) : currentTab.split(topUrl)
        swapUrl(targetUrl + params);
      }

      const newUrl = currentTab.replace(
          isTopUrl ? topUrl : bottomUrl,
          isTopUrl ? bottomUrl : topUrl
      );

      swapUrl(newUrl);
      break;
    }
  }

    if (invalidUrl) {
      renderMessage({ message: 'No configuration set for this URL.' });
    } else {
      root.innerHTML = 'Loading...';
    }
};
