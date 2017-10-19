# react-toolbox

This is a living project and subject to change. Every effort will be used to keep this documentation up to date.
However you should always read the component specific documents when available as they are most likely to be accurate.

This is a react component library containing some commonly used components in our applications.

## Installation

~~to install this Component, run `yarn add tool-box` or `npm install tool-box`.~~

If installing the repo locally rather than via npm. run `npm install` or `yarn install` inside the cloned repo.
The run `npm link` and inside the project you want to be able to import this in run `npm link tool-box`.


## Usage

## Tooltip
To use the component, In your react Application just do

```javascript
import React from 'react';
import { Tooltip } from 'tool-box';

// import all the styles
import "tool-box/lib/styles.css";

const MyComponent = (props) => {
    return (
      <Tooltip tip={<span>This is a basic toolTip</span>}>
        <p>
          Hello World.
        </p>
      </Tooltip>
    )
}

export default MyComponent;


```

## List
To use the component, In your react Application just do

```javascript
import React from 'react';
import { List } from 'tool-box';

// import all the styles
import "tool-box/lib/styles.css";

const MyComponent = (props) => {
    return (
      <List 
        listType='ul'
        list={['one', 'two', 'thee']}
        renderListItem={(element, index) => <li key={`${index}${element}`}>{element}</li>}
      />
    )
}

export default MyComponent;


```

If your webpack configuration doesn't support importing of `css stylesheets`, Either Google on how to support it or Copy the contents of these stylesheets manually into your css file.
