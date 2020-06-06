import React from 'react';
import PropTypes from 'prop-types';

import {compare} from "../../util";

class TComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {wait: false, updates: []};
        this.dict = this.dict.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        if (this.handleCaption) {
            this.handleCaption();
        }
        if (this.handleTools) {
            this.handleTools();
        }
        if (this.refresh) {
            this.refresh();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.handleTools) {
            if (prevState.wait !== this.state.wait || !compare(prevState.updates, this.state.updates)) {
                this.handleTools();
            }
        }
        if (this.handleCaption) {
            if (prevProps.dict !== this.props.dict) {
                this.handleCaption();
            }
        }
    }

    dict(key) {
        if (this.props.dict && this.props.dict[key]) {
            return this.props.dict[key];
        } else {
            return '';
        }
    }

}

TComponent.propTypes = {
    dict: PropTypes.object,
};

export default TComponent;