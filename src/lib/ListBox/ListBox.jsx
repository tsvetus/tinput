import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import List from '../List';
import Tree from '../Tree';
import Modal from '../Modal';

import {merge, find, compare, Helper} from '../../util';

import {styles} from '../../styles';

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
        this.handleMounted = this.handleMounted.bind(this);
        this.moveHover = this.moveHover.bind(this);
        this.search = this.search.bind(this);
        this.clear = this.clear.bind(this);
        this.isModal = this.isModal.bind(this);
        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.list = React.createRef();
        this.helper = new Helper({tree: props.tree});
        this.item = null;
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
        this.item = this.helper.getShowItem(value);
        let text = '';
        if (this.item && this.item.index >= 0) {
            text = this.item.value;
        }
        if (this.editor) {
            this.editor.setValue(text);
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

    handleMounted(event) {
        this.editor = event.editor;
        this.container = event.container;
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
                if (this.state.showList && this.list.current && this.list.current.handleUse) {
                    this.list.current.handleUse(this.state.hover);
                    this.editor.blur();
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
                        item: this.helper.getOriginalItem(event.key),
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
        if (this.container) {
            let rect = this.container.getBoundingClientRect();
            return {container: {width: rect.width + "px"}}
        } else {
            return {}
        }
    }

    render () {

        let style = merge(styles.TComponent, styles.TListBox, this.props.style);

        let icon = null;
        if (this.props.showIcon) {
            icon = this.props.icon ? this.props.icon : (this.state.showList ? 'up' : 'down');
        }

        let list = null;
        if (this.state.showList && this.helper.hasItems()) {
            let comp = null;
            if (this.props.tree) {
                comp =
                    <Tree
                        ref={this.list}
                        style={style.tree}
                        value={this.state.value}
                        listMode={this.props.listMode}
                        keyField={this.props.keyField}
                        valueField={this.props.valueField}
                        showSelected={true}
                        expand={this.props.expand}
                        helper={this.helper}
                        onChange={this.handleItemClick} />;
            } else {
                comp =
                    <List
                        ref={this.list}
                        style={style.list}
                        selected={this.state.value}
                        hover={this.state.hover}
                        items={this.helper.getListItems()}
                        onClick={this.handleItemClick} />;
            }
            if (this.isModal()) {
                let ms = merge(style.modal, this.getContainerStyle());
                list =
                    <Modal
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

        return (

            <Text
                simple={true}
                style={style}
                data={this.props.data}
                name={this.props.name}
                value={this.state.showText}
                timeout={this.props.timeout}
                layout={this.props.layout}
                label={this.props.label}
                placeholder={this.props.placeholder}
                icon={icon}
                wrap={false}
                readOnly={!this.props.onSearch || this.props.readOnly}
                showEdit={this.props.showEdit}
                children={list}
                nestedIcon={this.props.nestedIcon}
                onIcon={this.handleIconClick}
                onLabel={this.handleLabelClick}
                onBlur={this.handleBlur}
                onInput={this.handleInput}
                onClick={this.handleEditClick}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleTextChange}
                onMounted={this.handleMounted} />

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
    nestedIcon: PropTypes.any,
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
    tree: PropTypes.any,
    expand: PropTypes.number,
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
