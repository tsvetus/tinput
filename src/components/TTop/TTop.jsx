import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

/**
 * Component represents top menu
 */
class TTop extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
        this.iconClick = this.iconClick.bind(this);
    }

    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data,
                icon: event.name
            });
        }
    }

    iconClick(event) {
        if (this.props.tools) {
            let tool = this.props.tools.find(v => {
                return v.icon === event.name;
            });
            if (tool) {
                this.handleClick(event);
                if (tool.onClick) {
                    tool.onClick(event);
                }
            }
        }
    }

    render () {

        let style = merge(
            contain(styles.TTop),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let icon = null;
        if (this.props.icon) {
            if (typeof this.props.icon === 'string') {
                icon = <Icon
                    name={this.props.icon}
                    style={style.button}
                    onClick={this.handleClick} />;
            } else if (typeof this.props.icon === 'object') {
                icon = <Icon
                    icon={this.props.icon}
                    style={style.button}
                    onClick={this.handleClick} />;
            }
        }

        let tools = [];
        if (this.props.tools) {
            this.props.tools.forEach((v, i) => {
                let st = merge(
                    style.icon,
                    style[v.icon],
                    v.style
                );
                if (v.onClick) {
                    st = merge(st, style.clickable);
                }
                tools.push(<Icon key={i} name={v.icon}
                    onClick={this.iconClick} style={st} />);
            });
        }

        let caption = this.props.caption ? this.props.caption : null;

        return (
            <div style={style.container}>
                {icon}
                <div style={style.caption}>{caption}</div>
                <div style={style.tools}>{tools}</div>
            </div>
        );

    }

}

TTop.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for main menu button */
        button: PropTypes.object,
        /** Style for caption */
        caption: PropTypes.object,
        /** Style for tool box appeared in right corner of component */
        tools: PropTypes.object,
        /** Style for all tool icons. In addition one can specify custom icon style by icon name */
        icon: PropTypes.object
    }),
    /**
     * Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** Name of the main menu icon appeared in the left corner of component */
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    /** Component caption */
    caption: PropTypes.any,
    /** Array of component tools */
    tools: PropTypes.arrayOf(PropTypes.shape({
        /** Tool icon name to show */
        icon: PropTypes.string,
        /** Tool icon click event */
        onClick: PropTypes.func,
        /** Tool icon custom style */
        style: PropTypes.object
    })),
    /**
     * On click event. Fires when main menu button or tools icon are clicked
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.icon Clicked icon name
     */
    onClick: PropTypes.func
};

TTop.defaultProps = {
    icon: 'menu'
};

export default TTop;
