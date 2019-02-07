import styled from 'styled-components';

const ImageStyled = styled.div`
  width: ${props => props.size || '100%'};
  height: ${props => props.size || '100%'};
  background: #ffffff0a;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 2px #ffffffdd;
  margin-top: 5px;
  margin-right: 5px;
  border-radius: 5px;
  align-items: center;

  img[data-info='image'] {
    width: 100%;
    height: 100%;
  }
`;

export default ImageStyled;
