import React from 'react';

import {TButton, TMemo, TGroup} from 'tinput';

class TButtonExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      down: false,
      event: ''
    };
    this.click = this.click.bind(this);
    this.clear = this.clear.bind(this);
  }

  click(event) {
    let down = event.name === 'myDownButton' ?
        !this.state.down : this.state.down;
    this.setState({
      down: down,
      event: this.state.event + ' ' +
        JSON.stringify(event)
    });
  }

  clear() {
    this.setState({event: null});
  }

  render() {

    return (

      <div>

        <TGroup
          style={{
            container: {margin: "0 0 16px 0"},
            content: {justifyContent: "space-around"}
          }}>

          <TButton
            style={{
              container: {
                width: "180px",
                margin: "8px 0 8px 0"
              }
            }}
            name={'myButton'}
            onClick={this.click}>
            Click me!
          </TButton>

          <TButton
              style={{
                container: {
                  width: "180px",
                  margin: "8px 0 8px 0"
                }
              }}
              name={'myDownButton'}
              down={this.state.down}
              onClick={this.click}>
            Click me too!
          </TButton>

        </TGroup>

        <TMemo
          style={{edit: {minHeight: "48px"}}}
          label={'onChange events:'}
          icon={'refresh'}
          value={this.state.event}
          onIcon={this.clear}/>

      </div>

    );

  }

}

export default TButtonExample;