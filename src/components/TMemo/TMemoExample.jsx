import React from 'react';

import {TMemo, TGroup} from 'tinput';

class TMemoExample extends React.Component {

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

          <TMemo
            style={{
              edit: {minHeight: "48px"}
            }}
            label={'Enter long text:'}
            wrap={true}
            value={this.state.value}
            onChange={this.change}/>

        </TGroup>

        <TMemo
          style={{
            edit: {minHeight: "48px"}
          }}
          label={'onChange events:'}
          icon={'refresh'}
          wrap={true}
          value={this.state.event}
          onIcon={this.clear}/>

      </div>

    );

  }

}

export default TMemoExample;