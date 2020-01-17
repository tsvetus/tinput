import React from 'react';

import {TIcon, TMemo, TGroup} from 'tinput';

class TIconExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            event: ''
        };
        this.click = this.click.bind(this);
        this.clear = this.clear.bind(this);
    }

    click(event) {
        this.setState({
            event: this.state.event + ' ' + JSON.stringify(event)
        });
    }

    clear() {
        this.setState({event: null});
    }

    render () {

        let icons = [];
        for (let key in TIcon.icons) {
            icons.push(
                <div
                    key={key}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "16px"
                    }}>
                    <TIcon
                        style={{container: {margin: "0 0 16px 0"}}}
                        name={key}
                        onClick={this.click} />
                    <div>{key}</div>
                </div>
            );
        }

        return (

            <div>

                <TGroup
                    style={{
                        container: {margin: "0 0 16px 0"},
                        content: {justifyContent: "flex-start"}
                    }}>

                    {icons}

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

export default TIconExample;