import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import styles from './styles.js';

import List from '../List';
import Icon from '../Icon';

class Search extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.value,
            inputValue: '',
            showList: false,
            items: [],
            autoFocus: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.inputRef = React.createRef();
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({value: this.props.value});
        }
    }

    handleInputChange(event) {
        let v = event.currentTarget.value;
        let items = [];
        if (v && v.length > 2) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                items = this.props.onSearch({
                    id: null,
                    name: v
                });
                if (!items || !Array.isArray(items)) {
                    items = [];
                }
                this.updateRect();
                this.setState({
                    inputValue: v ? v : '',
                    items: items,
                    showList: items.length > 0,
                    autoFocus: false
                });
            }, 1500);
        }
        this.setState({
            inputValue: v ? v : ''
        });
    }

    handleChange(event) {
        if (event) {
            this.props.onChange({
                value: event.value,
                caption: event.name,
                name: this.props.name,
                data: this.props.data
            });
            this.setState({
                showList: false,
                inputValue: this.props.empty && event.value ==
                    this.props.empty.id ? '' : event.name,
                value: event.value
            });
        } else {
            this.setState({
                showList: false
            });
        }
    }

    handleButtonClick() {
        this.updateRect();
        this.setState({showList: !this.state.showList});
    }

    handleKey(event) {
        if (event.keyCode == 40) {
            this.setState({autoFocus: true});
        }
    }

    updateRect() {
        let rect = this.inputRef.current.getBoundingClientRect();
        this.listPlace = {
            top: rect.bottom + 4 + 'px',
            left: rect.left + 'px',
            width: rect.width + 'px'
        }
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        let label = null;
        if (this.props.label) {
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let content = (
            <input
                value={this.state.inputValue}
                placeholder={this.props.placeholder}
                style={style.edit}
                ref={this.inputRef}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKey} />
        );

        let button = (
            <Icon
                name={this.state.showList ? "up" : "down"}
                onClick={this.handleButtonClick} />
        );

        let list = null;
        if (this.state.showList && this.state.items.length > 0) {
            list = (
                <List
                    value={this.state.value}
                    style={{container: style.list, item: style.item}}
                    items={this.state.items}
                    place={this.listPlace}
                    onSelect={this.handleChange}
                    autoFocus={this.state.autoFocus}
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

Search.propTypes = {
    name: PropTypes.string.isRequired,
    empty: PropTypes.object,
    list: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
}

export default Search;
