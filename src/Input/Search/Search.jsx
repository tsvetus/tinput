import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.js';

const MIN_COUNT = 2;
const TIMEOUT = 1*1000;

class Search extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: '',
            list: props.list ? props.list : []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value != this.props.value && this.props.value > 0) {
            this.props.onSearch({name: null, id: this.props.value}, (list) => {
                this.setState({list: list});
            });
        }
    }

    componentDidMount() {
        if (this.props.value && this.props.value > 0) {
            this.props.onSearch({name: null, id: this.props.value}, (list) => {
                if (list && list.length > 0) {
                    let value = list[0].name;
                    this.setState({
                        value: value,
                        list: list
                    });
                }
            });
        }
    }

    handleChange(event) {

        let value = event.target.value;

        this.setState({value: value});

        let item = null;

        if (this.state.list) {
            item = this.state.list.find((v, i) => {
                return v.name == value;
            });
            if (item) {
                this.props.onChange(event, item.id);
            }
        }

        if ((item == null) && this.props.onSearch && value && value.length >= MIN_COUNT) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.props.onSearch({name: value, id: 0}, (list) => {
                    this.setState({list: list});
                });
            }, TIMEOUT);
        } else if (value.length == '') {
            this.props.onChange(event, 0);
        }

    }

    render () {

        let style = {
            ...styles,
            ...this.props.style
        }

        let id = Math.random().toString(36).substr(2, 8);
        let items = [];
        if (this.state.list) {
            this.state.list.forEach((v, i) => {
                items.push(
                    <option key={i} data={v.id}>
                        {v.name}
                    </option>
                );
            });
        }

        return (
            <div style={{width: "100%"}}>
                <input
                    style={style}
                    type={"text"}
                    list={id}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.handleChange} />
                <datalist id={id}>
                    {items}
                </datalist>
            </div>
        );

    }

}

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    list: PropTypes.array,
    empty: PropTypes.object
}

export default Search;
