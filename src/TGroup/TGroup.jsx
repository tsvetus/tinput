import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import styles from './styles.js';

class TGroup extends React.Component {

    constructor(props, context) {
        super(props, context);
    }


    render () {

        let style = mergeStyles(styles, this.props.style);

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        return (
            <div style={style.container}>
                {label}
                <div style={style.content}>
                    {this.props.children}
                </div>
            </div>
        );

    }

}

TGroup.propTypes = {
    label: PropTypes.string
}

export default TGroup;
