import React from 'react';
import PropTypes from 'prop-types';

import {merge} from '../../util';

import TModal from '../TModal';
import TButton from '../TButton';

import styles from '../../styles';

class TForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleButtonClick(event) {
        if (!this.props.wait) {
            this.props.onClose({
                name: this.props.name,
                data: this.props.data,
                button: event.name
            });
        }
    }

    handleCancel(event) {
        this.props.onClose(event);
    }

    render () {

        let style = merge(
            styles.TModal,
            styles.TForm,
            styles[this.props.name],
            this.props.style
        );

        let content = null;
        let propButtons = null;
        if (this.props.message || this.props.error) {
            propButtons = {'ok': 'ОК'}
        } else {
            propButtons = this.props.buttons;
            content = this.props.children;
        }

        let buttons = [];
        if (propButtons) {
            for (let key in propButtons) {
                let buttonStyle = style.buttons[key];
                if (this.props.wait) {
                    buttonStyle = style.buttons.wait;
                }
                buttons.push(
                    <TButton
                            key={key}
                            name={key}
                            style={buttonStyle}
                            onClick={this.handleButtonClick}>
                        {propButtons[key]}
                    </TButton>
                );
            }
        }

        let error = this.props.error ?
            (<div style={style.error}>{this.props.error}</div>) :
            null;

        let message = this.props.message ?
            (<div style={style.message}>{this.props.message}</div>) :
            null;

        return (
            <TModal
                    style={style}
                    name={this.props.name}
                    data={this.props.data}
                    show={this.props.show}
                    countdown={this.props.countdown}
                    caption={this.props.caption}
                    showHeader={this.props.showHeader}
                    onClose={this.handleCancel}>
                {message}
                {content}
                {error}
                <div style={style.footer}>{buttons}</div>
            </TModal>
        );

    }

}

TForm.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    show: PropTypes.any,
    countdown: PropTypes.any,
    caption: PropTypes.string,
    wait: PropTypes.any,
    onClose: PropTypes.func,
    buttons: PropTypes.object,
    error: PropTypes.string,
    message: PropTypes.string,
    showHeader: PropTypes.any
};

TForm.defaultProps = {
    buttons: {'ok': 'OK'}
};

export default TForm;
