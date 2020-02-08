import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain, clone} from '../../util';

import {Icon} from '../../lib';
import TButton from '../TButton';

import styles from '../../styles';

/**
 * Clickable button with text caption and icon
 */
class TGroupButton extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            pressed: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleUp = this.handleUp.bind(this);
    }

    handleClick(event) {
        if (this.props.onClick) {
            let item = this.props.items[event.data.index];
            this.props.onClick({
                name: this.props.name,
                data: this.props.data,
                item: item
            });
        }
    }

    handleDown() {
        this.setState({pressed: true});
    }

    handleUp() {
        this.setState({pressed: false});
    }

    render () {

        let style = merge(
            contain(styles.TGroupButton),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let items = null;
        if (this.props.items) {
            items = this.props.items.map((v, i) => {
                let s = merge(style.button, v.style);
                if (i === 0) {
                    s = merge(s, style.left);
                } else if (i === this.props.items.length - 1) {
                    s = merge(s, style.right, {borderLeft: 'none'});
                } else {
                    s = merge(s, style.middle, {borderLeft: 'none'});
                }
                let icon = v.icon ?
                    <Icon style={style.icon} name={v.icon}
                                          data={{index: i}} onClick={this.handleClick} /> : null;
                let caption = v.caption ? <div style={style.caption}>{v.caption}</div> : null;
                let placeholder = !caption && v.placeholder ?
                    <div style={merge(style.caption, style.placeholder)}>{v.placeholder}</div> : null;
                return (
                    <TButton
                        data={{index: i}}
                        key={i}
                        style={s}
                        next={i > 0}
                        onClick={this.handleClick}>
                            {caption}
                            {placeholder}
                            {icon}
                    </TButton>
                );
            });
        }

        return (
            <div
                style={style.container}>
                {items}
                {this.props.children}
            </div>
        );

    }

}

TGroupButton.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for buttons */
        button: PropTypes.object,
        /** Style for icon */
        icon: PropTypes.object,
        /** Style for waiting button state */
        wait: PropTypes.object,
        /** Style for pressed button state */
        down: PropTypes.object
    }),
    /** Component name */
    name: PropTypes.any,
    /** Component data */
    data: PropTypes.any,
    /**
     * Component wait state. When "true" component appears in grey color and doesn't respond
     * on "onClick" event
     */
    items: PropTypes.array,
    /**
     * On click event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     */
    onClick: PropTypes.func
};

TGroupButton.defaultProps = {
};

export default TGroupButton;
