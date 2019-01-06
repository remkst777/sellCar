import styled from 'styled-components';

const properties = {
  lg: {
    height: '48px',
    width: '48px',
  },
  sm: {
    height: '32px',
    width: '32px',
  },
};

const LoaderStyled = styled.div`
  display: flex;
  justify-content: center;

  img {
    height: ${props => properties[props.size].height};
    width: ${props => properties[props.size].width};
  }
`;

export default LoaderStyled;
