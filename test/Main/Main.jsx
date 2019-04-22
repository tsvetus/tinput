import React from 'react';

import {

    TListBox,
    TText,
    TSearch,
    TMask,
    TDate,
    TTime,
    TMail,
    TMemo,
    TCheck,

    COLOR,
    TABLE,
    FONT

} from 'tinput';

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
        let e = this.state.events.slice();
        e.unshift(event);
        this.setState({events: e});
    }

    handleSearch(query, callback) {
        let items = list.filter((v, i) => {
            return ((query.id && query.id == v.id) ||
                (query.name && v.name.toLowerCase()
                    .indexOf(query.name.toLowerCase()) >= 0));
        });
        callback(items);
    }

    render() {

        let events = [];
        this.state.events.forEach((v, i) => {
            events.push(<div key={i} style={{margin: "8px 0 0 0"}}>{JSON.stringify(v)}</div>);
        });

        return (

            <div style={{width: "320px"}}>

                <TText
                    style={inputStyle}
                    name="text"
                    label="Text:"
                    placeholder="Enter text"
                    onChange={this.handleChange} />

                <TText
                    style={inputStyle}
                    name="password"
                    label="Password:"
                    placeholder="Enter password"
                    onChange={this.handleChange}
                    password={true} />

                <TListBox
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

                <TSearch
                    style={inputStyle}
                    name="search"
                    label="Search:"
                    placeholder="Enter text 'item'"
                    onSearch={this.handleSearch}
                    onChange={this.handleChange} />

                <TMask
                    style={inputStyle}
                    name="dateMask"
                    label="Masked date:"
                    value="22.04.2019"
                    mask={{mask: "NN.NN.NNNN", empty: "-"}}
                    onChange={this.handleChange} />

                <TDate
                    style={inputStyle}
                    name="date"
                    label="Date:"
                    value={new Date()}
                    format={{mask: "DD.MM.YYYY", empty: "-"}}
                    onChange={this.handleChange} />

                <TTime
                    style={inputStyle}
                    name="time"
                    label="Time:"
                    value={new Date()}
                    format={{mask: "hh:mm", empty: "-"}}
                    onChange={this.handleChange} />

                <TMail
                    style={inputStyle}
                    name="email"
                    label="EMail:"
                    value="google@google.com"
                    onChange={this.handleChange} />

                <TCheck
                    style={inputStyle}
                    name="checkbox"
                    label="Check me:"
                    onChange={this.handleChange} />

                <TMemo
                    style={{margin: "16px 0 0 0", height: "100px"}}
                    name="memo"
                    label="Textarea:"
                    value="Text"
                    onChange={this.handleChange} />

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
