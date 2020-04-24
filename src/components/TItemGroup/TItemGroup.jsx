import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain, compare, clone, parseItem} from '../../util';

import {styles} from '../../styles';

import TGroup from "../TGroup";
import TButton from "../TButton";
import TCheck from "../TCheck";

function getGroups(buttons, indexes, grouped, groupField) {
    let groups = {};
    if (buttons) {
        buttons.forEach((v, i) => {
            if (grouped) {
                let group = parseItem(v, groupField);
                if (indexes && indexes.indexOf(i) >= 0) {
                    if (groups[group] === undefined) {
                        groups[group] = i;
                    }
                }
            } else {
                groups[i] = i;
            }
        });
    }
    return groups;
}

function getIndexes(props) {
    let indexes = props.indexes ? props.indexes : [];
    if (props.value !== undefined && props.items) {
        let index = props.items.findIndex(v => {
            return parseItem(v, props.keyField) == props.value;
        });
        if (index >= 0) {
            indexes = [index];
        }
    } else if (props.index >= 0) {
        indexes = [props.index];
    }
    return indexes;
}

/**
 * Groups items in a single block. Items represented as buttons, radio buttons or
 * check boxes depending on "control" property
 */
class TItemGroup extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            items: props.items,
            groups: getGroups(
                props.items,
                getIndexes(props),
                props.grouped,
                props.groupField
            )
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(old) {
        if (!compare(old.items, this.props.items) ||
            !compare(old.indexes, this.props.indexes) ||
            (old.value !== this.props.value) ||
            (old.index !== this.props.index) ||
            (old.grouped !== this.props.grouped)) {
            this.setState({
                items: this.props.items,
                groups: getGroups(
                    this.props.items,
                    getIndexes(this.props),
                    this.props.grouped,
                    this.props.groupField
                )
            });
        }
    }

    handleClick(event) {
        let groups = clone(this.state.groups);
        groups[event.data.group] = event.data.index;
        this.setState({
            groups: groups
        }, () => {
            if (this.props.onChange) {
                let indexes = [];
                let items = [];
                Object.keys(this.state.groups).forEach((v) => {
                    let index = this.state.groups[v];
                    indexes.push(index);
                    items.push(this.state.items[index]);
                });
                let state = false;
                if (event.down !== undefined) {
                    state = event.down;
                } else if (event.value) {
                    state = event.value;
                }
                let value = parseItem(event.data.item, this.props.keyField);
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    control: event.key,
                    state: state ? this.props.checked : this.props.unchecked,
                    value: value,
                    index: event.data.index,
                    item: event.data.item,
                    indexes: indexes,
                    items: items
                });
            }
        });
    }

    render () {

        let style = merge(
            contain(styles.TComponent),
            contain(styles.TGroup),
            contain(styles.TItemGroup),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let controls = null;
        if (this.state.items) {
            controls = this.state.items.map((v, i) => {
                let res = {
                    key: parseItem(v, this.props.keyField),
                    value: parseItem(v, this.props.valueField),
                    group: parseItem(v, this.props.groupField)
                };
                if (this.props.control.indexOf('check') >= 0 || this.props.control.indexOf('radio') >= 0) {
                    let radio = this.props.control.indexOf('radio') >= 0;
                    return (
                        <TCheck
                            key={i}
                            name={res.key}
                            label={res.value}
                            layout={this.props.layout}
                            data={{index: i, key: res.key, group: res.group, item: v}}
                            style={style.control}
                            radio={radio}
                            checked={this.props.checked}
                            unchecked={this.props.unchecked}
                            value={this.state.groups[res.group] === i}
                            onChange={this.handleClick} />

                    );
                } else {
                    return (
                        <TButton
                            key={i}
                            name={res.key}
                            data={{index: i, key: res.key, group: res.group, item: v}}
                            style={style.control}
                            down={this.state.groups[res.group] === i}
                            onClick={this.handleClick}>
                            {res.value}
                        </TButton>
                    );
                }
            });
        }

        return (
            <TGroup
                style={style}
                label={this.props.label}>
                    {controls}
            </TGroup>
        );

    }

}

TItemGroup.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component label */
        label: PropTypes.object,
        /**
         * Style for group content. By default content is a "flex box" so it is possible to use
         * "flex" styles without specifying "display: 'flex'" in "content" section
         */
        content: PropTypes.object,
        /** Item control style */
        control: PropTypes.object
    }),
    /** Label caption. Default is undefined and label is hidden */
    label: PropTypes.string,
    /** If true only one button in group may have down state */
    grouped: PropTypes.any,
    /** List of indexes of controls in "down/checked" state */
    indexes: PropTypes.arrayOf(PropTypes.number),
    /**
     * Index of control in "down/checked" state. Use "index" property instead of
     * "indexes" when control has only single group
     */
    index: PropTypes.number,
    /**
     * Item key value of control in "down/checked" state. Use "value" property if you prefer to work with
     * key values instead of item indexes
     */
    value: PropTypes.number,
    /**
     * Button list. It is possible to use another names instead of "key", "value" and "group". In that case
     * key, value and group will be first, second and third items respectively
     */
    items: PropTypes.arrayOf(PropTypes.shape({
        /** Item key. May have any value and used as a control "name" */
        key: PropTypes.any,
        /** Control label/caption */
        value: PropTypes.any,
        /** Control group. If "grouped = true" then only one control in the same group can be in checked/down state */
        group: PropTypes.number
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
    /** Specifies group field name if it is other than "group" */
    groupField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    /** Control type used in group. Can be one of: */
    control: PropTypes.oneOf(['button', 'check', 'radio']),
    /** Checked/Down value */
    checked: PropTypes.any,
    /** Unchecked/Up value */
    unchecked: PropTypes.any,
    /** Label position towards icon (for control equals to "check" or "radio") */
    layout: PropTypes.oneOf(['left', 'right']),
    /**
     * On click event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.control Pressed/Checked control name
     * @param {number} event.value Pressed control down/checked state
     * @param {number} event.index Pressed item index
     * @param {object} event.item Pressed item
     * @param {array} event.indexes Array of item indexes in "down/checked" state
     * @param {array} event.items Array of items in "down/checked" state
     */
    onChange: PropTypes.func
};

TItemGroup.defaultProps = {
    grouped: true,
    indexes: [],
    index: -1,
    control: 'button',
    checked: true,
    unchecked: false,
    keyField: ['key', 'id'],
    valueField: ['value', 'name'],
    groupField: 'group'
};

export default TItemGroup;
