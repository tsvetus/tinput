import React from 'react';
import PropTypes from 'prop-types';

import {merge, Helper} from '../../util';

import Nodes from './Nodes';

import {styles} from '../../styles';

class Tree extends React.PureComponent {

    constructor (props) {
        super(props);
        this.state = {selected: props.value};
        this.handleClick = this.handleClick.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.helper = props.helper ? props.helper : new Helper({tree: true});
        this.updateItems(props);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.items !== this.props.items) {
            this.updateItems(this.props);
        }
        if (prevProps.value !== this.props.value) {
            this.setState({selected: this.props.value});
        }
    }

    updateItems(props) {
        if (props.helper) {
            return;
        }
        let items = props.items;
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
                value: event.value,
                key: event.value
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

Tree.propTypes = {
    style: PropTypes.object,
    value: PropTypes.any,
    name: PropTypes.string,
    data: PropTypes.any,
    items: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    helper: PropTypes.object,
    showSelected: PropTypes.any,
    keyField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    valueField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    listMode: PropTypes.string,
    expand: PropTypes.number,
    onChange: PropTypes.func
};

Tree.defaultProps = {
    listMode: 'val',
    showMode: 'val',
    keyField: ['id', 'key', 'code'],
    valueField: ['name', 'value', 'caption'],
    expand: -1
};


export default Tree;
