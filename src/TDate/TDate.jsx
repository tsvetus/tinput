import React from 'react';
import PropTypes from 'prop-types';

import TMask from '../TMask';

import {
    mergeStyles,
    isoDate,
    strDate,
    dateMask
} from '../util';

import styles from './styles.js';

class TDate extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange({
            ...event,
            value: isoDate(event.value, this.props.format.mask)
        });
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        return (
            <TMask style={style.container}
                   value={strDate(this.props.value, this.props.format.mask)}
                   name={this.props.name}
                   label={this.props.label}
                   data={this.props.data}
                   mask={dateMask(this.props.format)}
                   onChange={this.handleChange} />
        );

    }

}

TDate.propTypes = {
    name: PropTypes.string.isRequired,
    format: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TDate;
