import React from 'react';
import PropTypes from 'prop-types';

import Cleave from 'cleave.js/React';

import {sqlDate, strDate} from '../../util';

import styles from './styles.js';

class Date extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: strDate(this.props.value)}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let value = sqlDate(event.target.value);
        if (value.length == 10) {
            this.props.onChange(event, value);
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
                    date: true,
                    delimiter: '.',
                    datePattern: ['d', 'm', 'Y']
                }}
                onChange={this.handleChange} />
        );

    }

}

Date.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default Date;
