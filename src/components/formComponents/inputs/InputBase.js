import { input, label } from '../../../utils/elements';
import { getLabel, getPlaceholder } from '../../../utils/helpers';

const InputBase = ({ noLabel, labelText, noPlaceHolder, labelStyle, ...props }) => {
  const Input = input(getPlaceholder(noPlaceHolder, props));

  return noLabel ? Input : label(
    { style: labelStyle }, // props
    getLabel(labelText, props), // child
    Input
  );
};

export default InputBase;
