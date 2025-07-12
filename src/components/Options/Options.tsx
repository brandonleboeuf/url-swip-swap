import React, { useEffect, useState, useCallback } from 'react';
import { UrlPair } from './UrlPair';
import { Footer } from './Footer';
import {
  Container,
  Title,
  Tagline,
  Description,
  UrlPairsContainer,
  AddPairButton,
  ImportExportContainer,
  ImportExportButton
} from './styles';

interface UrlPairData {
  id: string;
  topUrl: string;
  bottomUrl: string;
  checked: boolean;
}

export const Options: React.FC = () => {
  const [urlPairs, setUrlPairs] = useState<UrlPairData[]>([]);
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    // Load version from manifest
    fetch(chrome.runtime.getURL('manifest.json'))
      .then(response => response.json())
      .then(data => {
        setVersion(data.version);
      })
      .catch(error => console.error('Error fetching manifest.json:', error));

    // Load saved options
    chrome.storage.sync.get(['optionSets'], ({ optionSets }) => {
      if (optionSets?.length > 0) {
        // Add IDs to existing pairs if they don't have them
        const pairsWithIds = optionSets.map((pair: UrlPairData) => ({
          ...pair,
          id: pair.id || crypto.randomUUID(),
        }));
        setUrlPairs(pairsWithIds);
      } else {
        // Create one empty pair by default
        setUrlPairs([{
          id: crypto.randomUUID(),
          topUrl: '',
          bottomUrl: '',
          checked: false
        }]);
      }
    });
  }, []);

  const saveOptions = useCallback((newPairs: UrlPairData[]) => {
    chrome.storage.sync.set({ optionSets: newPairs });
  }, []);

  const handleAddPair = useCallback(() => {
    setUrlPairs(prevPairs => {
      const newPairs = [
        ...prevPairs,
        {
          id: crypto.randomUUID(),
          topUrl: '',
          bottomUrl: '',
          checked: false
        }
      ];
      saveOptions(newPairs);
      return newPairs;
    });
  }, [saveOptions]);

  const handleRemovePair = useCallback((id: string) => {
    setUrlPairs(prevPairs => {
      if (prevPairs.length <= 1) return prevPairs;
      
      const newPairs = prevPairs.filter(pair => pair.id !== id);
      saveOptions(newPairs);
      return newPairs;
    });
  }, [saveOptions]);

  const handleInputChange = useCallback((id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    
    setUrlPairs(prevPairs => {
      const newPairs = prevPairs.map(pair => {
        if (pair.id !== id) return pair;

        const updatedPair = { ...pair };
        if (type === 'checkbox') {
          // Only allow checking if both URLs are filled
          if (checked && (!pair.topUrl.trim() || !pair.bottomUrl.trim())) {
            return pair; // Return unchanged if trying to check with empty URLs
          }
          updatedPair.checked = checked;
        } else if (name === 'topUrl') {
          updatedPair.topUrl = value;
          // Uncheck if URL becomes empty
          if (!value.trim()) {
            updatedPair.checked = false;
          }
        } else if (name === 'bottomUrl') {
          updatedPair.bottomUrl = value;
          // Uncheck if URL becomes empty
          if (!value.trim()) {
            updatedPair.checked = false;
          }
        }
        return updatedPair;
      });

      saveOptions(newPairs);
      return newPairs;
    });
  }, [saveOptions]);

  const handleExport = useCallback(() => {
    const data = JSON.stringify(urlPairs, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `url-swip-swap-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [urlPairs]);

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedPairs = JSON.parse(e.target?.result as string);
        // Validate the imported data
        if (!Array.isArray(importedPairs)) throw new Error('Invalid format');
        
        const validPairs = importedPairs.filter(pair => 
          pair && typeof pair === 'object' && 
          typeof pair.topUrl === 'string' && 
          typeof pair.bottomUrl === 'string' &&
          typeof pair.checked === 'boolean'
        );

        if (validPairs.length === 0) throw new Error('No valid URL pairs found');

        // Add IDs to imported pairs if they don't have them
        const pairsWithIds = validPairs.map((pair: UrlPairData) => ({
          ...pair,
          id: pair.id || crypto.randomUUID(),
        }));

        setUrlPairs(pairsWithIds);
        saveOptions(pairsWithIds);
      } catch (error) {
        console.error('Error importing configuration:', error);
        alert('Error importing configuration. Please check the file format.');
      }
    };
    reader.readAsText(file);
    // Reset the input so the same file can be imported again
    event.target.value = '';
  }, [saveOptions]);

  return (
    <Container>
      <Title>url-swip-swap</Title>
      <Tagline>Quick URL switching between environments</Tagline>
      <Description>
        Configure URL pairs to quickly switch between different versions of your websites. Toggle
        the switch to enable/disable each pair.
      </Description>
      
      <UrlPairsContainer id="url-pairs">
        {urlPairs.map((pair, index) => (
          <UrlPair
            key={pair.id}
            id={pair.id}
            index={index}
            topUrl={pair.topUrl}
            bottomUrl={pair.bottomUrl}
            checked={pair.checked}
            onRemove={() => handleRemovePair(pair.id)}
            onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(pair.id, event)}
            isRemoveDisabled={urlPairs.length <= 1}
          />
        ))}
      </UrlPairsContainer>

      <AddPairButton id="add-pair" onClick={handleAddPair}>
        Add New URL Pair
      </AddPairButton>

      <ImportExportContainer>
        <ImportExportButton as="label" htmlFor="import-config">
          Import Configuration
          <input
            type="file"
            id="import-config"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </ImportExportButton>
        <ImportExportButton onClick={handleExport}>
          Export Configuration
        </ImportExportButton>
      </ImportExportContainer>

      <Footer version={version} />
    </Container>
  );
}; 