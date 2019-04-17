import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.js';

class Test extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: this.props.value}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState({value: value});
        this.props.onChange(event, value);
        this.props.onDropDown(event.currentTarget.getBoundingClientRect());
    }

    render () {

        let style = {
            ...styles,
            ...this.props.style
        }

        return (
            <input
                value={this.props.value}
                placeholder={this.props.placeholder}
                style={style}
                onChange={this.handleChange}>
            </input>
        );

    }

}

Test.propTypes = {
    onChange: PropTypes.func.isRequired,
    onDropDown: PropTypes.func.isRequired,
    list: PropTypes.array,
    empty: PropTypes.object
}

export default Test;
