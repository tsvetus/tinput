import React from 'react';
import PropTypes from 'prop-types';

import {merge, seconds, contain, compare, apply, replace} from '../../util';
import {Icon} from '../../lib';

import {styles} from '../../styles';

const ICON_CLOSE = 'close';

class Modal extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            show: this.props.show,
            timer: null,
            countdown: 0,
            height: 0
        };
        this.screenRef = React.createRef();
        this.containerRef = React.createRef();
        this.contentRef = React.createRef();
        this.close = this.close.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.setStyle = this.setStyle.bind(this);
        this.setShow = this.setShow.bind(this);
        this.position = this.position.bind(this);
        this.screenClick = this.screenClick.bind(this);
        this.containerClick = this.containerClick.bind(this);
        this.setStyle(props.style);
        this.event = new CustomEvent('showModal',{});
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
        } else if (!compare(old.style, this.props.style)) {
            this.setStyle(this.props.style);
        } else {
            this.position();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        this.containerRef.current.removeEventListener('resize', this.handleResize);
        this.stopTimer();
        delete this.event;
    }

    position() {
        if (this.containerRef.current && this.props.show) {
            let container = this.containerRef.current;
            let content = this.contentRef.current;
            let sh = window.innerHeight;
            let rect = container.getBoundingClientRect();
            let ch = rect.height;
            let top = 8;
            if (ch < sh) {
                top = Math.ceil((sh -16 - ch)/2);
            } else if (this.props.fitHeight) {
                container.style.height = sh - 16 + "px";
                content.style.height = "100%";
                content.style.overflowY = "auto";
            }
            container.style.top = top + "px";
        }
    }

    setStyle(style) {
        this.showing = merge(
            contain(styles.TModal),
            contain(styles[this.props.name]),
            contain(style)
        );
        this.showing = replace(this.showing, 'transition', this.props.transition);
        this.style = merge(this.showing, styles.TModal.hidden);
    }

    setShow() {
        setTimeout(() => {
            if (this.mounted) {
                if (this.props.show) {
                    document.dispatchEvent(this.event);
                    apply(this.style.screen, this.showing.screen, this.screenRef.current.style);
                    apply(this.style.container, this.showing.container, this.containerRef.current.style);
                    this.position();
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

    screenClick() {
        if (this.props.show && this.props.outerClick) {
            this.close()
        }
    }

    containerClick(event) {
        if (this.props.show && this.props.outerClick) {
            event.stopPropagation()
        }
    }

    render () {

        let style = merge(this.style, {screen: {display: this.state.show ? 'block' : 'none'}});

        let countdown = this.state.countdown > 0 ? this.state.countdown : null;

        let header = this.props.showHeader ?
            <div style={style.header}>
                {countdown ? <div style={style.timer}>{countdown}</div> : <div></div>}
                <div style={style.caption}>{this.props.caption}</div>
                <Icon style={contain(style.close)} name={ICON_CLOSE} onClick={this.handleCancel} />
            </div> : null;

        let title = this.props.titleContent ?
            <div
                style={style.title}>
                {this.props.titleContent}
            </div> : null;

        let content = this.props.children ?
            <div
                style={style.content}
                ref={this.contentRef}>
                {this.props.children}
            </div> : null;

        let footer = this.props.footerContent ?
            <div style={style.footer}>
                {this.props.footerContent}
            </div> : null;

        return (
            <div
                style={style.screen}
                ref={this.screenRef}
                onClick={this.screenClick}>
                <div
                    style={style.container}
                    ref={this.containerRef}
                    onClick={this.containerClick}>
                    {header}
                    {title}
                    {content}
                    {footer}
                </div>
            </div>
        );

    }

}

Modal.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    show: PropTypes.any,
    countdown: PropTypes.any,
    caption: PropTypes.string,
    showHeader: PropTypes.any,
    escape: PropTypes.any,
    outerClick: PropTypes.any,
    transition: PropTypes.number,
    titleContent: PropTypes.any,
    footerContent: PropTypes.any,
    fitHeight: PropTypes.any,
    onClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
    showHeader: true,
    escape: false,
    outerClick: false,
    transition: 250,
    fitHeight: false
};

export default Modal;
