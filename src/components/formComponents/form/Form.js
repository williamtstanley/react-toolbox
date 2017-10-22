/*
 * This is a thought exercise and proof of concept.
 * I do not suggest you actually use this component as it it is not efficient at all to
 * recursively insert props into nested trees of inputs
*/

import Proptypes from 'prop-types';
import { form, Component, clone, Children } from '../../../utils/elements';
import { omit, merge } from '../../../utils/helpers';

export default class Form extends Component {
  static Proptypes = {
    handleSubmit: Proptypes.func,
    handleChange: Proptypes.func,
  }
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.cloneWithChange = this.cloneWithChange.bind(this);
  }

  handleChange({ target: { name, type, checked, value } }) {
    this.props.handleChange({
      [name]: type === 'checkbox' ?
        checked : value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
  }
  //also for that matter there is no reason not to just forward the handleChange 
  //directly rather then stub it.
  cloneWithChange(child) {
    if (child.type === 'input') {
      return clone(child, { onChange: this.handleChange });
    } else if (child.props && child.props.children) {
      return clone(child, {}, Children.map(child.props.children, this.cloneWithChange));
    }

    return child;
  }

  renderChildren() {
    return Children.map(this.props.children, this.cloneWithChange);
  }

  render() {
    const exclude = [ 'handleChange', 'handleSubmit' ];

    return form(omit(exclude, merge({ onSubmit: this.props.handleSubmit }, this.props)), this.renderChildren());
  }
}

