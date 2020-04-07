import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from '../../lib';

import {merge, contain} from '../../util';

import styles from '../../styles';

/**
 * Represents checkbox with label
 */
class TCheck extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {checked: false};
        this.handleIcon = this.handleIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateChecked = this.updateChecked.bind(this);
        this.isRight = this.isRight.bind(this);
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

    isRight() {
        return this.props.layout && this.props.layout.indexOf('right') >= 0;
    }

    render () {

        let style = merge(
            styles.TComponent,
            styles.TCheck,
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let label = null;
        if (this.props.label) {
            let ls = this.isRight() ? merge(style.label, style.right) : style.label;
            label =
                <div style={ls}>
                    {this.props.label}
                </div>
        }

        let iconName = this.props.radio ?
            (this.state.checked ? 'selected' : 'unselected') :
            (this.state.checked ? 'checked' : 'unchecked');
        let icon =
            <Icon
                style={style.icon}
                name={iconName}
                onClick={this.handleIcon} />;

        let content = this.isRight() ?
            <div style={style.frame} onClick={this.handleIcon} >
                {icon}
                {label}
            </div> :
            <div style={style.frame} onClick={this.handleIcon} >
                {label}
                {icon}
            </div>;

        return (
            <div style={style.container}>
                {content}
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
    name: PropTypes.any,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** Label caption. Default is undefined and label is hidden */
    label: PropTypes.string,
    /** Checked state value */
    checked: PropTypes.any,
    /** Unchecked state value */
    unchecked: PropTypes.any,
    /** Shows component icons as radio buttons */
    radio: PropTypes.any,
    /** Label position towards icon. Can be one of: */
    layout: PropTypes.oneOf([
        'left',
        'right'
    ]),
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
    unchecked: false,
    radio: false,
    layout: 'left'
};

export default TCheck;

