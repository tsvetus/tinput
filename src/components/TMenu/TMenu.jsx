import React from 'react';
import PropTypes from 'prop-types';

import TScroll from '../TScroll';

import {merge, contain} from '../../util';

import styles from '../../styles';

class TMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
        this.doClick = this.doClick.bind(this);
    }

    handleClick(event) {
        this.setState({width: 0});
        let name = event.target.getAttribute('name');
        let index = event.target.getAttribute('index');
        let item = this.props.items && index >= 0 ? this.props.items[index] : null;
        if (item) {
            this.doClick(index, item);
        } else {
            this.doClick(-1, {name: name});
        }
    }

    doClick(index, item) {
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data,
                index: index,
                item: item
            });
        }
    }
    
    render () {

        let style = merge(
            contain(styles.TMenu),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let index = null;
        if (this.props.item && this.props.items) {
            index = this.props.items.findIndex(v => {
                return v.name === this.props.item;
            });
        }

        let items = [];
        if (this.props.items) {
            this.props.items.forEach((v, i) => {
                let st = merge(
                    style.item,
                    style[v.name],
                    v.style
                );
                if (i === index) {
                    st = merge(st, style.current);
                }
                items.push(
                    <div
                        key={i}
                        index={i}
                        style={st}
                        onClick={this.handleClick}
                        name={v.name}>
                        {v.caption}
                    </div>
                );
            });
        }

        return (

            <TScroll style={style.container}>
                <div style={style.content}>
                    {items}
                    {this.props.children}
                </div>
            </TScroll>

        );

    }

}

TMenu.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    items: PropTypes.array,
    item: PropTypes.string,
    onClick: PropTypes.func
};

export default TMenu;
