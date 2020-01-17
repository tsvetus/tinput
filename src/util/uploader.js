class Uploader {

    constructor (owner) {
        this.owner = owner;
        this.handleChange = this.handleChange.bind(this);
        this.release = this.release.bind(this);
        this.upload = this.upload.bind(this);
        this.data = this.data.bind(this);
        this.clear = this.clear.bind(this);
        this.input  = document.createElement("input");
        this.input.setAttribute('style', 'display: none;');
        this.input.setAttribute('type', 'file');
        document.body.appendChild(this.input);
        this.input.addEventListener('change', this.handleChange);
    }

    handleChange(event) {
        if (event.target.files) {
            this.file = event.target.files[0];
            if (this.owner) {
                this.owner.setState({file: this.file.name});
            }
        }
    }

    data(params) {
        let data = null;
        if (this.file) {
            data = new FormData();
            if (params) {
                for (let key in params) {
                    data.append(key, params[key]);
                }
            }
            data.append('fileName', this.file.name);
            data.append('file', this.file, this.file.name);
        }
        return data;
    }

    upload(url, params) {
        if (url && this.file) {
            let request = new XMLHttpRequest();
            request.open("POST", url);
            request.send(this.data(params));
        }
    }

    open() {
        this.input.click();
    }

    clear() {
        this.file = null;
        if (this.owner) {
            this.owner.setState({file: this.file});
        }
    }

    release() {
        this.input.removeEventListener('change', this.handleChange);
        document.body.removeChild(this.input);
    }

}

export default Uploader;