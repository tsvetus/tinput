import React from 'react';

import {TTop, TGroup, TMemo} from 'tinput';

class TTopExample extends React.Component {

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
            event: this.state.event + ' ' +
                JSON.stringify(event)
        });
    }

    clear() {
        this.setState({event: null});
    }

    render () {

        return (

            <div>

                <TGroup style={{
                    container: {margin: "0 0 16px 0"}
                }}>

                    <TTop
                        style={{
                            container: {
                                width: "100%",
                                padding: "8px"}
                        }
                        }
                        name={'top'}
                        caption={'Menu caption'}
                        tools={[{
                            icon: 'tinput',
                            onClick: (event) => {
                                alert(JSON.stringify(event))
                            }
                        }]}
                        onClick={this.click} />

                </TGroup>

                <TMemo
                    style={{
                        edit: {minHeight: "48px"}
                    }}
                    label={'onChange events:'}
                    icon={'refresh'}
                    wrap={true}
                    value={this.state.event}
                    onIcon={this.clear} />

            </div>

        );

    }

}

export default TTopExample;