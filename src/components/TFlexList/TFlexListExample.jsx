import React from 'react';

import {TFlexList, TMemo, TGroup, merge} from 'tinput';

const ITEMS = [];
for (let i = 0; i < 20; i++) {
  ITEMS.push({
    column1: 'value ' + i + 1,
    column2: 'value ' + i + 2,
    column3:
      <div style={{textAlign: "right"}}>
        {'value ' + i + 3}
      </div>
  });
}

class TFlexListExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      event: ''
    };
    this.change = this.change.bind(this);
    this.click = this.click.bind(this);
    this.onCellStyle = this.onCellStyle.bind(this);
    this.onFrame = this.onFrame.bind(this);
    this.clear = this.clear.bind(this);
  }

  change(event) {
    this.setState({
      event: this.state.event + ' ' +
        JSON.stringify(event)
    });
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

  onCellStyle(event) {
    let style = {};
    if (event.index % 2 > 0) {
      style = merge(style,
        {backgroundColor: "#d8d7ff"});
    }
    if (typeof (event.cell) === 'string' &&
      event.cell.indexOf('11') >= 0) {
      style = merge(
        style,
        {backgroundColor: "#ffb0b5"}
      );
    }
    return style;
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
          container: {margin: "0 0 16px 0"}
        }}>

          <TFlexList
            style={{
              container: {width: "100%"},
              caption: {backgroundColor: "#3cdd6a"},
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
            pager={{size: 10}}
            onChange={this.change}
            onClick={this.click}
            onFrame={this.onFrame}
            onCellStyle={this.onCellStyle} />

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

export default TFlexListExample;