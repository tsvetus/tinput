import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles, TMask} from '../util';

import styles from './styles.js';

const MASK = new TMask();

class Mask extends React.Component {

    constructor(props, context) {
        super(props, context);
        MASK.set(props.mask);
        this.mask = MASK.parse({value: props.value});
        this.state = {value: this.mask.value}
        this.handleChange = this.handleChange.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.ref = React.createRef();
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.mask = MASK.parse({value: this.props.value});
            this.setState({value: this.mask.value});
        }
    }

    handleChange(event) {
        this.setState({
                value: this.mask.value
            }, () => {
                this.ref.current.selectionStart = this.mask.caret;
                this.ref.current.selectionEnd = this.mask.caret;
        });
        if (MASK.checkComplete()) {
            this.props.onChange({
                value: this.mask.value,
                name: this.props.name,
                data: this.props.data
            });
        }
    }

    handleKey(event) {
        this.mask = MASK.parse({
            key: event.key,
            caret: this.ref.current.selectionStart
        });
        this.setState({
                value: this.mask.value
            }, () => {
                this.ref.current.selectionStart = this.mask.caret;
                this.ref.current.selectionEnd = this.mask.caret;
        });
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
                onKeyDown={this.handleKey}
                onChange={this.handleChange} />
        );

        return (
            <div style={style.container}>
                {label}
                {content}
            </div>
        );

    }

}

Mask.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    mask: PropTypes.object.isRequired
}

export default Mask;
