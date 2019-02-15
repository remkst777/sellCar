import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Image from 'components/Image';
import Button from 'components/FormFields/Button';

const SliderStyled = styled.div`
  max-width: ${props => props.size || '100%'};
`;

// TODO: use hooks
class Slider extends React.PureComponent {
  state = {
    currentImageIndex: 0,
  };

  switchImage = e => {
    const role = +e.target.dataset.role;
    const fotosLength = this.props.fotos.length;
    const { currentImageIndex } = this.state;

    if (currentImageIndex === 0 && role === -1) {
      this.setState({ currentImageIndex: fotosLength - 1 });
    } else if (currentImageIndex === fotosLength - 1 && +role === 1) {
      this.setState({ currentImageIndex: 0 });
    } else {
      this.setState({
        currentImageIndex: currentImageIndex + role,
      });
    }
  };

  render() {
    const { fotos, size } = this.props;
    const { currentImageIndex } = this.state;

    return (
      <SliderStyled size={size}>
        <div className="d-flex justify-content-between align-items-center">
          <div>FOTOS: {`${currentImageIndex + 1}/${fotos.length}`}</div>
          <div className="d-flex">
            <Button
              disabled={fotos.length === 1}
              className="pl-2"
              size="sm"
              onClick={this.switchImage}
              dataset={{ 'data-role': '-1' }}
              name="Back"
            />
            <Button
              disabled={fotos.length === 1}
              className="pl-2"
              size="sm"
              onClick={this.switchImage}
              dataset={{ 'data-role': '1' }}
              name="Next"
            />
          </div>
        </div>
        <Image src={fotos[currentImageIndex]} size={size} />
      </SliderStyled>
    );
  }
}

Slider.propTypes = {
  fotos: PropTypes.array,
  size: PropTypes.string,
};

export default Slider;
