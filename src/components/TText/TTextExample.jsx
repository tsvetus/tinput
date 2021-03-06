import React from 'react';

import {TText, TMemo, TGroup, nvl} from 'tinput';

class TTextExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      layout: null,
      regexp: null,
      validation: null,
      mask: '+1 111 111-11-11',
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

          <TText
            style={{
              container: {
                maxWidth: "440px",
                margin: "8px"
              }
            }}
            value={this.state.layout}
            label={'TText with top label:'}
            name={'layout'}
            layout={'top'}
//            placeholder={'Enter single line text ...'}
            onChange={this.change}/>

          <TText
            style={{
              container: {
                maxWidth: "440px",
                margin: "8px"
              },
              label: {width: "180px"}
            }}
            value={this.state.regexp}
            label={'TText with RegExp validation:'}
            name={'regexp'}
            regexp={TText.regexp['email']}
            placeholder={'Enter email address ...'}
            onChange={this.change}/>

          <TText
            style={{
              container: {
                maxWidth: "440px",
                margin: "8px"
              },
              label: {width: "180px"}
            }}
            value={this.state.validation}
            label={'TText with custom validation:'}
            name={'validation'}
            placeholder={'Enter more than 3 symbols ...'}
            onValidate={(event) => {
              return nvl(event.value, '').length > 3;
            }}
            onChange={this.change}/>

          <TText
            style={{
              container: {
                maxWidth: "440px",
                margin: "8px"
              },
              label: {width: "180px"}
            }}
            value={this.state.mask}
            label={'TText with mask:'}
            name={'mask'}
            format={{
              mask: '+1 (NNN) NNN-NN-NN',
              empty: '_'
            }}
            onChange={this.change}/>

            <TText
                style={{
                    container: {
                        maxWidth: "440px",
                        margin: "8px"
                    },
                    label: {width: "180px"}
                }}
                value={this.state.icon}
                label={'TText with nested icon:'}
                name={'icon'}
                icon={'open'}
                nestedIcon={true}
                onChange={this.change}
                onIcon={(event) => {
                    alert('Icon ' + event.icon + ' clicked!')
                }} />

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

export default TTextExample;