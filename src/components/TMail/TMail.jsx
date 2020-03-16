import React from 'react';
import PropTypes from 'prop-types';

import TText from '../TText';

import {merge, contain, REGEXP} from '../../util';

import styles from '../../styles';

/**
 * Component representing editor for email input. "TMail" is a special case of "TText" component designed
 * for mail input
 */
class TMail extends React.Component {

    render () {

        let style = merge(
            contain(styles.TMail),
            contain(this.props.style)
        );

        return (
            <TText
                style={style}
                data={this.props.data}
                name={this.props.name}
                value={this.props.value}
                label={this.props.label}
                icon={this.props.icon}
                timeout={this.props.timeout}
                placeholder={this.props.placeholder}
                regexp={REGEXP['email']}
                empty={this.props.empty}
                required={this.props.required}
                readOnly={this.props.readOnly}
                layout={this.props.layout}
                onValidate={this.props.onValidate}
                onIcon={this.props.onIcon}
                onChange={this.props.onChange} />
        );

    }

}

TMail.propTypes = {
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
    /** Value appeared in onChange event when editor is empty. Default is "null" */
    empty: PropTypes.any,
    /**
     * Indicates if necessary to change component color when entered date is invalid or incomplete.
     * Default is "true"
     */
    required: PropTypes.any,
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
    onIcon: PropTypes.func
};

TMail.defaultProps = {
    required: false,
    empty: null,
    readOnly: false,
    layout: 'left'
};

export default TMail;
