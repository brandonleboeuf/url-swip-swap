import React, { useEffect, useState } from 'react';
import { getStoredOptions } from '../../utils/chromeStorage';
import {
  PopupContainer,
  Logo,
  Title,
  Message,
  Instructions,
  OptionsButton,
  SwappingContainer,
  SwappingText,
  CopyButton,
} from './styles';

type Status = 'idle' | 'swapping' | 'error';

export const Popup: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copy URL');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy URL'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyStatus('Failed to copy');
    }
  };

  useEffect(() => {
    const switchUrl = async () => {
      try {
        // Get current tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.url || !tab.id) {
          setStatus('error');
          setErrorMessage('No valid URL found');
          return;
        }

        // Get stored options
        const { optionSets } = await getStoredOptions();
        if (!optionSets?.length) {
          setStatus('error');
          setErrorMessage('No URL pairs configured');
          return;
        }

        // Find matching URL set
        const matchingSet = optionSets.find(set => {
          if (!set.checked) return false;
          return tab.url!.includes(set.topUrl) || tab.url!.includes(set.bottomUrl);
        });

        if (!matchingSet) {
          setStatus('error');
          setErrorMessage('No matching URL pair found');
          return;
        }

        // Get new URL
        const newUrl = tab.url!.includes(matchingSet.topUrl)
          ? tab.url!.replace(matchingSet.topUrl, matchingSet.bottomUrl)
          : tab.url!.replace(matchingSet.bottomUrl, matchingSet.topUrl);

        if (newUrl === tab.url) {
          setStatus('error');
          setErrorMessage('URLs are identical');
          return;
        }

        // Show swapping state and set target URL
        setStatus('swapping');
        setTargetUrl(newUrl);

        // Keep swapping state visible for 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update the tab
        await chrome.tabs.update(tab.id, { url: newUrl });

        // Close popup
        window.close();
      } catch (error) {
        setStatus('error');
        setErrorMessage('An error occurred');
        console.error('Error:', error);
      }
    };

    switchUrl();
  }, []);

  const handleOptionsClick = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  };

  if (status === 'swapping') {
    return (
      <SwappingContainer>
        <Logo />
        <SwappingText>Swapping...</SwappingText>
        <Message>{targetUrl}</Message>
        <CopyButton onClick={handleCopy}>
          {copyStatus}
        </CopyButton>
      </SwappingContainer>
    );
  }

  return (
    <PopupContainer>
      <Logo />
      <Title>url-swip-swap</Title>

      {status === 'error' && <Message>{errorMessage}</Message>}

      <Instructions>
        <h3>Instructions</h3>
        <ul>
          <li>Click Options (Ctrl+click {'>'} Options).</li>
          <li>Set the URLs you want to swap between.</li>
          <li>While on a configured URL, clicking the extension will trigger the swap.</li>
        </ul>
      </Instructions>

      <OptionsButton onClick={handleOptionsClick}>
        Options
      </OptionsButton>
    </PopupContainer>
  );
}; 