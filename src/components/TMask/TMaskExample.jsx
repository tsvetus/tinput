import React from 'react';

import {TMask, TMemo, TGroup} from 'tinput';

class TMaskExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      event: ''
    };
    this.change = this.change.bind(this);
    this.clear = this.clear.bind(this);
  }

  change(event) {
    this.setState({
      value: event.value,
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

        <TGroup style={{
          container: {margin: "0 0 16px 0"}
        }}>

          <TMask
            style={{
              container: {
                maxWidth: "440px",
                margin: "8px"
              },
              label: {width: "180px"}
            }}
            value={this.state.value}
            label={'Enter phone number:'}
            name={'mask'}
            format={{
              mask: '+1 (NNN) NNN-NN-NN',
              empty: '_'
            }}
            onChange={this.change}/>

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

export default TMaskExample;