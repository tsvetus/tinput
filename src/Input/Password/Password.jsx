import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.js';

class Password extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: this.props.value ? this.props.value : ''}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState({value: value});
        this.props.onChange(event, value);
    }

    render () {

        let style = {
            ...styles,
            ...this.props.style
        }

        return (
            <input
                style={style}
                type={"password"}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.handleChange} />
        );

    }

}

Password.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default Password;
