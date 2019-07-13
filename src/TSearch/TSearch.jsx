import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles, TIMEOUT} from '../util';

import styles from './styles.js';

import List from '../List';
import TIcon from '../TIcon';

const MIN_CHARS = 3;

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
//            this.setState({value: this.props.value});
            this.findName(this.props.value);
        } else if (this.props.value !== this.state.value && this.props.value === null) {
            this.findName(this.props.value);
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.findName(this.props.value);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getIdQuery(props, value) {
        if (props.keyName) {
            return {
                [props.keyName]: value,
                name: null
            }
        } else {
            return {
                id: value,
                name: null
            }
        }
    }

    findName(value) {
        if (value === null || value === undefined) {
            this.setState({
                value: null,
                items: [],
                inputValue: '',
                current: null
            });
        } else if (value && this.props.onSearch) {
            this.props.onSearch(
                this.getIdQuery(this.props, value),
                (items) => {
                    let v = '';
                    if (items) {
                        if (items[0]) {
                            if (this.props.keyName) {
                                v = items[0][this.props.keyName] + ' ' + items[0].name;
                            } else {
                                v = items[0].name;
                            }
                        }
                    }
                    this.setState({
                        value: value,
                        items: items,
                        inputValue: v
                    });
                }
            );
        }
    }

    getValue(props) {
        if (props.keyName) {
            return props.empty ? props.empty[props.keyName] : null;
        } else {
            return props.empty ? props.empty.id : null;
        }
    }

    getNameQuery(props, value) {
        if (props.keyName) {
            return {
                [props.keyName]: null,
                name: value
            }
        } else {
            return {
                id: null,
                name: value
            }
        }
    }

    handleInputChange(event) {
        let v = event.currentTarget.value ? event.currentTarget.value : '';
        clearTimeout(this.timer);
        let minChars = this.props.count ? this.props.count : MIN_CHARS;
        if (v.length >= minChars) {
            this.timer = setTimeout(() => {
                if (this.mounted && this.props.onSearch) {
                    this.props.onSearch(
                        this.getNameQuery(this.props, v),
                        (items) => {
                        if (this.mounted) {
                            if (!items || !Array.isArray(items)) {
                                items = [];
                            }
                            this.updateRect();
                            this.setState({
                                inputValue: v,
                                items: items,
                                showList: items.length > 0,
                                autoFocus: false
                            });
                        }
                    });
                }
            }, TIMEOUT);
        } else if (v.length == 0) {
            this.timer = setTimeout(() => {
                if (this.mounted) {
                    this.setState({
                        items: [],
                        showList: false,
                        autoFocus: false
                    }, () => {
                        if (this.props.onChange) {
                            this.props.onChange({
                                value: this.getValue(this.props),
                                caption: '',
                                name: this.props.name,
                                data: this.props.data
                            });
                        }
                    });
                }
            }, TIMEOUT);
        }
        this.setState({
            inputValue: v
        });
    }

    getInputValue(props, event) {
        if (props.keyName) {
            return props.empty && event.value == props.empty[props.keyName] ? '' : event.name;
        } else {
            return props.empty && event.value == props.empty.id ? '' : event.name;
        }
    }

    handleChange(event) {
        if (event) {
            this.setState({
                showList: false,
                inputValue: this.getInputValue(this.props, event),
                value: event.value
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange({
                        value: event.value,
                        caption: event.name,
                        item: event.item,
                        name: this.props.name,
                        data: this.props.data
                    });
                }
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
        console.log('RECT: ' + JSON.stringify(rect));
        this.listPlace = {
            top: 0,
            left: 0,
            width: rect.width + 'px'
        }
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
            label = (<div style={style.label}>{this.props.label}</div>);
        }

        let content = (
            <input
                value={this.state.inputValue}
                placeholder={this.props.placeholder}
                style={style.edit}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKey} />
        );

        let button = null;
        if (this.getShowButton(this.props)) {
            button = (
                <TIcon
                    style={style.icon}
                    name={this.state.showList ? "up" : "down"}
                    onClick={this.handleButtonClick} />
            );
        }

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
                    keyName={this.props.keyName}
                />
            );
        }

        return (
            <div style={style.container} ref={this.inputRef}>
                <div style={style.edit_container}>
                    {label}
                    {content}
                    {button}
                </div>
                {list}
            </div>
        );

    }

}

TSearch.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
    empty: PropTypes.object,
    list: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    keyName: PropTypes.string,
    showButton: PropTypes.any,
    count: PropTypes.number
}

export default TSearch;
