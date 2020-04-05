import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import {Icon} from '../../lib';

import styles from '../../styles';

class TPopup extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: props.show
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.show !== this.props.show) {
            this.setState({show: this.props.show});
        }
    }

    handleClick(event) {
        event.stopPropagation();
        this.setState({show: !this.state.show});
    }

    render () {

        let style = merge(
            contain(styles.TComponent),
            contain(styles.TPopup),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let icon = this.props.showIcon ?
            <Icon
                style={style.icon}
                name={this.state.show ? this.props.icons.up : this.props.icons.down} /> : null;

        let content = this.state.show ?
            <div style={style.content}>
                {this.props.children}
            </div> : null;

        return (
            <div style={style.container}>
                <div style={style.frame} onClick={this.handleClick}>
                    <div style={style.label}>
                        {this.props.label}
                    </div>
                    {icon}
                </div>
                {content}
            </div>
        );

    }

}

TPopup.propTypes = {
    style: PropTypes.object,
    label: PropTypes.string,
    show: PropTypes.any,
    showIcon: PropTypes.any,
    icons: PropTypes.object
};

TPopup.defaultProps = {
    showIcon: true,
    icons: {up: 'up', down: 'down'},
    show: false
};

export default TPopup;