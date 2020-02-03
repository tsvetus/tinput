import React from 'react';
import PropTypes from 'prop-types';

import {Pager, merge, clone, contain} from '../../util';

import styles from '../../styles';

/**
 * Splits up grid item list to pages and shows page navigation bar
 */
class TPager extends React.Component {

    constructor (props) {
        super(props);
        this.state = {wait: false};
        this.items = props.items ? props.items : [];
        this.pager = new Pager(props.size, this.items.length);
        this.state = {page: this.pager.page};
        this.handleClick = this.handleClick.bind(this);
        this.change = this.change.bind(this);
    }

    componentDidUpdate(old) {
        if (old.size !== this.props.size || old.items !== this.props.items) {
            if (old.size !== this.props.size) {
                this.pager.setSize(this.props.size);
            }
            if (old.items !== this.props.items) {
                this.items = this.props.items ? this.props.items : [];
                this.pager.setLength(this.items.length);
            }
            this.setState({page: this.pager.page}, () => {
                this.change();
            });
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.setState({page: this.pager.page}, () => {
            this.change();
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    change() {
        if (this.props.onChange) {
            clearTimeout(this.timer);
            this.setState({wait: true});
            this.timer = setTimeout(() => {
                if (this.mounted) {
                    let items = [];
                    for (let i=this.pager.from; i<=this.pager.to; i++) {
                        items.push(clone(this.items[i]));
                    }
                    this.setState({wait: false});
                    this.props.onChange({
                        name: this.props.name,
                        data: this.props.data,
                        items: items,
                        ...this.pager.getParams()
                    });
                }
            }, this.props.timeout);
        }
    }

    handleClick(event) {
        event.stopPropagation();
        let data = event.target.getAttribute('data');
        if (data === 'left') {
            this.pager.pageUp();
        } else if (data === 'right') {
            this.pager.pageDown();
        } else {
            this.pager.setPage(Number.parseInt(data));
        }
        if (this.state.page !== this.pager.page) {
            this.setState({page: this.pager.page}, () => {
                this.change();
            });
        }
     }

    render() {

        let style = merge(
            contain(styles.TPager),
            contain(styles[this.props.name]),
            contain(this.props.style)
        );

        let params = this.pager.getParams();

        let pages = [];
        for (let i=params.pageFrom; i<=params.pageTo; i++) {
            let st = style.page;
            if (i === this.state.page) {
                st = merge(st, style.current);
                if (this.state.wait) {
                    st = merge(st, style.wait);
                }
            }
            pages.push(<div key={i} style={st} data={i} onClick={this.handleClick}>{i + 1}</div>);
        }

        if (params.pageTo < 1 && this.props.hide) {

            return (<div style={style.container}></div>);

        } else {

            return (
                <div style={style.container}>
                    {params.to >= params.from ?
                        <div style={style.label}>
                            <div>{params.from + 1}</div>
                            <div>{'-'}</div>
                            <div>{params.to + 1}</div>
                            <div>&#47;</div>
                            <div>{params.length}</div>
                        </div>
                        : <div style={style.label}></div>}
                    <div style={style.edit}>
                        <div style={style.page} data={'left'} onClick={this.handleClick}>&lt;</div>
                        {pages}
                        <div style={style.page} data={'right'} onClick={this.handleClick}>&gt;</div>
                    </div>
                </div>
            );

        }

    }

}

TPager.propTypes = {
    /** Component style: */
    style: PropTypes.shape({
        /** Style for outer component container */
        container: PropTypes.object,
        /** Style for component label showing items count */
        label: PropTypes.object,
        /** Style for page navigation bar */
        edit: PropTypes.object,
        /** Style page buttons */
        page: PropTypes.object,
        /** Style for current page button */
        current: PropTypes.object,
        /** Style for waiting state of current page button */
        wait: PropTypes.object
    }),
    /**
     * Any component name that associated with component and returned in "onChange" event in "event.name" field.
     * In addition component name can be used in global styles registered by "registerStyles" function to
     * associate particular style with this component
     */
    name: PropTypes.string,
    /** Any data that associated with component and returned in "onChange" event in "event.data" field */
    data: PropTypes.any,
    /** Maximum items count per page */
    size: PropTypes.number,
    /** Initial items list */
    items: PropTypes.array,
    /** Automatically hide label and navigator when items count less than "size" */
    hide: PropTypes.any,
    /** Delay between page button is clicked and "onChange" event */
    timeout: PropTypes.number,
    /**
     * Happens when result item list is generated
     * @param {object} event Event object with following structure:
     * @param {string} event.name Component name from "name" property
     * @param {object} event.data Component data from "data" property
     * @param {object} event.items Generated item list
     * @param {number} event.size Current page size
     * @param {number} event.length Current page length
     * @param {number} event.page Current page index
     * @param {number} event.pageFrom First page index
     * @param {number} event.pageTo Last page index
     * @param {number} event.from First item index on current page
     * @param {number} event.to Last item index on current page
     * @param {number} event.first First item index
     * @param {number} event.last Last item index
     */
    onChange: PropTypes.func
};

TPager.defaultProps = {
    size: 100,
    hide: false,
    timeout: 1000
};

export default TPager;