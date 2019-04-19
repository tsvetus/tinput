import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles, TMask} from '../util';

import styles from './styles.js';

const mask = new TMask({
    mask: "YYYY",
    empty: " "
});

class Year extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.mask = mask.parse({value: props.value});
        this.state = {value: this.mask.value}
        this.handleChange = this.handleChange.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.ref = React.createRef();
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.mask = mask.parse({value: this.props.value});
            this.setState({value: this.mask.value});
        }
    }

    handleChange(event) {
        this.props.onChange({
            value: event.currentTarget.value,
            name: this.props.name,
            data: this.props.data
        });
    }

    handleKey(event) {
        this.mask = mask.parse({
            key: event.key,
            caret: this.ref.current.selectionStart
        });
        this.setState({value: this.mask.value});
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let content = (
            <input
                ref={this.ref}
                type="text"
                value={this.state.value}
                placeholder={this.props.placeholder}
                style={style.edit}
                onChange={this.handleChange}
                onKeyDown={this.handleKey} />
        );

        return (
            <div style={style.container}>
                {label}
                {content}
            </div>
        );

    }

}

Year.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default Year;
