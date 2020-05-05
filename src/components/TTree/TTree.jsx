import React from 'react';
import PropTypes from 'prop-types';

import {merge} from '../../util';

import {styles} from '../../styles';

/**
 * Component representing simple text editor
 */
class TTree extends React.PureComponent {

    constructor (props) {
        super(props);
        this.getContent = this.getContent.bind(this);
    }

    getContent(items) {
        
    }

    render () {

        let style = merge(
            styles.TTree,
            styles[this.props.name],
            this.props.style
        );

        return (

            <div style={style.container}>

            </div>

        );

    }

}

TTree.propTypes = {
    /** Component style: */
    style: PropTypes.object,
    /** Component initial value */
    value: PropTypes.string,
    /**
     * Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /**
     * On text change event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.value Entered text.
     */
    onChange: PropTypes.func
};

TTree.defaultProps = {
};


export default TTree;
