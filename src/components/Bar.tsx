import React from 'react';
import ReactDOM from 'react-dom';

type BarProps = {
	val: number|string,
	style: React.CSSProperties,
}
export const Bar = (props: BarProps) => <div style={props.style}>{props.val}</div>;