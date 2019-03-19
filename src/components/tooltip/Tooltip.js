import { Component, div, clone } from '../../utils/elements';
import PropTypes from 'prop-types';
import Style from './tooltip.scss';

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

  buildClassName(defaultClass, props = this.props) {
    return `${props.className ? props.className + ' ' : ''}${defaultClass}`;
  }

  renderElement() {
    return clone(
      this.props.tip, 
      { 
        className: this.buildClassName('tooltip__content', this.props.tip.props),
        style: this.props.tipStyle,
      }
    );
  }

  render() {
    if (!this.props.tip) {
      return null;
    }
    return div({
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        className: this.buildClassName('tooltip')
      },
      this.state.renderTip && div(
        {className: 'tooltip__popup'},
        this.renderElement()
      ),
      this.props.children,
    );
  }
}

