import React from 'react';

import {TSide, TTop, TGroup, TMemo} from 'tinput';

class TSideExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            side: false,
            event: ''
        };
        this.click = this.click.bind(this);
        this.clear = this.clear.bind(this);
    }

    click(event) {
        let side = false;
        if (event.name === 'top') {
            side = true;
        } else if (event.name === 'side') {
            side = false;
        }
        this.setState({
            side: side,
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

                    <TSide
                        show={this.state.side}
                        name={'side'}
                        items={[
                            {name: 'first', caption: 'First item'},
                            {name: 'second', caption: 'Second item'}
                        ]}
                        onClick={this.click} />

                    <TTop
                        style={{container: {width: "100%", padding: "8px"}}}
                        name={'top'}
                        caption={'Click menu icon or touch/move from left side of screen to the right'}
                        tools={[
                            {icon: 'tinput'}
                        ]}
                        onClick={this.click} />

                </TGroup>

                <TMemo
                    style={{edit: {minHeight: "48px"}}}
                    label={'onChange events:'}
                    icon={'refresh'}
                    wrap={true}
                    value={this.state.event}
                    onIcon={this.clear} />

            </div>

        );

    }

}

export default TSideExample;