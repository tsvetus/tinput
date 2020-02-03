import React from 'react';

import {TRibbon, TPager, TScroll, TMemo, TGroup} from 'tinput';

const ITEMS = [];
for (let i = 0; i < 122; i++) {
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
      items: [],
      event: ''
    };
    this.change = this.change.bind(this);
    this.onFrame = this.onFrame.bind(this);
    this.clear = this.clear.bind(this);
    this.onPage = this.onPage.bind(this);
  }

  change(event) {
    this.setState({
      event: this.state.event + ' ' +
        JSON.stringify(event)
    });
  }

  onPage(event) {
    this.setState({
      items: event.items
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
            container: {
              height: "300px"
            }
          }}>

            <TRibbon
              style={{
                container: {
                  width: "100%"
                },
                content: {
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around"
                },
                frame: {
                  width: "200px",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #aaa",
                  margin: "8px",
                  padding: "16px"
                },
                column1: {width: "100%", textAlign: "left"},
                column2: {width: "100%", textAlign: "center"},
                column3: {width: "100%", textAlign: "right"}
              }}
              name={'myRibbon'}
              items={this.state.items}
              onChange={this.change}
              onFrame={this.onFrame}>

              <TPager
                  size={25}
                  items={ITEMS}
                  name={'pgGrid'}
                  onChange={this.onPage}/>

            </TRibbon>

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