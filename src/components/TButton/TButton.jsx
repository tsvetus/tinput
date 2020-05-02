import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain, apply} from '../../util';

import {styles} from '../../styles';

function getStyle(props, state) {

    let style = merge(
        styles.TButton,
        contain(styles[props.name]),
        contain(props.style)
    );

    let res = style.container;

    if (state.pressed) {
        res = merge(res, style.down);
    } else if (props.down) {
        res = merge(res, style.down);
    }

    if (props.wait || state.wait) {
        res = merge(res, style.wait);
    }

    if (props.next) {
        res.borderLeft = 'none'
    }

    return res;

}

/**
 * Clickable button with text caption
 */
class TButton extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            pressed: false,
            wait: false
        };
        this.style = getStyle(props, this.state);
        this.ref = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.updateStyle = this.updateStyle.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.updateStyle(this.style);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateStyle(getStyle(this.props, this.state));
    }

    handleClick() {
        if (this.props.wait || this.state.wait) {
            return;
        }
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data,
                down: this.props.down
            });
        }
        if (this.props.timeout) {
            this.setState({wait: true});
            setTimeout(() => {
                this.setState({wait: false});
            }, this.props.timeout);
        }
    }

    handleDown() {
        this.setState({pressed: true});
    }

    handleUp() {
        this.setState({pressed: false});
    }

    updateStyle(style) {
        if (this.ref.current) {
            apply(this.style, style, this.ref.current.style);
        }
    }

    render () {

        return (
            <div
                ref={this.ref}
                name={this.props.name}
                onMouseDown={this.handleDown}
                onMouseUp={this.handleUp}
                onMouseLeave={this.handleUp}
                onClick={this.handleClick}>
                    {this.props.children}
            </div>
        );

    }

}

TButton.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for waiting button state */
        wait: PropTypes.object,
        /** Style for pressed button state */
        down: PropTypes.object
    }),
    /** Component name */
    name: PropTypes.any,
    /** Component data */
    data: PropTypes.any,
    /**
     * Component wait state. When "true" component appears in grey color and doesn't respond
     * on "onClick" event
     */
    wait: PropTypes.any,
    /** If "true" button preserves pressed state */
    down: PropTypes.any,
    /** Time in milliseconds during which button stays inactive after click */
    timeout: PropTypes.number,
    /**
     * On click event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     */
    onClick: PropTypes.func
};

TButton.defaultProps = {
    wait: false,
    down: false
};

export default TButton;
