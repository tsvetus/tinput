import React from 'react';
import PropTypes from 'prop-types';

import {merge} from '../../util';

import styles from '../../styles';

class TResponse extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render () {

        let style = merge(styles.TResponse, styles[this.props.name], this.props.style);

        return (
            <div style={style.container}>
                <div style={style.error}
                        dangerouslySetInnerHTML={{ __html: this.props.error}}>
                </div>
                <div style={style.message}
                        dangerouslySetInnerHTML={{ __html: this.props.message}}>
                </div>
            </div>
        );

    }

}

TResponse.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    error: PropTypes.string,
    message: PropTypes.string
};

export default TResponse;
