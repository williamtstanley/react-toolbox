export const validationChecker = (field, name, ...validations) => state => {
  const errorMessages = validations.reduce((acc, validationFunction) => {
    const errorMessageFunc = validationFunction(state[field], state);

    if (errorMessageFunc) {
      return { [field]: `${acc[field] ? `${acc[field]}, ` : ''}${errorMessageFunc(name)}` };
    }

    return acc;
  }, {});

  return Object.keys(errorMessages).length ? errorMessages : null;
};

export const runValidator = (state, rules) =>
  rules.reduce((acc, rule) => Object.assign(acc, rule(state)), {});
