import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles, seconds} from '../util';

import styles from './styles.js';

class TModal extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            timer: null,
            wait: 0
        }
        this.handleCancel = this.handleCancel.bind(this);
    }

    close() {
        this.stopTimer();
        this.props.onClose();
    }

    handleCancel(event) {
        event.stopPropagation();
        this.close();
    }

    componentDidMount() {
        this.setTimer();
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    setTimer() {
        if (this.props.wait) {
            let wait = seconds(this.props.wait);
            if (wait > 0) {
                this.setState({
                    wait: wait,
                    timer: setInterval(
                        () => {
                            this.setState({wait: this.state.wait - 1});
                            if (this.state.wait <= 0) {
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

    render () {

        let style = mergeStyles(
            styles,
            this.props.style, {
                modal: {
                    display: this.props.open ? 'block' : 'none'
                }
            }
        );

        let wait = null;
        if (this.state.wait > 0) {
            wait = this.state.wait;
        }

        return (
            <div style={style.modal}>
                <div style={style.container}>
                    <div style={style.header}>
                        <div style={style.timer}>{wait}</div>
                        <div style={style.caption} dangerouslySetInnerHTML={{ __html: this.props.caption}}></div>
                        <div style={style.close} onClick={this.handleCancel}>&times;</div>
                    </div>
                    <div style={style.content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );

    }

}

TModal.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default TModal;
