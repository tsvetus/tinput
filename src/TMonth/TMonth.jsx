import React from 'react';
import PropTypes from 'prop-types';

import TDate from '../TDate';

class TMonth extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: new Date(1970, props.value, 1)}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange({
            ...event,
            value: (new Date(event.value)).getMonth() + 1
        });
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({value: new Date(1970, this.props.value, 1)});
        }
    }

    render () {

        return (
            <TDate
                style={this.props.style}
                value={this.state.value}
                valueNull={this.props.valueNull}
                name={this.props.name}
                label={this.props.label}
                data={this.props.data}
                format={{mask: "MM", empty: "-"}}
                onChange={this.handleChange} />
        );

    }

}

TMonth.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TMonth;
