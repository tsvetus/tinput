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
//        this.props.onChange({value: value});
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
                onChange={this.handleChange}
                ref={this.props.inputRef} />
        );

    }

}

Test.propTypes = {
    onChange: PropTypes.func.isRequired,
    inputRef: PropTypes.object.isRequired,
    list: PropTypes.array,
    empty: PropTypes.object
}

export default Test;
