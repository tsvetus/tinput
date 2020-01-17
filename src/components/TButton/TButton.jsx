import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import styles from '../../styles';

/**
 * Clickable button with text caption
 */
class TButton extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data
            });
        }
    }

    render () {

        let style = merge(
            contain(styles.TButton),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let cst = style.container;
        if (this.props.wait) {
            cst = merge(cst, style.wait);
        }

        return (
            <div
                style={cst}
                name={this.props.name}
                onClick={this.handleClick}>
                    {this.props.children}
            </div>
        );

    }

}

TButton.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object
    }),
    /** Component name */
    name: PropTypes.string,
    /** Component data */
    data: PropTypes.any,
    /** Component wait state. When "true" component appears in grey color and doesn't respond
     * on "onClick" event
     */
    wait: PropTypes.any,
    /**
     * On click event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     */
    onClick: PropTypes.func
};

export default TButton;
