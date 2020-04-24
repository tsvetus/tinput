import React from 'react';
import PropTypes from 'prop-types';

import TForm from '../TForm';
import TInput from '../TInput';

import {merge} from '../../util';

import {styles} from '../../styles';

class TLogin extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: null,
            password: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        this.setValue(this.props.value);
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setValue(this.props.value);
        }
    }

    setValue(value) {
        if (value) {
            this.setState({
                username: value.username,
                password: value.password
            });
        }
    }

    handleClick(event) {
        if (event.button === 'ok') {
            if (this.props.onClear) {
                this.props.onClear();
            }
        } else {
            if (this.props.onLogin) {
                this.props.onLogin({
                    name: this.props.name,
                    data: this.props.data,
                    button: event.button,
                    value: {
                        username: this.state.username,
                        password: this.state.password
                    }
                });
            }
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleClick({button: 'submit'});
        }
    }

    handleChange(event) {
        this.setState({
            [event.name]: event.value
        });
    }

    render () {

        let style = merge(
            styles.TModal,
            styles.TForm,
            styles.TLogin,
            styles[this.props.name],
            this.props.style
        );

        return (

            <TForm
                style={style}
                wait={this.props.wait}
                name={this.props.name}
                data={this.props.data}
                show={this.props.show}
                error={this.props.error}
                showHeader={false}
                buttons={{
                    'cancel': this.props.labels.cancel,
                    'submit': this.props.labels.submit
                }}
                onClose={this.handleClick}>

                <form style={style.form}>

                    <TInput
                        style={style.component}
                        name={'username'}
                        autoComplete={'username'}
                        type={'text'}
                        layout={'top'}
                        label={this.props.labels.username}
                        placeholder={this.props.placeholders.username}
                        value={this.state.username}
                        timeout={1}
                        onChange={this.handleChange} />

                    <TInput
                        style={style.component}
                        name={'password'}
                        autoComplete={'new-password'}
                        type={'password'}
                        layout={'top'}
                        label={this.props.labels.password}
                        placeholder={this.props.placeholders.password}
                        value={this.state.password}
                        timeout={1}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleChange} />

                </form>

            </TForm>

        );

    }

}

TLogin.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    wait: PropTypes.any,
    labels: PropTypes.object,
    value: PropTypes.object,
    error: PropTypes.string,
    placeholders: PropTypes.object,
    show: PropTypes.any,
    onLogin: PropTypes.func,
    onClear: PropTypes.func
};

TLogin.defaultProps = {
    labels: {
        username: 'Login:',
        password: 'Password:',
        submit: 'Submit',
        cancel: 'Cancel'
    },
    placeholders: {
        username: 'Enter login name',
        password: 'Enter password'
    }
};

export default TLogin;
