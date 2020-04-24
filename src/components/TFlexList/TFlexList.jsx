import React from 'react';
import PropTypes from 'prop-types';

import {merge, contain, compare, Sizer} from '../../util';

import TTable from '../TTable';
import TRibbon from '../TRibbon';
import TPager from '../TPager';

import {styles} from '../../styles';

/**
 * Represents data items as TTable or TRibbon depending on component client width and "flexWidth" property value
 */
class TFlexList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            items: props.pager ? [] : props.items
        };
        this.onPage = this.onPage.bind(this);
        this.onResize = this.onResize.bind(this);
        this.sizer = new Sizer(this, this.onResize);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentDidUpdate(old) {
        if (old.pager !== this.props.pager || old.items !== this.props.items) {
            if (!this.props.pager) {
                this.setState({items: this.props.items});
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        this.sizer.free();
    }

    onResize(event) {
        if (this.props.onResize) {
            this.props.onResize({
                ...event,
                name: this.props.name,
                data: this.props.data
            });
        }
    }

    onPage(event) {
        if (this.mounted) {
            this.setState({items: event.items});
        }
    }

    render () {

        let style = merge(
            contain(styles.TFlexList),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let pager = null;
        if (this.props.pager) {
            let size = this.props.pager.size ? this.props.pager.size : TPager.defaultProps.size;
            let hide = this.props.pager.hide ? this.props.pager.hide : TPager.defaultProps.hide;
            let timeout = this.props.pager.timeout ? this.props.pager.timeout : TPager.defaultProps.timeout;
            let maxPages = this.props.pager.maxPages ? this.props.pager.maxPages : TPager.defaultProps.maxPages;
            pager = (
                <TPager
                    style={this.props.pager.style}
                    items={this.props.items}
                    timeout={timeout}
                    size={size}
                    hide={hide}
                    maxPages={maxPages}
                    onChange={this.onPage} />
            );
        }

        if (!this.state.width) {

            return null;

        } else  if (this.state.width < this.props.flexWidth) {

            return (
                <TRibbon
                    style={style}
                    name={this.props.name}
                    data={this.props.data}
                    items={this.state.items}
//                    index={this.props.index}
                    timeout={this.props.timeout}
                    onClick={this.props.onClick}
                    onChange={this.props.onChange}
                    onFrame={this.props.onFrame}>
                        {pager}
                        {this.props.children}
                </TRibbon>
            );

        } else {

            return (
                <TTable
                    style={style}
                    name={this.props.name}
                    data={this.props.data}
                    columns={this.props.columns}
                    items={this.state.items}
//                    index={this.props.index}
                    timeout={this.props.timeout}
                    options={this.props.options}
                    onClick={this.props.onClick}
                    onChange={this.props.onChange}
                    onCellStyle={this.props.onCellStyle}
                    onRowStyle={this.props.onRowStyle}>
                        {pager}
                        {this.props.children}
                </TTable>
            );

        }

    }

}

TFlexList.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for ribbon content */
        content: PropTypes.object,
        /** Style for component title */
        title: PropTypes.object,
        /** Style for grid header cells */
        caption: PropTypes.object,
        /** Style for grid body rows */
        cell:  PropTypes.object,
        /** Style for selected row */
        selected: PropTypes.object,
        /** Style for pager */
        pager: PropTypes.object
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
    /**
     * If component client width is less than value of "flexWidth" than items are shown as ribbon and
     * as table otherwise
     */
    flexWidth: PropTypes.number,
    /** Pager properties */
    pager: PropTypes.shape({
        /** Pager style */
        style: PropTypes.object,
        /** Maximum items count per page */
        size: PropTypes.number,
        /** Automatically hide label and navigator when items count less than "size" */
        hide: PropTypes.any,
        /** Delay between page button is clicked and "onChange" event */
        timeout: PropTypes.number
    }),
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
    onFrame: PropTypes.func,
    onResize: PropTypes.func
};

TFlexList.defaultProps = {
    page: false,
    flexWidth: 600,
    timeout: 1000,
    options: {
        scrollHead: false,
        showSelected: true,
        showHead: true,
        borderWidth: 1
    }
};

export default TFlexList;
