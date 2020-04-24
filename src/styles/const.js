import defaultLayout from './layout.js';
import defaultStyles from './styles.js';
import defaultTemplates from './template.js';

import {merge} from '../util';

const templates = defaultTemplates;
const styles = defaultLayout;

Object.assign(styles, merge(styles, defaultStyles(templates)));

function registerTemplates(customTemplates) {
    if (customTemplates && customTemplates instanceof Object) {
        Object.assign(templates, merge(templates, customTemplates));
    }
}

function registerStyles(customStyles, customTemplates) {
    registerTemplates(customTemplates);
    Object.assign(styles, merge(styles, defaultStyles(templates)));
    if (customStyles && customStyles instanceof Object) {
        Object.assign(styles, merge(styles, customStyles));
    }
}

export {
    styles,
    templates,
    registerStyles
}