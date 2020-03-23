import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain, compare} from '../../util';

import styles from '../../styles';

/**
 * Component represents scroll box
 */
class TScroll extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.getSize = this.getSize.bind(this);
        this.calcHeight = this.calcHeight.bind(this);
        this.resize = this.resize.bind(this);
        this.check = this.check.bind(this);
        this.update = this.update.bind(this);
        this.init = this.init.bind(this);
        this.init(props);
        this.start = this.start.bind(this);
    }

    componentDidMount() {
        this.resize();
        this.update(this.props);
        this.ref.current.addEventListener('resize', this.start);
        window.addEventListener('resize', this.start);
        this.timer = setInterval(() => {
            this.check();
        }, 500);
    }

    componentDidUpdate(old) {
        if (old.style !== this.props.style ||
            old.scrollBars !== this.props.scrollBars ||
            old.overflow !== this.props.overflow) {
            this.init(this.props);
            this.update(this.props);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        window.removeEventListener('resize', this.resize);
        this.ref.current.removeEventListener('resize', this.resize);
    }

    start() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.resize, 500);
    }

    getSize() {
        if (this.ref.current) {
            let rect = this.ref.current.getBoundingClientRect();
            return {width: rect.width, height: rect.height};
        } else {
            return {width: 0, height: 0};
        }
    }

    calcHeight() {
        let height = 0;
        if (this.style.container.height) {
            height = this.style.container.height;
        } else if (this.ref.current) {
            let rect = this.ref.current.getBoundingClientRect();
            let margin = this.props.margin ? this.props.margin : 0;
            height = this.props.height ? this.props.height : window.innerHeight - rect.top - margin;
        }
        return height;
    }

    resize() {
        this.timeout = null;
        if (this.ref.current) {
            this.ref.current.style.height = this.calcHeight() + 'px';
            this.size = this.getSize();
            if (this.props.onChange) {
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    size: this.getSize()
                });
            }
        }
    }

    check() {
        if (!this.timeout && !compare(this.size, this.getSize())) {
            this.resize();
        }
    }

    init(props) {

        this.style = merge(
            contain(styles.TScroll),
            contain(styles[props.name]),
            contain(props.style)
        );

        for (let key in this.style.container) {
            if (key.indexOf('padding') === 0) {
                this.style.content[key] = this.style.container[key].slice();
                delete this.style.container[key];
            }
        }

    }

    update(props) {

        if (this.ref.current) {

            let ov = 'auto';
            if (props.overflow) {
                if (props.overflow.toLowerCase().indexOf('aut') === 0) {
                    ov = 'auto';
                } else if (props.overflow.toLowerCase().indexOf('scr') === 0) {
                    ov = 'scroll';
                } else if (props.overflow.toLowerCase().indexOf('hid') === 0) {
                    ov = 'hidden';
                } else if (props.overflow.toLowerCase().indexOf('vis') === 0) {
                    ov = 'visible';
                }
            }

            if (props.scrollBars) {
                if (props.scrollBars.toLowerCase().indexOf('hor') === 0) {
                    this.ref.current.style.overflowX = ov;
                    this.ref.current.style.overflowY= 'hidden';
                } else if (props.scrollBars.toLowerCase().indexOf('ver') === 0) {
                    this.ref.current.style.overflowY = ov;
                    this.ref.current.style.overflowX = 'hidden';
                } else if (props.scrollBars.toLowerCase().indexOf('bot') === 0) {
                    this.ref.current.style.overflow = ov;
                } else if (props.scrollBars.toLowerCase().indexOf('non') === 0) {
                    this.ref.current.style.overflow = 'hidden';
                }
            }

        }

    }

    render () {

        return (
            <div ref={this.ref} style={this.style.container}>
                <div style={this.style.content}>
                    {this.props.children}
                </div>
            </div>
        );

    }

}

TScroll.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container. If "container" does not contain "height" field (by default)
         * "TScroll" fills all remaining space up to the bottom of screen
         */
        container: PropTypes.object,
        /** Style for scroll content */
        content: PropTypes.object
    }),
    /** Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    margin: PropTypes.number,
    /** Scroll bars to show. Can be one of: */
    scrollBars: PropTypes.oneOf(['both', 'horizontal', 'vertical', 'none']),
    /** Overflow attribute. Can be one of: */
    overflow: PropTypes.oneOf(['auto', 'scroll', 'hidden', 'visible']),
    /**
     * On client rectangle change event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {any} event.size Component in the form of  {width: ..., height: ...}
     */
    onChange: PropTypes.func,
};

TScroll.defaultProps = {
    margin: 4,
    scrollBars: 'both',
    overflow: 'auto'
};

export default TScroll;
