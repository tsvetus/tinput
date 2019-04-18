import React from 'react';

import {
    ListBox,
    Text,
    Search,
    Year
} from '../../src';

import {
    COLOR,
    FONT,
    TABLE
} from '../../src/styles';

const list = [
    {id: 1, name: "First item"},
    {id: 2, name: "Second item"},
    {id: 3, name: "Third item"},
    {id: 4, name: "Forth item"}
];

const inputStyle = {

    container: {
    },

    label: {
    },

    edit: {
    },

    list: {
    },

    item: {
    }

}

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            events: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
        console.log(JSON.stringify(event));
        let e = this.state.events.slice();
        e.unshift(event);
        this.setState({events: e});
    }

    handleSearch(query) {
        return list.filter((v, i) => {
            return ((query.id && query.id == v.id) ||
                (query.name && v.name.toLowerCase()
                    .indexOf(query.name.toLowerCase()) >= 0));
        });
    }

    render() {

        let events = [];
        this.state.events.forEach((v, i) => {
            events.push(<div key={i} style={{margin: "8px 0 0 0"}}>{JSON.stringify(v)}</div>);
        });

        return (
            <div style={{width: "320px"}}>

                <Text
                    style={inputStyle}
                    name="text"
                    label="Text:"
                    placeholder="Enter text"
                    onChange={this.handleChange} />

                <Text
                    style={inputStyle}
                    name="password"
                    label="Password:"
                    placeholder="Enter password"
                    onChange={this.handleChange}
                    password={true} />

                <ListBox
                    style={inputStyle}
                    name="listbox"
                    label="Item:"
                    value={1}
                    placeholder="Choose item"
                    items={[
                        {id: 1, name: "First item"},
                        {id: 2, name: "Second item"}
                    ]}
                    empty={{id: 0, name: "-"}}
                    onChange={this.handleChange} />

                <Search
                    style={inputStyle}
                    name="search"
                    label="Search:"
                    placeholder="Enter text 'item'"
                    onSearch={this.handleSearch}
                    onChange={this.handleChange} />

                <Year
                    style={inputStyle}
                    name="year"
                    label="Year:"
                    placeholder="Enter year"
                    onChange={this.handleChange}
                    />

                <div style={{
                        color: COLOR.BORDER,
                        fontFamily: FONT.LABEL.FAMILY,
                        fontSize: FONT.LABEL.SIZE,
                        margin: "16px 0 0 0"
                    }}>
                    On change event:
                </div>

                <div style={{
                        minHeight: "100px",
                        ...TABLE.CELL
                    }}>
                    {events}
                </div>

            </div>
        );

    }

}

export default Main;
