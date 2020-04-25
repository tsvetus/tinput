import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import {styles} from '../../styles';

/**
 * Groups components in a single block
 */
class TGroup extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
    }


    render () {

        let style = merge(
            {label: styles.TComponent.label},
            styles.TGroup,
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        return (
            <div style={style.container}>
                {label}
                <div style={style.content}>
                    {this.props.children}
                </div>
            </div>
        );

    }

}

TGroup.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component label */
        label: PropTypes.object,
        /**
         * Style for group content. By default content is a "flex box" so it is possible to use
         * "flex" styles without specifying "display: 'flex'" in "content" section
         */
        content: PropTypes.object
    }),
    /** Label caption. Default is undefined and label is hidden */
    label: PropTypes.string
};

export default TGroup;
