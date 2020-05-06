import React from 'react';
import PropTypes from 'prop-types';

import Node from '../Node';

class Nodes extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick({
                item: event.item,
                value: event.value
            });
        }
    }

    render () {

        let style = this.props.style;
        let helper = this.props.helper;
        let level = this.props.level ? this.props.level : 0;

        let items = helper.getListItems().map((v, i) => {
            return (
                <Node
                    style={style}
                    item={v}
                    key={i}
                    level={level}
                    original={helper.getOriginal(i)}
                    selected={this.props.selected}
                    showSelected={this.props.showSelected}
                    expand={this.props.expand}
                    onClick={this.handleClick} />
            );
        });

        return (
            <div style={style.container}>
                {items}
            </div>
        );

    }

}

Nodes.propTypes = {
    style: PropTypes.object,
    helper: PropTypes.object,
    level: PropTypes.number,
    selected: PropTypes.any,
    showSelected: PropTypes.any,
    expand: PropTypes.number,
    onClick: PropTypes.func
};

export default Nodes;
