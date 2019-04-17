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
        this.ref = [];
    }

    handleClick(event) {
        this.props.onSelect({
            value: event.target.getAttribute("value"),
            name: event.target.getAttribute("name")
        });
    }

    handleRef(element) {
        this.ref.push(element);
    }

    handleKey(event) {
        let index = this.focused;
        if (event.keyCode == 13) {
            if (this.ref[index]) {
                this.props.onSelect({
                    value: this.ref[index].getAttribute("value"),
                    name: this.ref[index].getAttribute("name")
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
        this.focused = this.ref.findIndex((v, i) => {
            return v.getAttribute("value") == this.props.value;
        });
        if (this.focused < 0 && this.props.list && this.props.list.length > 0) {
            this.focused = 0;
        }
        if (this.focused >= 0 && this.ref[this.focused]) {
            this.ref[this.focused].focus();
        }
    }

    render () {

        let style = mergeStyles(styles, this.props.style, this.props.place);

        let items = [];
        if (this.props.items) {
            if (this.props.empty) {
                items.push(
                    <div
                            tabIndex={-1}
                            ref={this.handleRef}
                            style={style.item}
                            className="list-item"
                            key={'empty'}
                            value={this.props.empty.id}
                            name={this.props.empty.name}
                            onClick={this.handleClick}>
                        {this.props.empty.name}
                    </div>
                );
            }
            this.props.items.forEach((v, i) => {
                items.push(
                    <div
                            tabIndex={i}
                            ref={this.handleRef}
                            className="list-item"
                            style={style.item}
                            key={i}
                            value={v.id}
                            name={v.name}
                            onClick={this.handleClick}>
                        {v.name}
                    </div>
                );
            });
        }

        return (
            <div style={style.container} onKeyDown={this.handleKey}>
                {items}
            </div>
        );

    }

}

List.propTypes = {
    onSelect: PropTypes.func.isRequired,
    items: PropTypes.array,
    empty: PropTypes.object,
    place: PropTypes.object
}

export default List;
