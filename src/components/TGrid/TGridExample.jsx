import React from 'react';

import {TGrid, TMemo, TGroup} from 'tinput';

const ITEMS = [];
for (let i=0; i<20; i++) {
    ITEMS.push({
        column1: 'value ' + i + 1,
        column2: 'value ' + i + 2,
        column3: <p style={{textAlign: "right"}}>{'value ' + i + 3}</p>
    });
}

class TGridExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 2,
            event: ''
        };
        this.change = this.change.bind(this);
        this.onRowStyle = this.onRowStyle.bind(this);
        this.clear = this.clear.bind(this);
    }

    change(event) {
        this.setState({
            value: event.value,
            event: this.state.event + ' ' + JSON.stringify(event)
        });
    }

    clear() {
        this.setState({event: null});
    }

    onRowStyle(event) {
    }

    render () {

        return (

            <div>

                <TGroup style={{container: {margin: "0 0 16px 0"}}}>

                    <TGrid
                        style={{
                            container: {width: "100%"},
                            caption: {backgroundColor: "#ddd"}
                        }}
                        name={'myGrid'}
                        columns={{
                            column1: {caption: "Column 1", width: "1fr"},
                            column2: {caption: "Column 2", width: "2fr"},
                            column3: {caption: "Column 3", width: "2fr"}
                        }}
                        items={ITEMS}
                        onRowStyle={this.onRowStyle} />

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

export default TGridExample;