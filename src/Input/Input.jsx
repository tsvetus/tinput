import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import styles from './styles.js';

import Text from './Text';
import Search from './Search';
import Password from './Password';
import Memo from './Memo';
import Listbox from './Listbox';
import Date from './Date';
import Time from './Time';
import Checkbox from './Checkbox';
import Test from './Test';
import List from './List';
import Icon from '../Icon';

class Input extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {showList: false}
        this.handleChange = this.handleChange.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
    }

    handleChange(event, value) {
        this.props.onChange({
            value: value,
            name: this.props.name,
            data: this.props.data
        });
    }

    handleDropDown(rect) {
        this.listPlace = {
            left: rect.left,
            top: rect.bottom
        }
        this.setState({showList: true});
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        let content = null;
        let button = null;

        switch (this.props.type) {

            case 'checkbox':
                content = (
                    <Checkbox
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        caption={this.props.caption}
                        onChange={this.handleChange} />
                );
            break;

            case 'date':
                content = (
                    <Date
                        style={style.edit}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange} />
                );
            break;

            case 'time':
                content = (
                    <Time
                        style={style.edit}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange} />
                );
            break;

            case 'listbox':
                content = (
                    <Test
                        style={style.edit}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        items={this.props.items}
                        empty={this.props.empty}
                        onChange={this.handleChange}
                        onDropDown={this.handleDropDown} />
                );
                button = (
                    <Icon name="up" />
                );
            break;

            case 'memo':
                content = (
                    <Memo
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange} />
                );
            break;

            case 'password':
                content = (
                    <Password
                        style={style.edit}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange} />
                );
            break;

            case 'search':
                content = (
                    <Search
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        list={this.props.list}
                        onSearch={this.props.onSearch}
                        onChange={this.handleChange} />
                );
            break;

            case 'text':
                content = (
                    <Text
                        style={style.edit}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange} />
                );
            break;

            case 'mask':
                content = (
                    <Mask
                        style={style.edit}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange} />
                );
            break;

        }

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let list = null;
        if (this.state.showList) {
            list = (
                <List
                    items={this.props.items}
                    empty={this.props.empty}
                    place={this.listPlace}
                />
            );
        }

        return (
            <div style={style.container}>
                {label}
                {content}
                {button}
                {list}
            </div>
        );

    }

}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    empty: PropTypes.object,
    list: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func
}

export default Input;
