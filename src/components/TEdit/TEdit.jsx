import React from 'react';
import PropTypes from 'prop-types';

import {Edit} from '../../lib';

import {merge} from '../../util';

import styles from '../../styles';

/**
 * Component representing simple text editor
 */
class TEdit extends React.PureComponent {

    render () {

        let style = merge(
            styles.TMemo.edit,
            styles.TEdit,
            styles[this.props.name],
            this.props.style
        );

        return (
                <Edit
                    vStyle={style}
                    iStyle={style}
                    value={this.props.value}
                    wrap={true}
                    data={this.props.data}
                    name={this.props.name}
                    empty={this.props.empty}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    timeout={this.props.timeout}
                    onChange={this.props.onChange} />
        );

    }

}

TEdit.propTypes = {
    /** Component style: */
    style: PropTypes.object,
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
    /** Represents timeout for "onChange" event in milliseconds. Default is "700" */
    timeout: PropTypes.number,
    /** Text to show when editor is empty */
    placeholder: PropTypes.string,
    /** Value appeared in onChange event when editor is empty. Default is "null" */
    empty: PropTypes.any,
    /**
     * If "true" editor preserves end of line characters in text and allows to wrap text when Enter key is pressed.
     * Otherwise (by default) it ignores new line characters and entered text treated as single string
     */
    wrap: PropTypes.any,
    /** Value type returned by "onChange" event. Can be one of: */
    content: PropTypes.oneOf([
        'text',
        'html'
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
    onChange: PropTypes.func
};

TEdit.defaultProps = {
    empty: null,
    readOnly: false,
    wrap: true,
    content: 'text'
};


export default TEdit;
