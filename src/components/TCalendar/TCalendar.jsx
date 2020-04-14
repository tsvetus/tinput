import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone, contain, compare, firstDate, lastDate, clearDate, isoDate} from '../../util';

import Day from './Day';
import Navigator from './Navigator';

import styles from '../../styles';

function shift(date, to, direction) {
    if (date.getDay() === to) {
        return date;
    } else {
        let d = new Date(date);
        while (d.getDay() !== to) {
            d.setDate(d.getDate() + direction);
        }
        return d;
    }
}

function calcDates(props) {
    let dates = props.dates ? props.dates : [];
    if (props.value) {
        if (props.value instanceof Array) {
            dates = props.value;
        } else if (props.value) {
            dates = [props.value];
        }
    }
    let result = [];
    dates.forEach(v => {
        result.push(clearDate(v));
    });
    return result;
}

function calcState(props) {
    let st = {};
    st.current = clearDate(props.current ? props.current : new Date());
    st.dates = calcDates(props);
    st.start = props.start > 0 && props.start < 7 ? props.start : 0;
    st.finish = st.start === 0 ? 6 : st.start - 1;
    st.year = props.year >= 0 ? props.year : st.current.getFullYear();
    st.month = props.month >= 0 ? props.month : st.current.getMonth();
    st.first = firstDate(st.year, st.month);
    st.last = lastDate(st.year, st.month);
    st.from = shift(st.first, st.start, -1);
    st.to = shift(st.last, st.finish, 1);
    return st;
}

/**
 * Component representing calendar. Calendar captions can be localized using "templates" props or
 * "registerStyles" function described in readme page. Simply set "templates={{days: [...], months: [...]}}
 * directly in component declaration or set it globally by call:
 * "registerStyles(null, {days: [...], months: [...]})". Weekdays ranges: 0..6 where 0 is Sunday.
 * Months ranges: 0..11 where 0 is January (see example)
 */
class TCalendar extends React.PureComponent {

    constructor (props) {
        super(props);
        this.state = calcState(props);
        this.getContent = this.getContent.bind(this);
        this.getParams = this.getParams.bind(this);
        this.change = this.change.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleNavigatorChange = this.handleNavigatorChange.bind(this);
        this.templates = merge(
            {days: styles.days, months: styles.months},
            props.templates
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!compare(prevProps.value, this.props.value)) {
            let dates = calcDates(this.props);
            if (!compare(dates, this.state.dates)) {
                console.log(dates);
                console.log(this.dates);
                this.setState(calcState(this.props));
            }
        }
    }

    getParams(event) {
        let params = {};
        params.current = event.date.getTime() === this.state.current.getTime();
        params.active = event.date.getMonth() === this.state.month;
        params.selected = this.state.dates.find(v => {
            return event.date.getTime() === clearDate(v).getTime()
        });
        return params;
    }

    getContent(event) {

        let content = [];
        let key = 0;

        let date = new Date(this.state.from);
        for (let i=0; i<7; i++) {
            let d = new Date(date);
            content.push(
                <Day
                    style={event.style.day}
                    key={key++}
                    caption={this.templates.days[d.getDay()]} />
            );
            date.setDate(date.getDate() + 1);
        }

        date = new Date(this.state.from);
        while (date.getTime() <= this.state.to.getTime()) {
            let d = new Date(date);
            content.push(
                <Day
                    style={event.style.date}
                    key={key++}
                    data={d}
                    caption={d.getDate()}
                    params={this.getParams({date: d})}
                    onClick={this.handleDayClick} />
            );
            date.setDate(date.getDate() + 1);
        }

        return content;

    }

    change() {
        if (this.props.onChange) {
            let dates = this.state.dates.map(v => {
                if (this.props.dateFormat === 'iso') {
                    return isoDate(v);
                } else {
                    return v;
                }
            });
            let date = dates.length > 0 ? dates[0] : null;
            let value = this.props.multiSelect ? dates : date;
            this.props.onChange({
                name: this.props.name,
                data: this.props.data,
                value: value
            });
        }
    }

    handleDayClick(event) {
        let dates = [];
        if (this.props.multiSelect) {
            dates = clone(this.state.dates);
            let index = dates.findIndex(v => {
                return clearDate(v).getTime() === event.date.getTime()
            });
            if (index < 0) {
                dates.push(event.date);
            } else {
                dates.splice(index, 1);
            }
        } else {
            dates.push(event.date);
        }
        this.setState({dates: dates}, () => {
            this.change();
        });
    }

    handleNavigatorChange(event) {
        let props = {
            ...this.state,
            year: event.year,
            month: event.month
        };
        this.setState(calcState(props));
    }

    render () {

        let style = merge(
            styles.TCalendar,
            contain(styles[this.props.name]),
            contain(this.props.style),
            this.props.show ? null : {container: {display: "none"}}
        );

        return (
            <div style={style.container}>
                {this.props.label ? <div style={style.label}>{this.props.label}</div> : null}
                <Navigator
                    style={style.navigator}
                    year={this.state.year}
                    month={this.state.month}
                    months={this.templates.months}
                    navigators={this.props.navigators}
                    onChange={this.handleNavigatorChange} />
                <div style={style.content}>
                    {this.getContent({style: style})}
                </div>
            </div>
        );

    }

}

TCalendar.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component label */
        label: PropTypes.object,
        /** Style for navigator bar */
        navigator: PropTypes.shape({
            /** Style for navigator container */
            container: PropTypes.object,
            /** Style for month */
            month: PropTypes.object,
            /** Style for year */
            year: PropTypes.object,
            /** Style for navigator buttons */
            button: PropTypes.object,
            /** Style for left buttons box */
            left: PropTypes.object,
            /** Style for month/year box */
            center: PropTypes.object,
            /** Style for right buttons box */
            right: PropTypes.object
        }),
        /** Style for calendar grid box */
        content: PropTypes.object,
        /** Style for weekdays */
        day: PropTypes.shape({
            /** Style for weekday container */
            container: PropTypes.object,
            /** Style for weekday content */
            content: PropTypes.object
        }),
        /** Style for dates */
        date: PropTypes.shape({
            /** Style for date container */
            container: PropTypes.object,
            /** Style for date content */
            content: PropTypes.object,
            /** Style for current date */
            current: PropTypes.object,
            /** Style for inactive date */
            inactive: PropTypes.object,
            /** Style for selected date */
            selected: PropTypes.object
        })
    }),
    /** Label caption. Default is undefined and label is hidden */
    label: PropTypes.string,
    /**
     * Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** Calendar start week day. Cam be varied from "0" for sunday to "6" for saturday */
    start: PropTypes.number,
    /** Calendar current date. Accepts iso strings or Date objects. Default is current day */
    current: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
    ]),
    /** Selected date or array of dates. Accepts iso strings or Date objects. */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
        PropTypes.number,
        PropTypes.array
    ]),
    /** Date format in "onChange" event */
    dateFormat: PropTypes.oneOf(['iso', 'native']),
    /** Initial calendar year. Default is current year */
    year: PropTypes.number,
    /** Initial calendar month. Default is current month */
    month: PropTypes.number,
    /** Shows/Hides component */
    show: PropTypes.any,
    /** Allows to select more than single date */
    multiSelect: PropTypes.any,
    /** Navigator button types */
    navigators: PropTypes.string,
    /**
     * Calendar captions for months and weekdays. Another way to set captions is to use
     * "registerStyles" (see example)"
     */
    templates: PropTypes.shape({
        /** Array of weekdays captions */
        days: PropTypes.arrayOf(PropTypes.string),
        /** Array of months captions */
        months: PropTypes.arrayOf(PropTypes.string)
    }),
    /**
     * On change event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {array} event.value In multi select mode contains array of selected dates.
     * In single select mode contains selected date. Returned dates format depends on
     * "dateFormat" property. Can be one of 'iso' or 'native'
     */
    onChange: PropTypes.func
};

TCalendar.defaultProps = {
    start: 0,
    multiSelect: false,
    dateFormat: 'native',
    show: true,
    navigators: 'year month'
};

export default TCalendar;
