import React from 'react';
import PropTypes from 'prop-types';

import {Text} from '../../lib';

import {merge, contain, REGEXP} from '../../util';

import {styles} from '../../styles';

/**
 * Component representing single line text editor
 */
class TText extends React.PureComponent {

    render () {

        let style = merge(
            styles.TComponent,
            styles.TText,
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        return (
            <Text
                style={style}
                data={this.props.data}
                name={this.props.name}
                value={this.props.value}
                label={this.props.label}
                icon={this.props.icon}
                timeout={this.props.timeout}
                placeholder={this.props.placeholder}
                format={this.props.format}
                regexp={this.props.regexp}
                empty={this.props.empty}
                required={this.props.required}
                changeStyle={this.props.changeStyle}
                readOnly={this.props.readOnly}
                layout={this.props.layout}
                onKeyDown={this.props.onKeyDown}
                onValidate={this.props.onValidate}
                onIcon={this.props.onIcon}
                onMask={this.props.onMask}
                onChange={this.props.onChange} />
        );

    }

}

TText.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component label */
        label: PropTypes.object,
        /** Style for component editor */
        edit: PropTypes.object,
        /** Style for component icon */
        icon: PropTypes.object,
        /** Style for invalid component state. Contains all listed above fields: */
        invalid:  PropTypes.shape({
            container: PropTypes.object,
            label: PropTypes.object,
            edit: PropTypes.object,
            icon: PropTypes.object
        })
    }),
    /** Component initial value */
    value: PropTypes.string,
    /**
     * Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** Label caption. Default is undefined and label is hidden */
    label: PropTypes.string,
    /** Icon name to show. Default is undefined and icon is hidden */
    icon: PropTypes.string,
    /** Represents timeout for "onChange" event in milliseconds. Default is "700" */
    timeout: PropTypes.number,
    /** Text to show when editor is empty */
    placeholder: PropTypes.string,
    /** Label position towards text editor. Can be one of: */
    layout: PropTypes.oneOf([
        'top',
        'left'
    ]),
    /** Text format. If specified entered text is checked with "format.mask" value: */
    format: PropTypes.shape({
        /** Text mask. "N" represents any number and "A" - any symbol */
        mask: PropTypes.string,
        /** Empty char. If length of empty char is grate than 1 then only first character is used. Default is "_" */
        empty: PropTypes.string,
        /**
         * If true then onChange event fires only if date is completely entered or completely cleared.
         * Default is "true"
         */
        full: PropTypes.bool
    }),
    /** Regular expression to validate entered text */
    regexp: PropTypes.object,
    /** Value appeared in onChange event when editor is empty. Default is "null" */
    empty: PropTypes.any,
    /**
     * Determines how component changes it's style after text validation.
     * "always" - always change style to invalid when validation is failed.
     * "enter" - change style to invalid only while text is entering.
     * "newer" - stay always valid.
     */
    required: PropTypes.oneOf([
        'always',
        'enter',
        'never'
    ]),
    /** Prevents from changing component value from user input, Default is "false" */
    readOnly: PropTypes.any,
    /**
     * On text change event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.value Entered text.
     */
    onChange: PropTypes.func,
    /**
     * On icon click event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.icon Clicked icon name
     */
    onIcon: PropTypes.func,
    /**
     * On text validate event. Fires if text validation is needed. Must return "true" if text is valid or
     * "false" in other cases
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.value Text to validate
     */
    onValidate: PropTypes.func,
    onMask: PropTypes.func,
    onKeyDown: PropTypes.func
};

TText.defaultProps = {
    required: 'always',
    empty: null,
    readOnly: false,
    layout: 'left',
    timeout: 300
};

TText.regexp = REGEXP;

export default TText;
