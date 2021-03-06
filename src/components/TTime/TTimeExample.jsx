import React from 'react';

import {TTime, TMemo, TGroup, strTime} from 'tinput';

class TTimeExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      event: ''
    };
    this.change = this.change.bind(this);
    this.clear = this.clear.bind(this);
    this.onIcon = this.onIcon.bind(this);
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

  onIcon() {
    this.setState({value: new Date()});
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
                  width: "180px",
                  margin: "8px 0 8px 0"
                }
              }}
              name={'simpleTimeEdit'}
              value={this.state.value}
              label={'Enter time:'}
              nestedIcon={true}
              required={'never'}
              onChange={this.change}/>

          <TTime
            style={{
              container: {
                width: "260px",
                margin: "8px 0 8px 0"
              }
            }}
            name={'myTimeEdit'}
            value={this.state.value}
            label={'Enter valid time:'}
            required={'always'}
            format={{
              mask: 'hh:mm',
              empty: '_',
              full: true,
              type: 'iso'
            }}
            icon={'add'}
            onIcon={this.onIcon}
            onChange={this.change}/>

          <TTime
              style={{
                container: {
                  width: "200px",
                  margin: "8px 0 8px 0"
                }
              }}
              name={'anotherTimeEdit'}
              value={this.state.value}
              label={'Enter time:'}
              nestedIcon={true}
              icon={'refresh'}
              onIcon={this.onIcon}
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