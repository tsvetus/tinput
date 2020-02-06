import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone, contain, parseItem} from '../../util';

import TGroupButton from '../TGroupButton';
import ListForm from './ListForm';

import styles from '../../styles';

/**
 * Combobox with select list
 */
class TSelectBox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            item: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        let control = event.item.name;
        if (control === 'caption' && this.props.onCaptionClick) {
            this.setState({show: true});
            this.props.onCaptionClick({
                name: this.props.name,
                data: this.props.data,
                control: control
            });
        } else if (control === 'button' && this.props.onButtonClick) {
            this.setState({item: null});
            this.props.onButtonClick({
                name: this.props.name,
                data: this.props.data,
                control: control
            });
        }
    }

    handleClose(event) {
        if (event.item) {
            this.setState({
                show: false,
                item: event.item
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

        let formStyle = {
            item: contain(style.item),
            pager: contain(style.pager)
        };

        let content = null;
        if (this.state.item) {
            if (this.props.onFrame) {
                content = this.props.onFrame({item: this.state.item, style: formStyle.item});
            } else {
                let item = parseItem(this.state.item);
                content = item.value;
            }
        } else {
            content = this.props.children;
        }

        let items = [];
        items.push({name: 'caption', caption: content, style: clone(style.caption)});
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
                    items={this.props.items}
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
    }),
    /** Component name */
    name: PropTypes.any,
    /** Component data */
    data: PropTypes.any,
    items: PropTypes.array,
    placeholder: PropTypes.any,
    onFrame: PropTypes.func,
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
    wait: false,
    down: false
};

export default TSelectBox;
