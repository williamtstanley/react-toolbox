/*
 * This is a thought exercise and proof of concept.
 * I do not suggest you actually use this component as it it is not efficient at all to
 * recursively insert props into nested trees of inputs
*/

import Proptypes from 'prop-types';
import { form, Component, clone, Children } from '../../../utils/elements';
import { omit, merge, getStringType } from '../../../utils/helpers';

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
    const clonedChild = clone(child, { onChange: this.handleChange });
    
    if (typeof child.type === 'function' && getStringType(child) === 'Input') {
      return clonedChild;
    }
    if (getStringType(child) === 'input') {
      return clonedChild;
    }   
    // if (child.type === 'input') {
    // } else if (child.props && child.props.children) {
    //   return clone(child, {}, Children.map(child.props.children, this.cloneWithChange));
    // }

    // return child;
  }

  renderChildren() {
    return Children.map(this.props.children, this.cloneWithChange);
  }

  render() {
    const exclude = [ 'handleChange', 'handleSubmit' ]; //don't pass in illegal(non-form) props

    return form(omit(exclude, merge({ onSubmit: this.props.handleSubmit }, this.props)), this.renderChildren());
  }
}

