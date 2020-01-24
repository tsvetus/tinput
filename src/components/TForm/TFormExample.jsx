import React from 'react';

import {TForm, TButton, TMemo, TGroup} from 'tinput';

class TModalExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      event: '',
      error: null,
      message: null
    };
    this.click = this.click.bind(this);
    this.clear = this.clear.bind(this);
  }

  click(event) {
    if (event.button === 'save') {
        this.setState({
            error: 'Nothing to save!',
            event: this.state.event + ' ' +
                JSON.stringify(event)
        });
    } else if (event.button === 'message') {
        this.setState({
            message: 'Press "Ok" to close!',
            event: this.state.event + ' ' +
                JSON.stringify(event)
        });
    } else if (event.button === 'continue') {
        this.setState({
            error: null,
            event: this.state.event + ' ' +
                JSON.stringify(event)
        });
    } else {
        this.setState({
            show: !this.state.show,
            error: null,
            message: null,
            event: this.state.event + ' ' +
                JSON.stringify(event)
        });
    }
  }

  clear() {
    this.setState({event: null});
  }

  render() {

    return (

      <div>

        <TForm
            style={{
              container: {
                maxWidth: "400px"
              },
              content: {
                  padding: "16px"
              },
              buttons: {
                  message: {color: "#1e4c0f"},
                  continue: {color: "#131868"}
              }
            }}
            name={'myForm'}
            show={this.state.show}
            buttons={{
                save: "Save",
                message: "Message",
                cancel: "Cancel"
            }}
            error={this.state.error}
            errorButtons={{
                continue: 'Continue'
            }}
            message={this.state.message}
            messageButtons={{
                ok: 'Ok'
            }}
            caption={'Form caption'}
            countdown={25}
            onClose={this.click}>

          <div
              style={{
                flex: "1 1 100%",
                padding: "8px",
                border: "2px solid #ddd"
              }}>
            Any modal content
          </div>

        </TForm>

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