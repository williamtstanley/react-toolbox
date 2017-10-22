import Proptypes from 'prop-types';
import React from 'react';
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
    this.recursiveCloneWithChange = this.recursiveCloneWithChange.bind(this);
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

  recursiveCloneWithChange(children, newProps) {
    return React.Children.map(children, (child) => {
      var childProps = {};
      if (React.isValidElement(child)) {
        const type = getStringType(child)
        if ((typeof child.type === 'function' && type === 'Input') || type === 'input') {
          childProps = newProps;
        }
      }
      if (child.props) {
        // String has no Prop
        childProps.children = this.recursiveCloneWithChange(child.props.children, newProps);
        return clone(child, childProps);
      }

      return child;
    })
  }

  renderChildren() {
    return this.recursiveCloneWithChange(this.props.children, { onChange: this.handleChange });
  }

  render() {
    const exclude = [ 'handleChange', 'handleSubmit' ]; //don't pass in illegal(non-form) props

    return form(omit(exclude, merge({ onSubmit: this.props.handleSubmit }, this.props)), this.renderChildren());
  }
}

