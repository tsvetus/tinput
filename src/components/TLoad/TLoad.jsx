import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import {Icon} from '../../lib';

import {styles} from '../../styles';

class TLoad extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        let show = this.props.show ? {} : {container: {display: "none"}};
        let inline = this.props.inline ? {container: styles.TLoad.inline} : {};

        let style = merge (
            styles.TLoad,
            contain(this.props.style),
            inline,
            show
        );

        if (this.props.show) {
            return (
                <div style={style.container}>
                    <Icon
                        style={style.icon}
                        name={this.props.icon}
                        rotateTime={this.props.rotateTime} />
                </div>
            );
        } else {
            return null;
        }

    }

}

TLoad.propTypes = {
    style: PropTypes.object,
    icon: PropTypes.string,
    show: PropTypes.any,
    inline: PropTypes.any,
    rotateTime: PropTypes.number
};

TLoad.defaultProps = {
    caption: 'Loading...',
    icon: 'refresh',
    rotateTime: 700
};

export default TLoad;