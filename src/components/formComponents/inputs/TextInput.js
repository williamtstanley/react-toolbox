import { input, label } from '../../../utils/elements';
import { merge } from '../../../utils/helpers';

const TextInput = ({ labelText, labelStyle, ...props }) => (
  label(
    { style: labelStyle }, // props
    labelText, // child
    input(merge({ type: 'text' }, props)) // merging props in this manner sets defaults but allows for overrides
  )
);

export default TextInput;
