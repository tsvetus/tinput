import {post} from "./request";

const list = {};

export default class Provider {

    constructor (params) {
        this.name = params.name;
        this.sender = params.sender;
        this.target = params.target ? params.target : 'items';
        this.url = params.url;
        this.data = params.data ? params.data : {};
        this.request = this.request.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    request() {
        post({
            url: this.url,
            data: this.data,
            sender: this.sender,
            target: this.target,
            success: (items) => {
                list[this.name] = items;
            }
        });
    }

    refresh() {
        let items = list[this.name];
        if (items) {
            this.sender.setState({[this.target]: items});
        } else {
            this.request();
        }
    }

}