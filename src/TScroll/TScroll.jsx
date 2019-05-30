import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import styles from './styles.js';

class TScroll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0}
        this.updateWindow = this.updateWindow.bind(this);
        this.ref = React.createRef();
    }

    componentDidMount() {
        this.updateWindow();
        window.addEventListener('resize', this.updateWindow);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindow);
    }

    updateWindow() {
        let rect = this.ref.current.getBoundingClientRect();
        let margin = this.props.margin ? this.props.margin : 0;
//            this.ref.current.offsetWidth - this.ref.current.clientWidth;
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight - rect.top - margin
        });
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        let ov = 'auto';
        if (this.props.overflow) {
            if (this.props.overflow.toLowerCase().indexOf('aut') == 0) {
                ov = 'auto';
            } else if (this.props.scrollBars.toLowerCase().indexOf('scr') == 0) {
                ov = 'scroll';
            } else if (this.props.scrollBars.toLowerCase().indexOf('hid') == 0) {
                ov = 'hidden';
            } else if (this.props.scrollBars.toLowerCase().indexOf('vis') == 0) {
                ov = 'visible';
            }
        }

        let overflow = {overflow: ov};
        if (this.props.scrollBars) {
            if (this.props.scrollBars.toLowerCase().indexOf('hor') == 0) {
                overflow = {overflowX: ov, overflowY: 'hidden'}
            } else if (this.props.scrollBars.toLowerCase().indexOf('ver') == 0) {
                overflow = {overflowY: ov, overflowX: 'hidden'}
            } else if (this.props.scrollBars.toLowerCase().indexOf('bot') == 0) {
                overflow = {overflow: ov};
            } else if (this.props.scrollBars.toLowerCase().indexOf('non') == 0) {
                overflow = {overflow: 'hidden'};
            }
        }

        let height = style.container.height ? style.container.height :
            this.state.height + 'px';
        style = mergeStyles(
            style, {
                container: {
                    height: height,
                    ...overflow
                }
            }
        );

        return (
            <div style={style.container} ref={this.ref}>
                {this.props.children}
            </div>
        );

    }

}

TScroll.propTypes = {
    margin: PropTypes.number,
    scrollBars: PropTypes.string,
    overflow: PropTypes.string
}

export default TScroll;
