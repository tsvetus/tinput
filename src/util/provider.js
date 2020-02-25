import {post} from './request.js';
import {clone} from './misc.js';

const providers = {};

class Provider {

    constructor (props) {
        this.getProps = this.getProps.bind(this);
        this.props = clone(props);
    }

    getProps() {
        return this.props;
    }

}

Provider.get = function(name) {
    return providers[name] ? providers[name] : {};
};

Provider.create = function(params, props) {
    let name = params.name ? params.name : params.url;
    if (providers[name] === undefined) {
        providers[name] = null;
        if (props && props.items) {
            providers[name] = new Provider({
                ...props,
                items: items
            });
        } else {
            post({
                url: params.url,
                data: params.data ? params.data : {},
                success: (items) => {
                    providers[name] = new Provider({
                        ...props,
                        items: items
                    });
                }
            });
        }
    }
};

export default Provider;