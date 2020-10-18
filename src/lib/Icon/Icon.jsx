import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain, apply, compare} from '../../util';

import icons from './icons.js';

import {styles} from '../../styles';

function parseStyle(props, state) {
    let icon = props.icon ? props.icon : icons[props.name];
    let style = merge(
        styles.TIcon,
        contain(props.style)
    );
    if (icon && icon.s) {
        style.container = merge(style.container, icon.s);
    }
    if (state.wait) {
        style.container = merge(style.container, style.wait);
    }
    if (style.container.color) {
        style.path = merge(style.path, {fill: style.container.color});
    }
    return style;
}

class Icon extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {wait: props.wait};
        this.svg = React.createRef();
        this.path = React.createRef();
        this.style = parseStyle(props, this.state);
        this.handleClick = this.handleClick.bind(this);
        this.updateStyle = this.updateStyle.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.updateStyle(this.style);
        document.addEventListener('showModal', this.handleShow);
    }

    componentWillUnmount() {
        this.mounted = false;
        document.removeEventListener('showModal', this.handleShow);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.wait !== this.props.wait) {
            this.setState({wait: this.props.wait});
        }
        this.updateStyle(parseStyle(this.props, this.state));
    }

    handleShow() {
        this.updateStyle(this.style);
    }

    updateStyle(style) {
        if (this.svg.current && this.path.current) {
            let size = null;
            if (this.props.nested) {
                let prev = this.svg.current.previousElementSibling;
                let rect = prev.getBoundingClientRect();
                size = rect.height;
            }
            apply(this.style.container, style.container, this.svg.current.style);
            apply(this.style.path, style.path, this.path.current.style);
            if (size) {
                this.svg.current.style.width = size + "px";
                this.svg.current.style.height = size + "px";
            }
            this.style = style;
        }
    }

    handleClick(event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.state.wait) {
            return;
        }
        let rect = this.svg.current.getBoundingClientRect();
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data,
                rect: rect,
                top: event.clientY,
                left: event.clientX,
                bottom: window.innerHeight - event.clientY,
                right: window.innerWidth - event.clientX
            });
        }
        if (this.props.timeout) {
            this.setState({wait: true});
            setTimeout(() => {
                if (this.mounted) {
                    this.setState({wait: false});
                }
            }, this.props.timeout);
        }
    }

    render () {

        let icon = this.props.icon ? this.props.icon : icons[this.props.name];
        if (!icon) {
            icon = icons['empty'];
        }

        let content = null;
        let w = "0 0 384 384";
        if (icon) {
            content = (<path ref={this.path} d={icon.d}></path>);
            w = icon.w;
        }

        let animate = this.props.rotateTime ?
            <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="360 0 0"
                to="0 0 0"
                dur={this.props.rotateTime + "ms"}
                additive="sum"
                repeatCount="indefinite" /> : null;

        return (
            <svg
                ref={this.svg}
                viewBox={w}
                onClick={this.handleClick}>
                {content}
                {animate}
            </svg>
        );

    }

}

Icon.icons = icons;

Icon.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    icon: PropTypes.object,
    data: PropTypes.any,
    nested: PropTypes.any,
    wait: PropTypes.any,
    rotateTime: PropTypes.number,
    timeout: PropTypes.number,
    onClick: PropTypes.func
};

export default Icon;
