import { input } from '../../../utils/elements';

const Input = (props) => (
  input(props) // works flawlessly as long as you assume you are not sending illegal props;
);

export default Input;

// const Input = (props) => (
//  <input
//    name={props.name}
//    type={props.type}
//    value={props.value}
//  />
// )
