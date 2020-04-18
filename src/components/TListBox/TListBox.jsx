import React from 'react';
import PropTypes from 'prop-types';

import {ListBox} from '../../lib';

import {merge, contain, Provider} from '../../util';

import styles from '../../styles';

/**
 * Represents list box
 */
class TListBox extends React.Component {

    constructor(props) {
        super(props);
        if (props.provider) {
            let p = Provider.get(props.provider).getProps();
            this.state = {
                items: p.items ? p.items : props.items,
                keyField: p.keyField ? p.keyField : props.keyField,
                valueField: p.valueField ? p.valueField : props.valueField,
                empty: p.empty ? p.empty : props.empty
            }
        } else {
            this.state = {
                items: props.items,
                keyField: props.keyField,
                valueField: props.valueField,
                empty: props.empty
            }
        }
    }

    componentDidUpdate(old) {
        if (old.items !== this.props.items) {
            this.setState({items: this.props.items});
        }
        if (old.keyField !== this.props.keyField) {
            this.setState({keyField: this.props.keyField});
        }
        if (old.valueField !== this.props.valueField) {
            this.setState({valueField: this.props.valueField});
        }
        if (old.empty !== this.props.empty) {
            this.setState({empty: this.props.empty});
        }
        if (old.provider !== this.props.provider && this.props.provider) {
            let p = Provider.get(this.props.provider).getProps();
            this.setState({
                items: p.items ? p.items : this.state.items,
                keyField: p.keyField ? p.keyField : this.state.keyField,
                valueField: p.valueField ? p.valueField : this.state.valueField,
                empty: p.empty ? p.empty : this.state.empty
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.items !== this.props.items) {
            this.setState({items: nextProps.items});
        }
        return (
            (nextState.items !== this.state.items) ||
            (nextProps.value !== this.props.value)
        );
    }

    render() {

        let style = merge(
            styles.TComponent,
            styles.TListBox,
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        return (
            <ListBox
                style={style}
                value={this.props.value}
                name={this.props.name}
                data={this.props.data}
                label={this.props.label}
                showIcon={this.props.showIcon}
                showEdit={this.props.showEdit}
                timeout={this.props.timeout}
                placeholder={this.props.placeholder}
                empty={this.state.empty}
                items={this.state.items}
                provider={this.props.provider}
                listMode={this.props.listMode}
                showMode={this.props.showMode}
                clickable={this.props.clickable}
                readOnly={this.props.readOnly}
                icon={this.props.icon}
                layout={this.props.layout}
                keyField={this.state.keyField}
                valueField={this.state.valueField}
                modal={this.props.modal}
                caption={this.props.caption}
                fitHeight={this.props.fitHeight}
                onChange={this.props.onChange}
                onValidate={this.props.onValidate} />
        );

    }

}

TListBox.propTypes = {
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
        }),
        /**
         * Style for modal list view. See "TModal"component description for detail style
         * structure
         */
        modal: PropTypes.object
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
    /** If "true" drop up/down editor is shown */
    showEdit: PropTypes.any,
    /** List of dropdown items */
    items: PropTypes.arrayOf(PropTypes.shape({
        /** Item key field */
        key: PropTypes.any,
        /** Item name */
        value: PropTypes.string
    })),
    /** Specifies key field name if it is other than "key" */
    keyField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    /** Specifies value field name if it is other than "value" */
    valueField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    /** Determines what part of "item" should be shown in dropdown list */
    listMode: PropTypes.string,
    /** Determines what part of "item" should be shown in editor */
    showMode: PropTypes.string,
    /**
     * If true then items list appears in modal window. If "modal" is number it indicates
     * minimum number of list items necessary to show list in modal view
     */
    modal: PropTypes.any,
    /** Modal list view caption */
    caption: PropTypes.any,
    /** Indicates whether to fit modal list view height into the screen height */
    fitHeight: PropTypes.any,
    /** Determines what components reacts on "onClick" events */
    clickable: PropTypes.string,
    /** Icon name */
    icon: PropTypes.string,
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
     * On text validate event. Fires if text validation is needed. Must return "true" if text is valid or
     * "false" in other cases
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.value Text to validate
     */
    onValidate: PropTypes.func
};

TListBox.defaultProps = {
    listMode: 'value',
    showMode: 'value',
    showIcon: true,
    showEdit: true,
    clickable: 'label edit',
    keyField: ['key', 'id'],
    valueField: ['value', 'name'],
    modal: false,
    fitHeight: true
};

export default TListBox;
