import React from 'react';
import PropTypes from 'prop-types';

import TDate from '../TDate';

class TYear extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: new Date(props.value, 1, 1, 12)}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange({
            ...event,
            value: (new Date(event.value)).getFullYear()
        });
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({value: new Date(this.props.value, 1, 1, 12)});
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
                format={{mask: "YYYY", empty: "-"}}
                onChange={this.handleChange} />
        );

    }

}

TYear.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TYear;
