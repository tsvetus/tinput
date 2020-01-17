import React from 'react';
import PropTypes from 'prop-types';

import {Edit, Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';
import TText from "../TText";

/**
 * Component representing multiline editor
 */
class TMemo extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleIcon = this.handleIcon.bind(this);
    }

    handleIcon() {
        if (this.props.onIcon) {
            this.props.onIcon({
                data: this.props.data,
                name: this.props.name,
                icon: this.props.icon
            });
        }
    }

    render () {

        let style = merge(
            contain(styles.TComponent),
            contain(styles.TMemo),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let icon = null;
        if (this.props.icon) {
            icon = (<Icon style={style.icon} name={this.props.icon} onClick={this.handleIcon} />);
        }

        return (
            <div style={style.container}>
                <div style={style.frame}>
                    {label}
                    {icon}
                </div>
                <Edit
                    vStyle={style.edit}
                    iStyle={style.edit}
                    value={this.props.value}
                    wrap={this.props.wrap}
                    data={this.props.data}
                    name={this.props.name}
                    empty={this.props.empty}
                    placeholder={this.props.placeholder}
                    timeout={this.props.timeout}
                    onChange={this.props.onChange} />
            </div>
        );

    }

}

TMemo.propTypes = {
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
    /**
     * If "true" editor preserves end of line characters in text and allows to wrap text when Enter key is pressed.
     * Otherwise (by default) it ignores new line characters and entered text treated as single string
     */
    wrap: PropTypes.any,
    /** Value appeared in onChange event when editor is empty. Default is "null" */
    empty: PropTypes.any,
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

TMemo.defaultProps = {
    empty: null,
    readOnly: false,
    wrap: false
};


export default TMemo;
