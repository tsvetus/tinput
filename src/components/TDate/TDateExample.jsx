import React from 'react';

import {TDate, TMemo, TGroup, registerStyles, styles} from 'tinput';

/**
 * Register custom date and time formats and calendar localization captions.
 * All fields are optional. If not supplied default values are used.
 * "registerStyles" function can be called once in main module before component
 * creation. See "Readme" for explanation in detail
 */
registerStyles(null, {
  /** Date/Time formats */
  formats: {
    date: {mask: 'DD.MM.YYYY', empty: '_', full: true, type: 'iso'},
    time: {mask: 'hh:mm', empty: '_', full: true, type: 'iso'}
  },
  /** Calendar localization */
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Now', 'Dec'],
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  /** Navigation buttons */
  buttons: {
    yearUp: "&#10095;",
    yearDown: "&#10094;",
    monthUp: "&#10095;&#10095;&#10095;",
    monthDown: "&#10094;&#10094;&#10094;"
  }
});

class TDateExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      calendar: new Date(),
      event: ''
    };
    this.change = this.change.bind(this);
    this.clear = this.clear.bind(this);
  }

  change(event) {
    this.setState({
      [event.name]: event.value,
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

          <TDate
            style={{
              container: {
                width: "280px",
                margin: "8px 0 8px 0"
              }
            }}
            name={'myDateEdit'}
            value={this.state.date}
            label={'Enter valid date:'}
            format={{
              mask: 'DD/MM/YYYY',
              empty: '_',
              full: true,
              type: 'iso'
            }}
            onChange={this.change} />

          <TDate
              style={{
                container: {
                  width: "280px",
                  margin: "8px 0 8px 0"
                },
                calendar: {
                  container: {
                    padding: "8px",
                    margin: "8px 0 0 0",
                    border: "1px solid " + styles.colors.border
                  }
                }
              }}
              name={'calendar'}
              value={this.state.calendar}
              label={'Pickup date:'}
              format={{
                type: 'iso'
              }}
              calendar={true}
              onChange={this.change}/>

        </TGroup>

        <TMemo
          style={{
            edit: {minHeight: "48px"}
          }}
          label={'onChange events:'}
          icon={'refresh'}
          value={this.state.event}
          onIcon={this.clear}/>

      </div>

    );

  }

}

export default TDateExample;