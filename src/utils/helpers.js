const merge = (...obj) => Object.assign({}, ...obj);
const omit = (arr, obj) => (
  Object.keys(obj).reduce((acc, key) => {
    if (!arr.includes(key)) acc[key] = obj[key];

    return acc;
  }, {})
);

const getStringType = (node) => {
  let name = (typeof node.type === 'string') ? node.type :
  (node.type && node.type.displayName) ? node.type.displayName :
    (node.type && node.type.name) ? node.type.name : false;

  return name ? name.toLowerCase() : name;
};

module.exports = {
  merge,
  omit,
  getStringType,
};
