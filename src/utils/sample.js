// example usage for validation. Can also run a by field validation
// runValidator takes object with fields that changed ie: {name: ''} and and array of rules

import { required, maxLength } from './validation-rules';
import { validationChecker, runValidator } from './validation-checker';

const formValidations = {
  headline: {
    label: 'Headline',
    rules: [required, maxLength(32)],
  },
  bodytext: {
    label: 'Description',
    rules: [required, maxLength(3000)],
  },
};

const rules = Object.entries(formValidations).map(([field, details]) =>
  validationChecker(field, details.label, ...details.rules)
);

// ...

const errors = runValidator(update, rules);

