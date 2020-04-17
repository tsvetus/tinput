import React from 'react';
import PropTypes from 'prop-types';

import {merge} from '../../util';

import TModal from '../TModal';
import TButton from '../TButton';

import styles from '../../styles';

/**
 * Extends TModal component. Adds buttons panel at the bottom and on button click events. In addition TForm has
 * "message" and "error" props. If "message" or "error" assigned then they are shown in content area with "OK" button
 */
class TForm extends React.PureComponent {

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
            styles.Modal,
            styles.TForm,
            styles[this.props.name],
            this.props.style
        );

        let content = null;
        let propButtons = null;
        if (this.props.message || this.props.error) {
            if (this.props.message) {
                propButtons = merge(propButtons, this.props.messageButtons);
            }
            if (this.props.error) {
                propButtons = merge(propButtons, this.props.errorButtons);
            }
        } else {
            propButtons = this.props.buttons;
            content = this.props.children;
        }

        let buttons = [];
        if (propButtons) {
            for (let key in propButtons) {
                let buttonStyle = merge(style.button, style.buttons[key]);
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

        let footer = null;
        if (this.props.footerContent) {
            footer = this.props.footerContent;
        } else {
            footer = this.props.showFooter ?
                buttons :
                null;
        }

        return (
            <TModal
                    style={style}
                    name={this.props.name}
                    data={this.props.data}
                    show={this.props.show}
                    countdown={this.props.countdown}
                    caption={this.props.caption}
                    showHeader={this.props.showHeader}
                    escape={this.props.escape}
                    outerClick={this.props.outerClick}
                    transition={this.props.transition}
                    footerContent={footer}
                    onClose={this.handleCancel}>
                {message}
                {content}
                {error}
            </TModal>
        );

    }

}

TForm.propTypes = {

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
        close: PropTypes.object,
        /** Style for footer box (buttons container) */
        footer: PropTypes.object,
        /** Style for error text */
        error: PropTypes.object,
        /** Style for message text */
        message: PropTypes.object,
        /** Style for all buttons in footer area */
        button: PropTypes.object,
        /**
         * Style for button. Replace "buttonName" with your button name. There are predefined styles for
         * "ok", "close", "cancel", "add", "delete", "submit", "wait", "open" and "save" buttons
         */
        buttonName: PropTypes.object
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
    /** Indicates whether to show footer or not */
    showFooter: PropTypes.any,
    /** If "true" tells TForm to leave button greyscale and don't react on "onClick" events */
    wait: PropTypes.any,
    /**
     * List of buttons to show in footer area. Represents object of the following structure
     * "{buttonName: 'Button caption', ...}"
     */
    buttons: PropTypes.object,
    /** Error text to show in content area */
    error: PropTypes.string,
    /** Message text to show in content area*/
    message: PropTypes.string,
    /**
     * List of buttons to show if "error" property is assigned
     */
    errorButtons: PropTypes.object,
    /**
     * List of buttons to show if "message" property is assigned
     */
    messageButtons: PropTypes.object,
    /** Indicates whether to close dialog when "Escape" key is pressed */
    escape: PropTypes.any,
    /** Indicates whether to close dialog when outer region is clicked */
    outerClick: PropTypes.any,
    footerContent: PropTypes.any,
    /** Transition time in milliseconds */
    transition: PropTypes.number,
    /**
     * On form close event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.button Clicked button name
     */
    onClose: PropTypes.func.isRequired
};

TForm.defaultProps = {
    showHeader: true,
    showFooter: true,
    buttons: {ok: 'OK'},
    errorButtons: {ok: 'OK'},
    messageButtons: {ok: 'OK'},
    escape: false,
    outerClick: false,
    transition: 250
};

export default TForm;
