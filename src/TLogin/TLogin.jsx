import React from 'react';
import PropTypes from 'prop-types';

import TButton from '../TButton';
import TText from '../TText';

import {mergeStyles} from '../util';

import styles from './styles.js';

class TLogin extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: null,
            password: null
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event) {
        this.props.onLogin(this.state.username, this.state.password);
    }

    handleChange(event) {
        this.setState({
            [event.name]: event.value
        });
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        return (
            <div style={style.container}>
                <TText
                    style={style.input}
                    name="username"
                    placeholder="Имя пользователя"
                    value={this.state.username}
                    onChange={this.handleChange} />
                <TText
                    style={style.input}
                    name="password"
                    password={true}
                    placeholder="Пароль"
                    value={this.state.password}
                    onChange={this.handleChange} />
                <TButton
                    style={style.button}
                    onClick={this.handleClick}>
                    Submit
                </TButton>
            </div>
        );

    }

}

TLogin.propTypes = {
    user: PropTypes.object,
    store: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired
}

export default TLogin;
