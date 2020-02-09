import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import styles from '../../styles';

import TButton from "../TButton";

class TResponse extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClose) {
            this.props.onClose({
                name: this.props.name,
                data: this.props.data
            })
        }
    }

    render () {

        let style = merge(
            contain(styles.TResponse),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let content = null;
        if (this.props.children) {
            if (this.props.error || this.props.message) {
                content =
                    <TButton
                        style={style.button}
                        onClick={this.handleClick}>
                            {'Ok'}
                    </TButton>;
            } else {
                content = this.props.children;
            }
        }

        return (
            <div style={style.container}>
                <div style={style.error}
                        dangerouslySetInnerHTML={{ __html: this.props.error}}>
                </div>
                <div style={style.message}
                        dangerouslySetInnerHTML={{ __html: this.props.message}}>
                </div>
                {content}
            </div>
        );

    }

}

TResponse.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    error: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func
};

export default TResponse;
