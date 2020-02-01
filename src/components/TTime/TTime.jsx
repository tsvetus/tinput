import React from 'react';
import PropTypes from 'prop-types';

import {Text} from '../../lib';

import {merge, contain, strTime, isoTime, testIsoTime, isoDate} from '../../util';

import styles from '../../styles';

/**
 * Time editor with time value validation
 */
class TTime extends React.Component {

    constructor(props) {
        super(props);
        this.format = merge(TTime.format, props.format);
        this.state = {
            value: strTime(this.format.mask, this.format.empty, props.value)
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value || old.format !== this.props.format) {
            this.format = merge(TTime.format, this.props.format);
            let value = null;
            if (this.props.value === this.props.empty) {
                value = this.props.empty;
            } else {
                value = strTime(this.format.mask, this.format.empty, this.props.value);
            }
            this.setState({value: value});
        }
    }

    handleValidate(event) {
        return event.empty || testIsoTime(isoTime(this.props.format.mask, event.value));
    }

    handleChange(event) {
        if (this.props.onChange) {
            let value = event.value;
            if (value) {
                let format = this.format;
                if (format && format.type && format.type.indexOf('nat') >= 0) {
                    value = new Date(isoTime(format.mask, value));
                } else if (format && format.type && format.type.indexOf('iso') >= 0) {
                    value = isoTime(format.mask, value);
                } else if (format && !format.type) {
                    value = isoDate(value, format.mask);
                }
            }
            this.props.onChange({
                ...event,
                value: value
            });
        }
    }

    render () {

        let style = merge(
            contain(styles.TComponent),
            contain(styles.TDate),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        return (
            <Text
                style={style}
                data={this.props.data}
                name={this.props.name}
                value={this.state.value}
                label={this.props.label}
                icon={this.props.icon}
                timeout={this.props.timeout}
                format={this.format}
                empty={this.props.empty}
                required={this.props.required}
                readOnly={this.props.readOnly}
                onValidate={this.handleValidate}
                onIcon={this.props.onIcon}
                onChange={this.handleChange} />
        );

    }

}

TTime.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component label */
        label: PropTypes.object,
        /** Style for component editor */
        edit: PropTypes.object,
        /** Style for component icon */
        icon: PropTypes.object,
        /** Style for invalid component state. Contains all listed above fields: */
        invalid:  PropTypes.shape({
            container: PropTypes.object,
            label: PropTypes.object,
            edit: PropTypes.object,
            icon: PropTypes.object
        })
    }),
    /** Component initial value. Can be one of: */
    value: PropTypes.oneOfType([
        /** Time in "iso" format ("hh:mm:ss") */
        PropTypes.string,
        /** Native JavaScript Date */
        PropTypes.instanceOf(Date)
    ]),
    /** Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** Label caption. Default is undefined and label is hidden */
    label: PropTypes.string,
    /** Label position towards text editor. Can be one of: */
    layout: PropTypes.oneOf([
        'top',
        'left'
    ]),
    /** Icon name to show. Default is undefined and icon is hidden */
    icon: PropTypes.string,
    /** Represents timeout for "onChange" event in milliseconds. Default is "700" */
    timeout: PropTypes.number,
    /** Time format: */
    format: PropTypes.shape({
        /** Date mask. Default is "hh:mm" */
        mask: PropTypes.string,
        /** Empty char. If length of empty char is grate than 1 then only first character is used. Default is "_" */
        empty: PropTypes.string,
        /** If true then onChange event fires only if date is completely entered or completely cleared.
         * Default is "true"
         */
        full: PropTypes.bool,
        /** Time format appeared in onChange event. Default is "iso" ("hh:mm:ss") */
        type: PropTypes.oneOf(['iso', 'native'])
    }),
    /** Value appeared in onChange event then date is not completely entered or invalid. Default is "null" */
    empty: PropTypes.any,
    /** Indicates if necessary to change component color when entered time is invalid or incomplete.
     * Default is "true"
     */
    required: PropTypes.any,
    /** Prevents from changing component value from user input, Default is "false" */
    readOnly: PropTypes.any,
    /**
     * On date change event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {any} event.value Component date value. Time value format is determined by "format.type" property.
     */
    onChange: PropTypes.func,
    /**
     * On icon click event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.icon Clicked icon name
     */
    onIcon: PropTypes.func
};

TTime.defaultProps = {
    format: {mask: 'hh:mm', empty: '_', full: true, type: 'iso'},
    required: true,
    empty: null,
    readOnly: false,
    layout: 'left'
};

export default TTime;
