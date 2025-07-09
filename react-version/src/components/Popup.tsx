import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Container, Button } from './styles';

const PopupContainer = styled(Container)`
  width: 300px;
  padding: 15px;
`;

const Logo = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto 15px;
  background-image: url('${chrome.runtime.getURL('assets/favicon.png')}');
  background-size: contain;
  background-repeat: no-repeat;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin: 10px 0;
`;

const MessageText = styled.p`
  color: #666;
  margin: 10px 0;
`;

const Instructions = styled.div`
  margin: 15px 0;
  
  h3 {
    color: #333;
    margin-bottom: 10px;
  }
  
  ul {
    padding-left: 20px;
    color: #666;
    
    li {
      margin: 5px 0;
    }
  }
`;

interface UrlSet {
  topUrl: string;
  bottomUrl: string;
  checked: boolean;
}

export const Popup: React.FC = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0].url;
      chrome.storage.sync.get(['optionSets'], function ({ optionSets }: { optionSets: UrlSet[] }) {
        const checkedSets = optionSets?.filter(({ checked }) => checked);

        if (!checkedSets || checkedSets?.length === 0) {
          setMessage('No option sets enabled.');
          return;
        }

        const invalidSets = checkedSets.filter(
          ({ topUrl, bottomUrl }) => !topUrl || !bottomUrl
        );

        if (invalidSets.length > 0) {
          setMessage('Please configure all enabled option sets.');
          return;
        }

        let foundMatch = false;
        for (const { topUrl, bottomUrl } of checkedSets) {
          if (currentTab?.includes(topUrl) || currentTab?.includes(bottomUrl)) {
            foundMatch = true;
            const isTopUrl = currentTab.includes(topUrl);
            const isLocalHost = (url: string) => url.includes('localhost');

            // Handle localhost URLs
            if (isLocalHost(topUrl) || isLocalHost(bottomUrl)) {
              const targetUrl = isTopUrl ? bottomUrl : topUrl;
              const [, params] = isTopUrl ? currentTab.split(bottomUrl) : currentTab.split(topUrl);
              updateTabUrl(targetUrl + params);
            } else {
              // Handle regular URLs
              const newUrl = currentTab.replace(
                isTopUrl ? topUrl : bottomUrl,
                isTopUrl ? bottomUrl : topUrl
              );
              updateTabUrl(newUrl);
            }
            break;
          }
        }

        if (!foundMatch) {
          setMessage('No configuration set for this URL.');
        }
      });
    });
  }, []);

  const updateTabUrl = (newUrl: string) => {
    chrome.tabs.update(undefined, { url: newUrl }).catch((error) => {
      setTitle('Error:');
      setMessage(`ERROR: ${error.message}.`);
    });
  };

  const openOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  };

  return (
    <PopupContainer>
      <Logo />
      <Title>url-swip-swap</Title>
      {(title || message) && (
        <div>
          <MessageText>
            <b>{title}</b> <span>{message}</span>
          </MessageText>
        </div>
      )}
      <Instructions>
        <h3>Instructions</h3>
        <ul>
          <li>Click Options (Ctrl+click {'>'} Options).</li>
          <li>Set the URLs you want to swap between.</li>
          <li>While on a configured URL, clicking the extension will trigger the swap.</li>
        </ul>
      </Instructions>
      <Button onClick={openOptions}>Options</Button>
    </PopupContainer>
  );
}; 