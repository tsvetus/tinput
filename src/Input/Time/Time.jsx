import React from 'react';
import PropTypes from 'prop-types';

import Cleave from 'cleave.js/React';

import {Util} from 'util';

import styles from './styles.js';

class Time extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: this.props.value}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        if (value.length == 5) {
            this.props.onChange(event, value + ':00');
        }
    }

    render () {

        let style = {
            ...styles,
            ...this.props.style
        }

        return (
            <Cleave
                style={style}
                value={this.state.value}
                placeholder={this.props.placeholder}
                options={{
                    time: true,
                    timePattern: ['h', 'm']
                }}
                onChange={this.handleChange} />
        );

    }

}

Time.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default Time;
