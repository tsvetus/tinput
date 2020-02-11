import React from 'react';
import PropTypes from 'prop-types';

import Edit from '../Edit';

import {Format} from '../../util';

function createFormatter(props) {
    if (props.format && !props.onMask) {
        return new Format(
            props.format.mask,
            props.format.empty ? props.format.empty : '_',
            props.format.full ? props.format.full : true,
            props.value
        );
    } else {
        return undefined;
    }
}

class Mask extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.formatter = createFormatter(props);
        this.handleValidate = this.handleValidate.bind(this);
    }

    componentDidUpdate(old) {
        if (old.format !== this.props.format && this.formatter) {
            if (this.formatter) {
                delete this.formatter;
                this.formatter = createFormatter(this.props);
            }
        }
    }

    componentWillUnmount() {
        if (this.formatter) {
            delete this.formatter;
        }
    }

    handleValidate(event) {
        if (this.props.onValidate) {
            if (this.formatter) {
                return this.props.onValidate({
                    ...event,
                    empty: this.formatter.isEmpty(),
                    full: this.formatter.isFull()
                });
            } else {
                return this.props.onValidate({
                    ...event,
                    empty: false,
                    full: true
                });
            }
        } else {
            return true;
        }
    }

    render () {

        console.log('Render: ' + this.props.value);

        let handleMask = null;
        if (this.props.onMask) {
            handleMask = this.props.onMask;
        } else if (this.formatter) {
            handleMask = this.formatter.parse;
        }

        let handleValidate = this.props.onValidate ? this.props.onValidate : null;

        return (

            <Edit
                vStyle={this.props.vStyle}
                iStyle={this.props.iStyle}
                value={this.props.value}
                name={this.props.name}
                data={this.props.data}
                wrap={this.props.wrap}
                placeholder={this.props.placeholder}
                timeout={this.props.timeout}
                empty={this.props.empty}
                readOnly={this.props.readOnly}
                onClick={this.props.onClick}
                onChange={this.props.onChange}
                onValidate={handleValidate}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onMask={handleMask} />

        );

    }

}

Mask.propTypes = {
    vStyle: PropTypes.object,
    iStyle: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    wrap: PropTypes.any,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    format: PropTypes.object,
    empty: PropTypes.any,
    readOnly: PropTypes.any,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onMask: PropTypes.func,
    onValidate: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

Mask.defaultProps = {
    empty: null
};

export default Mask;
