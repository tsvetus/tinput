import React from 'react';

import styles from './styles.js';

class TIndicator extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render () {

        let style = {
            ...styles,
            ...this.props.style
        }

        let char = (this.props.open === true) ? '&#8593;' : '&#8595;';

        return (
            <div style={style} dangerouslySetInnerHTML={{ __html: char}}></div>
        );

    }

}

export default TIndicator;
