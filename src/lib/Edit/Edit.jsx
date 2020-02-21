import React from 'react';
import PropTypes from 'prop-types';

import {TIMEOUT, nvl, apply, merge, strip, flood} from '../../util';

import styles from '../../styles';

class Edit extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.ref = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.getHtml = this.getHtml.bind(this);
        this.setHtml = this.setHtml.bind(this);
        this.getText = this.getText.bind(this);
        this.setText = this.setText.bind(this);
        this.getCaret = this.getCaret.bind(this);
        this.setCaret = this.setCaret.bind(this);
        this.showPlaceholder = this.showPlaceholder.bind(this);
        this.hidePlaceholder = this.hidePlaceholder.bind(this);
        this.updateStyle = this.updateStyle.bind(this);
        this.sendValue = this.sendValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.validate = this.validate.bind(this);
        this.parseValue = this.parseValue.bind(this);
        this.vStyle = props.vStyle;
        this.iStyle = merge(props.vStyle, props.iStyle);
        this.value = props.value === undefined ? null : props.value;
        this.caret = 0;
        this.valid = true;
        this.full = true;
        this.empty = false;
        this.sending = false;
    }

    componentDidMount() {
        this.mounted = true;
        this.validate(this.value);
        this.updateStyle(this.valid);
        this.setText(this.value);
        this.setCaret(this.caret);
        this.showPlaceholder();
        this.ref.current.addEventListener('input', this.handleChange);
        this.ref.current.addEventListener('keypress', this.handleKeyPress);
        this.ref.current.addEventListener('keydown', this.handleKeyDown);
        this.ref.current.addEventListener('click', this.handleClick);
        this.ref.current.addEventListener('focus', this.handleFocus);
        this.ref.current.addEventListener('blur', this.handleBlur);
        this.ref.current.addEventListener('paste', this.handlePaste);
    }

    componentWillUnmount() {
        this.mounted = false;
        this.ref.current.removeEventListener('paste', this.handlePaste);
        this.ref.current.removeEventListener('blur', this.handleBlur);
        this.ref.current.removeEventListener('focus', this.handleFocus);
        this.ref.current.removeEventListener('click', this.handleClick);
        this.ref.current.removeEventListener('keydown', this.handleKeyDown);
        this.ref.current.removeEventListener('keypress', this.handleKeyPress);
        this.ref.current.removeEventListener('input', this.handleChange);
    }

    componentDidUpdate(old) {

        if (old.vStyle !== this.props.vStyle || old.iStyle !== this.props.iStyle) {
            this.vStyle = this.props.vStyle;
            this.iStyle = merge(this.props.vStyle, this.props.iStyle);
            this.updateStyle(this.valid);
        }

        if (!this.sending && this.value !== this.props.value && (this.ref.current !== document.activeElement)) {
            this.setValue(this.props.value);
        }

        this.sending = false;

    }

    setValue(value) {
        this.value = value === undefined ? null : value;
        this.validate(this.value);
        this.updateStyle(this.valid);
        this.setText(this.value);
        if (!this.props.wrap) {
            this.setCaret(this.caret);
        }
        this.showPlaceholder();
    }

    validate(value) {

        let res = this.parseValue(value);

        this.valid = res.valid;
        this.value = res.value;
        this.caret = res.caret;
        this.full = res.full;
        this.empty = res.empty;

    }

    parseValue(value) {

        let query = {
            value: value,
            caret: this.getCaret(),
            full: this.full,
            empty: this.empty,
            key: this.key
        };

        if (this.props.onMask) {
            query = this.props.onMask({
                name: this.props.name,
                data: this.props.data,
                ...query
            });
        }

        let valid = this.valid;
        if (this.props.onValidate) {
            valid = this.props.onValidate({
                name: this.props.name,
                data: this.props.data,
                value: query.value,
                full: query.full,
                empty: query.empty
            });
        }

        return {
            valid: valid,
            value: query.value,
            caret: query.caret,
            full: query.full,
            empty: query.empty
        }

    }

    updateStyle(valid) {
        if (this.mounted) {
            if (valid) {
                apply(this.iStyle,  this.vStyle,  this.ref.current.style);
            } else {
                apply(this.vStyle,  this.iStyle,  this.ref.current.style);
            }
        }
    }

    showPlaceholder() {
        if (this.props.placeholder && nvl(this.getText(), '') === '' &&
            nvl(this.getHtml(), '').indexOf('<span') < 0) {
             this.setHtml('<span style="pointer-events: none; color: ' + styles.colors.placeholder + ';">' +
                 this.props.placeholder + '</span>');
        }
    }

    hidePlaceholder() {
        let html = nvl(this.getHtml(), '');
        if (html.indexOf('<span') >= 0) {
            this.setHtml(html.replace(/<span.*<\/span>/, ''));
        }
    }

    getHtml() {
        return this.ref.current.innerHTML;
    }

    setHtml(html) {
        this.mute = true;
        try {
            this.ref.current.innerHTML = html;
        } finally {
            this.mute = false;
        }
    }

    getText() {
        let text = nvl(this.getHtml(), '');
        if (text.indexOf('<span') < 0) {
            if (this.props.html) {
                if (this.props.wrap) {
                    return text;
                } else {
                    let st = strip(text);
                    if (st && typeof st === 'string') {
                        return strip(text).replace(/<br>/gm, '');
                    }
                }
            } else {
                return this.ref.current.innerText;
            }
        }
        return this.props.empty;
    }

    setText(text) {
        if (this.props.html) {
            if (this.props.wrap) {
                this.setHtml(nvl(text,''));
            } else {
                this.setHtml(flood(nvl(text,'')));
            }
        } else {
            this.ref.current.innerHTML = text;
        }
    }

    getCaret() {
        if (this.ref.current === document.activeElement && document.getSelection().rangeCount > 0) {
            let _range = document.getSelection().getRangeAt(0);
            let range = _range.cloneRange();
            range.selectNodeContents(this.ref.current);
            range.setEnd(_range.endContainer, _range.endOffset);
            return range.toString().length;
        } else {
            return this.caret;
        }
    }

    setCaret(caret) {
        if (this.ref.current === document.activeElement) {
            let text = nvl(this.getText(), '');
            let length = text.length;
            if (caret > length) {
                document.getSelection().collapse(this.ref.current.firstChild, length);
            } else {
                document.getSelection().collapse(this.ref.current.firstChild, caret);
            }
        }
    }

    sendValue(value) {
        if (this.props.onChange) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                if (this.mounted) {
                    this.sending = true;
                    this.props.onChange({
                        data: this.props.data,
                        name: this.props.name,
                        value: value
                    });
                }
            }, this.props.timeout);
        }
    }

    handlePaste(event) {
        // event.preventDefault();
        // this.mute = true;
        // try {
        //     let text = (event.clipboardData || window.clipboardData).getData('text');
        //     if (text) {
        //         let old = nvl(this.getText(), '');
        //         let caret = this.getCaret();
        //         this.setText(old.substring(0, caret) + text + old.substring(caret));
        //         this.value = this.getText();
        //         this.setCaret(this.value.length);
        //         this.handleChange();
        //     }
        // } finally {
        //     this.mute = false;
        // }
    }

    handleChange() {

        if (this.mute || !this.mounted) {
            return;
        }

        clearTimeout(this.timer);

        this.value = this.getText();
        if (this.value === '') {
            this.value = this.props.empty;
        }

        let res = this.parseValue(this.value);

        if (this.props.onInput) {
            this.props.onInput({
                data: this.props.data,
                name: this.props.name,
                value: this.value
            });
        }

        if (!this.props.wrap) {
            this.setText(res.value);
        }

        if (res.caret === 0) {
            this.ref.current.focus();
        } else if (!this.props.wrap) {
            this.setCaret(res.caret);
        }

        if (this.valid !== res.valid) {
            this.updateStyle(res.valid);
        }

        if (!res.valid || !res.full) {
            res.value = this.props.empty;
        }

        this.sendValue(res.value);

        this.value = res.value;
        this.valid = res.valid;
        this.empty = res.empty;
        this.full = res.full;

    }

    handleKeyPress(event) {
        this.hidePlaceholder();
        if (!this.props.wrap && event.keyCode === 13) {
            event.preventDefault();
        } else if (this.props.readOnly) {
            event.preventDefault();
        }
    }

    handleKeyDown(event) {
        this.key = event.keyCode;
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
        if (this.props.readOnly) {
            if (event.keyCode !== 9) {
                event.preventDefault();
            }
        }
    }

    handleClick() {
        this.hidePlaceholder();
        if (this.props.onClick) {
            this.props.onClick({
                data: this.props.data,
                name: this.props.name,
                value: this.value
            });
        }
    }

    handleFocus() {
        this.hidePlaceholder();
        if (this.props.onFocus) {
            this.props.onFocus({
                data: this.props.data,
                name: this.props.name,
                value: this.value
            });
        }
    }

    handleBlur() {
        if (this.props.onBlur) {
            this.props.onBlur({
                data: this.props.data,
                name: this.props.name,
                value: this.value
            });
        }
        this.showPlaceholder();
    }

    render () {

        return (
            <div
                ref={this.ref}
                contentEditable={true} />
        );

    }

}

Edit.propTypes = {
    vStyle: PropTypes.object,
    iStyle: PropTypes.object,
    value: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.any,
    wrap: PropTypes.any,
    html: PropTypes.any,
    placeholder: PropTypes.string,
    timeout: PropTypes.number,
    readOnly: PropTypes.any,
    empty: PropTypes.any,
    password: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onMask: PropTypes.func,
    onKeyDown: PropTypes.func,
    onValidate: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onInput: PropTypes.func
};

Edit.defaultProps = {
    empty: null,
    readOnly: false,
    wrap: false,
    html: false,
    timeout: TIMEOUT
};

export default Edit;
