import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Image from 'components/Image';
import Button from 'components/FormFields/Button';

const SliderStyled = styled.div`
  max-width: ${props => props.size || '100%'};
`;

const Slider = ({ fotos, size }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const switchImage = e => {
    const role = +e.target.dataset.role;

    if (currentImageIndex === 0 && role === -1) {
      setCurrentImageIndex(fotos.length - 1);
    } else if (currentImageIndex === fotos.length - 1 && +role === 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + role);
    }
  };

  return (
    <SliderStyled size={size}>
      <div className="d-flex justify-content-between align-items-center">
        <div>FOTOS: {`${currentImageIndex + 1}/${fotos.length}`}</div>
        <div className="d-flex">
          <Button
            disabled={fotos.length === 1}
            className="pl-2"
            size="sm"
            onClick={switchImage}
            dataset={{ 'data-role': '-1' }}
            name="Back"
          />
          <Button
            disabled={fotos.length === 1}
            className="pl-2"
            size="sm"
            onClick={switchImage}
            dataset={{ 'data-role': '1' }}
            name="Next"
          />
        </div>
      </div>
      <Image src={fotos[currentImageIndex]} size={size} />
    </SliderStyled>
  );
};

Slider.propTypes = {
  fotos: PropTypes.array,
  size: PropTypes.string,
};

export default React.memo(Slider);
