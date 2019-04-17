import React from 'react';

import ListBox from '../ListBox';
import Text from '../Text';
import Search from '../Search';
import Time from '../Time';

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
        console.log(JSON.stringify(event));
    }

    handleSearch(query) {
        return [
            {id: 1, name: "first"},
            {id: 2, name: "first second"},
            {id: 3, name: "another"},
            {id: 4, name: "And another"}
        ];
    }

    render() {

        let style = {
            margin: "8px",
            container: {
//                width: "240px"
            },
            label: {
//                width: "200px"
            },
            edit: {
            }
        }

        return (
            <div>

                <ListBox
                    style={style}
                    name="name"
                    label="Time:"
                    value={1}
                    placeholder="Enter time"
                    items={[
                        {id: 1, name: "First item in the wide list"},
                        {id: 2, name: "Second"}
                    ]}
                    empty={{id: 0, name: "-"}}
                    onChange={this.handleChange} />

                <Time
                    style={style}
                    name="name"
                    label="Text:"
                    value="My text"
                    placeholder="Enter text"
                    onChange={this.handleChange} />

                <Search
                    style={style}
                    name="name"
                    label="Time:"
                    placeholder="Enter time"
                    onSearch={this.handleSearch}
                    onChange={this.handleChange} />

            </div>
        );

    }

}

export default Main;
