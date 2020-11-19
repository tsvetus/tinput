import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import {styles} from '../../styles';

/**
 * Component represents top menu
 */
class TTop extends React.PureComponent {

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

        let button = null;
        let propsButton = this.props.icon ? this.props.icon :
            this.props.button ? this.props.button : null;
        if (propsButton) {
            if (typeof propsButton === 'string') {
                button = <Icon
                    name={propsButton}
                    style={style.button}
                    onClick={this.handleClick} />;
            } else if (typeof propsButton === 'object') {
                button = <Icon
                    icon={propsButton}
                    style={style.button}
                    onClick={this.handleClick} />;
            }
        }

        let tools = [];
        if (this.props.tools) {
            this.props.tools.forEach((v, i) => {
                if (v.active === undefined || v.active) {
                    let st = merge(
                        style.icon,
                        style[v.icon],
                        v.style
                    );
                    if (v.onClick) {
                        st = merge(st, style.clickable);
                    }
                    let rotateTime = v.rotateTime;
                    if (v.rotate) {
                        st = merge(st, style.rotate);
                        rotateTime = rotateTime ? rotateTime : 700;
                    }
                    if (typeof v.icon === 'string') {
                        tools.push(
                            <Icon
                                key={i}
                                name={v.icon}
                                onClick={this.iconClick}
                                style={st}
                                wait={v.wait}
                                rotateTime={rotateTime} />);
                    } else if (React.isValidElement(v.icon)) {
                        tools.push(v.icon);
                    }
                }
            });
        }

        if (this.props.controls) {
            this.props.controls.forEach((v) => {
                tools.push(v)
            });
        }

        let caption = this.props.caption ? this.props.caption : null;

        return (
            <div style={style.container}>
                {button}
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
        /** Style for main menu button appeared in the left corner of component */
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
    button: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    /** Component caption */
    caption: PropTypes.any,
    /** Array of component tools */
    tools: PropTypes.arrayOf(PropTypes.shape({
        /** Tool icon name to show */
        icon: PropTypes.any,
        /** Tool icon click event */
        onClick: PropTypes.func,
        /** Tool icon custom style */
        style: PropTypes.object,
        /** When "true" icon appears in grey color */
        wait: PropTypes.any,
        /** If above zero "rotateTime" denotes icon rotation speed in milliseconds */
        rotateTime: PropTypes.number,
        /** When "true" icon rotates and changes it's color to red */
        rotate: PropTypes.any,
        /** Set "active" to false to temporary hide icon */
        active: PropTypes.any
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
    button: 'menu'
};

export default TTop;
