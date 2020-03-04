import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import icons from './icons.js';

class Icon extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.stopPropagation();
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data
            });
        }
    }

    render () {

        let icon = this.props.icon ? this.props.icon : icons[this.props.name];

        let style = merge({container: {}}, contain(this.props.style));

        let cs = style.container;

        let content = null;
        let w = "0 0 384 384";
        if (icon) {
            let ps = {};
            if (style.container.color) {
                ps.fill = style.container.color;
            }
            content = (<path style={ps} d={icon.d}></path>);
            w = icon.w;
            if (icon.s) {
                cs = merge(cs, icon.s);
            }
        }

        return (
            <svg style={cs} viewBox={w}
                onClick={this.handleClick}>
                {content}
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
    onClick: PropTypes.func
};

export default Icon;
