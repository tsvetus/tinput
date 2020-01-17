
class Pager {

    constructor(size, length) {
        this.setSize = this.setSize.bind(this);
        this.setLength = this.setLength.bind(this);
        this.setPage = this.setPage.bind(this);
        this.pageUp = this.pageUp.bind(this);
        this.pageDown = this.pageDown.bind(this);
        this.getParams = this.getParams.bind(this);
        this.setSize(size);
        this.setLength(length);
    }

    setSize(size) {
        this.size = size ? size : 100;
        this.setPage(0);
    }

    setLength(length) {
        this.length = length ? length : 0;
        this.setPage(0);
    }

    setPage(page) {
        this.page = -1;
        this.pageFrom = 0;
        this.pageTo = -1;
        this.from = 0;
        this.to = -1;
        this.first = true;
        this.last = true;
        if (this.size > 0) {
            if (this.length > 0) {
                this.pageTo = Math.ceil(this.length/this.size) - 1;
            }
            if (page < 0) {
                this.page = 0;
            } else if (page > this.pageTo) {
                this.page = this.pageTo;
            } else {
                this.page = page;
            }
            if (this.page >= 0) {
                this.from = this.page * this.size;
                this.to = Math.min(this.from + this.size, this.length) - 1;
                this.first = this.page === this.pageFrom;
                this.last = this.page === this.pageTo;
            }
        }
    }

    pageUp() {
        this.setPage(this.page - 1);
    }

    pageDown() {
        this.setPage(this.page + 1);
    }

    getParams() {

        return {
            size: this.size,
            length: this.length,
            page: this.page,
            pageFrom: this.pageFrom,
            pageTo: this.pageTo,
            from: this.from,
            to: this.to,
            first: this.first,
            last: this.last
        }

    }

}

export default Pager;