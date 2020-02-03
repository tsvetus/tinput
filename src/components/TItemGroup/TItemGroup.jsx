import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain, compare, clone} from '../../util';

import styles from '../../styles';
import TGroup from "../TGroup";
import TButton from "../TButton";
import TCheck from "../TCheck";

function parseItem(item, index, grouped) {
    let res = {
        key: 'key' + index,
        value: 'value' + index,
        group: 0
    };
    Object.keys(item).forEach((k, j) => {
        if (k === 'key' || k === 'value' || k === 'group') {
            if (k === 'key') {
                res.key = item[k];
            } else if (k === 'value') {
                res.value = item[k];
            } else if (k === 'group') {
                res.group = item[k];
            }
        } else {
            if (j === 0) {
                res.key = item[k];
            } else if (j === 1) {
                res.value = item[k];
            } else if (j === 2) {
                res.group = item[k];
            }
        }
    });
    if (!grouped) {
        res.group = index;
    }
    return res;
}

function getGroups(buttons, indexes, grouped) {
    let groups = {};
    if (buttons) {
        buttons.forEach((v, i) => {
            let res = parseItem(v, i, grouped);
            if (indexes && indexes.indexOf(i) >= 0) {
                if (groups[res.group] === undefined) {
                    groups[res.group] = i;
                }
            }
        });
    }
    return groups;
}

/**
 * Groups items in a single block. Items represented as buttons? radio buttons or
 * check boxes depending on "control" property
 */
class TItemGroup extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            groups: getGroups(
                props.items,
                props.indexes,
                props.grouped
            )
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(old) {
        if (!compare(old.items, this.props.items) ||
            !compare(old.indexes, this.props.indexes) ||
            old.grouped !== this.props.grouped) {
            this.setState({
                groups: getGroups(
                    this.props.items,
                    this.props.indexes,
                    this.props.grouped
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
                    items.push(this.props.items[index]);
                });
                let value = false;
                if (event.down !== undefined) {
                    value = event.down;
                } else if (event.value) {
                    value = event.value;
                }
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    control: event.key,
                    value: value ? this.props.checked : this.props.unchecked,
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
            contain(styles.TButtonGroup),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let controls = null;
        if (this.props.items) {
            controls = this.props.items.map((v, i) => {
                let res = parseItem(v, i, this.props.grouped);
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
    control: 'button',
    checked: true,
    unchecked: false
};

export default TItemGroup;
