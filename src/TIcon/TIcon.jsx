import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.js';

import icons from './icons.js';

/**
 * Component representing icons.
 * @extends React
 */
class TIcon extends React.Component {

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

        let icon = icons[this.props.name];

        let style = {
            ...styles.svg,
            ...this.props.style
        }

        return (
            <svg style={style} viewBox={icon.w}
                onClick={this.handleClick}>
                <path style={icon.s} d={icon.d}></path>
            </svg>
        );

    }

}

/**
 * @name TIcon propTypes
 * @property {string} name provides icon name
 * @property {function} onClick provides on click event
 */
TIcon.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default TIcon;
