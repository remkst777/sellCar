import styled from 'styled-components';
import { blue, pink } from 'style-constants';

export default styled.button`
  color: ${props => (!props.isIn ? blue : pink)};
  border: 1px solid ${props => (!props.isIn ? blue : pink)};
  padding: 4px 15px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  display: inline-block;
  background: transparent;
  outline: none !important;

  :hover {
    box-shadow: 0 0 0 2px ${props => (!props.isIn ? `${blue}66` : `${pink}66`)};
  }
`;
