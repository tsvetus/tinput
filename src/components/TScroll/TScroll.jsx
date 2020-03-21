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
        this.updateStyle = this.updateStyle.bind(this);
        this.getSize = this.getSize.bind(this);
        this.calcHeight = this.calcHeight.bind(this);
        this.resize = this.resize.bind(this);
        this.update = this.update.bind(this);
        this.change = this.change.bind(this);
    }

    componentDidMount() {
        this.resize();
        this.update();
        this.updateStyle();
        this.change();
        this.ref.current.addEventListener('resize', this.resize);
        window.addEventListener('resize', this.resize);
        this.timer = setInterval(() => {
            if (!compare(this.size, this.getSize())) {
                this.resize();
                this.updateStyle();
            }
        }, 1000);
    }

    componentDidUpdate(old) {
        if (old.style !== this.props.style ||
            old.scrollBars !== this.props.scrollBars ||
            old.overflow !== this.props.overflow) {
            this.resize();
            this.update();
            this.updateStyle();
            this.change();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        window.removeEventListener('resize', this.resize);
        this.ref.current.removeEventListener('resize', this.resize);
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

    updateStyle() {

        this.style = merge(
            contain(styles.TScroll),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        for (let key in this.style.container) {
            if (key.indexOf('padding') === 0) {
                this.style.content[key] = this.style.container[key].slice();
                delete this.style.container[key];
            }
        }

    }

    resize() {
        if (this.ref.current) {
            this.ref.current.style.height = this.calcHeight() + 'px';
            this.change();
        }
    }

    change() {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                data: this.props.data,
                size: this.getSize()
            });
        }
        this.size = this.getSize();
    }

    update() {

        if (this.ref.current) {

            let ov = 'auto';
            if (this.props.overflow) {
                if (this.props.overflow.toLowerCase().indexOf('aut') === 0) {
                    ov = 'auto';
                } else if (this.props.overflow.toLowerCase().indexOf('scr') === 0) {
                    ov = 'scroll';
                } else if (this.props.overflow.toLowerCase().indexOf('hid') === 0) {
                    ov = 'hidden';
                } else if (this.props.overflow.toLowerCase().indexOf('vis') === 0) {
                    ov = 'visible';
                }
            }

            if (this.props.scrollBars) {
                if (this.props.scrollBars.toLowerCase().indexOf('hor') === 0) {
                    this.ref.current.style.overflowX = ov;
                    this.ref.current.style.overflowY= 'hidden';
                } else if (this.props.scrollBars.toLowerCase().indexOf('ver') === 0) {
                    this.ref.current.style.overflowY = ov;
                    this.ref.current.style.overflowX = 'hidden';
                } else if (this.props.scrollBars.toLowerCase().indexOf('bot') === 0) {
                    this.ref.current.style.overflow = ov;
                } else if (this.props.scrollBars.toLowerCase().indexOf('non') === 0) {
                    this.ref.current.style.overflow = 'hidden';
                }
            }

        }

    }

    render () {

        this.updateStyle();

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
