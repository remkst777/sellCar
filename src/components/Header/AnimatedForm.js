import styled from 'styled-components';

const AnimatedForm = styled.div`
  transition: 0.75s;
  height: ${props => (props.animate ? '80px' : '0px')};
  overflow: ${props => (props.animate ? 'visible' : 'hidden')};
`;

export default AnimatedForm;
