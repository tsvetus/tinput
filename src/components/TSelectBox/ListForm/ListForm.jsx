import React from 'react';
import PropTypes from 'prop-types';

import {merge, parseItem} from '../../../util';

import styles from '../../../styles';

import TForm from '../../TForm';
import TScroll from '../../TScroll';
import TRibbon from '../../TRibbon';
import TPager from '../../TPager';
import TButton from '../../TButton';

class ListForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.handleFrame = this.handleFrame.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleFrame(event) {
        let content = null;
        if (this.props.onFrame) {
            let e = {
                ...event,
                style: event.style.item
            };
            content = this.props.onFrame(e);
        } else {
            let item = parseItem(event.item);
            content = item.value;
        }
        return (
            <TButton
                style={event.style.item.container}
                data={event.item}
                key={event.index}
                index={event.index}
                onClick={this.handleClick}>
                    {content}
            </TButton>
        );
    }

    handlePage(event) {
        this.setState({items: event.items});
    }

    handleClick(event) {
        if (this.props.onClose) {
            this.props.onClose({
                name: this.props.name,
                data: this.props.data,
                item: event.data
            });
        }
    }

    render() {

        let style = merge(styles.TListForm, this.props.style);

        let pager =
            <TPager
                style={style.pager}
                size={this.props.size}
                items={this.props.items}
                timeout={300}
                layout={'middle'}
                onChange={this.handlePage} />;

        return (

            <TForm
                style={style.form}
                show={this.props.show}
                escape={true}
                outerClick={true}
                footerContent={pager}
                onClose={this.props.onClose}>

                    <TRibbon
                        style={style.ribbon}
                        items={this.state.items}
                        onFrame={this.handleFrame} />

            </TForm>

        );

    }

}

ListForm.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    data: PropTypes.object,
    show: PropTypes.any,
    items: PropTypes.array,
    size: PropTypes.number,
    onClose: PropTypes.func,
    onFrame: PropTypes.func
};

ListForm.defaultProps = {
    size: 10
};

export default ListForm;