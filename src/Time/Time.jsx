import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import styles from './styles.js';

class Time extends React.Component {

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
        this.start = event.target.selectionStart;
        let v = new String(event.target.value);
        console.log(v[this.start] + ' ' + this.start + ' ' + v);
        if (v.length >= this.state.value.length) {
    //        v = v.substring(0, this.start - 1) + v.substring(this.start, 1) + v.substring(this.start);
        } else if (v.length <= this.state.value.length) {

        }
        // this.props.onChange({
        //     value: event.currentTarget.value,
        //     name: this.props.name,
        //     data: this.props.data
        // });
        this.setState({value: v});
    }

    handleKey(event) {
        this.key = event.keyCode;
        this.start = event.target.selectionStart;
        console.log(this.key + ' ' + this.start);
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

Time.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default Time;
