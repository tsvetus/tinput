import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles, TIMEOUT} from '../util';

import styles from './styles.js';

import List from '../List';
import TIcon from '../TIcon';

const MIN_CHARS = 2;

class TSearch extends React.Component {

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
            this.findName(this.props.value);
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.findName(this.props.value);
    }

    componentWillUnmout() {
        this.mounted = false;
    }

    findName(id) {
        if (id && this.props.onSearch) {
            this.props.onSearch({
                    id: id,
                    name: null
                },
                (items) => {
                    this.setState({inputValue: items ? items[0].name : ''});
                }
            );
        }
    }

    handleInputChange(event) {
        let v = event.currentTarget.value;
        clearTimeout(this.timer);
        if (v && v.length > MIN_CHARS) {
            this.timer = setTimeout(() => {
                if (this.mounted && this.props.onSearch) {
                    this.props.onSearch({
                        id: null,
                        name: v
                    }, (items) => {
                        if (this.mounted) {
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
                        }
                    });
                }
            }, TIMEOUT);
        }
        this.setState({
            inputValue: v ? v : ''
        });
    }

    handleChange(event) {
        if (event) {
            if (this.props.onChange) {
                this.props.onChange({
                    value: event.value,
                    caption: event.name,
                    name: this.props.name,
                    data: this.props.data
                });
            }
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
            <TIcon
                style={{width: "16px"}}
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

TSearch.propTypes = {
    name: PropTypes.string.isRequired,
    empty: PropTypes.object,
    list: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
}

export default TSearch;
