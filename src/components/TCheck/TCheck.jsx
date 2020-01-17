import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

/**
 * Represents checkbox with label
 */
class TCheck extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {checked: false};
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateChecked = this.updateChecked.bind(this);
    }

    componentDidMount() {
        this.updateChecked(this.props.value, false);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.updateChecked(this.props.value, false);
        }
    }

    handleIcon() {
        this.updateChecked(!this.state.checked, true);
    }

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    updateChecked(value, change) {
        let checked = value || value === this.props.checked;
        this.setState({checked: checked}, () => {
            if (change && this.props.onChange) {
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    value: checked ? this.props.checked : this.props.unchecked
                });
            }
        });
    }

    render () {

        let style = merge(
            contain(styles.TComponent),
            contain(styles.TCheck),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let label = null;
        if (this.props.label) {
            label =
                <div style={style.label}>
                    {this.props.label}
                </div>
        }

        let icon =
            <Icon
                style={style.icon}
                name={this.state.checked ? 'checked' : 'unchecked'}
                onClick={this.handleIcon} />;

        return (
            <div style={style.container}>
                <div style={style.frame} onClick={this.handleIcon} >
                    {label}
                    {icon}
                </div>
            </div>
        );

    }

}

TCheck.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component label */
        label: PropTypes.object,
        /** Style for component icon */
        icon: PropTypes.object
    }),
    /** Component initial value */
    value: PropTypes.any,
    /** Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** Label caption. Default is undefined and label is hidden */
    label: PropTypes.string,
    /** Checked state value */
    checked: PropTypes.any,
    /** Unchecked state value */
    unchecked: PropTypes.any,
    /**
     * On click event
     * @param {object} event event object with following structure:
     * @param {string} event.name component name from "name" property
     * @param {object} event.data component data from "data" property
     * @param {object} event.value component value. If component state is checked then "value" equals to
     * "checked" property. Otherwise it equals to "unchecked" property
     */
    onChange: PropTypes.func
};

TCheck.defaultProps = {
    checked: true,
    unchecked: false
};

export default TCheck;

