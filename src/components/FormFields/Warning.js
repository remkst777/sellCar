import styled from 'styled-components';

const Warning = styled.h6`
  font-size: 11px;
  color: #ff0000;
  padding: 5px;
  animation: TT1 0.5s;
  letter-spacing: 0.3px;

  @keyframes TT1 {
    from {
      padding: 0;
      opacity: 0;
    }

    to {
      padding: 5px;
      opacity: 1;
    }
  }
`;

export default Warning;
