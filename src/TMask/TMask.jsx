import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import {parseValue, parseMask, correctValue, completed, empty} from '../util/mask.js';

import TIcon from '../TIcon';

import styles from './styles.js';

/**
 * Represents mask editor
 */
class TMask extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.mask = parseMask(props.mask);
        this.value = parseValue(props.value, props.mask);
        this.state = {
            mask: this.mask,
            value: this.value
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.ref = React.createRef();
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value || old.mask !== this.props.mask) {
            this.mask = parseMask(this.props.mask);
            this.value = parseValue(this.props.value, this.props.mask);
            this.setState({
                mask: this.mask,
                value: this.value
            });
        }
    }

    handleInput(event) {

        let cv = correctValue(
            this.state.value,
            event.target.value,
            this.ref.current.selectionStart,
            this.mask
        );

        if (cv) {

            if (completed(cv.value, this.mask) && cv.value !== this.state.value) {
                this.props.onChange({
                    value: cv.value,
                    name: this.props.name,
                    data: this.props.data
                });
            } else if (this.props.valueNull && empty(cv.value, this.mask) && cv.value !== this.state.value) {
                this.props.onChange({
                    value: null,
                    name: this.props.name,
                    data: this.props.data
                });
            }

            this.setState({
                value: cv.value
            }, () => {
                this.ref.current.selectionStart = cv.caret;
                this.ref.current.selectionEnd = cv.caret;
            });

        }

    }

    handleChange() {

    }

    handleIconClick() {
        if (this.props.onIconClick) {
            this.props.onIconClick();
        }
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let content = (
            <input
                ref={this.ref}
                type="text"
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={style.edit}
                onInput={this.handleInput}
                onChange={this.handleChange} />
        );

        let icon = null;
        if (this.props.icon && this.props) {
            icon = (<TIcon style={style.icon} name={this.props.icon} onClick={this.handleIconClick} />);
        }

        return (
            <div style={style.container}>
                {label}
                {content}
                {icon}
            </div>
        );

    }

}

TMask.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
    data: PropTypes.any,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    valueNull: PropTypes.any,
    mask: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    icon: PropTypes.string,
    onIconClick: PropTypes.func
};

export default TMask;
