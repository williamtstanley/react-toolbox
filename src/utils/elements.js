import React, { Component, Children } from 'react';
import { merge } from './helpers';

const e = React.createElement;
const clone = React.cloneElement;
const element = (type) => (props, ...children) => e(type, props, ...children);
const elements = [
  'div', 'ul', 'ol', 'li', 'select', 'form', 'p', 'a', 'input', 'button',
  'span', 'h1', 'h2', 'h3', 'label', 'li', 'select', 'option', 'table',
  'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'strong', 'em', 'i',
].reduce((acc, elem) => (merge(acc, { [elem]: element(elem) })), {});

module.exports = merge({
  elements,
  e,
  clone,
  Component,
  Children,
}, elements);
