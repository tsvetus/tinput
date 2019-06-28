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
        this.setState({value: event.value});
        clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                this.props.onChange({
                    ...event,
                    value: isoTime(event.value, this.format.mask)
                });
            },
            this.props.timeout ? this.props.timeout : TIMEOUT
        );
    }

    componentDidUpdate(old) {
        if (old.format !== this.props.format || old.value !== this.props.value) {
            this.format = this.props.format ? this.props.format : DEFAULT_FORMAT;
            this.setState({value: strTime(this.props.value, this.format)});
        }
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        return (
            <TMask style={style}
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
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    format: PropTypes.object,
    value: PropTypes.any,
    valueNull: PropTypes.any,
    data: PropTypes.any,
    timeout: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TTime;
