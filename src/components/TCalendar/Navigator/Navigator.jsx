import React from 'react';
import PropTypes from 'prop-types';

import {merge} from '../../../util';

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
        let mn = this.props.navigators && this.props.navigators.indexOf('mon') >= 0;
        let yn = this.props.navigators && this.props.navigators.indexOf('yea') >= 0;

        let buttons = merge(styles.buttons, this.props.buttons);

        return (
            <div style={style.container}>
                <div style={style.left}>
                    {yn ? <div
                        style={style.button}
                        onClick={()=>{this.changeYear(-1)}}
                        dangerouslySetInnerHTML={{__html: buttons.yearDown}} />
                    : null}
                    {mn ? <div
                        style={style.button}
                        onClick={()=>{this.changeMonth(-1)}}
                        dangerouslySetInnerHTML={{__html: buttons.monthDown}} />
                    : null}
                </div>
                <div style={style.center}>
                    <div style={style.month}>{month}</div>
                    <div style={style.year}>{this.state.year}</div>
                </div>
                <div style={style.right}>
                    {mn ? <div
                        style={style.button}
                        onClick={()=>{this.changeMonth(1)}}
                        dangerouslySetInnerHTML={{__html: buttons.monthUp}} />
                     : null}
                    {yn ? <div
                        style={style.button}
                        onClick={()=>{this.changeYear(1)}}
                        dangerouslySetInnerHTML={{__html: buttons.yearUp}} />
                        : null}
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
    navigators: PropTypes.string,
    onChange: PropTypes.func
};

export default Navigator;
