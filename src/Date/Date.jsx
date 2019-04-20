import React from 'react';
import PropTypes from 'prop-types';

import Mask from '../Mask';

import {mergeStyles} from '../util';

import styles from './styles.js';

class Date extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.value,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({value: this.props.value});
        }
    }

    handleChange(event) {
        this.props.onChange(event);
    }

    getMask(format) {
        let m = format.mask;
        m = m.replace(/D/g, 'N');
        m = m.replace(/M/g, 'N');
        m = m.replace(/Y/g, 'N');
        return {
            mask: m,
            empty: format.empty
        }
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        return (
            <Mask style={style.container}
                  value={this.props.value}
                  name={this.props.name}
                  label={this.props.label}
                  data={this.props.data}
                  mask={this.getMask(this.props.format)}
                  onChange={this.handleChange} />
        );

    }

}

Date.propTypes = {
    name: PropTypes.string.isRequired,
    format: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Date;
