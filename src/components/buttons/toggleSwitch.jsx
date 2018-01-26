import React, { Component } from 'react';
import { connect } from 'react-redux';
import uiActions from '../../actions/uiActions';

const ToggleSwitch = ({ toggledOn, onToggle }) => {
	const classes = ['toggle-switch', (toggledOn ? 'on' : 'off')].join(' ');
	
	return (
		<div
			className={classes}
			onClick={() => onToggle()}
		>
			<div className="switch-toggle"/>
		</div>
	)
}

@connect(
	(state, ownProps) => ({
		toggledOn: state[ownProps.value],
	}),
	(dispatch, ownProps) => ({
		onToggle: () => dispatch(uiActions.toggleValue(ownProps.value))
	})
)
export default class Toggle extends Component {
	render() {
		const { toggledOn, onToggle } = this.props;

		return (
			<ToggleSwitch 
				toggledOn={toggledOn}
				onToggle={onToggle}
			/>
		)
	}
}

// STYLES
// .toggle-switch {
//     border: 1px solid #ccc;
//     width: 50px;
//     height: 26px;
//     border-radius: 13px;
//     cursor: pointer;
//     display: inline-block;
	
// 	.switch-toggle {
//     	border: 1px solid #999;
//     	box-shadow: 1px 1px 1px #ccc;
//     	width: 25px;
//     	height: 24px;
//     	left: 0;
//     	border-radius: 12px;
//     	background: white;
//     	position: relative;
//     	transition: left .2s ease-in-out;
// 	}
	
// 	&.on {
//     	background: #7ac243;
		
// 		.switch-toggle {
//     		left: 23px;
// 		}
// 	}
// }
