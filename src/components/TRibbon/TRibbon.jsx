import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone, contain, TIMEOUT} from '../../util';

import styles from '../../styles';

/**
 * Shows list items in form of ribbon
 */
class TRibbon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: -1
        };
        this.scroll = this.scroll.bind(this);
        this.change = this.change.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.scroll(0);
    }

    componentDidUpdate(old) {
        if (old.index !== this.props.index || old.items !== this.props.items) {
            this.scroll(this.state.index);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    change(index, item) {
        this.setState({index: index});
        clearTimeout(this.timer);
        if (this.props.onChange) {
            this.timer = setTimeout(() => {
                if (this.mounted) {
                    this.props.onChange({
                        name: this.props.name,
                        data: this.props.data,
                        index: index,
                        item: item
                    });
                }
            }, this.props.timeout);
        }
    }

    scroll(index) {
        let newIndex = (index === null || index === undefined) ? -1 : index;
        let item = null;
        if (this.props.items) {
            if (newIndex < 0 || newIndex >= this.props.items.length) {
                newIndex = 0;
            }
            item = clone(this.props.items[newIndex]);
        } else {
            newIndex = -1;
        }
        this.change(newIndex, item);
    }

    handleClick(event) {
        let index = Number(event.currentTarget.getAttribute('index'));
        if (this.props.onClick) {
            this.props.onClick({
                name: this.props.name,
                data: this.props.data,
                index: index,
                item: this.props.items[index]
            });
        }
        if (index !== this.state.index) {
            this.scroll(index);
        }
    }

    render () {

        let style = merge(
            contain(styles.TRibbon),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let items = [];
        if (this.props.items) {
            this.props.items.forEach((v, i) => {
                if (this.props.onFrame) {
                    let frame = this.props.onFrame({
                        name: this.props.name,
                        data: this.props.data,
                        item: v,
                        index: i,
                        style: style,
                        onClick: this.handleClick
                    });
                    items.push(frame);
                }
            });
        }

        return (
            <div style={style.container}>
                <div style={style.title}>
                    {this.props.children}
                </div>
                <div style={style.content}>
                    {items}
                </div>
            </div>
        );

    }

}

TRibbon.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for title component block */
        title: PropTypes.object,
        /** Style for component content */
        content: PropTypes.object
    }),
    /**
     * Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /**
     * Grid columns description. An object containing set of fields representing column names with parameters
     * "caption", "width" and "style":
     */
    columns: PropTypes.shape({
        /**  */
        columnName: PropTypes.shape({
            /** Column caption */
            caption: PropTypes.any,
            /** Column width */
            width: PropTypes.string,
            /** Column style (optional) */
            style: PropTypes.object
        })
    }),
    /**
     * Grid cell data. Each element of array contains name/value pairs where names coincide with column names
     * described in "columns" property
     */
    items: PropTypes.arrayOf(PropTypes.object),
    /** Selected row index */
    index: PropTypes.number,
    /** Timeout between user clicks row and "onChange" event in milliseconds */
    timeout: PropTypes.number,
    /**
     * Happens when user clicks on row
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.index Selected item index
     * @param {string} event.item Selected item
     */
    onClick: PropTypes.func,
    /**
     * Happens when selected row index is changed or new items set loaded in grid
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {string} event.index Selected item index
     * @param {string} event.item Selected item
     */
    onChange: PropTypes.func,
    /**
     * Happens when frame generation is needed. Mast return html element representing current item
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {object} event.item Current row
     * @param {number} event.index Current row item
     * @param {object} event.style Component style
     * @param {func} event.onClick Reference to "onClick" event
     */
    onFrame: PropTypes.func
};

TRibbon.defaultProps = {
    timeout: 500
};

export default TRibbon;
