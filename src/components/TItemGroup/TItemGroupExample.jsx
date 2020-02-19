import React from 'react';

import {TItemGroup, TMemo} from 'tinput';

const ITEMS = [
  {code: 1, name: 'Item1', group: 0},
  {code: 2, name: 'Item2', group: 0},
  {code: 3, name: 'Item3', group: 0},
  {code: 4, name: 'Item4', group: 0},
  {code: 5, name: 'Item5', group: 1},
  {code: 6, name: 'Item6', group: 1},
  {code: 7, name: 'Item7', group: 1}
];

class TItemGroupExample extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        items: [],
        event: ''
      };
      this.change = this.change.bind(this);
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

    render() {

      return (

      <div>

        <TItemGroup
          label={'Button group'}
          name={'buttons'}
          style={{
            container: {margin: "16px 0 16px 0"},
            content: {
                justifyContent: "space-around",
                padding: "16px 0 16px 0"
            },
            control: {
                container: {
                    width: "60px",
                    margin: "8px"
                },
                down: {
                    backgroundColor: "#438d39",
                    fontWeight: "bold",
                    color: "#fff"
                }
            }
          }}
          grouped={true}
          indexes={[2,4]}
          items={ITEMS}
          keyField={'code'}
          valueField={'name'}
          onChange={this.change} />

          <TItemGroup
            label={'Check group'}
            name={'checks'}
            style={{
              container: {margin: "0 0 16px 0"},
                content: {
                    justifyContent: "space-around",
                    padding: "16px 0 16px 0"
                },
              control: {
                  container: {
                      width: "72px",
                      margin: "8px"
                  }
              }
            }}
            layout={'right'}
            control={'check'}
            grouped={true}
            indexes={[2,4]}
            items={ITEMS}
            keyField={'code'}
            valueField={'name'}
            onChange={this.change} />

          <TItemGroup
              label={'Radio group'}
              name={'radios'}
              style={{
                  container: {margin: "0 0 16px 0"},
                  content: {
                      justifyContent: "space-around",
                      padding: "16px 0 16px 0"
                  },
                  control: {
                      container: {
                          width: "72px",
                          margin: "8px"
                      }
                  }
              }}
              layout={'left'}
              control={'radio'}
              grouped={true}
              indexes={[2,4]}
              items={ITEMS}
              keyField={'code'}
              valueField={'name'}
              checked={1}
              unchecked={0}
              onChange={this.change} />

        <TMemo
          style={{edit: {minHeight: "48px"}}}
          label={'onChange events:'}
          icon={'refresh'}
          value={this.state.event}
          onIcon={this.clear} />

      </div>

    );

  }

}

export default TItemGroupExample;