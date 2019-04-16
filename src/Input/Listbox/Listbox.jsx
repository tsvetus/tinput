import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.js';

class Listbox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: this.props.value}
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

        let items = [];
        if (this.props.list) {
            if (this.props.empty) {
                items.push(
                    <option key={'empty'} value={this.props.empty.id}>
                        {this.props.empty.name}
                    </option>
                );
            }
            this.props.list.forEach((v, i) => {
                items.push(
                    <option key={i} value={v.id}>
                        {v.name}
                    </option>
                );
            });
        }

        return (
            <select
                value={this.props.value}
                placeholder={this.props.placeholder}
                style={style}
                onChange={this.handleChange}>
                {items}
            </select>
        );

    }

}

Listbox.propTypes = {
    onChange: PropTypes.func.isRequired,
    list: PropTypes.array,
    empty: PropTypes.object
}

export default Listbox;
