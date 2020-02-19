import {post} from 'request.js';

const refs = {};

class Ref {

    constructor (params) {
        this.url = params.url;
        if (this.url && !refs[this.url]) {
            post({
                url: this.url,
                data: {},
                sender: params.sender,
                target: params.target,
                success: (items) => {
                    refs[this.url] = items;
                }
            });
        }
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        return refs[this.url];
    }

}

export default Ref;