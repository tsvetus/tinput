import React from 'react';
import PropTypes from 'prop-types';

import Edit from '../Edit';

import {Format, compare} from '../../util';

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

class Mask extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.formatter = createFormatter(props);
        this.editor = React.createRef();
        this.handleValidate = this.handleValidate.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if (this.props.onMounted) {
            this.props.onMounted({editor: this.editor.current});
        }
    }

    componentDidUpdate(old) {
        if (this.formatter && !compare(old.format, this.props.format)) {
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

    validate(event) {
        if (this.props.onValidate) {
            return this.props.onValidate(event);
        } else {
            return true;
        }
    }

    handleValidate(event) {
        let r = this.props.required ? '' + this.props.required : '';
        if (this.formatter) {
            if (r.startsWith('al')) {
                return this.formatter.isFull ? this.validate(event) : false;
            } else if (r.startsWith('en')) {
                if (this.formatter.isEmpty) {
                    return true;
                } else if (this.formatter.isFull) {
                    return this.validate(event);
                } else {
                    return false
                }
            } else {
                return true;
            }
        } else {
            if (r.startsWith('al') || r.startsWith('en')) {
                return this.validate(event);
            } else {
                return true;
            }

        }
    }

    render () {

        let handleMask = null;
        if (this.props.onMask) {
            handleMask = this.props.onMask;
        } else if (this.formatter) {
            handleMask = this.formatter.parse;
        }

        return (

            <Edit
                ref={this.editor}
                simple={this.props.simple}
                style={this.props.style}
                value={this.props.value}
                name={this.props.name}
                data={this.props.data}
                wrap={this.props.wrap}
                placeholder={this.props.placeholder}
                timeout={this.props.timeout}
                empty={this.props.empty}
                readOnly={this.props.readOnly}
                required={this.props.required}
                onKeyDown={this.props.onKeyDown}
                onClick={this.props.onClick}
                onChange={this.props.onChange}
                onValidate={this.handleValidate}
                onValidChange={this.props.onValidChange}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onMask={handleMask}
                onStyle={this.props.onStyle} />

        );

    }

}

Mask.propTypes = {
    simple: PropTypes.any,
    style: PropTypes.object,
    value: PropTypes.any,
    name: PropTypes.string,
    data: PropTypes.any,
    wrap: PropTypes.any,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    format: PropTypes.object,
    empty: PropTypes.any,
    readOnly: PropTypes.any,
    required: PropTypes.any,
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onMask: PropTypes.func,
    onValidate: PropTypes.func,
    onValidChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onStyle: PropTypes.func,
    onMounted: PropTypes.func
};

Mask.defaultProps = {
    empty: null,
    required: 'always'
};

export default Mask;
