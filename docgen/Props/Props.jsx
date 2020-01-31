import React from 'react';
import PropTypes from 'prop-types';

import {
    TGrid,
    TRibbon,
    Sizer,
    merge
} from 'tinput';

import styles from "./styles.js";

function iterate(data, callback, level) {
    if (data) {
        let lv  = level === undefined ? 0 : level + 1;
        for (let key in data) {
            if (typeof (data[key]) === 'object') {
                callback(data[key], key, lv);
                if (data[key].structure) {
                    iterate(data[key].structure, callback, lv);
                }
            }
        }
    }
}

class Props extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.sizer = new Sizer(this);
        this.handleFrame = this.handleFrame.bind(this);
    }

    componentWillUnmount() {
        this.sizer.free();
        delete this.sizer;
    }

    handleFrame(event) {
        return (
            <div key={event.index} style={event.style.box}>
                <div style={event.style.top}>
                    <div style={event.style.text}>Property: </div>
                    <div style={event.style.name}>
                        {event.item.name}
                    </div>
                    <div style={event.style.text}>of type: </div>
                    <div style={event.style.type}>
                        {event.item.type}
                    </div>
                    <div style={event.style.text}>default:</div>
                    <div style={event.style.defaultValue}>
                        {event.item.defaultValue}
                    </div>
                </div>
                <div style={event.style.description}>
                    {event.item.description}
                </div>
            </div>
        );
    }

    render () {

        let style = merge(styles, this.props.style);

        let items = [];

        let props = this.props.data ? this.props.data : {};

        for (let key in props) {

            let args = null;
            if (props[key].arguments) {
                let items = [];
                iterate(props[key].arguments, (v, k) => {
                    items.push({
                        name: <div style={style.name}>{k}</div>,
                        type: <div style={style.type}>{v.type}</div>,
                        description: <div style={style.desc}>{v.description}</div>
                    });
                });
                args = <TGrid
                    style={style.subGrid}
                    columns={{
                        name: {caption: 'name'},
                        type: {caption: 'type'},
                        description: {caption: 'description'}
                    }}
                    items={items}
                    options={{
                        showSelected: false,
                        scrollHead: true,
                        showHead: false,
                        borderWidth: 0
                    }} />
            }

            let struct = null;
            if (props[key].structure) {
                let items = [];
                iterate(props[key].structure, (v, k, l) => {
                    let sn = merge(style.name, {marginLeft: l*16 + 'px'});
                    items.push({
                        name: <div style={sn}>{k}</div>,
                        description: <div style={style.desc}>{v.description}</div>
                    });
                });
                struct = <TGrid
                    style={style.subGrid}
                    columns={{
                        name: {caption: 'name'},
                        description: {caption: 'description'}
                    }}
                    items={items}
                    options={{
                        showSelected: false,
                        scrollHead: true,
                        showHead: false,
                        borderWidth: 0
                    }} />
            }

            let def  = props[key].defaultValue;

            items.push({
                name: <div style={style.name}>{key}</div>,
                type: <div style={style.type}>{props[key].type}</div>,
                defaultValue: <div style={style.defaultValue}>{def}</div>,
                required: <div style={style.required}>{props[key].required ? '*' : ''}</div>,
                description: <div>
                    <div style={style.description}>{props[key].description}</div>
                    {args}
                    {struct}
                </div>
            });

        }

        let columns = {
            name: {caption: 'name'},
            type: {caption: 'type'},
            defaultValue: {caption: 'default', width: 'minmax(auto, 160px)'},
            required: {caption: 'req', style: {textAlign: 'center'}},
            description: {caption: 'description'}
        };

        if (this.state.width < 980) {
            return <TRibbon
                style={style}
                columns={columns}
                items={items}
                onFrame={this.handleFrame}
            />
        } else {
            return <TGrid
                style={style.grid}
                columns={columns}
                items={items}
                options={{
                    showSelected: false,
                    scrollHead: false
                }}
            />
        }

    }

}

Props.propTypes = {
    data: PropTypes.object.isRequired
};

export default Props;