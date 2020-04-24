import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import icons from './icons.js';

import {styles} from '../../styles';

class Icon extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {wait: false};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleClick(event) {
        event.stopPropagation();
        if (this.state.wait) {
            return;
        }
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data
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

        let style = merge(
            styles.TIcon,
            contain(this.props.style)
        );

        let cs = style.container;
        if (this.state.wait) {
            cs = merge(cs, style.wait);
        }

        let content = null;
        let w = "0 0 384 384";
        if (icon) {
            let ps = {};
            if (cs.color) {
                ps.fill = cs.color;
            }
            content = (<path style={ps} d={icon.d}></path>);
            w = icon.w;
            if (icon.s) {
                cs = merge(cs, icon.s);
            }
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
            <svg style={cs} viewBox={w}
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
    rotateTime: PropTypes.number,
    timeout: PropTypes.number,
    onClick: PropTypes.func
};

export default Icon;
