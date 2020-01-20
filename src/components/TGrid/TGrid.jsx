import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone, contain, replace} from '../../util';

import styles from '../../styles';

/**
 * Represents data grid
 */
class TGrid extends React.Component {

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

        let options = merge(TGrid.defaultProps.options, this.props.options);

        let columns = {row: {gridTemplateColumns: this.props.columns}};

        let style = merge(
            contain(styles.TGrid),
            contain(styles[this.props.name]),
            columns,
            contain(this.props.style)
        );
        style = replace(style, 'width', options.borderWidth);

        let body = null;
        let head = null;
        let rowStyle = style.row;

        if (this.props.columns) {

            let captions = [];
            let widths = '';

            for (let key in this.props.columns) {
                let column = this.props.columns[key];
                captions.push(
                    <div key={key} style={style.caption}>{column.caption ? column.caption : ''}</div>
                );
                widths += ' ' + (column.width ? column.width : '1fr');
            }

            rowStyle = merge(rowStyle, {gridTemplateColumns: widths});

            let title = this.props.children ? (<div style={style.title}>{this.props.children}</div>) : null;

            let hs = style.head;
            if (options.scrollHead) {
                hs = merge(hs, style.scrollHead);
            }
            if (!options.showHead) {
                hs = merge(hs, style.hideHead);
            }

            head = (
                <div style={hs}>
                    {title}
                    {options.showHead ? <div style={rowStyle}>{captions}</div> : null}
                </div>
            );

        }

        if (this.props.items && this.props.columns) {

            let items = [];

            this.props.items.forEach((v, i) => {
                let cs = style.cell;
                if (options.showSelected) {
                    cs = i === this.state.index ? merge(style.cell, style.selected) : style.cell;
                } else {
                    cs = merge(cs, style.noSelect);
                }
                let row = [];
                if (this.props.onRowStyle) {
                    let rs = this.props.onRowStyle(v);
                    if (rs) {
                        cs = merge(cs, rs);
                    }
                }
                for (let key in this.props.columns) {
                    let css = cs;
                    if (this.props.columns[key].style !== undefined) {
                        css = merge(css, this.props.columns[key].style(v[key], key, v));
                    }
                    if (this.props.onCellStyle) {
                        css = merge(css, this.props.onCellStyle({cell: v[key], column: key, index: i, row: v}));
                    }
                    if (v[key] === undefined) {
                        if (this.props.columns[key].value === undefined) {
                            row.push(
                                <div style={css} key={key}></div>
                            );
                        } else {
                            row.push(
                                <div style={css} key={key}>{this.props.columns[key].value(undefined, key, v)}</div>
                            );
                        }
                    } else {
                        if (this.props.columns[key].value === undefined) {
                            row.push(
                                <div style={css} key={key}>{v[key]}</div>
                            );
                        } else {
                            row.push(
                                <div style={css} key={key}>{this.props.columns[key].value(v[key], key, v)}</div>
                            );
                        }
                    }
                }
                items.push(
                    <div key={i} style={rowStyle} index={i} onClick={this.handleClick}>
                        {row}
                    </div>
                );
            });

            body = (
                <div style={style.body}>
                    {items}
                </div>
            );

        }

        return (
            <div style={style.container}>
                {head}
                {body}
            </div>
        );

    }

}

TGrid.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component title */
        title: PropTypes.object,
        /** Style for grid header row */
        head: PropTypes.object,
        /** Style for grid header cells */
        caption: PropTypes.object,
        /** Style for grid body */
        body: PropTypes.object,
        /** Style for grid body rows */
        row:  PropTypes.object,
        /** Style for grid body cells */
        cell:  PropTypes.object,
        /** Style for selected row */
        selected: PropTypes.object
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
    /** Grid options */
    options: PropTypes.shape({
        /** If "true" then head is scrollable */
        scrollHead: PropTypes.any,
        /** If "true" then selected row is shown using "selected" style  */
        showSelected: PropTypes.any,
        /** Indicates whether to show grid head or not */
        showHead: PropTypes.any,
        /** Border width in pixels */
        borderWidth: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
    }),
    /**
     * Happens when row style is needed. Returns object containing row style
     * @param {object} row Current row in form of name/value pairs where names coincide with column names
     * described in "columns" property
     */
    onRowStyle: PropTypes.func,
    /**
     * Happens when cell style is needed. Returns object containing cell style
     * @param {object} event Event object with the following structure
     * @param {any} event.cell Current cell content
     * @param {string} event.column Current column name
     * @param {number} event.index Current row index
     * @param {object} event.row Current row in form of name/value pairs where names coincide with column names
     * described in "columns" property
     */
    onCellStyle: PropTypes.func,
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
    onChange: PropTypes.func
};

TGrid.defaultProps = {
    timeout: 1000,
    options: {
        scrollHead: false,
        showSelected: true,
        showHead: true,
        borderWidth: "1px"
    }
};

export default TGrid;
