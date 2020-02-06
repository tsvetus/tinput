import React from 'react';

import {TSelectBox, TMemo, TGroup} from 'tinput';

const ITEMS = [];
for (let i=0; i<95; i++) {
  ITEMS.push({id: i, name: 'Name ' + i, description: 'Description ' + 1});
}

class TSelectBoxExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      event: '',
      item: null
    };
    this.click = this.click.bind(this);
    this.clear = this.clear.bind(this);
    this.frame = this.frame.bind(this);
  }

  click(event) {
    this.setState({
      event: this.state.event + ' ' +
        JSON.stringify(event)
    });
  }

  clear() {
    this.setState({event: null});
  }

  frame(event) {
    return (
        <div style={event.style.container}>
          <div style={event.style.name}>{event.item.name}</div>
          <div style={event.style.description}>{event.item.description}</div>
        </div>
    );
  }

  render() {

    return (

      <div>

        <TGroup
          style={{
            container: {margin: "0 0 16px 0"},
            content: {justifyContent: "space-around"}
          }}>

          <TSelectBox
            style={{
              container: {
                margin: "8px 0 8px 0"
              },
              item: {
                container: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around"
                },
                name: {
                  color: "#882419",
                  fontSize: "24px"
                },
                description: {
                  margin: "0 0 0 8px",
                  fontSize: "18px"
                }
              }
            }}
            name={'mySelectBox'}
            items={ITEMS}
            item={this.state.item}
            onFrame={this.frame}
            onButtonClick={this.click}
            onCaptionClick={this.click}>
              <div>Click me to show items selection form</div>
          </TSelectBox>

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

export default TSelectBoxExample;