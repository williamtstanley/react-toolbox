import React, { Component } from 'react';

const e = React.createElement;
const clone = React.cloneElement;
const element = (type) => (props, ...children) => e(type, props, ...children);
const elements = ['div', 'h1', 'ul', 'ol', 'form', 'p', 'a']
  .reduce((acc, elem) => (Object.assign(acc, { [elem]: element(elem) })), {});

module.exports = Object.assign(
  {},
  {
    elements,
    e,
    clone,
    Component,
  }, elements
);
