import React from 'react';
import PropTypes from 'prop-types';

import {Text} from '../../lib';

import TCalendar from '../TCalendar';

import {merge, compare, contain, strDate, isoDate, testIsoDate} from '../../util';

import {styles, templates} from '../../styles';

/**
 * Date editor with masked input and date value validation. Date format depends on "format" property while
 * calendar localization depends on "templates" property. Both can be set globally by call to registerStyles
 * function (see example)
 */
class TDate extends React.PureComponent {

    constructor(props) {
        super(props);
        this.format = merge(templates.formats.date, props.format);
        this.state = {
            value: strDate(props.value, this.format.mask, this.format.empty),
            calendar: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value || !compare(old.format, this.props.format)) {
            this.format = merge(templates.formats.date, this.props.format);
            let value = null;
            if (this.props.value === this.props.empty) {
                value = this.props.empty;
            } else {
                value = strDate(this.props.value, this.format.mask, this.format.empty);
            }
            if (value !== this.props.value || value !== this.state.value) {
                this.setState({value: value});
            }
        }
    }

    handleValidate(event) {
        return testIsoDate(isoDate(event.value, this.format.mask));
    }

    handleChange(event) {
        if (this.props.onChange) {
            let value = event.value;
            if (value) {
                let format = this.format;
                if (format && format.type && format.type.indexOf('nat') >= 0) {
                    value = new Date(isoDate(value, format.mask));
                } else if (format && format.type && format.type.indexOf('iso') >= 0) {
                    value = isoDate(value, format.mask);
                } else if (format && !format.type) {
                    value = isoDate(value, format.mask);
                }
            }
            this.setState({value: event.value}, () => {
                this.props.onChange({
                    ...event,
                    value: value
                });
            })
        }
    }

    handleIconClick(event) {
        if (this.props.calendar) {
            this.setState({calendar: !this.state.calendar});
        }
        if (this.props.onIcon) {
            this.props.onIcon(event);
        }
    }

    handleDateSelect(event) {
        this.setState({
            calendar: false,
            value:  strDate(event.value, this.format.mask, this.format.empty)
        }, () => {
            if (this.props.onChange) {
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    value: event.value
                });
            }
        });
    }

    handleBlur() {
        if (this.state.calendar) {
            this.setState({calendar: false});
        }
    }

    render () {

        let style = merge(
            styles.TComponent,
            styles.TDate,
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let icon = this.props.icon ? this.props.icon : null;
        if (this.props.calendar) {
            icon = icon ? icon : 'calendar';
        }

        let calendar = this.state.calendar ?
            <TCalendar
                style={style.calendar}
                value={isoDate(this.state.value, this.format.mask)}
                dateFormat={this.format.type}
                templates={this.props.templates}
                navigators={this.props.navigators}
                start={this.props.start}
                onChange={this.handleDateSelect} /> : null;

        return (
            <Text
                style={style}
                data={this.props.data}
                layout={this.props.layout}
                name={this.props.name}
                value={this.state.value}
                label={this.props.label}
                icon={icon}
                timeout={this.props.timeout}
                format={this.format}
                empty={this.props.empty}
                readOnly={this.props.readOnly}
                required={this.props.required}
                changeStyle={this.props.changeStyle}
                children={calendar}
                nestedIcon={this.props.nestedIcon}
                onValidate={this.handleValidate}
                onIcon={this.handleIconClick}
                onChange={this.handleChange}
                onBlur={this.handleBlur} />
        );

    }

}

TDate.propTypes = {
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
        /** Style for calendar. See "TCalendar" description */
        calendar: PropTypes.object,
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
        /** Date in "iso" format ("YYYY-MM-DD") */
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
    /** Determines icon location in or out of the editor box */
    nestedIcon: PropTypes.any,
    /** Represents timeout for "onChange" event in milliseconds. Default is "700" */
    timeout: PropTypes.number,
    /**
     * Date format. Instead of using "format" property one can use "registerStyles" function to register global
     * date format simply by call "registerStyles(null, {formats: {date: {mask: 'DD.MM.YYYY',
     * empty: '_', full: true, type: 'iso'}}})"
     */
    format: PropTypes.shape({
        /** Date mask. Default is "DD.MM.YYYY" */
        mask: PropTypes.string,
        /** Empty char. If length of empty char is grate than 1 then only first character is used. Default is "_" */
        empty: PropTypes.string,
        /** If true then onChange event fires only if date is completely entered or completely cleared.
         * Default is "true"
         */
        full: PropTypes.bool,
        /** Date format appeared in onChange event. Default is "iso" ("YYYY-MM-DD") */
        type: PropTypes.oneOf(['iso', 'native'])
    }),
    /** Value appeared in onChange event then date is not completely entered or invalid. Default is "null" */
    empty: PropTypes.any,
    /**
     * Determines how component changes it's style after text validation.
     * "always" - always change style to invalid when validation is failed.
     * "enter" - change style to invalid only while text is entering.
     * "newer" - stay always valid.
     */
    required: PropTypes.oneOf([
        'always',
        'enter',
        'never'
    ]),
    /** Prevents from changing component value from user input, Default is "false" */
    readOnly: PropTypes.any,
    /**
     * If true calendar icon appears on the left. Clicking on icon shows date picker represented by
     * "TCalendar" component. See "TCalendar" documentation about stylization and localization of
     * calendar component.
     */
    calendar: PropTypes.any,
    /** Navigator button types. For example: navigators={'month year'}  */
    navigators: PropTypes.string,
    /** Calendar start week day. Cam be varied from "0" for sunday to "6" for saturday */
    start: PropTypes.number,
    /**
     * Calendar captions for months, weekdays and buttons. Another way to set captions is to use
     * "registerStyles" (see example)
     */
    templates: PropTypes.shape({
        /** Array of weekdays captions */
        days: PropTypes.arrayOf(PropTypes.string),
        /** Array of months captions */
        months: PropTypes.arrayOf(PropTypes.string),
        /** Set of navigation buttons */
        buttons: PropTypes.shape({
            /** Year up button */
            yearUp: PropTypes.string,
            /** Year down button */
            yearDown: PropTypes.string,
            /** Month up button */
            monthUp: PropTypes.string,
            /** Month down button */
            monthDown: PropTypes.string
        })
    }),
    /**
     * On date change event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {any} event.value Component date value. Date value format is determined by "format.type" property.
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

TDate.defaultProps = {
    format: templates.formats.date,
    required: 'enter',
    empty: null,
    readOnly: false,
    layout: 'left',
    timeout: 300,
    nestedIcon: false
};

export default TDate;
