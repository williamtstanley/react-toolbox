import React from 'react';
import { input, label } from '../../../utils/elements';
import { merge } from '../../../utils/helpers';

const TextInput = ({ labelText, labelStyle, ...props }) => (
  label(
    { style: labelStyle }, // props
    labelText, // child
    input(merge(props, { type: 'text' })),
  )
); // works as expected assuming you only pass in legal attributes

export default TextInput;
