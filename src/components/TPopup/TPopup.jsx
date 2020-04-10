import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain} from '../../util';

import {Icon} from '../../lib';

import styles from '../../styles';

/**
 * Component hides/shows it's content
 */
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
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        this.setState({show: !this.state.show});
    }

    render () {

        let style = merge(
            styles.TComponent,
            styles.TPopup,
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let icon = this.props.showIcon ?
            <Icon
                style={style.icon}
                onClick={this.handleClick}
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
    /** Component caption */
    label: PropTypes.string,
    /** Shows/Hides content tab */
    show: PropTypes.any,
    /** Show/Hide content tab state indicator */
    showIcon: PropTypes.any,
    /** Icons used as content tab state indicator */
    icons: PropTypes.object
};

TPopup.defaultProps = {
    showIcon: true,
    icons: {up: 'up', down: 'down'},
    show: false
};

export default TPopup;