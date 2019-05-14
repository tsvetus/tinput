import React from 'react';

import styles from './styles.js';

class TPanel extends React.Component {

    render () {

        let dir = {};
        if (this.props.dir === 'row') {
            dir = {
                display: "flex",
                flexDirection: "row"
            }
        }

        let style = {
            ...styles,
            ...dir,
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
