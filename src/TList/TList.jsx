import React from 'react';
import PropTypes from 'prop-types';

import List from '../List';

class TList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {show: props.show}
    }

    componentDidUpdate(old) {
        if (old.show !== this.props.show) {
            this.setState({show: this.props.show});
        }
    }

    render () {

        let place = {
            ...this.props.place
        }

        if (this.props.rect) {
            place.top = this.props.rect.y;
            place.left = this.props.rect.x;
        }

        if (!place.top) {
            place.top = '0';
        } else if (Number.isInteger(place.top)) {
            place.top += 'px';
        }

        if (!place.left) {
            place.left = '0';
        } else if (Number.isInteger(place.left)) {
            place.left += 'px';
        }

        // if (!place.width) {
        //     place.width = '120px';
        // } else

        if (Number.isInteger(place.width)) {
            place.width += 'px';
        }

        if (this.state.show) {
            return (
                <List
                    value={this.props.value}
                    style={this.props.style}
                    items={this.props.items}
                    empty={this.props.empty}
                    place={place}
                    onSelect={this.props.onSelect}
                    autoFocus={this.props.autoFocus}
                />
            );
        } else {
            return (
                <div></div>
            );
        }

    }

}

TList.propTypes = {
    onSelect: PropTypes.func.isRequired,
    items: PropTypes.array,
    empty: PropTypes.object,
    place: PropTypes.object,
    rect: PropTypes.object,
    autoFocus: PropTypes.bool,
    show: PropTypes.bool
}

export default TList;
