import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import styles from '../../styles';

class TIndicator extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render () {

        let style = merge(
            contain(styles.TIndicator),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let char = (this.props.open === true) ? this.props.charOpen : this.props.charClosed;

        return (
            <div style={style.container} dangerouslySetInnerHTML={{ __html: char}}></div>
        );

    }

}

TIndicator.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    open: PropTypes.any,
    charOpen: PropTypes.string,
    charClosed: PropTypes.string
};

TIndicator.defaultProps = {
    charOpen: '&#8593;',
    charClosed: '&#8595;'
};

export default TIndicator;
