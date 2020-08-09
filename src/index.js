import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Car extends React.Component {
	render() {
		return (
			<h1>Hello!</h1>
		);
	}
}

ReactDOM.render(<Car />, document.getElementById("root"));