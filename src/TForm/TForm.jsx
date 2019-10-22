import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import TModal from '../TModal';
import TButton from '../TButton';

import styles from './styles.js';

class TForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleButtonClick(event) {
        if (!this.props.disable) {
            this.props.onClose(event);
        }
    }

    handleCancel() {
        this.props.onClose({name: 'cancel'});
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        let content = null;
        let propButtons = null;
        if (this.props.message) {
            propButtons = {'ok': 'ОК'}
        } else {
            propButtons = this.props.buttons;
            content = this.props.children;
        }

        let buttons = [];
        if (propButtons) {
            for (let key in propButtons) {
                let buttonStyle = style.buttons[key];
                if (this.props.disable) {
                    buttonStyle = style.disable;
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
                    open={this.props.open}
                    wait={this.props.wait}
                    caption={this.props.caption}
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
    open: PropTypes.any,
    wait: PropTypes.any,
    caption: PropTypes.string,
    disable: PropTypes.any,
    onClose: PropTypes.func.isRequired,
    buttons: PropTypes.object.isRequired,
    error: PropTypes.string,
    message: PropTypes.string
};

export default TForm;
