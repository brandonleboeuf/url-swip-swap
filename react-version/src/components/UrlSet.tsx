import React, { useState } from 'react';
import { useUrlStore } from '../store/urlStore';
import {
  UrlSetContainer,
  LabelWrapper,
  Input,
  Button,
  CheckboxWrapper
} from './styles';

interface UrlSetProps {
  index: number;
  topUrl: string;
  bottomUrl: string;
  checked: boolean;
}

export const UrlSet: React.FC<UrlSetProps> = ({
  index,
  topUrl,
  bottomUrl,
  checked
}) => {
  const { updateUrlPair, removeUrlPair } = useUrlStore();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => removeUrlPair(index), 300);
  };

  return (
    <UrlSetContainer className={isRemoving ? 'removing' : ''}>
      <LabelWrapper>
        <h4>URL Pair {index + 1}</h4>
        <CheckboxWrapper>
          <input
            type="checkbox"
            id={`checkbox${index}`}
            checked={checked}
            onChange={(e) => updateUrlPair(index, { checked: e.target.checked })}
          />
          <label htmlFor={`checkbox${index}`} />
        </CheckboxWrapper>
      </LabelWrapper>
      
      <Button className="remove" onClick={handleRemove}>
        Remove
      </Button>
      
      <label htmlFor={`topUrl${index}`}>Primary URL:</label>
      <Input
        type="text"
        id={`topUrl${index}`}
        placeholder="e.g., production.myapp.com"
        value={topUrl}
        onChange={(e) => updateUrlPair(index, { topUrl: e.target.value })}
      />
      
      <label htmlFor={`bottomUrl${index}`}>Alternative URL:</label>
      <Input
        type="text"
        id={`bottomUrl${index}`}
        placeholder="e.g., localhost:3000"
        value={bottomUrl}
        onChange={(e) => updateUrlPair(index, { bottomUrl: e.target.value })}
      />
    </UrlSetContainer>
  );
}; 