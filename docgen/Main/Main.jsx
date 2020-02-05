import React from 'react';
import PropTypes from 'prop-types';
import {
    TTop,
    TSide,
    TMenu,
    TScroll,
    merge,
    Sizer,
    getFile
} from 'tinput';

import Component from '../Component';

import styles from './styles';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            menu: false,
            page: 'Readme'
        };
        this.menuToggle = this.menuToggle.bind(this);
        this.menuClick = this.menuClick.bind(this);
        this.sizer = new Sizer(this);
    }

    componentWillUnmount() {
        this.mounted = false;
        this.sizer.free();
        delete this.sizer;
    }

    componentDidMount() {
        this.mounted = true;
        getFile(window.location.pathname + this.props.fileName, (json) => {
            if (this.mounted && json) {
                this.setState({data: JSON.parse(json)});
            }
        });
    }

    menuToggle() {
        this.setState({menu: !this.state.menu});
    }

    menuClick(event) {
        if (event.item.name === 'close') {
            this.setState({menu: false});
        } else {
            this.setState({
                menu: false,
                page: event.item.name
            });
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        let caption = this.state.data && this.state.data.title ? this.state.data.title.caption : null;
        let name = this.state.data && this.state.data.title ? this.state.data.title.name : null;
        let component = null;
        if (this.state.data) {
            component = <Component data={this.state.data.components[this.state.page]} />;
        }

        let items = [];
        if (this.state.data && this.state.data.components) {
            for (let key in this.state.data.components) {
                let name = this.state.data.components[key].displayName;
                if (name === 'separator') {
                    items.push({});
                } else {
                    items.push({
                        name: name,
                        caption: name,
                    });
                }
            }
        }

        let side = null;
        let menu = null;
        if (this.state.width < 800) {
            side = (
                <TSide
                    onClick={this.menuClick}
                    show={this.state.menu}
                    item={this.state.page}
                    items={items} />
            );
        } else {
            menu = (
                <TMenu
                    style={style.menu}
                    onClick={this.menuClick}
                    item={this.state.page}
                    items={items} />
            );
        }

        return (

            <div>

                {side}

                <TTop
                    style={style.top}
                    caption={side ? name : caption}
                    icon={side ? 'menu' : 'tinput'}
                    tools={[{icon: 'tinput'}]}
                    onClick={this.menuToggle} />

                <div style={style.box}>

                    {menu}

                    <TScroll
                        style={style.scroll}>
                        {component}
                    </TScroll>

                </div>

            </div>
        );

    }

}

Main.propTypes = {
    fileName: PropTypes.string
};

Main.defaultProps = {
    fileName: 'index.json'
};

export default Main;