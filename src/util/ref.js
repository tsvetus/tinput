import {post} from 'request.js';

const refs = {};

class Ref {

    constructor (params) {
        if (params.name) {
            this.name = params.name;
        } else {
            this.name = params.url;
        }
        if (params.url && !refs[this.name]) {
            post({
                url: params.url,
                data: params.data ? params.data : {},
                sender: params.sender,
                target: params.target,
                success: (items) => {
                    refs[this.name] = items;
                }
            });
        }
        this.getItems = this.getItems.bind(this);
    }

    getItems(name) {
        if (name) {
            return refs[name];
        } else {
            return refs[this.name];
        }
    }

}

export default Ref;