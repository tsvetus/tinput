import React from 'react';

import {TSearch, TMemo, TGroup, TListBox} from 'tinput';

const ITEMS = [
    {key: 'key1', value: 'First item'},
    {key: 'key2', value: 'Second item'},
    {key: 'key3', value: 'Third item'},
    {key: 'key4', value: 'Forth item'}
];

class TSearchExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mySearch1: 'key2',
            mySearch2: null,
            event: ''
        };
        this.change = this.change.bind(this);
        this.clear = this.clear.bind(this);
        this.search = this.search.bind(this);
    }

    search(event, callback) {
        let items = ITEMS.filter(v => {
            return (
                v.value.indexOf(event.value) >= 0 ||
                v.key.indexOf(event.value) >= 0 ||
                v.key == event.key
            );
        });
        setTimeout(() => {
            callback(items);
        }, 500);
    }

    change(event) {
        this.setState({
            [event.name]: event.value,
            event: this.state.event + ' ' + JSON.stringify(event)
        });
    }

    clear() {
        this.setState({event: null});
    }

    render () {

        return (

            <div>

                <TGroup style={{container: {margin: "0 0 16px 0"}}}>

                    <TSearch
                        style={{container: {width: "380px", margin: "8px 0 8px 0"}}}
                        name={'mySearch1'}
                        value={this.state.mySearch1}
                        label={'Choose item:'}
                        placeholder={'Type word "item" or "key"'}
                        empty={{key: 0, value: '-'}}
                        onSearch={this.search}
                        onChange={this.change} />

                    <TSearch
                        style={{container: {width: "380px", margin: "8px 0 8px 0"}}}
                        name={'mySearch2'}
                        value={this.state.mySearch2}
                        label={'Choose item:'}
                        placeholder={'Type word "item" or "key"'}
                        showMode={'key'}
                        listMode={'key value'}
                        empty={{key: 0, value: '-'}}
                        onSearch={this.search}
                        onChange={this.change} />

                </TGroup>

                <TMemo
                    style={{edit: {minHeight: "48px"}}}
                    label={'onChange events:'}
                    icon={'refresh'}
                    value={this.state.event}
                    onIcon={this.clear} />

            </div>

        );

    }

}

export default TSearchExample;