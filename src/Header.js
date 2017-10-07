import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Page header
 * @param {object} props
 */
const Header = ({ title }) => (
  <div className="list-books-title">
    <h1>{title}</h1>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
