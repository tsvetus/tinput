import React from 'react';

import {TSide, TTop, TGroup, TMemo} from 'tinput';

class TSideExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      side: false,
      item: null,
      event: ''
    };
    this.click = this.click.bind(this);
    this.clear = this.clear.bind(this);
    this.menuClick = this.menuClick.bind(this);
  }

  menuClick(event) {
    this.setState({
      item: event.item.name,
      side: false,
      event: this.state.event + ' ' +
        JSON.stringify(event)
    });
  }

  click(event) {
    this.setState({
      side: true,
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

          <TSide
            show={this.state.side}
            name={'side'}
            items={[
              {name: 'first', caption: 'First item'},
              {name: 'second', caption: 'Second item'}
            ]}
            item={this.state.item}
            onClick={this.menuClick}
          >
            <div style={{
              border: "2px solid #aaa",
              margin: "16px",
              padding: "8px",
              textAlign: "center"
            }}>
              Any other menu content as
              children elements
            </div>
          </TSide>

          <TTop
            style={{
              container: {width: "100%", padding: "8px"}
            }}
            name={'top'}
            caption={'Click menu icon or touch/move ' +
            'from left side of screen to the right'}
            tools={[
              {icon: 'tinput'}
            ]}
            onClick={this.click}/>

        </TGroup>

        <TMemo
          style={{edit: {minHeight: "48px"}}}
          label={'onChange events:'}
          icon={'refresh'}
          wrap={true}
          value={this.state.event}
          onIcon={this.clear}/>

      </div>

    );

  }

}

export default TSideExample;