import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

export const Tagline = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  color: #444;
  text-align: center;
  margin-bottom: 30px;
`;

export const UrlSetContainer = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease-in;
  transition: all 0.3s ease;

  &.removing {
    opacity: 0;
    transform: translateX(-20px);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: 2px solid #007bff;
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #0056b3;
  }

  &.remove {
    background: #dc3545;
    margin-bottom: 15px;

    &:hover {
      background: #c82333;
    }
  }
`;

export const Footer = styled.div`
  text-align: center;
  margin-top: 40px;
  color: #666;
  font-size: 14px;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CheckboxWrapper = styled.div`
  position: relative;
  display: inline-block;
  
  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    
    & + label {
      position: relative;
      padding-left: 25px;
      cursor: pointer;
      
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        height: 18px;
        border: 1px solid #ddd;
        background: #fff;
        border-radius: 3px;
        transition: all 0.3s ease;
      }
      
      &:after {
        content: '';
        position: absolute;
        left: 6px;
        top: 2px;
        width: 5px;
        height: 10px;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        opacity: 0;
        transition: all 0.3s ease;
      }
    }
    
    &:checked + label {
      &:before {
        background: #007bff;
        border-color: #007bff;
      }
      
      &:after {
        opacity: 1;
      }
    }
  }
`; 