import styled from 'styled-components';
import { white } from 'style-constants';

const HeaderStyled = styled.header`
  position: relative;
  z-index: 100;
  background: linear-gradient(to bottom, #17234a, #232526);
  text-transform: uppercase;
  color: ${white};
  font-size: 13px;
  letter-spacing: 1px;
  animation: TranslatorY 1s;
  animation-fill-mode: both;

  li {
    padding-left: 20px;
    cursor: pointer;
  }

  @keyframes TranslatorY {
    from {
      padding: 0;
      opacity: 0;
    }

    to {
      padding: 15px 0;
      opacity: 1;
    }
  }
`;

export default HeaderStyled;
