import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import TIcon from '../TIcon';

import styles from './styles.js';

class TCheck extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value,
            checked: this.checked(props.value)
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({
                checked: this.checked(this.props.value)
            });
        }
    }

    checked(value) {
        return value === true || value > 0 || value !== '0';
    }

    handleClick(event) {
        let checked = ! this.state.checked;
        let v = checked;
        if (this.props.valueInt) {
            v = v ? 1 : 0
        }
        this.props.onChange({
            value: v,
            name: this.props.name,
            data: this.props.data
        });
        this.setState({checked: checked});
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let name = this.state.checked ? "checked" : "unchecked";

        let content = (
            <TIcon
                style={{width: "16px"}}
                name={name}
                onClick={this.handleClick} />
        );

        return (
            <div style={style.container} onClick={this.handleClick}>
                {label}
                {content}
            </div>
        );

    }

}

TCheck.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TCheck;
