import { purple, blue } from 'style-constants';

export const properties = {
  lg: {
    fontSize: '16px',
    height: '48px',
  },
  sm: {
    fontSize: '12px',
    height: '36px',
  },
};

const Element = size => `
  width: 100%;
  outline: none;
  border-radius: 3px;
  border: 1px solid ${blue};
  background: transparent;
  padding: 0 12px;
  color: ${blue};
  transition: 0.35s;
  font-size: ${properties[size].fontSize};
  height: ${properties[size].height};

  ::placeholder {
    color: ${blue}7F;
  }

  :focus {
    border: 1px solid ${purple};
    color: ${purple};
  }

  :disabled {
    opacity: 0.5;
  }
`;

export default Element;
