import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone, contain, replace} from '../../util';

import {Grid} from '../../lib';

import styles from '../../styles';

/**
 * Represents data table. TTable is similar to TGrid component but designed using "table" layout.
 * In case of large amount of data items TTable demonstrates better performance than TGrid
 */
class TTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {top: 0};
        this.adjust = this.adjust.bind(this);
        this.handleRender = this.handleRender.bind(this);
        this.title = React.createRef();
    }

    componentDidMount() {
        this.adjust();
    }

    adjust() {
        if (this.title.current) {
            let rect = this.title.current.getBoundingClientRect();
            if (rect && rect.height) {
                this.setState({top: rect.height});
            }
        }
    }

    handleRender (event) {

        let style = event.style;
        let options = event.options;

        let head = null;

        let items = [];

        if (this.props.columns) {

            let title = null;
            if (options.showHead && this.props.children) {
                title = <tr>
                    <th
                        style={style.title}
                        ref={this.title}
                        colSpan={Object.keys(this.props.columns).length}>
                        {this.props.children}
                    </th>
                </tr>;
            }

            let columns = [];
            let col = 0;

            for (let key in this.props.columns) {

                let column = this.props.columns[key];

                let cs = merge(style.caption, {width: column.width ? column.width : 'auto'});
                if (options.scrollHead) {
                    cs.position = 'relative';
                }
                if (!options.scrollHead) {
                    cs.top = this.state.top + 'px';
                }
                columns.push(
                    <th key={++col} style={cs}>{column.caption ? column.caption : ''}</th>
                );

            }

            head = (
                <thead style={style.head}>
                    {title}
                    <tr>
                        {columns}
                    </tr>
                </thead>
            );

        }

        if (this.props.items && this.props.columns) {

            this.props.items.forEach((v, i) => {

                let cs = merge(style.cell, style.row);
                if (this.props.onRowStyle) {
                    let s = this.props.onRowStyle({
                        index: i,
                        row: v,
                        style: style
                    });
                    if (s) {
                        cs = merge(cs, s);
                    }
                }
                let click = null;
                if (options.showSelected) {
                    click = event.onClick;
                    if (i === event.index) {
                        cs = merge(cs, style.selected);
                    }
                } else {
                    cs = merge(cs, style.noSelect);
                }

                let columns = [];

                let col = 0;

                for (let key in this.props.columns) {

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
                        let s = this.props.onCellStyle({
                            cell: v[key],
                            column: key,
                            index: i,
                            row: v,
                            style: style
                        });
                        if (s) {
                            css = merge(css, s);
                        }
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

                    columns.push(<td key={++col} style={css} index={i} onClick={click}>{value}</td>);

                }

                items.push(<tr key={i}>{columns}</tr>);

            });

        }

        return (
            <table style={style.container}>
                {head}
                <tbody style={style.body}>
                    {items}
                </tbody>
            </table>
        );

    }

    render () {

        let options = merge(TTable.defaultProps.options, this.props.options);

        let style = merge(
            contain(styles.TTable),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        style = replace(style, 'width', options.borderWidth);

        return (

            <Grid
                style={style}
                name={this.props.name}
                data={this.props.data}
                items={this.props.items}
                index={this.props.index}
                timeout={this.props.timeout}
                options={options}
                onClick={this.props.onClick}
                onChange={this.props.onChange}
                onRender={this.handleRender} />

        );

    }

}

TTable.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component title */
        title: PropTypes.object,
        /** Style for grid header cells */
        caption: PropTypes.object,
        /** Style for grid body rows */
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
     * @param {object} event.style Current component style from "props.style" property
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
     * @param {object} event.style Current component style from "props.style" property
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

TTable.defaultProps = {
    timeout: 1000,
    options: {
        scrollHead: false,
        showSelected: true,
        showHead: true,
        borderWidth: 1
    }
};

export default TTable;
