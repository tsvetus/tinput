import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.js';

class TResponse extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

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
}

export default TResponse;
