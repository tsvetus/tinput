import React from 'react';

import {TCalendar, TGroup, TMemo} from 'tinput';

class TCalendarExample extends React.Component {

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

          <TCalendar
            style={{container: {margin: "8px"}}}
            label={'Single date selector'}
            start={1}
            onChange={this.change}
            value={'2020-04-15'} />

        <TCalendar
            style={{container: {margin: "8px"}}}
            label={'Multi date selector in iso format'}
            start={0}
            onChange={this.change}
            multiSelect={true}
            dateFormat={'iso'}
            navigators={'month'}
            templates={{
                days: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
                months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
            }}
            value={[
                (new Date()).setDate(15),
                (new Date()).setDate(17)
            ]} />

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

export default TCalendarExample;