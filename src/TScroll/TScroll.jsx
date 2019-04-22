import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import styles from './styles.js';

class TScroll extends React.Component {

    render () {

        let style = mergeStyles(styles, this.props.style);

        return (
            <div style={style.container}>
                {this.props.children}
            </div>
        );

    }

}

export default TScroll;
