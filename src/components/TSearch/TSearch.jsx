import React from 'react';
import PropTypes from 'prop-types';

import {ListBox} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

class TSearch extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }

    search(event, callback) {
        if (this.props.onSearch) {
            return this.props.onSearch(event, callback);
        }
    }

    render () {

        let style = merge(
            contain(styles.TComponent),
            contain(styles.TSearch),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        return (
            <ListBox
                style={style}
                data={this.props.data}
                name={this.props.name}
                label={this.props.label}
                showIcon={this.props.showIcon}
                timeout={this.props.timeout}
                placeholder={this.props.placeholder}
                listMode={this.props.listMode}
                showMode={this.props.showMode}
                onChange={this.props.onChange}
                value={this.props.value}
                empty={this.props.empty}
                readOnly={false}
                clickable={this.props.clickable}
                onSearch={this.search} />
        );

    }

}

TSearch.propTypes = {
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
        /** Style for dropdown list. Contains fields: */
        list:  PropTypes.shape({
            /** Style for dropdown list container */
            container: PropTypes.object,
            /** Style for list items */
            item: PropTypes.object,
            /** Style for selected list item */
            selected: PropTypes.object
        })
    }),
    /** Component initial value. Contains "key" value of default list item */
    value: PropTypes.any,
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
    timeout: PropTypes.number,
    /** Text to show when editor is empty */
    placeholder: PropTypes.string,
    /** Label position towards text editor. Can be one of: */
    layout: PropTypes.oneOf([
        'top',
        'left'
    ]),
    /** Empty item */
    empty: PropTypes.shape({
        /** Empty item key */
        key: PropTypes.any,
        /** Empty item value */
        value: PropTypes.string
    }),
    /** Prevents from changing component value from user input */
    readOnly: PropTypes.any,
    /** If "true" drop up/down indicator is shown */
    showIcon: PropTypes.any,
    /** Minimal number of characters entered in editor required for "onSearch" event to be called */
    chars: PropTypes.number,
    /** Determines what part of "item" should be shown in dropdown list */
    listMode: PropTypes.string,
    /** Determines what part of "item" should be shown in editor */
    showMode: PropTypes.string,
    /** Determines what components reacts on "onClick" events */
    clickable: PropTypes.string,
    /**
     * On text change event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.value Selected item "key" value
     * @param {string} event.index Selected item index
     * @param {string} event.item Selected item
     */
    onChange: PropTypes.func,
    /**
     * On text validate event. Component calls "onValidate" event when text validation is needed. Must return
     * "true" if text is valid or
     * "false" in other cases
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.value Text to validate
     */
    onValidate: PropTypes.func,
    /**
     * On search event. Component calls "onSearch" event whenever component text is changed and count of
     * characters entered more than value determined by "chars" property. User defined "onSearch" event must
     * call "callback" function with array of items like "[{key: ..., value: ...}, ...]" as parameter
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.value Component text. Component fills "event.value" with editor text when text is changed
     * and calls "onSearch" event
     * @param {string} event.key Component fills "event.key" with current item key value and calls "onSearch" event
     * when search by key is needed. For example when "value" component property is assigned
     * @param {string} callback Callback function. Call "callback" to return items list back to component
     * in form of "[{key: ..., value: ...}, ...]" as function argument
     */
    onSearch: PropTypes.func
};

TSearch.defaultProps = {
    listMode: 'value',
    showMode: 'value',
    showIcon: true,
    clickable: 'label edit',
    chars: 3
};

export default TSearch;
