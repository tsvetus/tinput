import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../../styles';

class Navigator extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            year: props.year,
            month: props.month
        };
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.change = this.change.bind(this);
    }

    change() {
        if (this.props.onChange) {
            this.props.onChange(this.state);
        }
    }

    changeMonth(dir) {
        let month = this.state.month + dir;
        let state = {};
        if (month < 0) {
            state = {
                year: this.state.year - 1,
                month: 11
            };
        } else if (month > 11) {
            state = {
                year: this.state.year + 1,
                month: 0
            };
        } else {
            state = {month: month};
        }
        this.setState(state, () => {
            this.change();
        });
    }

    changeYear(dir) {
        this.setState({year: this.state.year + dir}, () => {
            this.change();
        });
    }

    render () {

        let style = this.props.style;

        let month = this.props.months[this.state.month];

        return (
            <div style={style.container}>
                <div style={style.left}>
                    <div style={style.button} onClick={()=>{this.changeYear(-1)}}>&lt;</div>
                    <div style={style.button} onClick={()=>{this.changeMonth(-1)}}>&lt;&lt;&lt;</div>
                </div>
                <div style={style.month}>{month}</div>
                <div style={style.year}>{this.state.year}</div>
                <div style={style.right}>
                    <div style={style.button} onClick={()=>{this.changeMonth(1)}}>&gt;&gt;&gt;</div>
                    <div style={style.button} onClick={()=>{this.changeYear(1)}}>&gt;</div>
                </div>
            </div>
        );

    }

}

Navigator.propTypes = {
    style: PropTypes.object,
    year: PropTypes.number,
    month: PropTypes.number,
    months: PropTypes.array,
    onChange: PropTypes.func
};

export default Navigator;
