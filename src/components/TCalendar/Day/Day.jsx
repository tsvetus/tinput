import React from 'react';
import PropTypes from 'prop-types';

import {merge, isoDate} from '../../../util';

class Day extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick && this.props.params && this.props.params.active) {
            this.props.onClick({date: this.props.data});
        }
    }

    render () {

        let style = this.props.style;

        let cs = style.content;
        if (this.props.params) {
            if (!this.props.params.active) {
                cs = merge(cs, style.inactive);
            }
            if (this.props.params.selected) {
                cs = merge(cs, style.selected);
            }
            if (isoDate(this.props.data) === isoDate(new Date())) {
                cs = merge(cs, style.current);
            }
        }

        return (
            <div style={style.container} onClick={this.handleClick}>
                <div style={cs}>
                    {this.props.caption}
                </div>
            </div>
        );

    }

}

Day.propTypes = {
    style: PropTypes.object,
    caption: PropTypes.any,
    data: PropTypes.any,
    params: PropTypes.object,
    onClick: PropTypes.func
};

export default Day;
