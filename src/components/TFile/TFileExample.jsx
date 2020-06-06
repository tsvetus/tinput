import React from 'react';

import {TFile, TMemo, TGroup} from 'tinput';

class TFileExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
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
          container: {margin: "0 0 16px 0"}
        }}>

          <TFile
            style={{
              container: {
                maxWidth: "440px",
                margin: "8px"
              }
            }}
            value={this.state.file}
            label={'Choose file:'}
            name={'file'}
            layout={'top'}
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

export default TFileExample;