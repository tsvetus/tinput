import React from 'react';
import PropTypes from 'prop-types';

import {Tree} from '../../lib';

/**
 * Component representing simple tree view
 */
class TTree extends React.PureComponent {

    render () {

        return (
            <Tree
                style={this.props.style}
                data={this.props.data}
                value={this.props.value}
                expand={this.props.expand}
                showSelected={this.props.showSelected}
                onChange={this.props.onChange}
                valueField={this.props.valueField}
                keyField={this.props.keyField}
                items={this.props.items}
                name={this.props.name}
                listMode={this.props.listMode} />
        );

    }

}

TTree.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for tree node. Contains fields: */
        node:  PropTypes.shape({
            /** Style for node container */
            container: PropTypes.object,
            /** Style for node icon */
            icon: PropTypes.object,
            /** Style for node caption */
            caption: PropTypes.object,
            /** Style for node nested items container */
            content: PropTypes.object,
            /** Style for node selected node */
            selected: PropTypes.PropTypes.shape({
                container: PropTypes.object,
                icon: PropTypes.object,
                caption: PropTypes.object,
                content: PropTypes.object
            })
        })
    }),
    /** Component initial selected item key value */
    value: PropTypes.any,
    /**
     * Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /**
     * Items object tree. Contains array of key/value pairs and nested items array in optional field
     * named "items". The key values must be unique through out entire items set!
     */
    items: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    /** Indicates whether to emphasize selected item or not */
    showSelected: PropTypes.any,
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
    /** Indicates level to expand on create. First level is 0 */
    expand: PropTypes.number,
    /**
     * On text change event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.value Entered text.
     */
    onChange: PropTypes.func
};

TTree.defaultProps = Tree.defaultProps;

export default TTree;
