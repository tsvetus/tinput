# tinput
Set of most common visual React components designed for constructing web application interfaces.

`tinput` provides set of visual components constructed on `<input>` html tag:
* `TText`
* `TListBox`
* `TSearch`
* `TMask`
* `TDate`
* `TTime`
* `TMail`
* `TMemo`
* `TCheck`

## Stylization

Style structure for custom stylization contains sections for all `tinput` components:

* `container` - Style for outer box

* `label` - Style for label

* `edit` - Style for edit

Specific for `TListBox` and `TSearch` components:

* `list` - Style for drop down itemslist

* `item` - Style for item in drop down list

All root style properties will be copied to `container` property automatically.

### Example

```javascript
const customStyle = {

    container: {
        border: "none"
    },

    label: {
        color: "#f33"
    },

    edit: {
        color: "#000",
        borderBottom: "2px solid #ddd"
    },

    list: {
        border: "2px solid #f33",
        backgroundColor: "#eee"
    },

    item: {
        border: "none"
    }

}
```

## Events

`onChange = function(event)` - On change event where `event` contains:

* `event.value` - Component value.

* `event.name` - Value of `name` property. Type `String`.

* `event.data` - Value of `data`property. Type `Object`.

* `event.caption` - Value of item name for components with dropdown list.
    Type `String`.

`onSearch = function(query, callback = function(items))` - When component dropdown
    list needs to be updated it calls `onSearch` to find suitable items (in
    external database for instance) with parameters:
*   `query.id` - Find using `id` value
*   `query.name` - Find using `name` value          
*   `callback` - Function accepts array of found `items` of form:
    `[{id: <id value>, name: <name value>}, ...]`  

## `TText`

Component `TText` represents text input element and contains properties:

* `style` - Style for custom stylization

* `name` - Any usable name for component. It will be returned back to parent component
         with `onChange` event

* `data` - Any usable object containing data that will be returned back to parent component
         with `onChange` event

* `label` - Name for label. If not specified - no label will be displayed

* `placeholder` - TText for empty input

* `password` - Optional. If specified - entered text appears as dots    

* `value` - Default display text

* `onChange` - On change event. `event.value` contains last changed text.

```javascript
<TText
    style={{container: {border: "1px solid red"}}}
    name="MyTextInput"
    data={{id: 123}}
    label="TText:"
    placeholder="Enter your text"
    onChange={this.handleChange} />
```   

## `TListBox`

Component `TListBox` represents input with dropdown list of items:

* `style`, `name`, `data`, `label`, `placeholder` - Same as in <TText> component.

* `list` - Array of items in dropdown list. Example: `list={[{id: 1, name: "first item"}, {id: 2, name: "second item"}]}`.
        Format of single item is: `{id: 1, name: "first item"}` where `id` is used for value field in `onChange` event and
        `name` - text displayed in input field and dropdown list items.  

* `empty` - Optional. Defines an empty list item. Example: `empty={{id: 0, name: "-"}}`. If specified this item appears
        at first position in dropdown list. If chosen - `onChange` event returns value specified in `id`
        field of `empty` object.         

* `value` - Value of default `id` displayed after component did mount.        

* `onChange` - On change event. Fires only if dropdown list item clicked. Returns object:
        `{value: 1, caption: "Item name", name: "MyListBox", data: {}}` where `value` - `id` of chosen item,
        `caption` - it's `name`, `name` - component name and `data` - component data property.    


### Example

```javascript
<TListBox
    style={{container: {border: "1px solid red"}}}
    name="MyListbox"
    label="Item:"
    value={1}
    placeholder="Choose item"
    items={[
        {id: 1, name: "First item"},
        {id: 2, name: "Second item"}
    ]}
    empty={{id: 0, name: "-"}}
    onChange={this.handleChange} />
```   

## `TSearch`

Component `TSearch` similar to `TListBox` but dropdown list appears automatically while user enters a text:

* `style`, `name`, `data`, `label`, `placeholder` - Same as in <TText> component.

* `value` - Value of default `id` displayed after component did mount.        

* `onChange` - On change event. Fires only if dropdown list item clicked. Returns object:
        `{value: 1, caption: "Item name", name: "MyListBox", data: {}}` where `value` - `id` of chosen item,
        `caption` - it's `name`, `name` - component name and `data` - component data property.

* `onSearch` - When component dropdown list needs to be updated it calls `onSearch` with object parameters:
    *    `{id: <any id>}` or `{name: <any substring>}` - Search parameters. Parent component performs search using values from `id` or `name` field
        trying to find suitable items (from external database for instance)           
    *   `function()` - Callback function returning array of items like: `[{id: 1, name: "first item"}, {id: 2, name: "second item"}]`          

### Example

```javascript
<TSearch
    style={{container: {border: "1px solid red"}}}
    name="MySearch"
    label="TSearch:"
    placeholder="Enter text 'item'"
    onSearch={this.handleSearch}
    onChange={this.handleChange} />
```   

## `TMask`

Component `TMask` represents component with masked text input:

* `style`, `name`, `data`, `label` - Same as in <TText> component.

* `mask` - Object contains mask parameters. Example: `mask={mask: "NN.NN.NNNN", empty: "-"}`. `N` - means any number.  

* `onChange` - On change event. Fires only if value does not contains an empty chars.    

### Example

```javascript
<TMask
    style={{container: {border: "1px solid red"}}}
    name="MyDate"
    label="Date:"
    value="22.04.2019"
    mask={{mask: "NN.NN.NNNN", empty: "-"}}
    onChange={this.handleChange} />
```   

## `TDate`

Component `TDate` represents date input:

* `style`, `name`, `data`, `label` - Same as in <TText> component.

* `format` - Object contains date format. Example: `format={mask: "DD.MM.YYYY", empty: "-"}`.

* `value` - Contains default date value. Value can be `Date` type or date string in `ISO` format `YYYY-MM-DD`.   

* `onChange` - On change event. Fires only if value does not contains an empty chars.
             Parameter `event.value` contains date string in `ISO` format   

### Example

```javascript
<TDate
    style={{container: {border: "1px solid red"}}}
    name="MyDate"
    label="Date:"
    value={new Date()}
    format={{mask: "DD.MM.YYYY", empty: "-"}} />
```   

## `TTime`

Component `TTime` represents time input:

* `style`, `name`, `data`, `label` - Same as in <TText> component.

* `format` - Object contains time format. Example: `format={mask: "hh:mm:ss", empty: "-"}`.

* `value` - Contains default time value. Value can be `Date` type or time string in `ISO` format `hh:mm:ss`.   

* `onChange` - On change event. Fires only if value does not contains an empty chars.
             Parameter `event.value` contains time string in `ISO` format   

### Example

```javascript
<TTime
    style={{container: {border: "1px solid red"}}}
    name="MyTime"
    label="Time:"
    value={new Date()}
    format={{mask: "hh:mm", empty: "-"}}
    onChange={this.handleChange} />
```  

## `TMail`

Component `TMail` represents input for email:

* `style`, `name`, `data`, `label` - Same as in <TText> component.

* `value` - Contains default email value.   

* `onChange` - On change event. Fires only if value matches email format.

### Example

```javascript
<TMail
    style={{container: {border: "1px solid red"}}}
    name="MyMail"
    label="Email:"
    placeholder="Enter email"
    onChange={this.handleChange} />
```  
## `TMemo`

Component `TMemo` extends html <textarea> tag:

* `style`, `name`, `data`, `label` - Same as in <TText> component.

* `value` - Contains default text.   

* `onChange` - On change event..

### Example

```javascript
<TMemo
    style={{container: {border: "1px solid red"}}}
    name="MyMemo"
    label="Textarea:"
    onChange={this.handleChange} />
```  

## `TCheck`

Component `TMemo` extends html <textarea> tag:

* `style`, `name`, `data`, `label` - Same as in <TText> component.

* `value` - Contains default state `true`, `false`, `0` or `1`.   

* `valueInt` - If `true` then return value is `0` or `1`.

* `onChange` - On change event.

### Example

```javascript
<TCheck
    style={{container: {border: "1px solid red"}}}
    name="MyCheck"
    label="Check me"
    value={1}
    nalueint={true}
    onChange={this.handleChange} />
```  

## Usage

```javascript

import React from 'react';

import {

    TListBox,
    TText,
    TSearch,
    TMask,
    TDate,
    TTime,
    TMail,
    TMemo,
    TCheck,

    COLOR,
    TABLE,
    FONT

} from 'tinput';

const list = [
    {id: 1, name: "First item"},
    {id: 2, name: "Second item"},
    {id: 3, name: "Third item"},
    {id: 4, name: "Forth item"}
];

const inputStyle = {

    container: {
    },

    label: {
    },

    edit: {
    },

    list: {
    },

    item: {
    }

}

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            events: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
        let e = this.state.events.slice();
        e.unshift(event);
        this.setState({events: e});
    }

    handleSearch(query, callback) {
        let items = list.filter((v, i) => {
            return ((query.id && query.id == v.id) ||
                (query.name && v.name.toLowerCase()
                    .indexOf(query.name.toLowerCase()) >= 0));
        });
        callback(items);
    }

    render() {

        let events = [];
        this.state.events.forEach((v, i) => {
            events.push(
                <div key={i} style={{margin: "8px 0 0 0"}}>
                    {JSON.stringify(v)}
                </div>
            );
        });

        return (

            <div style={{width: "320px"}}>

                <TText
                    style={inputStyle}
                    name="text"
                    label="Text:"
                    placeholder="Enter text"
                    value="default text"
                    onChange={this.handleChange} />

                <TText
                    style={inputStyle}
                    name="password"
                    label="Password:"
                    placeholder="Enter password"
                    onChange={this.handleChange}
                    password={true} />

                <TListBox
                    style={inputStyle}
                    name="listbox"
                    label="Item:"
                    value={1}
                    placeholder="Choose item"
                    items={[
                        {id: 1, name: "First item"},
                        {id: 2, name: "Second item"}
                    ]}
                    empty={{id: 0, name: "-"}}
                    onChange={this.handleChange} />

                <TSearch
                    style={inputStyle}
                    name="search"
                    label="Search:"
                    placeholder="Enter text 'item'"
                    value={1}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange} />

                <TMask
                    style={inputStyle}
                    name="dateMask"
                    label="Masked date:"
                    value="22.04.2019"
                    mask={{mask: "NN.NN.NNNN", empty: "-"}}
                    onChange={this.handleChange} />

                <TDate
                    style={inputStyle}
                    name="date"
                    label="Date:"
                    value={new Date()}
                    format={{mask: "DD.MM.YYYY", empty: "-"}}
                    onChange={this.handleChange} />

                <TTime
                    style={inputStyle}
                    name="time"
                    label="Time:"
                    value={new Date()}
                    format={{mask: "hh:mm", empty: "-"}}
                    onChange={this.handleChange} />

                <TMail
                    style={inputStyle}
                    name="email"
                    label="EMail:"
                    value="google@google.com"
                    onChange={this.handleChange} />

                <TCheck
                    style={inputStyle}
                    name="checkbox"
                    label="Check me:"
                    value={1}
                    valueInt={true}
                    onChange={this.handleChange} />

                <TMemo
                    style={{margin: "16px 0 0 0", height: "100px"}}
                    name="memo"
                    label="Textarea:"
                    value="Text"
                    onChange={this.handleChange} />

                <div style={{
                        color: COLOR.BORDER,
                        fontFamily: FONT.LABEL.FAMILY,
                        fontSize: FONT.LABEL.SIZE,
                        margin: "16px 0 0 0"
                    }}>
                    On change event:
                </div>

                <div style={{
                        minHeight: "100px",
                        ...TABLE.CELL
                    }}>
                    {events}
                </div>

            </div>
        );

    }

}

export default Main;


```
