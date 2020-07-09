import {post} from './request.js';

class Uploader {

    constructor (params, vars) {
        this.params = params ? params : {};
        this.vars = vars ? vars : {};
        this.handleChange = this.handleChange.bind(this);
        this.free = this.free.bind(this);
        this.update = this.update.bind(this);
        this.upload = this.upload.bind(this);
        this.data = this.data.bind(this);
        this.clear = this.clear.bind(this);
        this.createInput = this.createInput.bind(this);
    }

    handleChange(event) {
        if (event.target.files) {
            this.file = event.target.files[0];
            if (this.params.change) {
                this.params.change({file: this.file});
            }
            event.target.value = '';
        }
    }

    update(params, vars) {
        this.params = {
            ...this.params,
            ...params
        };
        this.vars = {
            ...this.vars,
            ...vars
        };
        if (params && params.file) {
            this.file = params.file
        }
    }

    data() {
        let data = new FormData();
        if (this.vars) {
            for (let key in this.vars) {
                data.append(key, this.vars[key]);
            }
        }
        if (this.file) {
            data.append('fileName', this.file.name);
            data.append('file', this.file, this.file.name);
        }
        return data;
    }

    upload(params, vars) {
        this.update(params, vars);
        post({
            ...this.params,
            data: this.data(),
            contentType: 'multipart/form-data'
        });
    }

    createInput() {
        if (!this.input) {
            this.input  = document.createElement("input");
            this.input.setAttribute('style', 'display: none;');
            this.input.setAttribute('type', 'file');
            document.body.appendChild(this.input);
            this.input.addEventListener('change', this.handleChange);
        }
    }

    open(params, vars) {
        this.update(params, vars);
        this.createInput();
        this.input.click();
    }

    clear() {
        this.file = null;
        this.vars = {};
        if (this.params.sender) {
            this.params.sender.setState({file: this.file});
        }
    }

    free() {
        if (this.input) {
            this.input.removeEventListener('change', this.handleChange);
            document.body.removeChild(this.input);
            delete this.input;
        }
    }

}

export default Uploader;