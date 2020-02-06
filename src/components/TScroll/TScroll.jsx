import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import styles from '../../styles';

/**
 * Component represents scroll box
 */
class TScroll extends React.Component {

    constructor(props) {
        super(props);
        this.updateStyle = this.updateStyle.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.resize = this.resize.bind(this);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.updateStyle();
        this.resize();
        this.ref.current.addEventListener('resize', this.resize);
        this.ref.current.addEventListener('DOMNodeInserted', this.resize);
        window.addEventListener('resize', this.resize);
    }

    componentDidUpdate(old) {
        if (old.style !== this.props.style) {
            this.updateStyle();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        this.ref.current.removeEventListener('DOMNodeInserted', this.resize);
        this.ref.current.removeEventListener('resize', this.resize);
    }

    getHeight() {
        let height = 0;
        if (this.style.container.height) {
            height = this.style.container.height;
        } else {
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

//        this.ref.current.style.width = this.getWidth() + 'px';
        this.ref.current.style.height = this.getHeight() + 'px';

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
    margin: PropTypes.number,
    /** Scroll bars to show. Can be one of: */
    scrollBars: PropTypes.oneOf(['both', 'horizontal', 'vertical', 'none']),
    /** Overflow attribute. Can be one of: */
    overflow: PropTypes.oneOf(['auto', 'scroll', 'hidden', 'visible'])
};

TScroll.defaultProps = {
    margin: 4,
    scrollBars: 'both',
    overflow: 'auto'
};

export default TScroll;
