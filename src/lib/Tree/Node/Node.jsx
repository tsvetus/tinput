import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone} from 'tinput';

import Nodes from '../Nodes';
import {Icon} from '../../../lib';

class Node extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {expanded: props.expand >= props.level};
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleCaptionClick = this.handleCaptionClick.bind(this);
        this.handleCaptionDblClick = this.handleCaptionDblClick.bind(this);
        this.toggle =this.toggle.bind(this);
    }

    handleIconClick(event) {
        this.toggle()
    }

    handleCaptionClick(event) {
//        this.toggle()
        if (this.props.onClick) {
            this.props.onClick({
                item: this.props.original,
                value: this.props.item.key,
                index: this.props.item.index
            })
        }
    }

    handleCaptionDblClick(event) {
        this.toggle()
    }

    toggle() {
        if (this.props.item.helper) {
            this.setState({expanded: !this.state.expanded})
        }
    }

    render () {

        let style = clone(this.props.style);
        style.container = style.node.content;
        let ls = style;
        if (this.props.showSelected && this.props.item.key === this.props.selected) {
            ls = merge(ls, {node: style.node.selected});
        }

        let item = this.props.item;

        let icon = <Icon style={ls.node.icon} name={'empty'} />;
        if (item.helper && item.helper.getCount() > 0) {
            icon = this.state.expanded ?
                <Icon style={ls.node.icon} name={'minus'} onClick={this.handleIconClick} /> :
                <Icon style={ls.node.icon} name={'plus'} onClick={this.handleIconClick} />;
        }

        let nodes = item.helper && this.state.expanded ?
            <Nodes
                style={style}
                helper={item.helper}
                level={this.props.level + 1}
                selected={this.props.selected}
                showSelected={this.props.showSelected}
                expand={this.props.expand}
                onClick={this.props.onClick} /> : null;

        return (

            <div style={ls.node.container}>
                <div style={ls.node.frame}>
                    {icon}
                    <div
                        style={ls.node.caption}
                        onClick={this.handleCaptionClick}
                        onDoubleClick={this.handleCaptionDblClick}>
                        {this.props.item.value}
                    </div>
                </div>
                {nodes}
            </div>

        );

    }

}

Node.propTypes = {
    style: PropTypes.object,
    item: PropTypes.object,
    original: PropTypes.object,
    selected: PropTypes.any,
    showSelected: PropTypes.any,
    expand: PropTypes.number,
    onClick: PropTypes.func
};

export default Node;
