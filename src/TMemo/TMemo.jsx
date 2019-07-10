import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles, TIMEOUT} from '../util';

import styles from './styles.js';
import './styles.css';

class TMemo extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value ? props.value : '',
            height: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.ref = React.createRef();
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({
                value: this.props.value ? this.props.value : '',
                height: this.ref.current.scrollHeight});
        }
    }

    componentDidMount() {
        this.setState({height: this.ref.current.scrollHeight});
    }

    handleChange(event) {
        if (!this.height) {
            this.height = this.ref.current.scrollHeight + 4;
        }
        let h = this.ref.current.scrollHeight;
        let v = event.currentTarget.value;
        if (h > this.height) {
            this.setState({
                value: v,
                height: h
            });
        } else {
            this.setState({
                value: v
            });
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                if (this.props.valueNull && v !== null && v.length === 0) {
                    v = null;
                }
                this.props.onChange({
                    value: v,
                    name: this.props.name,
                    data: this.props.data
                });
            },
            TIMEOUT
        );
    }

    render () {

        let st = {};
        if (this.props.autoSize) {
            st.edit = {
                height: this.state.height ? this.state.height + 'px' : 'auto',
                flex: null
            }
        }

        let style = mergeStyles(styles, this.props.style, st);

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let content = (
            <textarea
                ref={this.ref}
                style={style.edit}
                value={this.state.value}
                onChange={this.handleChange}>
            </textarea>
        );

        return (
            <div style={style.container}>
                {label}
                    {content}
            </div>
        );

    }

}

TMemo.propTypes = {
    style: PropTypes.object,
    data: PropTypes.object,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoSize: PropTypes.any,
    valueNull: PropTypes.any
}

export default TMemo;
