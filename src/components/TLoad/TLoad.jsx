import React from 'react';
import PropTypes from 'prop-types';

import {merge} from '../../util';

import styles from '../../styles';

class TLoad extends React.Component {

    render () {
        let style = merge(styles.TLoad, this.props.style, this.props.show ? {} : {display: "none"});
        return (
            <div style={style}>
                {this.props.show ? this.props.caption : null}
            </div>
        );
    }

}

TLoad.propTypes = {
    style: PropTypes.object,
    caption: PropTypes.string,
    show: PropTypes.any
};

TLoad.defaultProps = {
    caption: 'Loading...'
};

export default TLoad;