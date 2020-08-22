import React from 'react';

type BarProps = {
	val: number|string,
	style: React.CSSProperties,
}
const Bar = (props: BarProps) => <div style={props.style}>{props.val}</div>;

export { Bar };