import * as ErrorMessages from './error-messages';

// helper functions
const patternMatcher = (pattern, subject) => {
  if (subject !== undefined && subject !== null) {
    return pattern.test(subject);
  }

  return false;
};

export const required = text => (text ? null : ErrorMessages.isRequired);

export const mustMatch = (field, fieldName) => (text, state) =>
  state[field] === text ? null : ErrorMessages.mustMatch(fieldName);

export const minLength = length => text => {
  if (!text) return null;

  return text.toString().length >= length ? null : ErrorMessages.minLength(length);
};

export const maxLength = length => text => {
  if (!text) return null;

  return text.toString().length <= length ? null : ErrorMessages.maxLength(length);
};

export const validEmail = text => {
  const pattern = /^(\S+)@(\S+)\.(\S+)$/;

  return patternMatcher(pattern, text) ? null : ErrorMessages.validEmail;
};

export const alphanumeric = text => {
  const pattDigits = /\d+/;
  const pattAlpha = /[a-zA-Z]+/;

  return patternMatcher(pattDigits, text) && patternMatcher(pattAlpha, text)
    ? null
    : ErrorMessages.alphanumeric;
};
