import { svg, e } from '../../utils/elements';
import combinedSvg from './combinedSvg';

const Svg = ({ name, title, handleClick: onClick, className, ...props }) => (
  svg({ onClick, className, title}, e(combinedSvg[name], props))
);

export default Svg;
