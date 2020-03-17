import React from 'react';
import PropTypes from 'prop-types';

import {Mask, Icon} from '../../lib';

import {merge, apply, compare} from '../../util';

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
        this.handleStyle = this.handleStyle.bind(this);
        this.state = {value: props.value};
        this.vStyle = props.style ? props.style : {};
        this.iStyle = merge(this.vStyle, this.vStyle.invalid);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(old) {
        if (!compare(old.style, this.props.style)) {
            this.vStyle = this.props.style ? this.props.style : {};
            this.iStyle = merge(this.vStyle, this.vStyle.invalid);
        }
        if (old.value !== this.props.value) {
            this.setState({value: this.props.value});
        }
    }

    handleValidate(event) {

        let valid = true;

        if (this.props.onValidate) {
            valid = this.props.onValidate(event);
        }

        if (valid && this.props.regexp) {
            valid = this.props.regexp.test(event.value);
        }

        return valid;

    }

    handleStyle(event) {
        if (event.valid) {
            apply(this.iStyle.label,  this.vStyle.label,  this.label.current.style);
        } else {
            apply(this.vStyle.label,  this.iStyle.label,  this.label.current.style);
        }
    }

    handleIcon() {
        if (this.props.onIcon) {
            this.props.onIcon({
                data: this.props.data,
                name: this.props.name,
                icon: this.props.icon,
                value: this.state.value
            });
        }
    }

    handleChange(event) {
        this.setState({value: event.value}, () => {
            if (this.mounted && this.props.onChange) {
                this.props.onChange({
                    ...event,
                    icon: this.props.icon
                })
            }
        });
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
                        value={this.state.value}
                        timeout={this.props.timeout}
                        placeholder={this.props.placeholder}
                        wrap={false}
                        format={this.props.format}
                        empty={this.props.empty}
                        readOnly={this.props.readOnly}
                        required={this.props.required}
                        onMask={this.props.onMask}
                        onValidate={validate}
                        onChange={this.handleChange}
                        onStyle={this.handleStyle} />
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

Text.defaultProps = {
    required: 'always'
};

export default Text;
