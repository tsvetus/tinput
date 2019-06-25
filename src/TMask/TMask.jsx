import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles, Mask} from '../util';

import styles from './styles.js';

/**
 * Represents mask editor
 */
class TMask extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.MASK = new Mask();
        this.MASK.set(props.mask);
        this.mask = this.MASK.parse({value: props.value});
        this.state = {value: this.mask.value};
        this.lastValue = this.mask.value;
        this.handleChange = this.handleChange.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.ref = React.createRef();
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.mask = this.MASK.parse({value: this.props.value});
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
    }

    handleKey(event) {
        this.mask = this.MASK.parse({
            key: event.key,
            caret: this.ref.current.selectionStart
        });
        this.setState({
                value: this.mask.value
            }, () => {
                this.ref.current.selectionStart = this.mask.caret;
                this.ref.current.selectionEnd = this.mask.caret;
        });
        if (this.MASK.checkComplete() && this.lastValue !== this.mask.value) {
            this.lastValue = this.mask.value;
            this.props.onChange({
                value: this.mask.value,
                name: this.props.name,
                data: this.props.data
            });
        } else if (this.props.valueNull && this.MASK.checkEmpty() && this.lastValue !== this.mask.value) {
            this.lastValue = this.mask.value;
            this.props.onChange({
                value: null,
                name: this.props.name,
                data: this.props.data
            });
        }
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

TMask.propTypes = {

    /**
     * Component name
     */
    name: PropTypes.string.isRequired,

    /**
     * TText mask. For example mask={{mask: "NN.NN.NNNN", empty: "-"}} where:
     * mask - text mask and N means - number. For today N is an only option available;
     * empty - empty character;
     */
    mask: PropTypes.object.isRequired,

    /**
     * On component text change event. Fires only if result text contains no <empty> symbols.
     * @returns {value: <masked text>, name: <value of name property>, data: <value of data property>}
     */
    onChange: PropTypes.func.isRequired

};

export default TMask;
