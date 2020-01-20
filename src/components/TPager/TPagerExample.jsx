import React from 'react';

import {TPager, TScroll, TGrid, TGroup} from 'tinput';

const ITEMS = [];
for (let i = 0; i < 120; i++) {
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
      items: []
    };
    this.change = this.change.bind(this);
  }

  change(event) {
    this.setState({
      items: event.items
    });
  }

  render() {

    return (

      <div>

        <TGroup style={{
          container: {margin: "0 0 16px 0"}
        }}>

          <TScroll
            style={{
              container: {maxHeight: "400px"},
              content: {padding: "8px"}
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
              items={this.state.items}>

              <TPager
                size={25}
                items={ITEMS}
                onChange={this.change}/>

            </TGrid>

          </TScroll>

        </TGroup>

      </div>

    );

  }

}

export default TPagerExample;