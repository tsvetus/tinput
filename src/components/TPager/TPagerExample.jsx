import React from 'react';

import {TPager, TScroll, TGrid, TGroup, TMemo} from 'tinput';

const ITEMS = [];
for (let i = 0; i < 450; i++) {
  ITEMS.push({
    column1: 'value ' + i + 1,
    column2: 'value ' + i + 2,
    column3:
      <div style={{textAlign: "right"}}>
        {'value ' + i + 3}
      </div>
  });
}

class TPagerExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      events: ''
    };
    this.change = this.change.bind(this);
    this.click = this.click.bind(this);
    this.clear = this.clear.bind(this);
  }

  change(event) {
    this.setState({
      items: event.items,
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

  render() {

    return (

      <div>

        <TGroup style={{
          container: {margin: "0 0 16px 0"}
        }}>

          <TScroll
            style={{
              container: {maxHeight: "400px"}
            }}>

            <TGrid
              style={{
                container: {width: "100%"},
                caption: {backgroundColor: "#ddd"}
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
              onRowStyle={(event) => {
                if (event.index % 2 > 0) {
                  return {color: "#1b7a2e"}
                }
              }}
              onClick={this.click}
              items={this.state.items}>

              <TPager
                size={100}
                items={ITEMS}
                name={'pgGrid'}
                onChange={this.change}/>

            </TGrid>

          </TScroll>

        </TGroup>

        <TMemo
          style={{edit: {minHeight: "48px"}}}
          label={'Events:'}
          icon={'refresh'}
          value={this.state.event}
          onIcon={this.clear}/>

      </div>

    );

  }

}

export default TPagerExample;