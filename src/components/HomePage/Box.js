import styled from 'styled-components';

const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  overflow: hidden;

  width: 100vw;
  height: 100vh;
`;

const slideNumbers = 6;
const animationDuration = 1;

const Item = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transition: 0.3s ease;
  cursor: pointer;
  height: 100%;
  background: url(${props => require(`images/${props.slide}.jpg`)});
  background-size: cover;

  animation: TT 1s;
  animation-delay: ${props =>
    (animationDuration / slideNumbers) * props.slide}s;
  animation-fill-mode: both;

  @keyframes TT {
    from {
      opacity: 0;
      box-shadow: 0 0 0px #fff;
    }

    to {
      opacity: 1;
      box-shadow: 0 0 8px #fff;
    }
  }

  a {
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: center;

    div {
      padding: 25px 15px;
      background: rgba(0, 0, 0, 0.3);
      text-transform: uppercase;

      p {
        text-transform: none;
        padding-top: 10px;
        display: none;
      }
    }
  }

  :hover {
    flex: 2;

    a {
      color: #2196f3;
      text-align: left;

      p {
        color: #fff;
        display: block;
      }
    }
  }
`;

export { Box, Item };
