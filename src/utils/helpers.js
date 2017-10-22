const merge = (...obj) => Object.assign({}, ...obj);
const omit = (arr, obj) => (
  Object.keys(obj).reduce((acc, key) => {
    if (!arr.includes(key)) acc[key] = obj[key];

    return acc;
  }, {})
);

const getStringType = (node) => {
  if (typeof node.type === 'string') return node.type;
  if (node.type && node.type.displayName) return node.type.displayName;
  if (node.type && node.type.name) return node.type.name;

  return false;
};

module.exports = {
  merge,
  omit,
  getStringType,
};
