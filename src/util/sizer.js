import {clone} from './misc.js';

class Sizer {

    constructor (comp, callback) {
        this.comp = comp;
        this.resize = this.resize.bind(this);
        this.getWidth = this.getWidth.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.send = this.send.bind(this);
        this.handleResize = this.handleResize.bind(this);
        if (this.comp && this.comp.state) {
            this.comp.state.width = window.innerWidth;
            this.comp.state.height = window.innerHeight;
        }
        this.timer = null;
        this.callback = callback;
        this.start();
    }

    getWidth() {
        return window.innerWidth;
    }

    getHeight() {
        return window.innerHeight;
    }

    send() {
        if (this.callback) {
            this.callback({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    }

    start() {
        window.addEventListener('resize', this.handleResize);
        this.send();
    }

    stop() {
        window.removeEventListener('resize', this.handleResize);
    }

    free() {
        this.stop();
    }

    resize() {
        if (this.comp && this.comp.setState) {
            this.comp.setState({
                ...clone(this.comp.state),
                width: window.innerWidth,
                height: window.innerHeight
            }, () => {
                this.send();
            });
        } else {
            this.send();
        }
    }

    handleResize() {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.resize, 500);
    }

}

export default Sizer;