import React from 'react';

import Input from 'Input';


class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

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

                <Input
                    style={style}
                    type="listbox"
                    name="name"
                    label="Time:"
                    items={[
                        {id: 1, name: "First"},
                        {id: 2, name: "Second"}
                    ]}
                    onChange={this.handleChange} />
            </div>
        );

    }

}

export default Main;
