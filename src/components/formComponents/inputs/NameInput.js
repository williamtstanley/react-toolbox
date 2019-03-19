import TextInput from './TextInput';
import { e } from '../../../utils/elements';
import { merge } from '../../../utils/helpers';

const NameInput = (props) => (
  e(TextInput, merge({ name: 'name', labelText: 'Name:' }, props))
);

export default NameInput;
