import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import styles from './styles.js';

const defaultParams = {
    width: "50%"
}

class TSide extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onClick(event.target.getAttribute('name'));
    }

    render () {


        let params = {
            ...defaultParams,
            ...this.props.params
        }

        let width = this.props.open ? params.width : "0";

        let style = mergeStyles(styles, this.props.style, {container: {width: width}});

        let items = [];
        if (this.props.items) {
            this.props.items.forEach((v, i) => {
                let itemStyle = {
                    ...style.item,
                    ...v.style
                }
                items.push(
                    <div
                    key={i}
                    style={itemStyle}
                    onClick={this.handleClick}
                    name={v.name}>
                        {v.caption}
                    </div>
                );
            });
        }

        return (
            <div style={style.container}>
                <div
                style={style.close}
                onClick={this.handleClick}
                name={"close"}>
                    &times;
                </div>
                {items}
                {this.props.children}
            </div>
        );

    }

}

TSide.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default TSide;
