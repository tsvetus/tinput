import React from 'react';

import {TPager, TScroll, TGrid, TMemo, TGroup} from 'tinput';

const ITEMS = [];
for (let i=0; i<120; i++) {
    ITEMS.push({
        column1: 'value ' + i + 1,
        column2: 'value ' + i + 2,
        column3: <div style={{textAlign: "right"}}>{'value ' + i + 3}</div>
    });
}

class TPagerExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            event: ''
        };
        this.change = this.change.bind(this);
        this.onPage = this.onPage.bind(this);
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

    onPage(event) {
        this.setState({items: event.items});
    }

    render () {

        return (

            <div>

                <TGroup style={{container: {margin: "0 0 16px 0"}}}>

                    <TScroll
                        style={{
                            container: {maxHeight: "400px"},
                            content: {padding: "8px"}
                        }} >

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
                            items={this.state.items} >

                            <TPager
                                size={25}
                                items={ITEMS}
                                onChange={this.onPage} />

                        </TGrid>

                    </TScroll>

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

export default TPagerExample;