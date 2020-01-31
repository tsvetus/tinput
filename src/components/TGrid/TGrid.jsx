import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone, contain, replace, isMS} from '../../util';

import styles from '../../styles';

/**
 * Represents data grid
 */
class TGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            top: 0
        };
        this.scroll = this.scroll.bind(this);
        this.change = this.change.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.adjust = this.adjust.bind(this);
        this.title = React.createRef();
        this.ms = isMS();
    }

    componentDidMount() {
        this.mounted = true;
        this.scroll(0);
        this.adjust();
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

    adjust() {
        if (this.title.current) {
            let rect = this.title.current.getBoundingClientRect();
            if (rect && rect.height) {
                let options = merge(TGrid.defaultProps.options, this.props.options);
                this.setState({top: rect.height - options.borderWidth});
            }
        }
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

        let style = merge(
            contain(styles.TGrid),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        style = replace(style, 'width', options.borderWidth);

        console.log('ms=' + this.ms);
        if (this.ms) {
            style = merge(style, styles.TMSGrid);
        }

        let items = [];
        let cell = 0;
        let row = 0;

        let bodyStyle = style.body;

        if (this.props.columns) {

            if (options.showHead && this.props.children) {
                ++row;
                let hs = clone(style.title);
                hs.gridColumnStart = 1;
                hs.gridColumnEnd = Object.keys(this.props.columns).length + 1;
                if (options.scrollHead) {
                    hs = merge(hs, style.scrollHead);
                }
                items.push(<div key={++cell} style={hs} ref={this.title}>{this.props.children}</div>);
            }

            ++row;

            let widths = '';

            let col = 0;

            for (let key in this.props.columns) {

                ++col;

                let column = this.props.columns[key];

                let cs = merge(style.head, style.caption);
                if (col === 1) {
                    cs.marginLeft = undefined;
                }
                if (this.ms) {
                    cs.msGridRow = row;
                    cs.msGridColumn = col;
                } else {
                    cs.gridRow = row;
                    cs.gridColumn = col;
                }
                cs.top = this.state.top + 'px';

                widths += ' ' + (column.width ? column.width : '1fr');

                items.push(
                    <div key={++cell} style={cs}>{column.caption ? column.caption : ''}</div>
                );

            }

            bodyStyle = this.ms ?
                 merge(bodyStyle, {msGridColumns: widths}) :
                 merge(bodyStyle, {gridTemplateColumns: widths});

//            bodyStyle = merge(bodyStyle, {gridTemplateColumns: widths});

        }

        if (false && this.props.items && this.props.columns) {

            this.props.items.forEach((v, i) => {

                ++row;

                let cs = merge(style.row, style.cell);
                if (this.props.onRowStyle) {
                    let s = this.props.onRowStyle({index: i, row: v});
                    if (s) {
                        cs = merge(cs, s);
                    }
                }
                let click = null;
                if (options.showSelected) {
                    click = this.handleClick;
                    if (i === this.state.index) {
                        cs = merge(cs, style.selected);
                    }
                } else {
                    cs = merge(cs, style.noSelect);
                }

                let col = 0;

                for (let key in this.props.columns) {

                    ++col;

                    let css = clone(cs);
                    if (this.props.columns[key].style !== undefined) {
                        let s = this.props.columns[key].style;
                        if (typeof s === "function") {
                            css = merge(css, s(v[key], key, v));
                        } else if (typeof s === "object") {
                            css = merge(css, s);
                        }
                    }
                    if (this.props.onCellStyle) {
                        css = merge(css, this.props.onCellStyle({cell: v[key], column: key, index: i, row: v}));
                    }
                    if (col === 1) {
                        css.marginLeft = undefined;
                    }
                    if (this.ms) {
                        css.msGridRow = row;
                        css.msGridColumn = col;
                    } else {
                        css.gridRow = row;
                        css.gridColumn = col;
                    }

                    let value = null;

                    if (v[key] === undefined) {
                        if (this.props.columns[key].value === undefined) {
                            value = null;
                        } else {
                            value = this.props.columns[key].value(undefined, key, v);
                        }
                    } else {
                        if (this.props.columns[key].value === undefined) {
                            value = v[key];
                        } else {
                            value = this.props.columns[key].value(v[key], key, v);
                        }
                    }

                    items.push(<div key={++cell} style={css} index={i} onClick={click}>{value}</div>);

                }

            });

        }

        return (
            <div style={style.container}>
                <div style={bodyStyle}>
                    {items}
                </div>
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
     * @param {object} event Event object with the following structure
     * @param {any} event.cell Current cell content
     * @param {number} event.index Current row index
     * @param {object} event.row Current row in form of name/value pairs where names coincide with column names
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
        borderWidth: 1
    }
};

export default TGrid;
