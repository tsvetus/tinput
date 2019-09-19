import React from 'react';
import PropTypes from 'prop-types';

import {
    mergeStyles,
    TIMEOUT
} from '../util';

import styles from './styles.js';

class TText extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: this.props.value ? this.props.value : ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({value: this.props.value ? this.props.value : ''});
        }
    }

    handleChange(event) {
        let v = event.currentTarget.value;
        this.setState({value: v});
        clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                this.props.onChange({
                    value: v,
                    name: this.props.name,
                    data: this.props.data
                });
            },
            TIMEOUT
        );
    }

    handleKeyDown(event) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }

    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event);
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
                type={this.props.password ? "password" : "text"}
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={style.edit}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange} />
        );

        return (
            <div style={style.container} onClick={this.handleClick}>
                {label}
                {content}
            </div>
        );

    }

}

TText.propTypes = {
    style: PropTypes.object,
    value: PropTypes.any,
    password: PropTypes.any,
    data: PropTypes.any,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    label: PropTypes.string
};

export default TText;
