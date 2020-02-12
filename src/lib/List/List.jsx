import React from 'react';
import PropTypes from 'prop-types';

import Helper from './helper.js';

import {merge} from '../../util';

/**
 * @class
 * @ignore
 */
class List extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
        this.handleUse = this.handleUse.bind(this);
    }

    handleClick(event) {
        this.handleUse(event.target.getAttribute('index'));
    }

    handleUse(index) {
        if (this.props.onClick && this.props.items && index >= 0 && index < this.props.items.length) {
            this.props.onClick(this.props.items[index], index);
        }
    }

    render () {

        let style = this.props.style;

        let items = this.props.items.map((v, i) => {
            let ist = style.item;
            if (v.key == this.props.selected) {
                ist = merge(ist, style.selected);
            }
            if (i == this.props.hover) {
                ist = merge(ist, style.hover);
            }
            if (i === 0) {
                ist = merge(ist, style.first);
            }
            if (i === this.props.items.length - 1) {
                ist = merge(ist, style.last);
            }
            return (
                <div key={i} index={i} style={ist} onClick={this.handleClick}>
                    {v.value}
                </div>
            );
        });

        return (

            <div style={style.container}>
                {items}
            </div>

        );

    }

}

List.propTypes = {
    style: PropTypes.object,
    items: PropTypes.array,
    selected: PropTypes.any,
    hover: PropTypes.number,
    onClick: PropTypes.func
};

List.Helper = Helper;

export default List;
