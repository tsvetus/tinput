import React from 'react';
import PropTypes from 'prop-types';

import {mergeStyles} from '../../util';

import styles from './styles.js';

class List extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {value: this.props.value ? this.props.value : ''}
        this.handleClisk = this.handleClick.bind(this);
    }

    handleClick(event) {
        let value = event.target.value;
        this.setState({value: value});
        this.props.onSelect({value: value});
    }

    render () {

        let style = mergeStyles(styles, this.props.style, this.props.place);

        console.log(JSON.stringify(style));

        let items = [];
        if (this.props.items) {
            if (this.props.empty) {
                items.push(
                    <li key={'empty'} value={this.props.empty.id}>
                        {this.props.empty.name}
                    </li>
                );
            }
            this.props.items.forEach((v, i) => {
                items.push(
                    <div
                        style={style.item}
                        key={i}
                        value={v.id}
                        onClick={this.handleClick}>
                        {v.name}
                    </div>
                );
            });
        }

        return (
            <div style={style.container}>
                {items}
            </div>
        );

    }

}

List.propTypes = {
    onSelect: PropTypes.func.isRequired,
    items: PropTypes.array,
    empty: PropTypes.object,
    place: PropTypes.object
}

export default List;
