import React from 'react';
import PropTypes from 'prop-types';

import {Modal} from '../../lib';

/**
 * Shows modal dialog
 */
class TModal extends React.PureComponent {

    render () {

        return (
            <Modal
                style={this.props.style}
                name={this.props.name}
                data={this.props.data}
                show={this.props.show}
                countdown={this.props.countdown}
                caption={this.props.caption}
                showHeader={this.props.showHeader}
                escape={this.props.escape}
                outerClick={this.props.outerClick}
                transition={this.props.transition}
                footerContent={this.props.footerContent}
                fitHeight={this.props.fitHeight}
                onClose={this.props.onClose}>
                {this.props.children}
            </Modal>
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
    /** Indicates whether to fit modal height into the screen height */
    fitHeight: PropTypes.any,
    /** Indicates whether to close dialog when "Escape" key is pressed */
    escape: PropTypes.any,
    /** Indicates whether to close dialog when outer region is clicked */
    outerClick: PropTypes.any,
    /** Transition time in milliseconds */
    transition: PropTypes.number,
    /** Footer content */
    footerContent: PropTypes.any,
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
    outerClick: false,
    transition: 250,
    fitHeight: false
};

export default TModal;
