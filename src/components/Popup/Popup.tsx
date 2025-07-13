import React, { useEffect, useState } from 'react';
import { ChromeStorageService } from '@/services/chromeStorage';
import {
  PopupContainer,
  SwappingContainer,
  SwappingText,
  Instructions,
  OptionsButton,
} from './styles';
import {
  Logo,
  Title,
  Tagline,
  Message,
} from '../shared/styles';

type Status = 'idle' | 'swapping' | 'error';

export const Popup: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [targetUrl, setTargetUrl] = useState('');

  useEffect(() => {
    const switchUrl = async () => {
      try {
        // Get current tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.url || !tab.id) {
          setStatus('error');
          setErrorMessage('No valid URL found in the current tab');
          return;
        }

        // Get stored options
        const optionSets = await ChromeStorageService.getOptionSets();
        if (!optionSets?.length) {
          setStatus('error');
          setErrorMessage('No URL pairs have been set up yet. Click Options below to get started!');
          return;
        }

        // Find matching URL set
        const matchingSet = optionSets.find(set => {
          if (!set.checked) return false;
          return tab.url!.includes(set.topUrl) || tab.url!.includes(set.bottomUrl);
        });

        if (!matchingSet) {
          setStatus('error');
          setErrorMessage('This URL is not set up or enabled in your options. Click Options below to configure it.');
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
        setErrorMessage('An error occurred while trying to swap URLs');
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
      </SwappingContainer>
    );
  }

  return (
    <PopupContainer>
      <Logo />
      <Title>url-swip-swap</Title>
      <Tagline>Quick URL switching between environments</Tagline>

      {status === 'error' && <Message>{errorMessage}</Message>}

      <Instructions>
        <h3>Quick Setup</h3>
        <ul>
          <li>Click Options below or right-click extension icon → Options</li>
          <li>Add and enable URL pairs for your environments</li>
          <li>Click extension icon to switch when visiting a configured URL</li>
        </ul>
      </Instructions>

      <OptionsButton onClick={handleOptionsClick}>
        Options
      </OptionsButton>
    </PopupContainer>
  );
}; 