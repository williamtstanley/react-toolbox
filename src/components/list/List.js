import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from './list.css';

export default class List extends Component {
  static PropTypes = {
    renderListItem: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    listType: PropTypes.oneOf(['ol', 'ul']).isRequired,
  }
  // TODO figure out an elegant way to shim a key into each element irregardless of the render function;
  render() {
    const { listType, list, renderListItem, ...props } = this.props;
    
    return React.createElement(listType, props, list.map(renderListItem));
  }
}
