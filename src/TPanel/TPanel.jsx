import React from 'react';

import styles from './styles.js';

class TPanel extends React.Component {

    render () {

        let style = {
            ...styles,
            ...this.props.style
        }

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );

    }

}

export default TPanel;
