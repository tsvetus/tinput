import React from 'react';
import PropTypes from 'prop-types';

import {Mask, Icon} from '../../lib';

import {merge, apply, compare, clone} from '../../util';

function parseStyle(props) {
    let v = props.style ? clone(props.style) : {};
    let i = merge(v, v.invalid);
    if (props.icon && props.nestedIcon) {
        v = merge(
            v,
            {icon: {container: {border: v.edit.border, backgroundColor: v.edit.backgroundColor}}},
            v.nested
        );
        i = merge(
            i,
            {icon: {container: {border: i.edit.border, backgroundColor: i.edit.backgroundColor}}},
            i.nested
        );
    }
    return {
        v: v,
        i: i
    }
}

/**
 * Component representing icons.
 * @extends React
 */
class Text extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.container = React.createRef();
        this.frame = React.createRef();
        this.label = React.createRef();
        this.icon = React.createRef();
        this.handleIcon = this.handleIcon.bind(this);
        this.handleLabel = this.handleLabel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.handleStyle = this.handleStyle.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.handleMounted = this.handleMounted.bind(this);
        this.saveStyle = this.saveStyle.bind(this);
        this.updateStyle = this.updateStyle.bind(this);
        this.state = {value: props.value};
        this.style = parseStyle(props);
        this.editor = null;
    }

    componentDidMount() {
        this.mounted = true;
        this.saveStyle();
        this.handleMounted();
        this.updateStyle();
        this.handleStyle({valid: true});
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(old) {
        if (!compare(old.style, this.props.style)) {
            this.style = parseStyle(this.props);
        }
        if (old.value !== this.props.value) {
            this.setState({value: this.props.value});
        }
        if (!this.props.children) {
            this.saveStyle();
        }
    }

    updateStyle() {
        if (this.mounted && this.props.icon && this.props.nestedIcon) {
            let rect = this.container.current.getBoundingClientRect();
            let style = {
                icon: {
                    container: {
                        width: rect.height + "px",
                        height: rect.height + "px",
                        margin: "0",
                        padding: "4px"
                    }
                }
            };
            this.style.v = merge(this.style.v, style);
            this.style.i = merge(this.style.i, style);
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
        if (this.mounted) {
            if (event.valid) {
                if (this.label.current) {
                    apply(this.style.i.label,  this.style.v.label,  this.label.current.style);
                }
                if (this.icon.current) {
                    this.icon.current.setStyle(this.style.i.icon.container, this.style.v.icon.container);
                }
            } else {
                if (this.label.current) {
                    apply(this.style.v.label, this.style.i.label, this.label.current.style);
                }
                if (this.icon.current) {
                    this.icon.current.setStyle(this.style.v.icon.container, this.style.i.icon.container);
                }
            }
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

    handleMounted(event) {
        if (event && event.editor) {
            this.editor = event.editor;
        }
        if (this.props.onMounted) {
            this.props.onMounted({
                container: this.container.current,
                frame: this.frame.current,
                label: this.label.current,
                editor: this.editor
            });
        }
    }

    render () {

        let label = null;
        if (this.props.label) {
            label = (
                <div
                    ref={this.label}
                    style={this.style.v.label}
                    onClick={this.handleLabel}>
                    {this.props.label}
                </div>
            )
        }

        let icon = null;
        if (this.props.icon) {
            icon = (
                <Icon
                    ref={this.icon}
                    style={this.style.v.icon}
                    name={this.props.icon}
                    onClick={this.handleIcon} />
            )
        }

        let validate = this.props.onValidate || this.props.regexp || this.props.mask ? this.handleValidate : null;
        let top = this.props.layout && this.props.layout.indexOf('top') >= 0;

        let containerStyle = merge(this.style.v.container, this.getContainerStyle());

        return (
            <div ref={this.container} style={containerStyle} onBlur={this.handleBlur} tabIndex={-1}>
                {top ? label : null}
                <div style={this.style.v.frame} ref={this.frame}>
                    {!top ? label : null}
                    {this.props.showEdit ? <Mask
                        simple={this.props.simple}
                        tabIndex={this.props.tabIndex}
                        vStyle={this.style.v.edit}
                        iStyle={this.style.i.edit}
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
                        onChange={this.handleChange}
                        onStyle={this.handleStyle}
                        onMounted={this.handleMounted} /> : null}
                    {icon}
                </div>
                {this.props.children}
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
    nestedIcon: true
};

export default Text;
