import React from 'react';

import ListBox from '../ListBox';


class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(JSON.stringify(event));
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
            </div>
        );

    }

}

export default Main;
