const merge = (...obj) => Object.assign({}, ...obj);
const omit = (arr, obj) => (
	Object.keys(obj).reduce((acc, key) => {
	  if (!arr.includes(key)) acc[key] = obj[key];

		return acc;
	}, {})
);

module.exports = {
  merge,
  omit
};
