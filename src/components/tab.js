import React, { createContext } from 'react';
import Proptypes from 'prop-types';
import { css } from 'emotion';

const Context = createContext({});

export class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      setIndex: activeIndex => this.setState({ activeIndex }),
    };
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        <div css={styleSheet} className="fp-ui-tabs">
          {this.props.children}
        </div>
      </Context.Provider>
    );
  }
}

Tabs.propTypes = {
  children: Proptypes.node.isRequired,
};

export const Tab = ({ children, isActive, ...props }) => (
  <li
    {...props}
    tabIndex={0}
    role="button"
    className={`fp-ui-tabs__tab${isActive ? ' fp-ui-tabs__tab--active' : ''}`}
  >
    {children}
  </li>
);
Tab.propTypes = {
  children: Proptypes.node,
  isActive: Proptypes.bool,
};

export class TabList extends React.Component {
  static contextType = Context;
  render() {
    const { children } = this.props;
    const { setIndex, activeIndex } = this.context;
    const childrenWithProps = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        onClick: () => setIndex(index),
        onKeyUp: e => (e.keyCode === 13 ? setIndex(index) : null),
      });
    });

    return (
      <ul
        role="tablist"
        css={css`
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
        `}
        className="fp-ui-tabs__tab-list"
      >
        {childrenWithProps}
      </ul>
    );
  }
}
TabList.propTypes = {
  children: Proptypes.node,
};

export class TabPanels extends React.Component {
  static contextType = Context;
  render() {
    const { children } = this.props;
    const { activeIndex } = this.context;

    return (
      <div className="fp-ui-tabs__tab-panels">{children[activeIndex]}</div>
    );
  }
}
TabPanels.propTypes = {
  children: Proptypes.node,
};

export const TabPanel = props => (
  <div role="tab-panel" className="fp-ui-tabs__tab-panel">
    {props.children}
  </div>
);
TabPanel.propTypes = {
  children: Proptypes.node,
};

const styleSheet = css`
  // Put your styles here...
`;
