import React from 'react';

import {TItemGroup, TMemo} from 'tinput';

const ITEMS = [
  {key: 1, value: 'Item1', group: 0},
  {key: 2, value: 'Item2', group: 0},
  {key: 3, value: 'Item3', group: 0},
  {key: 4, value: 'Item4', group: 0},
  {key: 5, value: 'Item5', group: 1},
  {key: 6, value: 'Item6', group: 1},
  {key: 7, value: 'Item7', group: 1}
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