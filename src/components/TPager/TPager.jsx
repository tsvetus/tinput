import React from 'react';
import PropTypes from 'prop-types';

import {Pager, merge, clone} from '../../util';

import styles from '../../styles';

class TPager extends React.Component {

    constructor (props) {
        super(props);
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

    change() {
        if (this.props.onChange) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                let items = [];
                for (let i=this.pager.from; i<=this.pager.to; i++) {
                    items.push(clone(this.items[i]));
                }
                this.props.onChange({
                    name: this.props.name,
                    data: this.props.data,
                    items: items,
                    ...this.pager.getParams()
                });
            }, 700);
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
            styles.TPager,
            styles[this.props.name],
            this.props.style
        );

        let params = this.pager.getParams();

        let pages = [];
        for (let i=params.pageFrom; i<=params.pageTo; i++) {
            let st = i === this.state.page ? style.current : style.page;
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
    style: PropTypes.object,
    name: PropTypes.string,
    date: PropTypes.any,
    size: PropTypes.number,
    items: PropTypes.array,
    hide: PropTypes.any,
    onChange: PropTypes.func
};

TPager.defaultProps = {
    size: 100,
    length: 0,
    hide: false
};

export default TPager;