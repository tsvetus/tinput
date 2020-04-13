# tinput

Set of visual React components designed for constructing web application interfaces.

`tinput` provides set of visual components constructed on `<div>` element with editable content:
* `TText`
* `TMemo`
* `TListBox`
* `TSearch`
* `TDate`
* `TTime`

No text editor components:
* `TCheck`
* `TCalendar`

Buttons and icons:
* `TButton`
* `TIcon`

Grids and lists:
* `TGrid`
* `TTable`
* `TRibbon`

Control organizers:
* `TGroup`
* `TItemGroup`
* `TPanel`
* `TScroll`
* `TPager`
* `TPopup`

Menus:
* `TTop`
* `TSide`

Modals:
* `TModal`
* `TForm`

## Installation

``
npm install tinput
``

## Full documentation with examples
[Project page](https://tsvetus.github.io/tinput/)

## Stylization

Every component in `tinput` library has `style` property stands for providing custom style for each component:

```javascript
import React from 'react';
import {TText} from 'tinput';

const style = {
  container: {width: "320px"}, 
  edit: {border: "1px solid red"}, 
  label: {width: "100px"}
};

class MyComponent extends React.Component {
  render () {
     return <TText style={style} label={'TText component:'} />   
  }   
}

export default MyComponent;
```
 
Each component has it's own style structure described in [Project page](https://tsvetus.github.io/tinput/). Every 
component style has `container` field represents outer component box. Any `string` fields on zero level of style treated 
as `container` style fields. It means that `style={{width: "100px"}}` equals to `style={{container: {width: "100px"}}}`
    
In addition one can register global project styles using `registerStyles` function as follows: 

```javascript
import {registerStyles} from 'tinput';

const styles = {    
  TComponent: {
    /** Global style for components. */
    container: {
      backgroundColor: '#eee'
    },
    edit: {
      border: "1px solid red"
    }
  },
  TMemo: {
    /** Custom style for TMemo component. */
    edit: {
      border: "1px solid green"
    }
  },
  MyListBox: {
    /** 
     * Custom style for component with 'name' property 
     * equals to 'MyListBox' 
     */
    list: {
      item: {
        backgroundColor: "yellow"
      }
    }    
  }
};

const templates = {
    
  /** Global color palette */
  colors: {
    /** Main borders and fonts color */  
    border: "rgba(42,41,117,0.89)",
    /** Button faces */
    face: "#eee",
    /** Control and grid frames */
    frame: "#bfbbff",
    /** Control faces */
    control: "#777",
    /** Placeholder font color */
    placeholder: "#777",
    /** Window text color */
    text: "#000",
    /** Invalid frame color */
    invalid: "#a31",
    /** Invalid text */
    signal: "#f55",
    /** Control content background */
    window: "#fff",
    /** Panel content background */
    panel: "#eee",
    /** Error text font color */
    error: "#a31",
    /** Message text font color */
    message: "#31a",
    /** Indicator text color */
    indicator: "#a31"
  },
    
  /** Global fonts palette */
  fonts: {
    common: {
      fontFamily: "Arial",
      fontSize: "18px"
    },
    code: {
      fontFamily: "Helvetica",
      fontSize: "16px"
    }
  },

  /** Captions for TCalendar months */
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'],
  
  /** Captions for TCalendar weekdays */
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
 
  /** Date and time formats */
  formats: {
    date: {mask: 'DD.MM.YYYY', empty: '_', full: true, type: 'iso'},
    time: {mask: 'hh:mm', empty: '_', full: true, type: 'iso'}
  }
  
};

registerStyles(styles, templates);
```
New `styles` make all controls appeared on grey background then all editable controls have `red` border except `green` 
border for `TMemo` and with yellow list items in `TListBox` component with `name="MyListBox"`.

All default and registered styles are merged into global `style` object accessible in code as follows:

```
import {styles} from 'tinput'; 
``` 

## Properties

Each component has it's own set of properties described in [Project page](https://tsvetus.github.io/tinput/). The 
most common properties are:

* `style` - `Object` containing component styles organized in hierarchical structure. If assigned component 
  merges supplied styles with internal styles. Styles assigned to `style` property has highest priority than 
  any other component styles.
* `name` - `String` containing component name. If assigned any component events return back `name` value in 
  `event` object. In addition `name` value may be used in global styles registered by `registerStyles` function to
  assign to this component individual style. This style has higher priority than internal styles but lower priority
  than style assigned to `style` property.
* `data` - Property of `any type`. Contains any data associated with component. If assigned any component events 
  return back `data` value in `event` object.
* `label` - `String` contains label text.
* `placeholder` - `String` placeholder text.
* `value` - Component value. Type of `value` depends on component itself. In text edit component `value` is of 
  `String` type. In list box components `value` contains list item key value.
* `icon` - Icon name from available icon list (see `TIcon` from [Project page](https://tsvetus.github.io/tinput/)). 
  If assigned the appropriate icon appeared near text editor. 
* `timeout` - `Number` contains timeout for `onChange` event. Default: `700 ms`.
* `layout` - Label position towards text editor. Available values:
  * `left` - Label is on the left from text editor.
  * `top` - Label is on the top of text editor.

The full list of properties shown in [Project page](https://tsvetus.github.io/tinput/)

### Example

```javascript
import React from 'react';
import {TGroup, TButton, TText, clone, nvl} from 'tinput';

class MyComponent extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      text: '',
      phone: '',
      email: ''
    };
    this.change = this.change.bind(this);
  }
    
  change(event) {
    this.setState({[event.name]: event.value});
  } 

  render () {
        
    return (
             
      <TGroup 
        style={{
          container: {
            display: "flex", 
            flexDirection: "column", 
            width: "500px"
          }
        }} 
        label="Group box" > 
                
        <TButton style={{color: "green"}}>
          {'Click me'}
        </TButton>
             
        <TText
          style={{label: {width: "80px"}}}
          value={this.state.text}
          label={'Text:'}
          name={'text'}
          placeholder={'Enter more than 3 symbols ...'}
          onValidate={(event) => {
            return nvl(event.value, '').length > 3;
          }}
          onChange={this.change} />
    
        <TText
          style={{label: {width: "180px"}}}
          value={this.state.phone}
          label={'Phone:'}
          name={'phone'}
          placeholder={'Enter phone number ...'}
          mask={{mask: '+1 (NNN) NNN-NN-NN', empty: '_'}}                    
          onChange={this.change} />
    
        <TText
          style={{label: {width: "180px"}}}
          value={this.state.email}
          label={'EMail:'}
          name={'email'}
          regexp={TText.regexp['email']}
          placeholder={'Enter email address ...'}
          onChange={this.change} />
                
      </TGroup>    
                
    );
         
  }
    
}

export default MyComponent;
```

## Events

Some events are occur with delay determined by `timeout` property. Default timeout is `700 ms`. 
All events have one argument `event` of type `Object`. The structure of `event` object depends on caller 
component. The most common list of `event` fields listed below: 

* `name` - component name from `name` property.
* `data` - any data from `data` property.
* `value` - current component value. Text editors contain entered tex but list boxes contain selected item key value. 

The full list of event fields shown in [Project page](https://tsvetus.github.io/tinput/)


