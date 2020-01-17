import React from 'react';
import PropTypes from 'prop-types';

import {
    TGrid,
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
                        name: {caption: 'name', width: '100px'},
                        type: {caption: 'type', width: '80px'},
                        description: {caption: 'description'}
                    }}
                    items={items}
                    options={{
                        select: false,
                        scroll: false,
                        borderWidth: 0,
                        showHead: false
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
                        name: {caption: 'name', width: '100px'},
                        description: {caption: 'description'}
                    }}
                    items={items}
                    options={{
                        select: false,
                        scroll: false,
                        borderWidth: 0,
                        showHead: false
                    }} />
            }

            let def  = props[key].defaultValue;

            items.push({
                name: <div style={style.name}>{key}</div>,
                type: <div style={style.type}>{props[key].type}</div>,
                defaultValue: <div style={style.defaultValue}><code>{def}</code></div>,
                required: <div style={style.required}>{props[key].required ? '*' : ''}</div>,
                description: <div>
                    <div style={style.description}>{props[key].description}</div>
                    {args}
                    {struct}
                </div>
            });

        }

        return (
            <TGrid
                style={style.grid}
                columns={{
                    name: {caption: 'name', width: '120px'},
                    type: {caption: 'type', width: '80px'},
                    defaultValue: {caption: 'default', width: '120px'},
                    required: {caption: 'req', width: '40px'},
                    description: {caption: 'description'}
                }}
                items={items}
                options={{
                    select: false,
                    scroll: false,
                    borderWidth: '1px'
                }} />
        );

    }

}

Props.propTypes = {
    data: PropTypes.object.isRequired
};

export default Props;