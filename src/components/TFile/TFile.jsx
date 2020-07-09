import React from 'react';
import PropTypes from 'prop-types';

import {Text} from '../../lib';

import {merge, contain, Uploader} from '../../util';

import {styles} from '../../styles';

/**
 * Component representing File picker
 */
class TFile extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.handleIcon = this.handleIcon.bind(this);
        this.change = this.change.bind(this);
        this.uploader = new Uploader();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.setState({value: this.props.value});
        }
    }

    componentWillUnmount() {
        this.uploader.free();
    }

    change(event) {
        this.setState({value: event.file}, () => {
            if (this.props.onChange) {
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    value: event.file
                });
            }
        });
    }

    handleIcon(event) {
        this.uploader.open({
            change: (e) => {
                this.change(e);
            }
        });
        if (this.props.onIcon) {
            this.props.onIcon(event);
        }
    }

    render () {

        let style = merge(
            styles.TComponent,
            styles.TText,
            styles.TFile,
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let value = this.state.value && this.state.value.name ? this.state.value.name : null;

        return (
            <Text
                style={style}
                data={this.props.data}
                name={this.props.name}
                value={value}
                label={this.props.label}
                icon={this.props.icon}
                nestedIcon={this.props.nestedIcon}
                timeout={this.props.timeout}
                placeholder={this.props.placeholder}
                regexp={this.props.regexp}
                empty={this.props.empty}
                required={this.props.required}
                changeStyle={this.props.changeStyle}
                readOnly={this.props.readOnly}
                layout={this.props.layout}
                onKeyDown={this.props.onKeyDown}
                onValidate={this.props.onValidate}
                onIcon={this.handleIcon}
                onChange={this.props.onChange} />
        );

    }

}

TFile.upload = (params, vars) => {
    let uploader = new Uploader();
    uploader.upload(params, vars);
};

TFile.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component label */
        label: PropTypes.object,
        /** Style for component editor */
        edit: PropTypes.object,
        /** Style for component icon */
        icon: PropTypes.object,
        /** Style for invalid component state. Contains all listed above fields: */
        invalid:  PropTypes.shape({
            container: PropTypes.object,
            label: PropTypes.object,
            edit: PropTypes.object,
            icon: PropTypes.object
        })
    }),
    /** File object */
    value: PropTypes.objectOf(File),
    /**
     * Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** Label caption. Default is undefined and label is hidden */
    label: PropTypes.string,
    /** Icon name to show. Default is undefined and icon is hidden */
    icon: PropTypes.string,
    /** Determines icon location in or out of the editor box */
    nestedIcon: PropTypes.any,
    /** Represents timeout for "onChange" event in milliseconds. Default is "700" */
    timeout: PropTypes.number,
    /** Text to show when editor is empty */
    placeholder: PropTypes.string,
    /** Label position towards text editor. Can be one of: */
    layout: PropTypes.oneOf([
        'top',
        'left'
    ]),
    /** Value appeared in onChange event when editor is empty. Default is "null" */
    empty: PropTypes.any,
    /** Prevents from changing component value from user input, Default is "false" */
    readOnly: PropTypes.any,
    /**
     * On text change event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.value Entered text.
     */
    onChange: PropTypes.func,
    /**
     * On icon click event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.icon Clicked icon name
     */
    onIcon: PropTypes.func,
    /**
     * On text validate event. Fires if text validation is needed. Must return "true" if text is valid or
     * "false" in other cases
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.value Text to validate
     */
    onValidate: PropTypes.func,
    onKeyDown: PropTypes.func
};

TFile.defaultProps = {
    required: 'always',
    empty: null,
    readOnly: true,
    layout: 'left',
    timeout: 300,
    nestedIcon: true,
    icon: 'open'
};

export default TFile;
