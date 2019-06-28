import React from 'react';

import {

    TTop,
    TSide,

    TListBox,
    TText,
    TSearch,
    TMask,
    TDate,
    TTime,
    TMail,
    TMemo,
    TCheck,

    TScroll,

    TButton,

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
            events: [],
            menuOpen: false,
            mask: '212-85-06',
            date: new Date(),
            time: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTopClick = this.handleTopClick.bind(this);
        this.handleSideClick = this.handleSideClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        let e = this.state.events.slice();
        e.unshift(event);
        this.setState({
            events: e,
            [event.name]: event.value
        });
    }

    handleSearch(query, callback) {
        let items = list.filter((v, i) => {
            return ((query.id && query.id == v.id) ||
                (query.name && v.name.toLowerCase()
                    .indexOf(query.name.toLowerCase()) >= 0));
        });
        callback(items);
    }

    handleTopClick(event) {
        this.setState({menuOpen: true});
        this.handleChange(event);
    }

    handleSideClick(event) {
        this.setState({menuOpen: false});
        this.handleChange(event);
    }

    handleClick(event) {
        this.setState({
            time: new Date()
        });
        this.handleChange(event);
    }

    render() {

        let events = [];
        this.state.events.forEach((v, i) => {
            events.push(
                <div key={i} style={{margin: "8px 0 0 0"}}>
                    {JSON.stringify(v)}
                </div>);
        });

        return (

            <div>

                <TTop onClick={this.handleTopClick} />

                <TSide
                    onClick={this.handleSideClick}
                    open={this.state.menuOpen}
                    items={[
                        {name: "first", caption: "First menu item"},
                        {name: "second", caption: "Second menu item"}
                    ]} />

                <div style={{
                        ...TABLE.CELL,
                        fontFamily: FONT.LABEL.FAMILY,
                        fontSize: FONT.LABEL.SIZE,
                        textAlign: "center",
                        margin: "auto",
                        maxWidth: "800px",
                        marginTop: "32px",
                        marginBottom: "32px",
                        padding: "16px"
                    }}>
                    TInput components example page
                </div>

                <TScroll>

                    <div style={{maxWidth: "380px", margin: "auto"}}>

                        <TButton
                            style={{width: "100px"}}
                            name={'button'}
                            data={'button data'}
                            onClick={this.handleClick}>
                            Button
                        </TButton>

                        <TText
                            style={inputStyle}
                            name="text"
                            label="Text:"
                            placeholder="Enter text"
                            value="default text"
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
                            value={2}
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
                            value={1}
                            onSearch={this.handleSearch}
                            onChange={this.handleChange} />

                        <TMask
                            style={inputStyle}
                            name="mask"
                            label="Masked number:"
                            value={this.state.mask}
                            valueNull={true}
                            mask={{mask: "NNN-NN-NN", empty: "_"}}
                            onChange={this.handleChange} />

                        <TDate
                            style={inputStyle}
                            name={'date'}
                            label={'Date:'}
                            value={this.state.date}
                            valueNull={true}
                            format={{mask: "DD/MM/YYYY", empty: "-"}}
                            onChange={this.handleChange} />

                        <TTime
                            style={inputStyle}
                            name={'time'}
                            label={'Time:'}
                            value={this.state.time}
                            valueNull={true}
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
                            value={true}
                            valueInt={true}
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
                                overflow: "auto",
                                minHeight: "100px",
                                ...TABLE.CELL
                            }}>
                            {events}
                        </div>

                        <div style={{
                                color: COLOR.BORDER,
                                fontFamily: FONT.LABEL.FAMILY,
                                fontSize: FONT.LABEL.SIZE,
                                margin: "16px 0 0 0"
                            }}>
                            TScroll example:
                        </div>
                        <TScroll style={{height: "100px", width: "100%", margin: "16px 4px 4px 4px"}}>
                            <div>
                                Tears glistened in her eyes. And when we steamed slowly out of the lagoon,
                                making our way gingerly through the opening in the reef, and then steered
                                for the open sea, a certain melancholy fell upon me. The breeze was laden
                                still with the pleasant odours of the land. Tahiti is very far away, and I
                                knew that I should never see it again. A chapter of my life was closed,
                                and I felt a little nearer to inevitable death.
                            </div>

                        </TScroll>

                    </div>

                </TScroll>

            </div>

        );

    }

}

export default Main;
