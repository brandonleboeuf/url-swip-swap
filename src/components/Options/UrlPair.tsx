import React, { useRef, useState, useEffect } from 'react';
import {
  UrlPairWrapper,
  LabelWrapper,
  Label,
  Input,
  InputWrapper,
  CheckboxWrapper,
  RemoveButton,
  CopyButton
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
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
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
          title={topUrl.trim() ? "Copy URL" : "Enter a URL first"}
        >
          {topCopySuccess ? <CheckIcon /> : <ClipboardIcon />}
        </CopyButton>
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
          title={bottomUrl.trim() ? "Copy URL" : "Enter a URL first"}
        >
          {bottomCopySuccess ? <CheckIcon /> : <ClipboardIcon />}
        </CopyButton>
      </InputWrapper>
    </UrlPairWrapper>
  );
}; 