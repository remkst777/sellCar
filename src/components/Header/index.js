import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from 'routes-config';

import Loader from '../Loader';
import SearchBasicForm from '../SearchBasicForm';

import HeaderStyled from './HeaderStyled';
import AnimatedForm from './AnimatedForm';

import { SEARCH_FIELD_NAME_FORM } from './constants';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormShowed: false,
      homepageRoute: routes.homepage(),
      aboutRoute: routes.about(),
    };
  }

  showForm = () => {
    this.setState({ isFormShowed: !this.state.isFormShowed });
  };

  submitSearch = (...args) => {
    return JSON.stringify(args[0]);
  };

  render() {
    return (
      <HeaderStyled>
        <div className="container-fluid">
          <AnimatedForm className="row" animate={this.state.isFormShowed}>
            <div className="col-12">
              <SearchBasicForm
                searchFieldName={SEARCH_FIELD_NAME_FORM}
                submitSearch={this.submitSearch}
                size="lg"
              />
            </div>
          </AnimatedForm>

          <div className="row">
            <div className="col-6 d-flex align-items-center">
              <Loader size="sm" />

              <Link className="col-6" to={this.state.homepageRoute}>
                MOLECULAR ATOMIĆ
              </Link>
            </div>
            <div className="col-6 align-items-center justify-content-end d-flex">
              <ul className="d-flex">
                <li onClick={this.showForm}>Search</li>
                <li>
                  <Link to={this.state.aboutRoute}>About Us</Link>
                </li>
                <li>
                  <Link to={this.state.aboutRoute}>Products</Link>
                </li>
                <li>
                  <Link to={this.state.aboutRoute}>Login</Link>
                </li>
                <li>
                  <Link to={this.state.aboutRoute}>Sign Up</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </HeaderStyled>
    );
  }
}

export default Header;
