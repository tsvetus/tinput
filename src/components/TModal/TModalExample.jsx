import React from 'react';

import {TModal, TButton, TMemo, TGroup} from 'tinput';

class TModalExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      event: ''
    };
    this.click = this.click.bind(this);
    this.clear = this.clear.bind(this);
  }

  click(event) {
    this.setState({
      show: !this.state.show,
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

        <TModal
            style={{
              container: {
                maxWidth: "360px"
              },
              content: {
                  padding: "16px"
              }
            }}
            name={'myModal'}
            show={this.state.show}
            onClose={this.click}>

          <div
              style={{
                flex: "1 1 100%",
                padding: "8px",
                border: "2px solid #ddd"
              }}>
            Any modal content
          </div>

        </TModal>

        <TGroup
          style={{
            container: {margin: "0 0 16px 0"}
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

export default TModalExample;