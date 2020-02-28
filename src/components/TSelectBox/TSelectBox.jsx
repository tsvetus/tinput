import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone, contain} from '../../util';

import TGroupButton from '../TGroupButton';
import ListForm from './ListForm';

import styles from '../../styles';
import List from "../../lib/List";

/**
 * Combobox with select list
 */
class TSelectBox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            item: props.item,
            value: props.value
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.helper = new List.Helper();
        this.updateItems(this.props.items);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        delete this.helper;
    }

    componentDidUpdate(old) {
        if (old.items !== this.props.items) {
            this.updateItems(this.props.items);
        }
        if (old.item !== this.props.item) {
            this.setState({item: this.props.item});
        }
        if (old.value !== this.props.value) {
            this.setState({item: this.helper.getOriginalItem(this.props.value)});
        }
    }

    updateItems(items) {
        if (this.mounted) {
            this.helper.load(
                items,
                this.props.empty,
                'value',
                'value',
                this.props.keyField,
                this.props.valueField
            );
        }
    }

    handleClick(event) {
        let control = event.item.name;
        if (control === 'caption') {
            this.setState({show: true});
            if (this.props.onCaptionClick) {
                this.props.onCaptionClick({
                    name: this.props.name,
                    data: this.props.data,
                    control: control
                });
            }
        } else if (control === 'button') {
            this.setState({item: null});
            if (this.props.onButtonClick) {
                this.props.onButtonClick({
                    name: this.props.name,
                    data: this.props.data,
                    control: control
                });
            }
            if (this.props.onChange) {
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    item: null,
                    value: null
                });
            }
        }
    }

    handleClose(event) {
        if (event.item) {
            this.setState({
                show: false,
                item: event.item
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange({
                        name: this.props.name,
                        data: this.props.data,
                        item: event.item,
                        value: this.helper.getKey(event.item)
                    });
                }
            });
        } else {
            this.setState({show: false});
        }
    }

    render () {

        let style = merge(
            contain(styles.TSelectBox),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let ribbonStyle = merge(
            {},
            contain(style.ribbon),
            {item: merge({}, contain(style.item))}
        );

        let formStyle = {
            pager: contain(style.pager),
            form: contain(style.form),
            scroll: contain(style.scroll),
            ribbon: ribbonStyle
        };

        let cs = clone(style.caption);
        let content = null;
        if (this.state.item) {
            if (this.props.onFrame) {
                content = this.props.onFrame({
                    item: this.state.item,
                    style: formStyle.ribbon.item
                });
            } else {
                content = this.helper.getValue(this.state.item);
            }
        } else {
            if (this.props.placeholder) {
                cs = merge(cs, style.placeholder);
                content = this.props.placeholder;
            } else {
                content = this.props.children;
            }
        }

        let items = [];

        items.push({name: 'caption', caption: content, style: cs});
        items.push({name: 'button', icon: 'close', style: clone(style.button)});
        delete style.caption;
        delete style.button;

        return (

            <TGroupButton
                style={style}
                items={items}
                name={this.props.name}
                data={this.props.data}
                onClick={this.handleClick}>

                <ListForm
                    style={formStyle}
                    show={this.state.show}
                    items={this.helper.getOriginalItems()}
                    size={this.props.size}
                    timeout={this.props.timeout}
                    onFrame={this.props.onFrame}
                    onClose={this.handleClose} />

            </TGroupButton>

        );

    }

}

TSelectBox.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Items for style. See "TForm" component */
        form: PropTypes.object,
        /** Items page navigation bar style. See "TPager" component */
        pager: PropTypes.object,
        /** List item style */
        item: PropTypes.object
    }),
    /** Component name */
    name: PropTypes.any,
    /** Component data */
    data: PropTypes.any,
    /** Items list */
    items: PropTypes.array,
    /** Current item */
    item: PropTypes.object,
    /** Current item key value */
    value: PropTypes.any,
    /** Items page size */
    size: PropTypes.number,
    /** Placeholder text  */
    placeholder: PropTypes.any,
    /** Specifies key field name if it is other than "key" */
    keyField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    /** Specifies value field name if it is other than "value" */
    valueField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    /** Page change delay in milliseconds */
    timeout: PropTypes.number,
    /**
     * Happens when item is rendering. Mast return html element representing current item
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {object} event.item Current row
     * @param {number} event.index Current row item
     * @param {object} event.style Item style
     * @param {func} event.onClick Reference to "onClick" event
     */
    onFrame: PropTypes.func,
    /**
     * On change event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {object} event.item Selected item or "null" if component is cleared
     */
    onChange: PropTypes.func,
    /**
     * On button click event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     */
    onButtonClick: PropTypes.func,
    /**
     * On caption click event
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     */
    onCaptionClick: PropTypes.func
};

TSelectBox.defaultProps = {
    size: 10,
    timeout: 500
};

export default TSelectBox;
