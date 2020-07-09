import React from 'react';

import {TTree, TGroup, TMemo} from 'tinput';

const ITEMS = [
  {id: 1, name: 'item 1'},
  {id: 2, name: 'item 2'},
  {id: 3, name: 'item 3', items: [
    {id: 4, name: 'item 4', items: [
      {id: 5, name: 'item 5'},
      {id: 6, name: 'item 6', items: [
        {id: 9, name: 'item 9'},
        {id: 10, name: 'item 10'}
      ]},
      {id: 7, name: 'item 7'},
    ]},
  ]},
  {id: 8, name: 'item 8'}
];

class TTreeExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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

        <TGroup style={{
          container: {margin: "0 0 16px 0"}
        }}>

          <TTree
            name={'tree'}
            listMode={'value'}
            keyField={'id'}
            valueField={'name'}
            items={ITEMS}
            showSelected={true}
            expand={1}
            onChange={this.change}/>

        </TGroup>

        <TMemo
          style={{
            edit: {minHeight: "48px"}
          }}
          label={'onChange events:'}
          icon={'refresh'}
          wrap={true}
          value={this.state.event}
          onIcon={this.clear}/>

      </div>

    );

  }

}

export default TTreeExample;