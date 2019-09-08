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
        event.stopPropagation();
        let rect = event.currentTarget.getBoundingClientRect();
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data,
                rect: rect
            });
        }
    }

    render () {

        let icon = icons[this.props.name];

        let svgStyle = {
            ...styles.svg,
            ...this.props.style
        };

        let content = null;
        let w = "0 0 384 384";
        if (icon) {
            let pathStyle = {
                ...icon.s
            };
            if (svgStyle.color) {
                pathStyle.fill = svgStyle.color;
            }
            content = (<path style={pathStyle} d={icon.d}></path>);
            w = icon.w;
        }

        return (
            <svg style={svgStyle} viewBox={w}
                onClick={this.handleClick}>
                {content}
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
    onClick: PropTypes.func
}

export default TIcon;
