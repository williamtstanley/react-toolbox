import React from 'react';

// const sample = ({ stroke, fill, ...props }) => (

// )

const IconAdd = ({ stroke, fill, ...props }) => (
  <g stroke={stroke || '#000'} fill={fill || 'none'} {...props}>
		<line x1="5.5" y1="12" x2="18.5" y2="12" />
		<line x1="12" y1="18.5" x2="12" y2="5.5" />
	</g>
);

const IconAddO = ({ stroke, fill, ...props }) => (
  <g stroke={stroke || '#000' } fill={fill || 'none'} {...props}>
		<circle cx="12" cy="12" r="11.5" />
		<line x1="5.5" y1="12" x2="18.5" y2="12" />
		<line x1="12" y1="18.5" x2="12" y2="5.5" />
	</g>
);

const IconAlert = ({ stroke, fill, ...props }) => (
  <g stroke={stroke || '#000'} fill={fill || 'none'} {...props}>
		<path fill="none" strokeMiterlimit="10" d="M4.028,22.497c-3.135,0-4.418-2.222-2.85-4.937L9.158,3.737 c1.568-2.715,4.133-2.715,5.7,0L22.84,17.56c1.568,2.715,0.285,4.937-2.85,4.937H4.028z" />
		<path d="M10.475,18.246c0-0.863,0.707-1.591,1.571-1.591s1.591,0.728,1.591,1.591c0,0.845-0.727,1.571-1.591,1.571 S10.475,19.09,10.475,18.246z M10.946,15.359l-0.413-8.837h3.005l-0.393,8.837H10.946z" />
	</g>
);

// TODO: consider an option for loading only the specific icon rather then dynamically including the component
export default {
  IconAdd,
  IconAddO,
  IconAlert,
};
