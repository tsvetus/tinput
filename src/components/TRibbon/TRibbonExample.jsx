import React from 'react';

import {TRibbon, TScroll, TMemo, TGroup} from 'tinput';

const ITEMS = [];
for (let i = 0; i < 20; i++) {
  ITEMS.push({
    column1: 'value ' + i + 1,
    column2: 'value ' + i + 2,
    column3: 'value ' + i + 3
  });
}

class TRibbonExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      event: ''
    };
    this.change = this.change.bind(this);
    this.onFrame = this.onFrame.bind(this);
    this.clear = this.clear.bind(this);
  }

  change(event) {
    this.setState({
      event: this.state.event + ' ' +
        JSON.stringify(event)
    });
  }

  clear() {
    this.setState({event: null});
  }

  onFrame(event) {
    return (
      <div
          key={event.index}
          index={event.index}
          style={event.style.frame}
          onClick={event.onClick} >
        <div style={event.style.column1}>{event.item.column1}</div>
        <div style={event.style.column2}>{event.item.column2}</div>
        <div style={event.style.column3}>{event.item.column3}</div>
      </div>
    );
  }

  render() {

    return (

      <div>

        <TGroup style={{
          container: {
            margin: "0 0 16px 0"
          }
        }}>

          <TScroll style={{
            container: {height: "300px"},
            content: {
              padding: "16px",
              display: "flex",
              justifyContent: "center"
            }
          }}>

            <TRibbon
              style={{
                container: {width: "300px"},
                caption: {backgroundColor: "#ddd"},
                frame: {
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #aaa",
                  margin: "4px 0 4px 0",
                  padding: "16px"
                },
                column1: {width: "100%", textAlign: "left"},
                column2: {width: "100%", textAlign: "center"},
                column3: {width: "100%", textAlign: "right"}
              }}
              name={'myGrid'}
              columns={{
                column1: {
                  caption: "Column 1",
                  width: "1fr"
                },
                column2: {
                  caption: "Column 2",
                  width: "2fr"
                },
                column3: {
                  caption: "Column 3",
                  width: "2fr"
                }
              }}
              items={ITEMS}
              onChange={this.change}
              onFrame={this.onFrame}/>

          </TScroll>

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

export default TRibbonExample;