class TMask {

    constructor(params) {
        this.value = "    ";//params.value ? params.value : '';
        this.mask = params.mask;
        this.empty = params.empty;
    }

    parse(event) {
        // if (event.value) {
        //     this.value = event.value;
        //     console.log('vals ' + this.value);
        // }
        if (event.key && event.key.length == 1) {
            this.value = this.value.slice(0, event.caret) + event.key +
                this.value.slice(event.caret - 1);
            this.caret = event.caret + 1;
        }
        console.log('val ' + this.value);
        return {
            value: this.value,
            caret: this.caret ? this.caret : this.value.length
        }
    }

}

export default TMask;
