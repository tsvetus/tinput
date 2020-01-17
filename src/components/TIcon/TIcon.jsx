import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

class TIcon extends React.Component {

    render () {

        let style = merge(
            contain(styles.TIcon),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        return (
            <Icon
                style={style}
                name={this.props.name}
                data={this.props.data}
                onClick={this.props.onClick} />
        );
    }

}

TIcon.icons = Icon.icons;

TIcon.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
    data: PropTypes.any,
    onClick: PropTypes.func
};

export default TIcon;
