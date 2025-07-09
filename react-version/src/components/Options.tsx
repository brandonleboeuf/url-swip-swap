import React, { useEffect } from 'react';
import { useUrlStore } from '../store/urlStore';
import { UrlSet } from './UrlSet';
import {
  Container,
  Title,
  Tagline,
  Description,
  Button,
  Footer
} from './styles';

export const Options: React.FC = () => {
  const { urlPairs, addUrlPair, loadUrlPairs } = useUrlStore();

  useEffect(() => {
    // Load saved options from Chrome storage
    chrome.storage.sync.get(['optionSets'], ({ optionSets }) => {
      if (optionSets?.length > 0) {
        loadUrlPairs(optionSets);
      } else {
        // Create one empty set by default
        addUrlPair();
      }
    });
  }, []);

  // Save options whenever urlPairs changes
  useEffect(() => {
    chrome.storage.sync.set({ optionSets: urlPairs });
  }, [urlPairs]);

  // Get version from manifest
  useEffect(() => {
    fetch(chrome.runtime.getURL('manifest.json'))
      .then(response => response.json())
      .then(data => {
        const versionElement = document.getElementById('version');
        if (versionElement) {
          versionElement.textContent = `Version: ${data.version}`;
        }
      })
      .catch(error => console.error('Error fetching manifest.json:', error));
  }, []);

  return (
    <Container>
      <Title>URL Swip-Swap</Title>
      <Tagline>Quick URL switching between environments</Tagline>
      <Description>
        Configure URL pairs to quickly switch between different versions of your websites.
        Toggle the switch to enable/disable each pair.
      </Description>

      {urlPairs.map((pair, index) => (
        <UrlSet
          key={index}
          index={index}
          topUrl={pair.topUrl}
          bottomUrl={pair.bottomUrl}
          checked={pair.checked}
        />
      ))}

      <Button onClick={addUrlPair}>Add New URL Pair</Button>

      <Footer>
        <div id="version"></div>
        <p>Created by <a href="mailto:b.leboeuf@draftkings.com">Brandon</a></p>
        <p>Est. 2024</p>
      </Footer>
    </Container>
  );
}; 