import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone, TIMEOUT} from '../../util';

import styles from '../../styles';

class TFilm extends React.Component {

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

        let style = merge(
            styles.TFilm,
            styles[this.props.name],
            this.props.style
        );

        let items = [];

        if (this.props.items) {

            this.props.items.forEach((v, i) => {
                if (this.props.onFrame) {
                    let frame = this.props.onFrame(v, i, this.handleClick);
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

TFilm.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.any,
    items: PropTypes.string,
    columns: PropTypes.string,
    index: PropTypes.number,
    onClick: PropTypes.func,
    onFrame: PropTypes.func
};

export default TFilm;
