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
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.inputRef = React.createRef();
    }

    componentDidUpdate(old) {
        if (old.value !== this.props.value) {
            this.setState({
                value: this.props.value,
                inputValue: this.findName(this.props.value, this.props.items)
            });
        }
    }

    findName(id, items) {
        if (items) {
            let item = items.find((v) => {
                return v.id === id;
            });
            return item ? item.name : '';
        } else {
            return '';
        }
    }

    handleInputChange(event) {
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
        let rect = this.inputRef.current.getBoundingClientRect();
        this.listPlace = {
            top: rect.bottom + 4 + 'px',
            left: rect.left + 'px',
            width: rect.width + 'px'
        }
        this.setState({showList: !this.state.showList});
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
                onClick={this.handleButtonClick}
                readOnly />
        );

        let button = (
            <TIcon style={{width: "16px"}}
                name={this.state.showList ? "up" : "down"}
                onClick={this.handleButtonClick} />
        );

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
                {label}
                {content}
                {button}
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
    onChange: PropTypes.func.isRequired
}

export default TListBox;
