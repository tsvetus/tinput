import React from 'react';

import {TCheck, TGroup, TMemo} from 'tinput';

class TCheckExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      check: 1,
      radio: 0,
      event: ''
    };
    this.change = this.change.bind(this);
    this.clear = this.clear.bind(this);
  }

  change(event) {
    this.setState({
      [event.name]: event.value,
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
          container: {margin: "0 0 16px 0"},
          content: {justifyContent: "space-around"}
        }}>

          <TCheck
            style={{
              container: {width: "120px"}
            }}
            name={'check'}
            label={'Check me:'}
            value={this.state.check}
            checked={1}
            unchecked={0}
            onChange={this.change}/>

          <TCheck
              style={{
                container: {width: "120px"}
              }}
              name={'radio'}
              label={'Select me'}
              value={this.state.radio}
              radio={true}
              layout={'right'}
              checked={1}
              unchecked={0}
              onChange={this.change}/>

        </TGroup>

        <TMemo
          style={{edit: {minHeight: "48px"}}}
          label={'onChange events:'}
          icon={'refresh'}
          wrap={true}
          value={this.state.event}
          onIcon={this.clear}/>

      </div>

    );

  }

}

export default TCheckExample;