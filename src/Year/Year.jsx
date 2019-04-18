import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import styles from './styles.js';

class Year extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.value,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKey = this.handleKey.bind(this);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({value: this.props.value});
        }
    }

    handleChange(event) {
        this.props.onChange({
            value: event.currentTarget.value,
            name: this.props.name,
            data: this.props.data
        });
    }

    handleKey(event) {
        if (event.key == 'Backspace') {

        } else if (event.key == 'Delete') {

        } else if (event.key.length == 1) {
            console.log(event.keyCode + '=' + event.key + ' ' + event.target.selectionStart);
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
                type="text"
                value={this.state.inputValue}
                placeholder={this.props.placeholder}
                style={style.edit}
                onChange={this.handleChange}
                onKeyDown={this.handleKey} />
        );

        return (
            <div style={style.container}>
                {label}
                {content}
            </div>
        );

    }

}

Year.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default Year;
