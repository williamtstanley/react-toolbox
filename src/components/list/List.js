import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from './list.less';

export default class List extends Component {
  static PropTypes = {
    renderListItem: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    listType: PropTypes.oneOf(['ol', 'ul', 'div']).isRequired,
  }
  
  render() {
    const { listType, list, renderListItem, ...props } = this.props;
    
    return React.createElement(listType, props, list.map(renderListItem));
  }
}
