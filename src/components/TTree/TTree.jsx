import React from 'react';
import PropTypes from 'prop-types';

import {merge, Helper} from '../../util';

import Nodes from './Nodes';

import {styles} from '../../styles';

/**
 * Component representing simple tree view
 */
class TTree extends React.PureComponent {

    constructor (props) {
        super(props);
        this.state = {selected: props.value};
        this.handleClick = this.handleClick.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.helper = new Helper({tree: true});
        this.updateItems(props.items);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.items !== this.props.items) {
            this.updateItems(this.props.items);
        }
        if (prevProps.value !== this.props.value) {
            this.setState({selected: this.props.value});
        }
    }

    updateItems(items) {
        let nodes = [];
        if (items) {
            if (items instanceof Array) {
                nodes = items;
            } else {
                nodes = [items];
            }
        }
        this.helper.load(
            nodes,
            this.props.empty,
            this.props.listMode,
            this.props.listMode,
            this.props.keyField,
            this.props.valueField
        );
        if (this.mounted) {
            this.forceUpdate();
        }
    }

    handleClick(event) {
        this.setState({selected: event.value});
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                data: this.props.data,
                item: event.item,
                value: event.value
            })
        }
    }

    render () {

        let style = merge(
            styles.TTree,
            styles[this.props.name],
            this.props.style
        );

        return (
            <Nodes
                style={style}
                helper={this.helper}
                selected={this.state.selected}
                showSelected={this.props.showSelected}
                expand={this.props.expand}
                onClick={this.handleClick} />
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

TTree.defaultProps = {
    listMode: 'val',
    showMode: 'val',
    keyField: ['id', 'key', 'code'],
    valueField: ['name', 'value', 'caption'],
    expand: -1
};


export default TTree;
