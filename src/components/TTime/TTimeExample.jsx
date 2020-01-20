import React from 'react';

import {TTime, TMemo, TGroup} from 'tinput';

class TTimeExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
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

          <TTime
            style={{
              container: {
                width: "280px",
                margin: "8px 0 8px 0"
              }
            }}
            name={'myTimeEdit'}
            value={this.state.value}
            label={'Enter valid time:'}
            format={{
              mask: 'hh:mm',
              empty: '_',
              full: true,
              type: 'iso'
            }}
            onChange={this.change}/>

        </TGroup>

        <TMemo
          style={{
            edit: {minHeight: "48px"}
          }}
          label={'onChange events:'}
          icon={'refresh'}
          value={this.state.event}
          onIcon={this.clear}/>

      </div>

    );

  }

}

export default TTimeExample;