import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.js';

class TButton extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onClick({
            name: this.props.name,
            data: this.props.data
        });
    }

    render () {

        let style = {
            ...styles,
            ...this.props.style
        }

        if (this.props.wait) {
            style = {
                ...style,
                color: "#dddddd"
            }
        }

        return (
            <div
            style={style}
            name={this.props.name}
            onClick={this.handleClick}>
                {this.props.children}
            </div>
        );

    }

}

TButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string
}

export default TButton;
