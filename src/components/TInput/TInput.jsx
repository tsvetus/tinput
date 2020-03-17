import React from 'react';
import PropTypes from 'prop-types';

import {Input, Icon} from '../../lib';

import {merge} from '../../util';

import styles from '../../styles';

/**
 * Form Input
 */
class TInput extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {valid: true};
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleIcon() {
        if (this.props.onIcon) {
            this.props.onIcon({
                data: this.props.data,
                name: this.props.name,
                icon: this.props.icon,
                value: this.props.value
            });
        }
    }

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange({
                ...event,
                icon: this.props.icon
            })
        }
    }

    render () {

        let style = merge(
            styles.TComponent,
            styles.TInput,
            styles[this.props.name],
            this.props.style
        );

        let label = null;
        if (this.props.label) {
            label = (
                <div style={style.label}>
                    {this.props.label}
                </div>
            )
        }

        let icon = null;
        if (this.props.icon) {
            icon = (
                <Icon
                    style={style.icon}
                    name={this.props.icon}
                    onClick={this.handleIcon} />
            )
        }

        let top = this.props.layout && this.props.layout.indexOf('top') >= 0;

        return (
            <div style={style.container}>
                {top ? label : null}
                <div style={style.frame}>
                    {!top ? label : null}
                    <Input
                        vStyle={style.edit}
                        iStyle={style.invalid.edit}
                        data={this.props.data}
                        name={this.props.name}
                        value={this.props.value}
                        timeout={this.props.timeout}
                        type={this.props.type}
                        autoComplete={this.props.autoComplete}
                        placeholder={this.props.placeholder}
                        onKeyPress={this.props.onKeyPress}
                        onKeyDown={this.props.onKeyDown}
                        onChange={this.handleChange}
                        onValidate={this.props.onValidate} />
                    {icon}
                </div>
            </div>
        );

    }

}

TInput.propTypes = {
    style: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    icon: PropTypes.string,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    autoComplete: PropTypes.string,
    layout: PropTypes.string,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onChange: PropTypes.func,
    onValidate: PropTypes.func,
    onIcon: PropTypes.func,
};

export default TInput;
