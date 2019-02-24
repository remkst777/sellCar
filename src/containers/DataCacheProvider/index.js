import React from 'react';
import PropTypes from 'prop-types';

const DataCacheProvider = ({ children }) => React.Children.only(children);

DataCacheProvider.propTypes = {
  children: PropTypes.element,
};

export default DataCacheProvider;
