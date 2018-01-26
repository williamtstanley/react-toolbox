import React from 'react';
import PropTypes from 'prop-types';

const buildClassList = (arr) => (arr.join(' ').replace(/\s\s+/g, ' '))

const ToggleSwitch = ({ toggledOn, onClick, enabled, className }) => {
	const classes = buildClassList(['toggle-switch', className, (toggledOn ? 'on' : 'off'), (enabled ? '' : 'disabled')]);
	
	return (
		<div
			className={classes}
			onClick={() => onClick()}
		>
			<div className="switch-toggle"/>
		</div>
	)
}

ToggleSwitch.propTypes = {
  toggledOn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
  className: PropTypes.string
};

ToggleSwitch.defaultProps = {
  enabled: true,
  className: '',
};


export default ToggleSwitch;

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
