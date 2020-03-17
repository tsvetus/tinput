import React from 'react';
import PropTypes from 'prop-types';

import {nvl, merge} from '../../util';

/**
 * @class
 * @ignore
 */
class Input extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: nvl(props.value, ''),
            valid: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getValid = this.getValid.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.setState({valid: this.getValid(this.state.value)});
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        this.mounted = false;
    }

    componentDidUpdate(old) {
        if (nvl(old.value, '') !== nvl(this.props.value, '')) {
            let value = nvl(this.props.value, '');
            this.setState({value: value, valid: this.getValid(value)});
        }
    }

    getValid(value) {
        if (this.props.onValidate) {
            let valid = this.props.onValidate({
                data: this.props.data,
                name: this.props.name,
                value: value
            });
            return valid === true;
        } else {
            return true;
        }
    }

    handleChange(event) {
        let value = event.currentTarget.value;
        this.setState({value: value, valid: this.getValid(value)}, () => {
            if (this.props.onChange) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    if (this.mounted) {
                        this.props.onChange({
                            data: this.props.data,
                            name: this.props.name,
                            value: this.state.value
                        });
                    }
                }, this.props.timeout);
            }
        });
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick({
                data: this.props.data,
                name: this.props.name,
                value: this.state.value
            });
        }
    }

    render () {

        let style = this.state.valid ? this.props.vStyle :
            merge(this.props.vStyle, this.props.iStyle);

        console.log(this.state);

        return (
            <input
                name={this.props.name}
                style={style}
                type={this.props.type}
                value={this.state.value}
                placeholder={this.props.placeholder}
                autoComplete={this.props.autoComplete}
                onChange={this.handleChange}
                onKeyPress={this.props.onKeyPress}
                onKeyDown={this.props.onKeyDown}
                onClick={this.handleClick} />
        );

    }

}

Input.propTypes = {
    vStyle: PropTypes.object,
    iStyle: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    placeholder: PropTypes.string,
    timeout: PropTypes.number,
    type: PropTypes.string,
    autoComplete: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onValidate: PropTypes.func
};

Input.defaultProps = {
    timeout: 100
};

export default Input;
