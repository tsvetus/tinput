import React from 'react';
import PropTypes from 'prop-types';

import {Mask, Icon} from '../../lib';

import {merge, compare, clone} from '../../util';

function parseStyle(props) {
    let v = props.style ? clone(props.style) : {};
    let i = merge(v, v.invalid);
    return {
        v: v,
        i: i
    }
}

class Text extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value,
            valid: true
        };
        this.style = parseStyle(props);
        this.container = React.createRef();
        this.handleIcon = this.handleIcon.bind(this);
        this.handleLabel = this.handleLabel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleValidChange = this.handleValidChange.bind(this);
        this.handleMounted = this.handleMounted.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.saveStyle = this.saveStyle.bind(this);
        this.getNested = this.getNested.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.saveStyle();
        if (this.props.onMounted) {
            this.props.onMounted({
                editor: this.editor,
                container: this.container.current
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(old) {
        if (!compare(old.style, this.props.style)) {
            this.style = parseStyle(this.props);
        }
        if (old.value !== this.props.value && this.state.value !== this.props.value) {
            this.setState({value: this.props.value});
        }
        if (!this.props.children) {
            this.saveStyle();
        }
    }

    handleValidChange(event) {

        if (event.valid !== this.state.valid) {
            this.setState({valid: event.valid});
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

    handleLabel() {
        if (this.props.onLabel) {
            this.props.onLabel({
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

    handleBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    handleMounted(event) {
        this.editor = event.editor;
    }

    getContainerStyle() {
        let style = {};
        if (this.container.current) {
            if (this.props.children) {
                let rect = this.container.current.getBoundingClientRect();
                style.height = rect.height + 'px';
                style.width = rect.width + 'px';
            } else {
                if (this.containerHeight) {
                    style.height = this.containerHeight;
                }
                if (this.containerWidth) {
                    style.width = this.containerWidth;
                }
            }
        }
        return style;
    }

    saveStyle() {
        if (this.container.current) {
            this.containerHeight = this.container.current.style.height ?
                this.container.current.style.height : 'auto';
            this.containerWidth = this.container.current.style.width ?
                this.container.current.style.width : 'auto';
        }
    }

    getNested() {
        return this.props.showEdit && this.props.icon && this.props.nestedIcon;
    }

    render () {

        let nested = this.getNested();

        let style = this.state.valid ? this.style.v : this.style.i;

        let label = null;
        if (this.props.label) {
            label = (
                <div
                    style={style.label}
                    onClick={this.handleLabel}>
                    {this.props.label}
                </div>
            )
        }

        let icon = null;
        if (this.props.icon) {
            icon = (
                <Icon
                    style={nested ? merge(style.icon, style.nested.icon) : style.icon}
                    name={this.props.icon}
                    nested={nested}
                    onClick={this.handleIcon} />
            )
        }

        let validate = this.props.onValidate || this.props.regexp || this.props.mask ? this.handleValidate : null;
        let top = this.props.layout && this.props.layout.indexOf('top') >= 0;

        let containerStyle = merge(style.container, this.getContainerStyle());

        let edit = this.props.showEdit ? <Mask
            simple={this.props.simple}
            tabIndex={this.props.tabIndex}
            style={nested ? style.nested.edit : style.edit}
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
            onKeyDown={this.props.onKeyDown}
            onMask={this.props.onMask}
            onClick={this.props.onClick}
            onValidate={validate}
            onValidChange={this.handleValidChange}
            onChange={this.handleChange}
            onMounted={this.handleMounted} /> : null;

        let frame = nested ?
            <div style={style.frame}>
                {!top ? label : null}
                <div style={merge(style.edit, style.nested.container)}>
                    {edit}
                    {icon}
                </div>
            </div> :
            <div style={style.frame}>
                {!top ? label : null}
                {edit}
                {icon}
            </div>;

        return (
            <div ref={this.container} style={containerStyle} onBlur={this.handleBlur} tabIndex={-1}>
                {top ? label : null}
                {frame}
                {this.props.children}
            </div>
        );

    }

}

Text.propTypes = {
    style: PropTypes.object,
    value: PropTypes.any,
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
    showEdit: PropTypes.any,
    wrap: PropTypes.any,
    nestedIcon: PropTypes.any,
    onClick: PropTypes.func,
    onUpdate: PropTypes.func,
    onKeyDown: PropTypes.func,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onIcon: PropTypes.func,
    onLabel: PropTypes.func,
    onMask: PropTypes.func,
    onBlur: PropTypes.func,
    onMounted: PropTypes.func
};

Text.defaultProps = {
    required: 'always',
    showEdit: true,
    nestedIcon: false
};

export default Text;
