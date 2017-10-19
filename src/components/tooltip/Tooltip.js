import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from './tooltip.css';

export default class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderTip: false,
    };

    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.buildClassName = this.buildClassName.bind(this);
  }

  static PropTypes = {
    tip: PropTypes.element.isRequired,
    className: PropTypes.string,
  }

  handleMouseEnter() {
    this.setState({
      renderTip: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      renderTip: false,
    });
  }

  buildClassName(defaultClass) {
    return `${defaultClass} ${this.props.className || ''}`;
  }

  render() {
    if (!this.props.tip) {
      return null;
    }
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={this.buildClassName('tool-tip-parent')}
      >
        {this.state.renderTip ? <div className='tool-tip-container'>{this.props.tip}</div> : null}
        {this.props.children}
      </div>
      );
  }
}


        // {this.state.renderTip ? React.cloneElement(this.props.tip) : <div></div>}
