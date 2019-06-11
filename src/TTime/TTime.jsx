import React from 'react';
import PropTypes from 'prop-types';

import TMask from '../TMask';

import {
    mergeStyles,
    isoTime,
    strTime,
    timeMask,
    TIMEOUT
} from '../util';

import styles from './styles.js';

const DEFAULT_FORMAT = {mask: "hh:mm", empty: "-"}

class TTime extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.format = props.format ? props.format : DEFAULT_FORMAT;
        this.state = {value: strTime(props.value, this.format)}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                this.props.onChange({
                    ...event,
                    value: isoTime(event.value, this.format.mask)
                });
            },
            TIMEOUT
        );
    }

    componentDidUpdate(old) {
        if (old.format !== this.props.format || old.value !== this.props.value) {
            this.format = props.format ? props.format : DEFAULT_FORMAT;
            this.state = {value: strTime(props.value, this.format)}
        }
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        return (
            <TMask style={style.container}
                   value={this.state.value}
                   valueNull={this.props.valueNull}
                   name={this.props.name}
                   label={this.props.label}
                   data={this.props.data}
                   mask={timeMask(this.format)}
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
