import React from 'react';
import PropTypes from 'prop-types';

import TIcon from '../TIcon';

import {mergeStyles} from '../util';

import styles from './styles.js';

const defaultParams = {
    width: "50%"
}

class TSide extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClose(event) {
        this.props.onClick(event);
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
                items.push(
                    <div
                        key={i}
                        style={{
                            ...style.item,
                            ...v.style
                        }}
                        onClick={this.handleClick}
                        name={v.name}>
                        {v.caption}
                    </div>
                );
            });
        }

        return (
            <div style={style.container}>
                <TIcon
                    name="close"
                    style={style.close}
                    onClick={this.handleClose} />
                {items}
                {this.props.children}
                <div style={style.touch}></div>
            </div>
        );

    }

}

TSide.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default TSide;
