const properties = {
  lg: {
    fontSize: '16px',
    height: '48px',
  },
  sm: {
    fontSize: '12px',
    height: '36px',
  },
};

const red = '#6f42c1';
const blue = '#2196f3';

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

  :focus {
    border: 1px solid ${red};
    color: ${red};
  }

  :disabled {
    opacity: 0.5;
  }
`;

export default Element;
