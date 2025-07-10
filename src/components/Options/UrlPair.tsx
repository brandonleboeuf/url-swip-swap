import React, { useRef, useState, useEffect } from 'react';
import { UrlPairWrapper, LabelWrapper, Label, Input, CheckboxWrapper, RemoveButton } from './styles';

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
  const removeTimeoutRef = useRef<number>();

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
      <Input
        type="text"
        id={`topUrl-${id}`}
        name="topUrl"
        value={topUrl}
        onChange={onInputChange}
        placeholder="e.g., production.myapp.com"
      />

      <Label>Alternative URL:</Label>
      <Input
        type="text"
        id={`bottomUrl-${id}`}
        name="bottomUrl"
        value={bottomUrl}
        onChange={onInputChange}
        placeholder="e.g., localhost:3000"
      />
    </UrlPairWrapper>
  );
}; 