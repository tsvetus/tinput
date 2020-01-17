import {clone} from './misc.js';

class Sizer {

    constructor (comp, callback) {
        this.comp = comp;
        this.getWidth = this.getWidth.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if (this.comp && this.comp.state) {
            this.comp.state.width = window.innerWidth;
            this.comp.state.height = window.innerHeight;
            this.start(callback);
        }
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    start(callback) {
        window.addEventListener('resize', this.handleResize);
        if (callback) {
            this.callback = callback;
        }
    }

    stop() {
        this.callback = null;
        window.removeEventListener('resize', this.handleResize);
    }

    free() {
        this.stop();
    }

    handleResize() {
        if (this.callback) {
            this.callback({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        if (this.comp && this.comp.setState) {
            this.comp.setState({
                ...clone(this.comp.state),
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    }

}

export default Sizer;