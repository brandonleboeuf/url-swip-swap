import React, { useRef, useState, useEffect } from 'react';
import {
  UrlPairWrapper,
  LabelWrapper,
  Label,
  Input,
  InputWrapper,
  CheckboxWrapper,
  RemoveButton,
  CopyButton,
  OpenInNewTabButton
} from './styles';

interface Props {
  id: string;
  index: number;
  topUrl: string;
  bottomUrl: string;
  checked: boolean;
  onRemove: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRemoveDisabled?: boolean;
}

const ClipboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const OpenInNewTabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const UrlPair: React.FC<Props> = ({
  id,
  index,
  topUrl,
  bottomUrl,
  checked,
  onRemove,
  onInputChange,
  isRemoveDisabled = false,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [topCopySuccess, setTopCopySuccess] = useState(false);
  const [bottomCopySuccess, setBottomCopySuccess] = useState(false);
  const removeTimeoutRef = useRef<number>();

  const handleCopy = async (url: string, setSuccess: (success: boolean) => void) => {
    if (!url.trim()) return;
    
    try {
      await navigator.clipboard.writeText(url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenInNewTab = (url: string) => {
    if (!url.trim()) return;
    
    let formattedUrl = url.trim();
    // If URL starts with localhost, prepend http://
    if (formattedUrl.startsWith('localhost')) {
      formattedUrl = `http://${formattedUrl}`;
    }
    // If URL doesn't start with http:// or https://, prepend https://
    else if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }
    
    window.open(formattedUrl, '_blank');
  };

  const handleRemove = () => {
    if (!isRemoveDisabled && !isRemoving) {
      setIsRemoving(true);
      removeTimeoutRef.current = window.setTimeout(() => {
        onRemove();
      }, 100);
    }
  };

  const isDisabled = !topUrl?.trim() || !bottomUrl?.trim();

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onInputChange(event);
  };

  // Ensure checked state is false when URLs are empty
  useEffect(() => {
    if (isDisabled && checked) {
      onInputChange({
        target: {
          type: 'checkbox',
          name: 'checked',
          checked: false,
          id: `enabled-${id}`
        }
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [isDisabled, checked, onInputChange, id]);

  useEffect(() => {
    return () => {
      if (removeTimeoutRef.current) {
        window.clearTimeout(removeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <UrlPairWrapper isRemoving={isRemoving}>
      <LabelWrapper>
        <h4>PAIR {index + 1}</h4>
        <CheckboxWrapper>
          <input
            type="checkbox"
            id={`enabled-${id}`}
            name="checked"
            checked={checked && !isDisabled}
            onChange={handleToggleChange}
            disabled={isDisabled}
          />
          <label 
            htmlFor={`enabled-${id}`} 
            title={isDisabled ? "Fill in both URLs to enable" : ""}
          />
        </CheckboxWrapper>
      </LabelWrapper>

      {!isRemoveDisabled && (
        <RemoveButton 
          onClick={handleRemove} 
          disabled={isRemoving}
          title="Remove this URL pair"
        >
          Remove
        </RemoveButton>
      )}

      <Label>Primary URL:</Label>
      <InputWrapper>
        <Input
          type="text"
          id={`topUrl-${id}`}
          name="topUrl"
          value={topUrl}
          onChange={onInputChange}
          placeholder="e.g., production.myapp.com"
        />
        <CopyButton
          onClick={() => handleCopy(topUrl, setTopCopySuccess)}
          disabled={!topUrl.trim()}
          title={topUrl.trim() ? `Copy "${topUrl}" to clipboard` : "Enter a URL to enable copying"}
        >
          {topCopySuccess ? <CheckIcon /> : <ClipboardIcon />}
        </CopyButton>
        <OpenInNewTabButton
          onClick={() => handleOpenInNewTab(topUrl)}
          disabled={!topUrl.trim()}
          title={topUrl.trim() ? `Open "${topUrl}" in new tab` : "Enter a URL to enable opening in new tab"}
        >
          <OpenInNewTabIcon />
        </OpenInNewTabButton>
      </InputWrapper>

      <Label>Alternative URL:</Label>
      <InputWrapper>
        <Input
          type="text"
          id={`bottomUrl-${id}`}
          name="bottomUrl"
          value={bottomUrl}
          onChange={onInputChange}
          placeholder="e.g., localhost:3000"
        />
        <CopyButton
          onClick={() => handleCopy(bottomUrl, setBottomCopySuccess)}
          disabled={!bottomUrl.trim()}
          title={bottomUrl.trim() ? `Copy "${bottomUrl}" to clipboard` : "Enter a URL to enable copying"}
        >
          {bottomCopySuccess ? <CheckIcon /> : <ClipboardIcon />}
        </CopyButton>
        <OpenInNewTabButton
          onClick={() => handleOpenInNewTab(bottomUrl)}
          disabled={!bottomUrl.trim()}
          title={bottomUrl.trim() ? `Open "${bottomUrl}" in new tab` : "Enter a URL to enable opening in new tab"}
        >
          <OpenInNewTabIcon />
        </OpenInNewTabButton>
      </InputWrapper>
    </UrlPairWrapper>
  );
}; 