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

        let style = merge(
            contain(styles.TLoad),
            contain(this.props.style)
        );

        if (this.props.show) {
            if (this.props.icon) {
                let is = merge(style.icon, show);
                return (
                    <Icon style={is} name={this.props.icon} rotateTime={700} />
                );
            } else {
                let cs = merge(style.caption, show);
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
    show: PropTypes.any
};

TLoad.defaultProps = {
    showCaption: true,
    caption: 'Loading...'
};

export default TLoad;