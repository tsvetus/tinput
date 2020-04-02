import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import {Icon} from '../../lib';

import styles from '../../styles';

class TLoad extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        let show = this.props.show ? {} : {container: {display: "none"}};
        let inline = this.props.inline ? {container: {position: "relative"}} : {};

        let style = merge(
            contain(styles.TLoad),
            contain(this.props.style)
        );

        if (this.props.show) {
            if (this.props.icon) {
                let is = merge(style.icon, show, inline);
                return (
                    <Icon style={is} name={this.props.icon} rotateTime={700} />
                );
            } else {
                let cs = merge(style.caption, show, inline);
                return (
                    <div style={cs.container}>
                        {this.props.caption}
                    </div>
                );
            }
        } else {
            return null;
        }

    }

}

TLoad.propTypes = {
    style: PropTypes.object,
    caption: PropTypes.string,
    icon: PropTypes.string,
    show: PropTypes.any,
    inline: PropTypes.any
};

TLoad.defaultProps = {
    caption: 'Loading...'
};

export default TLoad;