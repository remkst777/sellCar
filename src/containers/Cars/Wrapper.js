import styled from 'styled-components';
import { white, darkblue } from 'style-constants';

const LEFT_MENU_WIDTH = 275;
const BORDER_RIGHT = 10;

const Wrapper = styled.div`
  aside {
    position: fixed;
    top: 0;
    left: -${LEFT_MENU_WIDTH - BORDER_RIGHT}px;
    background: ${darkblue}F2;
    padding: 60px 10px 20px 10px;
    height: 100vh;
    z-index: 9999;
    overflow-x: hidden;
    overflow-y: hidden;
    box-shadow: 0 0 5px ${white};
    width: ${LEFT_MENU_WIDTH}px;
    transition: 0.5s;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    :hover {
      left: 0px;
    }
  }

  main {
    flex: 1;
  }
`;

export default Wrapper;
