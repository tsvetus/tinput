import React from 'react';
import PropTypes from 'prop-types';

import TIcon from '../TIcon';

import {mergeStyles} from '../util';

import styles from './styles.js';

class TTop extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onClick(event);
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        let tools = [];
        if (this.props.tools) {
            this.props.tools.forEach((v, i) => {
                tools.push(<TIcon key={i} name={v.icon} onClick={v.onClick} />);
            });
        }

        let caption = this.props.caption ? this.props.caption : null;

        return (
            <div style={style.container}>
                <TIcon
                    name="menu"
                    style={style.button} 
                    onClick={this.handleClick} />
                <div style={style.caption}>{caption}</div>
                <div style={style.tools}>{tools}</div>
            </div>
        );

    }

}

TTop.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default TTop;
