import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import styles from '../../styles';

class TPanel extends React.Component {

    render () {

        let dir = {};
        if (this.props.dir === 'row') {
            dir = {
                container: {
                    flexDirection: "row"
                }
            }
        }

        let align = {};
        if (this.props.align === 'right') {
            align = {
                container: {
                    justifyContent: "flex-end"
                }
            }
        }

        let style = merge(
            contain(styles.TPanel),
            contain(styles[this.props.name]),
            dir,
            align,
            contain(this.props.style)
        );

        return (
            <div style={style.container}>
                {this.props.children}
            </div>
        );

    }

}

TPanel.propTypes = {
    style: PropTypes.object,
    dir: PropTypes.string,
    align: PropTypes.string
};

export default TPanel;
