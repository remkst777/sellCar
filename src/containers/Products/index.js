import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import Loader from 'components/Loader';

import { defaultTypeAction } from './actions';
import { select } from './selectors';

import ProductsBox from './ProductsBox';

class Products extends React.PureComponent {
  componentDidMount() {
    this.props.defaultTypeAction();
  }

  render() {
    const { loading } = this.props;

    return (
      <div>
        <Helmet>
          <title>Products</title>
          <meta name="description" content="Products | Description" />
        </Helmet>

        {!loading ? <ProductsBox /> : <Loader size="lg" />}
      </div>
    );
  }
}

Products.propTypes = {
  loading: PropTypes.bool,
  defaultTypeAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: select('loading'),
});

const mapDispatchToProps = dispatch => ({
  defaultTypeAction: bindActionCreators(defaultTypeAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
