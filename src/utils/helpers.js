const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}` 
const merge = (...obj) => Object.assign({}, ...obj);

const filterObj = (retain) => (arr, obj) => (
  Object.keys(obj).reduce((acc, key) => {
    if (retain && arr.includes(key)) {
      acc[key] = obj[key];
    } else if (!retain && !arr.includes(key)) {
      acc[key] = obj[key];
    }

    return acc;
  }, {})
);

const omit = filterObj(false);

const pick = filterObj(true);

const getStringType = (node) => {
  const name = (typeof node.type === 'string') ? node.type :
  (node.type && node.type.displayName) ? node.type.displayName :
      (node.type && node.type.name) ? node.type.name : false;

  return name ? name.toLowerCase() : name;
};

const getLabel = ({ name, labelText }) => labelText || capitalize(name);

const getPlaceholder = (noPlaceHolder, { placeHolder, ...props }) => (
  merge(
    noPlaceHolder
      ? {}
      : { placeHolder: placeHolder || capitalize(props.name) },
    props
  )
);

module.exports = {
  merge,
  omit,
  pick,
  getStringType,
  getLabel,
  getPlaceholder,
};
