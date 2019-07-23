import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import styles from './styles.js';

import List from '../List';
import TIcon from '../TIcon';

class TListBox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value,
            inputValue: this.findName(props.value, props.items),
            showList: false
        };
        this.findName = this.findName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.ref = React.createRef();
    }

    compare(a, b) {
        let aa = a ? a : [];
        let bb = b ? b : [];
        return aa.length == bb.length;
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value ||
            !this.compare(old.items, this.props.items)) {
            this.setState({
                value: this.props.value,
                inputValue: this.findName(this.props.value, this.props.items)
            });
        } else if (this.props.value !== this.state.value && this.props.value === null) {
            this.setState({
                value: this.props.value,
                inputValue: this.findName(this.props.value, this.props.items)
            });
        }
    }

    findName(id, items) {
        if (items) {
            let item = items.find((v) => {
                return v.id == id;
            });
            return item ? item.name : '';
        } else {
            return '';
        }
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
                inputValue: this.props.empty && (event.value ==
                    this.props.empty.id || event.value == this.props.empty.code) ? '' : event.name,
                value: event.value
            });
        } else {
            this.setState({
                showList: false
            });
        }
    }

    handleButtonClick() {
        let rect = this.ref.current.getBoundingClientRect();
        this.listPlace = {
            top: 0,
            left: 0,
            width: rect.width + 'px'
        };
        this.setState({showList: !this.state.showList});
    }

    getShowButton(props) {
        if (props.showButton === null || props.showButton === undefined) {
            return true;
        } else if (props.showButton) {
            return true;
        } else {
            return false;
        }
    }

    render () {

        let style = mergeStyles(styles, this.props.style);

        let label = null;
        if (this.props.label) {
            label = (
                <div
                    style={style.label}
                    onClick={this.handleButtonClick}>
                    {this.props.label}
                </div>
            );
        }

        let content = (
            <input
                value={this.state.inputValue}
                placeholder={this.props.placeholder}
                style={style.edit}
                onClick={this.handleButtonClick}
                readOnly />
        );

        let button = null;
        if (this.getShowButton(this.props)) {
            let icon = this.state.showList ? "up" : "down";
            if (this.props.icon) {
                icon = this.props.icon;
            }
            button = (
                <TIcon style={style.icon}
                       name={icon}
                       onClick={this.handleButtonClick} />
            );
        }

        let list = null;
        if (this.state.showList) {
            list = (
                <List
                    value={this.state.value}
                    style={{container: style.list, item: style.item}}
                    items={this.props.items}
                    empty={this.props.empty}
                    place={this.listPlace}
                    onSelect={this.handleChange}
                    autoFocus={true}
                />
            );
        }

        return (
            <div style={style.container}>
                <div style={style.edit_container} ref={this.ref}>
                    {label}
                    {content}
                    {button}
                </div>
                {list}
            </div>
        );

    }

}

TListBox.propTypes = {
    name: PropTypes.string.isRequired,
    empty: PropTypes.object,
    items: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    showButton: PropTypes.any,
    icon: PropTypes.string
};

export default TListBox;
