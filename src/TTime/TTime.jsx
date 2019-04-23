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

class TTime extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: strTime(props.value, props.format)}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                this.props.onChange({
                    ...event,
                    value: isoTime(event.value, this.props.format.mask)
                });
            },
            TIMEOUT
        );
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({value: strTime(this.props.value, this.props.format)});
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
