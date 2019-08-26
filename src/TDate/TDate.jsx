import React from 'react';
import PropTypes from 'prop-types';

import TMask from '../TMask';

import {
    mergeStyles,
    isoDate,
    strDate,
    dateMask,
    TIMEOUT
} from '../util';

import styles from './styles.js';

const DEFAULT_FORMAT = {mask: "DD.MM.YYYY", empty: "-"};

class TDate extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.format = props.format ? props.format : DEFAULT_FORMAT;
        this.state = {value: strDate(props.value, this.format)};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.value});
        clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                let v = isoDate(event.value, this.format.mask);
                let value = this.props.valueDate ? new Date(v) : v;
                this.props.onChange({
                    ...event,
                    value: value
                });
            },
            this.props.timeout ? this.props.timeout : TIMEOUT
        );
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value || old.format !== this.props.format) {
            this.format = this.props.format ? this.props.format : DEFAULT_FORMAT;
            this.setState({value: strDate(this.props.value, this.format)});
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
                   mask={dateMask(this.format)}
                   onChange={this.handleChange} />
        );

    }

}

TDate.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    format: PropTypes.object,
    value: PropTypes.any,
    valueNull: PropTypes.any,
    valueDate: PropTypes.any,
    data: PropTypes.any,
    timeout: PropTypes.number,
    onChange: PropTypes.func.isRequired
};

export default TDate;
