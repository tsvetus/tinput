import React from 'react';
import PropTypes from 'prop-types';

import {merge, seconds} from '../../util';
import {Icon} from '../../lib';

import styles from '../../styles';

const ICON_CLOSE = 'close';

class TModal extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            timer: null,
            countdown: 0
        };
        this.close = this.close.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.setTimer();
    }

    componentDidUpdate(old) {
        if (this.props.show && old.show !== this.props.show) {
            this.setTimer();
        } else if (!this.props.show) {
            this.stopTimer();
        }
    }

    componentWillUnmount() {
        this.stopTimer();
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
        let countdown = this.props.countdown;
        if (countdown) {
            if (isNaN(countdown)) {
                countdown = seconds(countdown);
            }
            if (countdown > 0) {
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

    render () {

        let style = merge(
            styles.TModal,
            styles[this.props.name],
            this.props.style, {
                screen: {
                    display: this.props.show ? 'block' : 'none'
                }
            }
        );

        let countdown = this.state.countdown > 0 ? this.state.countdown : null;

        let header = null;
        if (this.props.showHeader) {
            header =
                <div style={style.header}>
                    <div style={style.timer}>{countdown}</div>
                    <div style={style.caption} dangerouslySetInnerHTML={{ __html: this.props.caption}}></div>
                    <Icon style={style.close} name={ICON_CLOSE} onClick={this.handleCancel} />
                </div>
        }

        return (
            <div style={style.screen}>
                <div style={style.container}>
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
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    show: PropTypes.any,
    countdown: PropTypes.any,
    caption: PropTypes.string,
    showHeader: PropTypes.any,
    onClose: PropTypes.func.isRequired
};

TModal.defaultProps = {
    showHeader: true
};

export default TModal;
