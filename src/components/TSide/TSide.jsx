import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

const DEFAULT_SIDE_WIDTH = "300px";
const DEFAULT_TOUCH_WIDTH = 50;
const DEFAULT_INIT_WIDTH = 16;

/**
 * Represents left sided slide menu
 */
class TSide extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = this.calcState(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleEndS = this.handleEndS.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.calcState = this.calcState.bind(this);
        this.doClick = this.doClick.bind(this);
    }

    componentDidUpdate(old) {
        if (old.show !== this.props.show) {
            this.setState(this.calcState(this.props));
        }
    }

    handleClose() {
        this.setState({width: 0});
        this.doClick(-1, {name: "close"});
    }

    handleClick(event) {
        this.setState({width: 0});
        let name = event.target.getAttribute('name');
        let index = event.target.getAttribute('index');
        let item = this.props.items && index >= 0 ? this.props.items[index] : null;
        if (item) {
            this.doClick(index, item);
        } else {
            this.doClick(-1, {name: name});
        }
    }

    handleMove(event) {
        event.stopPropagation();
        this.setState({width: event.touches[0].clientX})
    }

    handleStart(event) {
        event.stopPropagation();
        this.pos = event.touches[0].clientX;
    }

    handleEnd(event) {
        event.stopPropagation();
        let pos = event.changedTouches[0].clientX;
        let diff = pos - this.pos;
        if (diff > this.state.touchWidth) {
            this.setState({width: this.state.sideWidth});
        } else {
            this.setState({width: 0});
            this.doClick(-1, {name: "close"});
        }
    }

    handleEndS(event) {
        event.stopPropagation();
        let pos = event.changedTouches[0].clientX;
        let diff = pos - this.pos;
        if (diff < -this.state.touchWidth) {
            this.setState({width: 0});
            this.doClick(-1, {name: "close"});
        } else {
            this.setState({width: this.state.sideWidth});
        }
    }

    handleBlur() {
        this.doClick(-1, {name: "close"});
    }

    calcState(props) {
        let sideWidth = props.width ? props.width : DEFAULT_SIDE_WIDTH;
        let touchWidth = props.touchWidth ? props.touchWidth : DEFAULT_TOUCH_WIDTH;
        let initWidth = props.initWidth ? props.initWidth : DEFAULT_INIT_WIDTH;
        return {
            width: props.show ? sideWidth : 0,
            sideWidth: sideWidth,
            touchWidth: touchWidth,
            initWidth: initWidth
        }
    }

    doClick(index, item) {
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data,
                index: index,
                item: item
            });
        }
    }
    
    render () {

        let style = merge(
            contain(styles.TSide),
            contain(styles[this.props.name]),
            {container: {width: this.state.width}},
            {frame: {width: this.props.width}},
            contain(this.props.style)
        );

        let items = [];
        if (this.props.items) {
            this.props.items.forEach((v, i) => {
                items.push(
                    <div
                        onTouchMove={this.handleMove}
                        key={i}
                        index={i}
                        style={merge(
                            style.item,
                            style[v.name],
                            v.style
                         )}
                        onClick={this.handleClick}
                        name={v.name}>
                        {v.caption}
                    </div>
                );
            });
        }

        return (

            <div
                style={style.container}
                onTouchMove={this.handleMove}
                onTouchStart={this.handleStart}
                onTouchEnd={this.handleEndS}
                onBlur={this.handleBlur}>

                <Icon
                    name="close"
                    style={style.close}
                    onClick={this.handleClose} />

                <div style={style.content}>
                    {items}
                    {this.props.children}
                </div>

                <div
                    style={{...style.touch, width: this.state.initWidth + 'px'}}
                    onTouchMove={this.handleMove}
                    onTouchStart={this.handleStart}
                    onTouchEnd={this.handleEnd}>
                </div>

            </div>

        );

    }

}

TSide.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for close button */
        close: PropTypes.object,
        /** Style for menu content */
        content: PropTypes.object,
    }),
    /**
     * Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** List menu items */
    items: PropTypes.arrayOf(PropTypes.shape({
        /** Item name */
        name: PropTypes.string,
        /** Item caption */
        caption: PropTypes.any,
        /** Item custom style. In addition one can specify custom item style by use of item name in "style" property */
        style: PropTypes.object
    })),
    /** Indicates weather to show or close menu */
    show: PropTypes.any,
    /** Menu default width */
    width: PropTypes.string,
    /** The minimum touch move length in pixels required for menu to show/hide */
    touchWidth: PropTypes.number,
    /** Left side area width in which component listens touch events when menu is closed */
    initWidth: PropTypes.number,
    /**
     * On click event. Fires when main menu button or tools icon are clicked
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.icon Clicked icon name
     */
    onClick: PropTypes.func
};

TSide.defaultProps = {
    width: DEFAULT_SIDE_WIDTH,
    touchWidth: DEFAULT_TOUCH_WIDTH,
    initWidth: DEFAULT_INIT_WIDTH
};

export default TSide;
