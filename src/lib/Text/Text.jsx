import React from 'react';
import PropTypes from 'prop-types';

import {Mask, Icon} from '../../lib';

import {merge, apply} from '../../util';

/**
 * Component representing icons.
 * @extends React
 */
class Text extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.container = React.createRef();
        this.frame = React.createRef();
        this.label = React.createRef();
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.updateStyle = this.updateStyle.bind(this);
        this.value = props.value;
        this.valid = true;
        this.vStyle = props.style ? props.style : {};
        this.iStyle = merge(this.vStyle, this.vStyle.invalid);
    }

    componentDidMount() {
        this.mounted = true;
        this.updateStyle(this.valid);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(old) {
        if (old.style !== this.props.style) {
            this.vStyle = this.props.style ? this.props.style : {};
            this.iStyle = merge(this.vStyle, this.vStyle.invalid);
            this.updateStyle(this.valid);
        }
        if (old.value !== this.props.value) {
            this.value = this.props.value;
        }
    }

    handleValidate(event) {

        let valid = true;

        if (this.props.onValidate) {
            valid = this.props.onValidate(event);
        }

        if (valid && this.props.regexp) {
            if (this.props.required) {
                valid = this.props.regexp.test(event.value);
            } else if (event.value && event.value !== '' && event.value !== this.props.empty) {
                valid = this.props.regexp.test(event.value);
            } else {
                valid = true;
            }
        }

        if (valid && this.props.mask) {
            valid = this.props.required ? event.full === true : event.full === true || event.empty === true;
        }

        if (valid !== this.valid) {
            this.updateStyle(valid);
        }

        this.valid = valid;

        return this.valid;

    }

    handleIcon() {
        if (this.props.onIcon) {
            this.props.onIcon({
                data: this.props.data,
                name: this.props.name,
                icon: this.props.icon,
                value: this.value
            });
        }
    }

    handleChange(event) {
        this.value = event.value;
        if (this.mounted && this.props.onChange) {
            this.props.onChange({
                ...event,
                icon: this.props.icon
            })
        }
    }

    updateStyle(valid) {
        if (this.mounted) {
            if (valid) {
                apply(this.iStyle.container,  this.vStyle.container,  this.container.current.style);
                apply(this.iStyle.frame,  this.vStyle.frame,  this.frame.current.style);
                if (this.label.current) {
                    apply(this.iStyle.label,  this.vStyle.label,  this.label.current.style);
                }
            } else {
                apply(this.vStyle.container,  this.iStyle.container,  this.container.current.style);
                apply(this.vStyle.frame,  this.iStyle.frame,  this.frame.current.style);
                if (this.label.current) {
                    apply(this.vStyle.label,  this.iStyle.label,  this.label.current.style);
                }
            }
        }
    }

    render () {

        let label = null;
        if (this.props.label) {
            label = (
                <div
                    ref={this.label}
                    style={this.vStyle.label}>
                    {this.props.label}
                </div>
            )
        }

        let icon = null;
        if (this.props.icon) {
            icon = (
                <Icon
                    style={this.vStyle.icon}
                    name={this.props.icon}
                    onClick={this.handleIcon} />
            )
        }

        let validate = this.props.onValidate || this.props.regexp || this.props.mask ? this.handleValidate : null;
        let top = this.props.layout && this.props.layout.indexOf('top') >= 0;

        return (
            <div ref={this.container} style={this.vStyle.container}>
                {top ? label : null}
                <div style={this.vStyle.frame} ref={this.frame}>
                    {!top ? label : null}
                    <Mask
                        vStyle={this.vStyle.edit}
                        iStyle={this.iStyle.edit}
                        data={this.props.data}
                        name={this.props.name}
                        value={this.props.value}
                        timeout={this.props.timeout}
                        placeholder={this.props.placeholder}
                        wrap={false}
                        format={this.props.format}
                        empty={this.props.empty}
                        readOnly={this.props.readOnly}
                        onMask={this.props.onMask}
                        onValidate={validate}
                        onChange={this.handleChange} />
                    {icon}
                </div>
            </div>
        );

    }

}

Text.propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    icon: PropTypes.string,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    format: PropTypes.object,
    empty: PropTypes.any,
    regexp: PropTypes.object,
    required: PropTypes.any,
    readOnly: PropTypes.any,
    layout: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onIcon: PropTypes.func,
    onMask: PropTypes.func
};

export default Text;
