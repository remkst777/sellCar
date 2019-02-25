import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loader from 'components/Loader';
import ImageStyled from './ImageStyled';

const LoaderStyled = styled.span`
  transform: scale(0.6);
`;

class Image extends React.PureComponent {
  state = {
    src: null,
  };

  componentWillMount() {
    this.fetch();
  }

  async componentWillReceiveProps(prevProps) {
    if (prevProps.src !== this.props.src) {
      await this.setState({ src: null });
      await this.fetch();
    }
  }

  fetch = async () => {
    const fetcher = await fetch(`/images/${this.props.src}`);
    const src = await fetcher.text();

    this.setState({ src });
  };

  render() {
    return (
      <ImageStyled size={this.props.size}>
        {this.state.src ? (
          <img src={this.state.src} data-info="image" alt={this.props.src} />
        ) : (
          <LoaderStyled>
            <Loader size="sm" />
          </LoaderStyled>
        )}
      </ImageStyled>
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default Image;
