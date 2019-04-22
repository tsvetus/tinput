import React from 'react';
import PropTypes from 'prop-types';

import TMask from '../TMask';

import {
    mergeStyles,
    isoTime,
    strTime,
    timeMask
} from '../util';

import styles from './styles.js';

class TTime extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange({
            ...event,
            value: isoTime(event.value, this.props.format.mask)
        });
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        return (
            <TMask style={style.container}
                   value={strTime(this.props.value, this.props.format.mask)}
                   valueNull={this.props.valueNull}
                   name={this.props.name}
                   label={this.props.label}
                   data={this.props.data}
                   mask={timeMask(this.props.format)}
                   onChange={this.handleChange} />
        );

    }

}

TTime.propTypes = {
    name: PropTypes.string.isRequired,
    format: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TTime;
