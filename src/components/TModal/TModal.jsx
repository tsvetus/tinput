import React from 'react';
import PropTypes from 'prop-types';

import {merge, seconds, contain, compare, apply, replace} from '../../util';
import {Icon} from '../../lib';

import styles from '../../styles';

const ICON_CLOSE = 'close';

/**
 * Shows modal dialog
 */
class TModal extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            show: this.props.show,
            timer: null,
            countdown: 0
        };
        this.close = this.close.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.setStyle = this.setStyle.bind(this);
        this.setShow = this.setShow.bind(this);
        this.setStyle(props.style);
        this.screenRef = React.createRef();
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        this.mounted = true;
        this.setTimer();
        document.addEventListener('keydown', this.handleKeyDown);
        this.setShow();
    }

    componentDidUpdate(old) {
        if (old.show !== this.props.show) {
            this.setShow();
            if (this.props.show) {
                this.setTimer();
                this.setState({show: true});
            } else {
                this.stopTimer();
                setTimeout(() => {
                    if (this.mounted) {
                        this.setState({show: false})
                    }
                }, this.props.transition);
            }
        }
        if (!compare(old.style, this.props.style)) {
            this.setStyle(this.props.style);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        document.removeEventListener('keydown', this.handleKeyDown);
        this.stopTimer();
    }

    setStyle(style) {
        this.showing = merge(
            contain(styles.TModal),
            contain(styles[this.props.name]),
            contain(style)
        );
        this.showing = replace(this.showing, 'transition', this.props.transition);
        this.style = merge(
            this.showing,
            styles.TModal.hidden
        );
    }

    setShow() {
        setTimeout(() => {
            if (this.mounted) {
                if (this.props.show) {
                    apply(this.style.screen, this.showing.screen, this.screenRef.current.style);
                    apply(this.style.container, this.showing.container, this.containerRef.current.style);
                } else {
                    apply(this.showing.screen, this.style.screen, this.screenRef.current.style);
                    apply(this.showing.container, this.style.container, this.containerRef.current.style);
                }
            }
        }, 1);
    }

    close() {
        this.stopTimer();
        if (this.props.onClose) {
            this.props.onClose({
                name: this.props.name,
                data: this.props.data,
                button: ICON_CLOSE
            });
        }
    }

    setTimer() {
        if (this.props.show) {
            let countdown = this.props.countdown;
            if (countdown) {
                if (isNaN(countdown)) {
                    countdown = seconds(countdown);
                }
                if (countdown > 0) {
                    clearInterval(this.state.timer);
                    this.setState({
                        countdown: countdown,
                        timer: setInterval(
                            () => {
                                this.setState({countdown: this.state.countdown - 1});
                                if (this.state.countdown <= 0) {
                                    this.close();
                                }
                            },
                            1000
                        )
                    });
                }
            }
        } else {
            clearInterval(this.state.timer);
        }
    }

    stopTimer() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
            this.setState({timer: null});
        }
    }

    handleCancel() {
        this.close();
    }

    handleKeyDown(event) {
        if (event.key === 'Escape' && this.props.show && this.props.escape) {
            this.close();
        }
    }

    render () {

        let style = merge(this.style, {screen: {display: this.state.show ? 'block' : 'none'}});

        let countdown = this.state.countdown > 0 ? this.state.countdown : null;

        let header = null;
        if (this.props.showHeader) {
            header =
                <div style={style.header}>
                    <div style={style.timer}>{countdown}</div>
                    <div style={style.caption} dangerouslySetInnerHTML={{__html: this.props.caption}}></div>
                    <Icon style={style.close} name={ICON_CLOSE} onClick={this.handleCancel} />
                </div>
        }

        return (
            <div style={style.screen} ref={this.screenRef}>
                <div style={style.container} ref={this.containerRef}>
                    {header}
                    <div style={style.content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );

    }

}

TModal.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /**
         * Style for modal content. By default content is a flex box with column justify mode
         */
        content: PropTypes.object,
        /** Style for header box. Header is a flex box containing "timer", "caption" and "close" elements */
        header: PropTypes.object,
        /** Style for timer box */
        timer: PropTypes.object,
        /** Style for caption box */
        caption: PropTypes.object,
        /** Style for close icon */
        close: PropTypes.object
    }),
    /**
     * Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** Indicates whether to show dialog or not */
    show: PropTypes.any,
    /** Contain number of seconds before dialog automatically closes */
    countdown: PropTypes.any,
    /** Caption content */
    caption: PropTypes.string,
    /** Indicates whether to show header or not */
    showHeader: PropTypes.any,
    /** Indicates whether to close dialog when "Escape" key is pressed */
    escape: PropTypes.any,
    /** Transition time in milliseconds */
    transition: PropTypes.number,
    /**
     * On dialog close event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.button Clicked button name
     */
    onClose: PropTypes.func.isRequired
};

TModal.defaultProps = {
    showHeader: true,
    escape: false,
    transition: 250
};

export default TModal;
