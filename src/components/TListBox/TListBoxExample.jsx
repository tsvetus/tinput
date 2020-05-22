import React from 'react';

import {TListBox, TMemo, TGroup} from 'tinput';

const ITEMS = [
  {id: 1, code: 'code1', name: 'First item'},
  {id: 2, code: 'code2', name: 'Second item'},
  {id: 3, code: 'code3', name: 'Third item'},
  {id: 4, code: 'code4', name: 'Forth item'},
  {id: 5, code: 'code5', name: 'Fifth item'},
  {id: 6, code: 'code6', name: 'Sixth item'},
  {id: 7, code: 'code7', name: 'Seventh item'},
  {id: 8, code: 'code8', name: 'Eighth item'},
  {id: 9, code: 'code9', name: 'Ninth item'},
  {id: 10, code: 'code10', name: 'Tenth item'}
];

const TREE = [
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

class TListBoxExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 2,
      event: ''
    };
    this.change = this.change.bind(this);
    this.clear = this.clear.bind(this);
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

  render() {

    return (

      <div>

        <TGroup style={{
          container: {margin: "0 0 16px 0"}
        }}>

          <TListBox
            style={{
              container: {
                width: "380px",
                margin: "8px 0 8px 0"
              }
            }}
            name={'myListBox'}
            empty={{id: 0, name: '-'}}
            items={ITEMS}
            keyField={'id'}
            valueField={'name'}
            value={this.state.value}
            placeholder={'Select item from list ...'}
            showMode={'value'}
            listMode={'key value'}
            label={'Choose item:'}
            onChange={this.change}/>

          <TListBox
              style={{
                container: {
                  width: "380px",
                  margin: "8px 0 8px 0"
                }
              }}
              name={'myModalBox'}
              empty={{id: 0, name: '-'}}
              items={ITEMS}
              keyField={'id'}
              valueField={'name'}
              value={this.state.value}
              placeholder={'Select item from list ...'}
              showMode={'value'}
              listMode={'value'}
              label={'Choose item from modal view:'}
              layout={'top'}
              modal={8}
              fitHeight={true}
              showIcon={false}
              caption={'List items'}
              onChange={this.change}/>

          <TListBox
              style={{
                container: {
                  width: "380px",
                  margin: "8px 0 8px 0"
                }
              }}
              name={'myListBox'}
              empty={{id: 0, name: '-'}}
              items={ITEMS}
              keyField={'id'}
              valueField={'name'}
              value={this.state.value}
              placeholder={'Select item from list ...'}
              showMode={'value'}
              listMode={'key value'}
              label={'Choose item:'}
              nestedIcon={true}
              onChange={this.change}/>

            <TListBox
                style={{
                    container: {
                        width: "380px",
                        margin: "8px 0 8px 0"
                    }
                }}
                name={'tree'}
                empty={{id: 0, name: '<empty>'}}
                items={TREE}
                tree={true}
                expand={1}
                keyField={'id'}
                valueField={'name'}
                value={this.state.value}
                placeholder={'Select item tree ...'}
                showMode={'value'}
                listMode={'value'}
                label={'Tree list:'}
                nestedIcon={true}
                onChange={this.change}/>

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

export default TListBoxExample;