import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import * as routes from 'routes-config';
import { confirmEmail } from 'utils/accountManagement';

import { Box, Item } from './Box';

const routeAuto = routes.products('auto');
const routeParts = routes.products('parts');
const routeTires = routes.products('tires');
const routeOil = routes.products('oil');
const routeAcces = routes.products('accessories');
const routeOther = routes.products('');

class HomePage extends React.PureComponent {
  componentDidMount() {
    const { token } = this.props.match.params;

    if (token) {
      confirmEmail(this.props.match.url);
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Home Page | Description" />
        </Helmet>

        <Box>
          <Item slide={0}>
            <Link to={routeAuto}>
              <div>
                <h5>Auto</h5>
                <p>
                  Great assortment of cars from Europe and America. New Brands
                  from China.
                </p>
              </div>
            </Link>
          </Item>
          <Item slide={1}>
            <Link to={routeParts}>
              <div>
                <h5>Parts</h5>
                <p>
                  All necessary spare parts for foreign cars are presented in
                  our catalog. With the help of our catalog you will quickly
                  find what you are looking for.
                </p>
              </div>
            </Link>
          </Item>
          <Item slide={2}>
            <Link to={routeTires}>
              <div>
                <h5>Tires</h5>
                <p>
                  We sell car tires in the capital and other regions of the
                  country at the most affordable prices.
                </p>
              </div>
            </Link>
          </Item>
          <Item slide={3}>
            <Link to={routeOil}>
              <div>
                <h5>Oil</h5>
                <p>
                  High-quality engine oil - a guarantee of long and trouble-free
                  operation of the engine. It consists of refined petroleum
                  products and certain additives.
                </p>
              </div>
            </Link>
          </Item>
          <Item slide={4}>
            <Link to={routeAcces}>
              <div>
                <h5>Accessories</h5>
                <p>
                  Huge selection of car accessories and parts. Free shipping
                  from China! Everything for your car. Convenient and easy
                  search on the site. Fast shipping!
                </p>
              </div>
            </Link>
          </Item>
          <Item slide={5}>
            <Link to={routeOther}>
              <div>
                <h5>Other</h5>
                <p>Click to know more about our products.</p>
              </div>
            </Link>
          </Item>
        </Box>
      </div>
    );
  }
}

HomePage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default HomePage;
