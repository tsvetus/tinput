import React from 'react';

import {TGroupButton, TMemo, TGroup} from 'tinput';

class TGroupButtonExample extends React.Component {

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

          <TGroupButton
            style={{
              container: {
                margin: "8px 0 8px 0"
              }
            }}
            name={'comboButton'}
            items={[
                {caption: 'Button1', name: 'btn1'},
                {caption: 'Button2', name: 'btn2'},
                {icon: 'close', name: 'close'}
            ]}
            onClick={this.click} />

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

export default TGroupButtonExample;