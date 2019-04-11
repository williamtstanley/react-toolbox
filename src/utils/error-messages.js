export const isRequired = fieldName => `${fieldName} is required`;

export const mustMatch = otherFieldName => fieldName => `${fieldName} must match ${otherFieldName}`;

export const minLength = length => fieldName =>
  `${fieldName} must be at least ${length} characters`;

export const maxLength = length => fieldName =>
  `${fieldName} must be less than or equal to ${length} characters`;

export const validField = fieldName => `Oops! Looks like this ${fieldName} isn't valid`;

export const alphanumeric = fieldName => `${fieldName} must include both numbers and letters`;
