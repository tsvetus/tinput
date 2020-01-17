import React from 'react';

import {TButton, TMemo, TGroup} from 'tinput';

class TButtonExample extends React.Component {

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

        return (

            <div>

                <TGroup style={{container: {margin: "0 0 16px 0"}}}>

                    <TButton
                        style={{container: {width: "180px", margin: "8px 0 8px 0"}}}
                        name={'myButton'}
                        onClick={this.click}>
                        Click me!
                    </TButton>

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

export default TButtonExample;