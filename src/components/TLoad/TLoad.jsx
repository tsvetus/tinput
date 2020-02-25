import React from 'react';
import PropTypes from 'prop-types';

import {merge} from '../../util';

import styles from '../../styles';

class TLoad extends React.Component {

    constructor(props) {
        super(props);
        // this.cursor = document.body.style.cursor;
    }

    componentWillUnmount() {
        // document.body.style.cursor = this.cursor;
    }

    render () {

        let style = merge(styles.TLoad, this.props.style, this.props.show &&
            this.props.showCaption ? {} : {display: "none"});

        // if (this.props.show) {
        //     document.body.style.cursor = "wait";
        // } else {
        //     document.body.style.cursor = this.cursor;
        // }

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
    showCaption: PropTypes.any,
    show: PropTypes.any
};

TLoad.defaultProps = {
    showCaption: true,
    caption: 'Loading...'
};

export default TLoad;