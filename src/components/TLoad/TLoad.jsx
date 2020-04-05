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

        let style = contain(styles.TLoad);

        let show = this.props.show ? {} : {container: {display: "none"}};
        let inline = this.props.inline ? style.inline : {};

        if (this.props.show) {
            if (this.props.icon) {
                let is = merge(style.icon, contain(this.props.style), show, inline);
                return (
                    <div style={is.container}>
                        <Icon style={is.icon} name={this.props.icon} rotateTime={700} />
                    </div>
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
    caption: 'Loading...',
    icon: 'refresh'
};

export default TLoad;