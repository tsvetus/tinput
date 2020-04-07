import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

/** Clickable icon */
class TIcon extends React.PureComponent {

    render () {

        let style = merge(
            styles.TIcon,
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        return (
            <Icon
                style={style}
                name={this.props.name}
                icon={this.props.icon}
                data={this.props.data}
                rotateTime={this.props.rotateTime}
                onClick={this.props.onClick} />
        );
    }

}

TIcon.icons = Icon.icons;

TIcon.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object
    }),
    /** Component name */
    name: PropTypes.string,
    /** Component data */
    data: PropTypes.any,
    /** Rotate animation period in milliseconds */
    rotateTime: PropTypes.number,
    /**
     * On click event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     */
    onClick: PropTypes.func
};

export default TIcon;
