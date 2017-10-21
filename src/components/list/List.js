import { e } from '../../utils/elements';
import { merge } from '../../utils/helpers';
import Style from './list.less';

const List = ({ listType, list, renderListItem, style, ...props }) => {
  const styles = merge({
    listStyle: 'none',
  }, props.style);

  return e(listType, merge(props, { style: styles }), list.map(renderListItem));
};

export default List;
