import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../util';

import styles from './styles.js';

import './styles.css';

class List extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
        this.handleRef = this.handleRef.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.updateFocus = this.updateFocus.bind(this);
        this.ref = [];
        this.self = React.createRef();
    }

    handleClick(event) {
        let i = event.target.getAttribute("index");
        let item = i >= 0 ? this.props.items[i] : null;
        this.props.onSelect({
            value: event.target.getAttribute("value"),
            name: event.target.getAttribute("name"),
            item: item,
            data: this.props.data
        });
    }

    handleRef(element) {
        this.ref.push(element);
    }

    handleKey(event) {
        let index = this.focused;
        if (event.keyCode == 13) {
            if (this.ref[index]) {
                let i = this.ref[index].getAttribute("index");
                let item = i >= 0 ? this.props.items[i] : null;
                this.props.onSelect({
                    value: this.ref[index].getAttribute("value"),
                    name: this.ref[index].getAttribute("name"),
                    item: item,
                    data: this.props.data
                });
            } else {
                this.props.onSelect();
            }
        } else if (event.keyCode == 27) {
            this.props.onSelect();
        } else {
            if (index >= 0) {
                if (event.keyCode == 38) {
                    index -= 1;
                } else if (event.keyCode == 40) {
                    index += 1;
                }
                if (this.ref[index]) {
                    this.focused = index;
                    this.ref[index].focus();
                }
            }
        }
    }

    componentDidMount() {
        this.updateFocus();
    }

    componentDidUpdate(old) {
        if (
            old.autoFocus !== this.props.autoFocus ||
            old.value !== this.props.value
        ) {
            this.updateFocus();
        }
    }

    updateFocus() {
        if (this.props.autoFocus) {
            this.focused = this.ref.findIndex((v, i) => {
                return (v && v.getAttribute("value") == this.props.value);
            });
            if (this.focused < 0 && this.props.items && this.props.items.length > 0) {
                this.focused = 0;
            }
            if (this.focused >= 0 && this.ref[this.focused]) {
                this.ref[this.focused].focus();
            }
        }
    }

    render () {

        let style = mergeStyles(styles, this.props.style, this.props.place);

        let items = [];
        if (this.props.items) {
            if (this.props.empty) {
                let value = this.props.keyName ? this.props.empty[this.props.keyName] : this.props.empty.id;
                items.push(
                    <div
                            tabIndex={-1}
                            ref={this.handleRef}
                            style={style.item}
                            className="list-item"
                            key={'empty'}
                            value={value}
                            name={this.props.empty.name}
                            index={-1}
                            onClick={this.handleClick}>
                        {this.props.empty.name}
                    </div>
                );
            }
            this.props.items.forEach((v, i) => {
                let value = this.props.keyName ? v[this.props.keyName] : v.id;
                let name = this.props.keyName ? v[this.props.keyName] + ' ' + v.name : v.name;
                items.push(
                    <div
                            tabIndex={i}
                            ref={this.handleRef}
                            className="list-item"
                            style={style.item}
                            key={i}
                            value={value}
                            name={name}
                            index={i}
                            onClick={this.handleClick}>
                        {name}
                    </div>
                );
            });
        }

        return (
            <div style={style.container} onKeyDown={this.handleKey} ref={this.self}>
                {items}
            </div>
        );

    }

}

List.propTypes = {
    onSelect: PropTypes.func.isRequired,
    items: PropTypes.array,
    empty: PropTypes.object,
    place: PropTypes.object,
    autoFocus: PropTypes.bool,
    keyName: PropTypes.string
};

export default List;
