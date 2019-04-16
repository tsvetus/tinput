import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.js';

class Checkbox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: this.props.value}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let checked = event.target.checked;
        this.setState({checked: checked});
        this.props.onChange(event, checked ? 1 : 0);
    }

    render () {

        let style = {
            ...styles,
            ...this.props.style
        }

        return (
            <div style={style}>
                {this.props.caption}&nbsp;
                <input
                    style={{transform: "scale(1.5)"}}
                    type={"checkbox"}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.handleChange} />
            </div>
        );

    }

}

Checkbox.propTypes = {
    onChange: PropTypes.func.isRequired,
    caption: PropTypes.string
}

export default Checkbox;
