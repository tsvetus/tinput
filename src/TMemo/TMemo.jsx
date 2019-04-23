import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles, TIMEOUT} from '../util';

import styles from './styles.js';
import './styles.css';

class TMemo extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.value,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({value: this.props.value});
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

    render () {

        let style = mergeStyles(styles, this.props.style);

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let content = (
            <textarea
                style={style.edit}
                value={this.state.value}
                onChange={this.handleChange}>
            </textarea>
        );

        return (
            <div style={style.container}>
                {label}
                <div style={style.box}>
                    {content}
                </div>
            </div>
        );

    }

}

TMemo.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TMemo;
