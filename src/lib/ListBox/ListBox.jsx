import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Edit from '../Edit';
import List from '../List';
import Modal from '../Modal';

import {merge, find, compare} from '../../util';

import styles from '../../styles';

class ListBox extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            valid: true,
            showList: false,
            showText: '',
            value: null,
            hover: -1
        };
        this.updateItems = this.updateItems.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleLabelClick = this.handleLabelClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleModalClose= this.handleModalClose.bind(this);
        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.getModalStyle = this.getModalStyle.bind(this);
        this.moveHover = this.moveHover.bind(this);
        this.search = this.search.bind(this);
        this.clear = this.clear.bind(this);
        this.isModal = this.isModal.bind(this);
        this.container = React.createRef();
        this.frame = React.createRef();
        this.list = React.createRef();
        this.edit = React.createRef();
        this.helper = new List.Helper();
        this.item = null;
        this.containerHeight = 'auto';
    }

    componentWillUnmount() {
        this.mounted = false;
        delete this.helper;
    }

    componentDidMount() {
        this.mounted = true;
        this.updateItems(this.props.items);
        if (this.props.value !== undefined) {
            this.updateValue(this.props.value);
            this.search(this.props.value);
        }
    }

    componentDidUpdate(old) {
        if (!compare(old.items, this.props.items) || old.listMode !== this.props.listMode ||
            old.showMode !== this.props.showMode) {
            if (this.props.items !== undefined) {
                this.updateItems(this.props.items);
                this.updateValue(this.props.value);
                this.search(this.props.value);
            }
        } else if ((old.value !== this.props.value) ||
            (this.state.value !== this.props.value)) {
            if (this.props.value !== undefined) {
                this.updateValue(this.props.value);
                this.search(this.props.value);
            }
        }
    }

    updateItems(items) {
        if (this.mounted) {
            this.helper.load(
                items,
                this.props.empty,
                this.props.listMode,
                this.props.showMode,
                this.props.keyField,
                this.props.valueField
            );
        }
    }

    updateValue(value) {
        if (this.mounted) {
            this.item = this.helper.getShowItem(value);
            let text = '';
            if (this.item && this.item.index >= 0) {
                text = this.item.value;
            }
            this.setState({showText: text, value: value});
        }
    }

    setValue(value) {
        if (this.edit.current) {
            this.item = this.helper.getShowItem(value);
            let text = '';
            if (this.item && this.item.index >= 0) {
                text = this.item.value;
            }
            this.edit.current.setValue(text);
        }
    }

    moveHover(dir) {
        if (this.state.showList) {
            if (dir === -1 && this.state.hover > 0) {
                this.setState({hover: this.state.hover - 1});
            } else if (dir === 1 && this.state.hover < this.helper.getLength() - 1) {
                this.setState({hover: this.state.hover + 1});
            }
        }
    }

    isModal() {
        if (typeof this.props.modal === 'number') {
            return this.props.modal > 0 && this.helper.getCount() >= this.props.modal;
        } else {
            return this.props.modal;
        }
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 40:
                event.preventDefault();
                this.handleShow(true);
                this.moveHover(1);
                break;
            case 38:
                event.preventDefault();
                this.moveHover(-1);
                break;
            case 9:
                this.handleShow(false);
                break;
            case 27:
                event.preventDefault();
                this.handleShow(false);
                break;
            case 13:
                event.preventDefault();
                if (this.state.showList) {
                    this.list.current.handleUse(this.state.hover);
                    this.edit.current.blur();
                } else {
                    this.handleShow(true);
                }
                break;
        }
    }

    handleShow(show) {
        if (this.props.readOnly) {
            return;
        }
        if (show !== this.state.showList) {
            this.setState({
                showList: show && this.helper.hasItems(),
                hover: -1
            });
        }
    }

    handleIconClick() {
        this.handleShow(!this.state.showList);
    }

    handleLabelClick() {
        if (this.props.clickable.indexOf('label') >= 0) {
            this.handleShow(!this.state.showList);
        } else {
            this.handleShow(false);
        }
    }

    handleEditClick() {
        if (this.props.clickable.indexOf('edit') >= 0) {
            this.handleShow(!this.state.showList);
        }
    }

    handleItemClick(event) {

        this.setValue(event.key);

        this.handleShow(false);

        if (this.props.onChange) {

            if (this.item) {
                if (this.item.index === -1) {
                    this.props.onChange({
                        name: this.props.name,
                        data: this.props.data,
                        value: event.key,
                        virtualItem: this.item,
                        item: this.props.empty,
                        index: this.item.index
                    });
                } else {
                    this.props.onChange({
                        name: this.props.name,
                        data: this.props.data,
                        value: event.key,
                        virtualItem: this.item,
                        item: this.helper.getOriginal(this.item.index),
                        index: this.item.index
                    });
                }
            } else {
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    value: event.key,
                    virtualItem: this.item,
                    item: this.item,
                    index: -1
                });
            }

        }

        this.key = event.key;

    }

    handleModalClose() {
        this.setState({showList: false});
    }

    handleTextChange(event) {
        if (this.props.onSearch && event.value && event.value.length >= this.props.chars) {
            let query = this.helper.getQuery({
                key: null,
                value: event.value
            }, null, event.value);
            this.props.onSearch(query, (items) => {
                this.updateItems(items);
                this.setState({showList: false, hover: -1}, () => {
                    this.setState({showList: this.helper.hasItems()});
                });
            });
        } else if (event.value === null) {
            this.clear(null);
        }
    }

    clear() {
        this.updateValue(null);
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                data: this.props.data,
                value: null
            });
        }
        this.key = null;
    }

    search(key) {
        if (this.props.onSearch && key) {
            let query = this.helper.getQuery({
                key: key,
                value: null
            }, key, null);
            this.props.onSearch(query, (items) => {
                this.updateItems(items);
                this.updateValue(key);
            });
        }
    }

    handleBlur(event) {
        if (!find(event.relatedTarget, event.currentTarget)) {
            this.handleShow(false);
        }
    }

    handleInput(event) {
        this.setState({showText: event.value});
    }

    getContainerStyle() {
        if (this.isModal()) {
            return {}
        } else if (this.state.showList && this.container.current) {
            this.containerHeight = this.container.current.style.height ?
                this.container.current.style.height : 'auto';
            let rect = this.container.current.getBoundingClientRect();
            return {
                height: rect.height + 'px'
            }
        } else {
            return {
                height: this.containerHeight
            }
        }
    }

    getModalStyle() {
        if (this.container.current) {
            let rect = this.container.current.getBoundingClientRect();
            return {width: rect.width + 'px'}
        } else {
            return {}
        }
    }

    render () {

        let style = merge(styles.TComponent, styles.TText, this.props.style);

        let label = null;
        if (this.props.label) {
            label =
                <div style={style.label} onClick={this.handleLabelClick}>
                    {this.props.label}
                </div>
        }

        let icon = null;
        if (this.props.showIcon) {
            icon = this.props.icon ?
                <Icon
                    style={style.icon}
                    name={this.props.icon}
                    onClick={this.handleIconClick} /> :
                <Icon
                    style={style.icon}
                    name={this.state.showList ? 'up' : 'down'}
                    onClick={this.handleIconClick} />;
        }

        let list = null;
        if (this.state.showList && this.helper.hasItems()) {
            let comp =
                <List
                    ref={this.list}
                    style={style.list}
                    selected={this.state.value}
                    hover={this.state.hover}
                    items={this.helper.getListItems()}
                    onClick={this.handleItemClick} />;
            if (this.isModal()) {
                let ms = merge(style.modal, this.getModalStyle());
                list = <Modal
                    style={ms}
                    caption={this.props.caption}
                    show={true}
                    onClose={this.handleModalClose}
                    fitHeight={this.props.fitHeight}
                    outerClick={true} >
                    {comp}
                </Modal>
            } else {
                list = comp;
            }
        }

        let containerStyle = merge(style.container, this.getContainerStyle());

        let top = this.props.layout && this.props.layout.indexOf('top') >= 0;

        return (
            <div style={containerStyle} ref={this.container}
                 onBlur={this.handleBlur} tabIndex={-1}>
                {top ? label : null}
                <div style={style.frame} ref={this.frame}>
                    {!top ? label : null}
                    {this.props.showEdit ?
                        <Edit
                            simple={true}
                            ref={this.edit}
                            vStyle={style.edit}
                            iStyle={style.edit}
                            data={this.props.data}
                            name={this.props.name}
                            value={this.state.showText}
                            timeout={this.props.timeout}
                            placeholder={this.props.placeholder}
                            wrap={false}
                            readOnly={!this.props.onSearch || this.props.readOnly}
                            onInput={this.handleInput}
                            onClick={this.handleEditClick}
                            onKeyDown={this.handleKeyDown}
                            onChange={this.handleTextChange} /> : null}
                    {icon}
                </div>
                {list}
            </div>
        );

    }

}

ListBox.propTypes = {
    style: PropTypes.object,
    value: PropTypes.any,
    name: PropTypes.string,
    data: PropTypes.any,
    label: PropTypes.string,
    showIcon: PropTypes.any,
    showEdit: PropTypes.any,
    timeout: PropTypes.number,
    placeholder: PropTypes.string,
    empty: PropTypes.object,
    items: PropTypes.array,
    icon: PropTypes.string,
    keyField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    valueField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    listMode: PropTypes.string,
    showMode: PropTypes.string,
    clickable: PropTypes.string,
    chars: PropTypes.number,
    readOnly: PropTypes.any,
    layout: PropTypes.string,
    modal: PropTypes.any,
    caption: PropTypes.any,
    fitHeight: PropTypes.any,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    onValidate: PropTypes.func
};

ListBox.defaultProps = {
    listMode: 'val',
    showMode: 'val',
    showIcon: true,
    showEdit: true,
    editable: false,
    clickable: 'label edit',
    chars: 3,
    fitHeight: true
};

export default ListBox;
