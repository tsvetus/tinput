import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone, contain, replace, TIMEOUT} from '../../util';

import styles from '../../styles';

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
            }, TIMEOUT*3);
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
            if (!options.scroll) {
                hs = merge(hs, style.noScroll);
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
                if (options.select) {
                    cs = i === this.state.index ? merge(style.cell, style.current) : style.cell;
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
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    items: PropTypes.array,
    columns: PropTypes.object,
    index: PropTypes.number,
    options: PropTypes.shape({
        scroll: PropTypes.any,
        select: PropTypes.any,
        borderWidth: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        showHead: PropTypes.any
    }),
    onChange: PropTypes.func,
    onRowStyle: PropTypes.func,
    onClick: PropTypes.func
};

TGrid.defaultProps = {
    options: {
        scroll: true,
        select: true,
        borderWidth: "1px",
        showHead: true
    }
};

export default TGrid;
